const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const DataEncryption = require("./utils/encryption");
const https = require("https");

/*
 * 🚨 API TEMPORARILY DISABLED 🚨
 *
 * To re-enable the MetalpriceAPI functionality:
 * 1. Change GOLD_API_CONFIG.enabled from false to true
 * 2. Uncomment the setInterval and setTimeout lines in the server startup section
 * 3. Restart the server
 *
 * This prevents API calls while testing the webpage.
 */

const app = express();
const PORT = 3000;

// Initialize encryption
const encryption = new DataEncryption();

// Set up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

// Data file paths
const INVENTORY_FILE = "inventory";
const SALES_FILE = "sales";
const SETTINGS_FILE = "settings";

// Gold price API configuration - using MetalpriceAPI as specified
const GOLD_API_CONFIG = {
  url: "https://api.metalpriceapi.com/v1/latest?api_key=04fe01be73eeb6f2339d6decb507f5f1&base=USD&currencies=EUR,XAU,XAG",
  headers: {
    "Content-Type": "application/json",
  },
  enabled: false, // TEMPORARILY DISABLED - Set to true to re-enable API calls
  maxDailyCalls: 1, // Maximum 1 API call per day for gold price updates
};

// Gold purity standards (percentage of pure gold)
const GOLD_PURITY = {
  "9K": 37.5, // 9K = 37.5% pure gold
  "10K": 41.7, // 10K = 41.7% pure gold
  "12K": 50.0, // 12K = 50.0% pure gold
  "14K": 58.3, // 14K = 58.3% pure gold
  "16K": 66.7, // 16K = 66.7% pure gold
  "18K": 75.0, // 18K = 75.0% pure gold
  "21K": 87.5, // 21K = 87.5% pure gold
  "22K": 91.7, // 22K = 91.7% pure gold
  "24K": 99.9, // 24K = 99.9% pure gold
};

// Dealer markup factors (what dealers actually pay vs. market value)
const DEALER_MARKUP = {
  "9K": 0.65, // Dealers pay ~65% of market value for 9K
  "10K": 0.7, // Dealers pay ~70% of market value for 10K
  "12K": 0.72, // Dealers pay ~72% of market value for 12K
  "14K": 0.75, // Dealers pay ~75% of market value for 14K
  "16K": 0.77, // Dealers pay ~77% of market value for 16K
  "18K": 0.8, // Dealers pay ~80% of market value for 18K
  "21K": 0.83, // Dealers pay ~83% of market value for 21K
  "22K": 0.85, // Dealers pay ~85% of market value for 22K
  "24K": 0.9, // Dealers pay ~90% of market value for 24K
};

// Function to fetch current gold price from MetalpriceAPI
async function fetchCurrentGoldPrice() {
  return new Promise((resolve, reject) => {
    // Check if API is enabled and daily limit not exceeded
    if (!GOLD_API_CONFIG.enabled) {
      console.log("API disabled - using fallback price");
      const fallbackPricePerOunce = 3314.92;
      resolve(fallbackPricePerOunce);
      return;
    }

    // Check daily API call limit
    const today = new Date().toDateString();
    const apiCallCount = getDailyAPICallCount(today);

    if (apiCallCount >= GOLD_API_CONFIG.maxDailyCalls) {
      console.log(
        `Daily API limit reached (${apiCallCount}/${GOLD_API_CONFIG.maxDailyCalls}) - using fallback price`
      );
      const fallbackPricePerOunce = 3314.92;
      resolve(fallbackPricePerOunce);
      return;
    }

    // Increment API call count
    incrementDailyAPICallCount(today);

    console.log("Fetching gold price from MetalpriceAPI...");

    const url = new URL(GOLD_API_CONFIG.url);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: "GET",
      headers: GOLD_API_CONFIG.headers,
      timeout: 10000,
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          // Check if response is HTML (API blocked us)
          if (data.includes("<!doctype html>") || data.includes("<html")) {
            console.log("MetalpriceAPI returned HTML, using fallback price");
            const fallbackPricePerOunce = 3314.92;
            resolve(fallbackPricePerOunce);
            return;
          }

          const goldData = JSON.parse(data);
          let goldPricePerOunce = null;

          // Parse MetalpriceAPI response format
          if (
            goldData &&
            goldData.success &&
            goldData.rates &&
            goldData.rates.USDXAU
          ) {
            // USDXAU is gold price in USD per troy ounce
            goldPricePerOunce = goldData.rates.USDXAU;
          }

          if (goldPricePerOunce && goldPricePerOunce > 0) {
            console.log(
              `Successfully fetched gold price from MetalpriceAPI: $${goldPricePerOunce.toFixed(
                2
              )} per ounce`
            );
            resolve(goldPricePerOunce);
          } else {
            console.log(
              "MetalpriceAPI returned invalid data format, using fallback price"
            );
            const fallbackPricePerOunce = 3314.92;
            resolve(fallbackPricePerOunce);
          }
        } catch (error) {
          console.log(
            `MetalpriceAPI parse error: ${error.message}, using fallback price`
          );
          const fallbackPricePerOunce = 3314.92;
          resolve(fallbackPricePerOunce);
        }
      });
    });

    req.on("error", (error) => {
      console.log(
        `MetalpriceAPI request error: ${error.message}, using fallback price`
      );
      const fallbackPricePerOunce = 3314.92;
      resolve(fallbackPricePerOunce);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      console.log("MetalpriceAPI timeout, using fallback price");
      const fallbackPricePerOunce = 3314.92;
      resolve(fallbackPricePerOunce);
    });

    req.end();
  });
}

// Function to automatically update gold price once per day
async function autoUpdateGoldPrice() {
  try {
    const settings = readEncryptedData(SETTINGS_FILE);
    const today = new Date().toDateString();
    const lastUpdateDate = new Date(settings.lastUpdated).toDateString();

    // Only update if it's a new day and auto-update is enabled
    if (lastUpdateDate !== today && settings.autoUpdate) {
      console.log("Auto-updating gold price for new day...");

      const currentPricePerOunce = await fetchCurrentGoldPrice();

      if (currentPricePerOunce && currentPricePerOunce > 0) {
        settings.goldPricePerOunce = currentPricePerOunce;
        settings.lastUpdated = new Date().toISOString();

        if (writeEncryptedData(SETTINGS_FILE, settings)) {
          console.log(
            `Gold price automatically updated to $${currentPricePerOunce.toFixed(
              2
            )} per ounce`
          );
        } else {
          console.log("Failed to save updated gold price");
        }
      }
    }
  } catch (error) {
    console.error("Error in auto-update gold price:", error);
  }
}

// Function to calculate gold value based on purity and dealer markup
// Uses correct formulas: ppg(k) = (x / 31.1034768) * (k/24) and total(x,w,k) = (x / 31.1034768) * (k/24) * w
function calculateGoldValue(
  weightInGrams,
  purityPercentage,
  goldPricePerOunce
) {
  // Constants: 1 troy ounce = 31.1034768 grams (exact value)
  const TROY_OUNCE_TO_GRAMS = 31.1034768;

  // Convert spot price to pure (24K) per-gram: pg = x / 31.1034768
  const pureGoldPricePerGram = goldPricePerOunce / TROY_OUNCE_TO_GRAMS;

  // Convert purity percentage to decimal (e.g., 58.3% -> 0.583)
  const purityDecimal = purityPercentage / 100;

  // Per-gram price at that purity: ppg = pg * p
  const pricePerGramAtPurity = pureGoldPricePerGram * purityDecimal;

  // Total for the weight: total = ppg * w
  const marketValue = pricePerGramAtPurity * weightInGrams;

  // Calculate pure gold content in grams
  const pureGoldGrams = weightInGrams * purityDecimal;

  // Apply dealer markup (what dealers actually pay)
  const dealerValue = marketValue * getDealerMarkup(purityPercentage);

  // Round all monetary values to 2 decimal places
  return {
    weightInGrams: Math.round(weightInGrams * 100) / 100,
    purityPercentage: Math.round(purityPercentage * 100) / 100,
    pureGoldGrams: Math.round(pureGoldGrams * 100) / 100,
    goldPricePerOunce: Math.round(goldPricePerOunce * 100) / 100,
    goldPricePerGram: Math.round(pureGoldPricePerGram * 100) / 100,
    pricePerGramAtPurity: Math.round(pricePerGramAtPurity * 100) / 100,
    marketValue: Math.round(marketValue * 100) / 100,
    dealerValue: Math.round(dealerValue * 100) / 100,
    markupPercentage:
      Math.round((1 - getDealerMarkup(purityPercentage)) * 100 * 100) / 100,
  };
}

// Function to calculate gold prices for multiple karats at various weights
// Returns a table with Karat/Fineness, Purity, Price per gram, Weight (g), Total (USD)
function calculateGoldPricesForMultipleKarats(
  weightInGrams,
  goldPricePerOunce,
  karats = ["9K", "10K", "12K", "14K", "16K", "18K", "21K", "22K", "24K"]
) {
  const TROY_OUNCE_TO_GRAMS = 31.1034768;
  const pureGoldPricePerGram = goldPricePerOunce / TROY_OUNCE_TO_GRAMS;

  const results = karats.map((karat) => {
    const purityPercentage = GOLD_PURITY[karat];
    const purityDecimal = purityPercentage / 100;

    // Per-gram price at that purity: ppg = pg * p
    const pricePerGramAtPurity = pureGoldPricePerGram * purityDecimal;

    // Total for the weight: total = ppg * w
    const totalValue = pricePerGramAtPurity * weightInGrams;

    return {
      karat,
      purity: `${purityPercentage}%`,
      pricePerGram: Math.round(pricePerGramAtPurity * 100) / 100,
      weight: Math.round(weightInGrams * 100) / 100,
      total: Math.round(totalValue * 100) / 100,
    };
  });

  return results;
}

// Function to get dealer markup based on purity
function getDealerMarkup(purityPercentage) {
  // Find the closest karat value
  const karats = Object.keys(GOLD_PURITY);
  let closestKarat = "14K"; // Default to 14K
  let smallestDifference = Math.abs(purityPercentage - GOLD_PURITY["14K"]);

  for (const karat of karats) {
    const difference = Math.abs(purityPercentage - GOLD_PURITY[karat]);
    if (difference < smallestDifference) {
      smallestDifference = difference;
      closestKarat = karat;
    }
  }

  return DEALER_MARKUP[closestKarat];
}

// API call tracking functions
function getDailyAPICallCount(date) {
  try {
    const apiStats = readEncryptedData("api_stats") || {};
    return apiStats[date] || 0;
  } catch (error) {
    console.error("Error reading API stats:", error);
    return 0;
  }
}

function incrementDailyAPICallCount(date) {
  try {
    const apiStats = readEncryptedData("api_stats") || {};
    apiStats[date] = (apiStats[date] || 0) + 1;
    writeEncryptedData("api_stats", apiStats);
  } catch (error) {
    console.error("Error updating API stats:", error);
  }
}

// Function to get purity percentage from karat
function getPurityFromKarat(karat) {
  return GOLD_PURITY[karat] || 58.3; // Default to 14K if not found
}

// Function to get karat from purity percentage
function getKaratFromPurity(purityPercentage) {
  const karats = Object.keys(GOLD_PURITY);
  let closestKarat = "14K";
  let smallestDifference = Math.abs(purityPercentage - GOLD_PURITY["14K"]);

  for (const karat of karats) {
    const difference = Math.abs(purityPercentage - GOLD_PURITY[karat]);
    if (difference < smallestDifference) {
      smallestDifference = difference;
      closestKarat = karat;
    }
  }

  return closestKarat;
}

// Initialize data files if they don't exist
function initializeDataFiles() {
  const defaultInventory = [];
  const defaultSales = [];
  const defaultSettings = {
    goldPricePerOunce: 3355.3, // Current market price per ounce
    lastUpdated: new Date().toISOString(),
    autoUpdate: true, // Always enabled for automatic daily updates
    dealerMarkup: 0.75, // Default 14K dealer markup
    currency: "USD",
  };

  if (!fs.existsSync("./data")) {
    fs.mkdirSync("./data");
  }

  // Check if encrypted files exist, if not create them
  if (!encryption.encryptedFileExists(INVENTORY_FILE)) {
    encryption.saveEncryptedData(INVENTORY_FILE, defaultInventory);
    console.log("Created encrypted inventory file");
  }

  if (!encryption.encryptedFileExists(SALES_FILE)) {
    encryption.saveEncryptedData(SALES_FILE, defaultSales);
    console.log("Created encrypted sales file");
  }

  if (!encryption.encryptedFileExists(SETTINGS_FILE)) {
    encryption.saveEncryptedData(SETTINGS_FILE, defaultSettings);
    console.log("Created encrypted settings file");
  }

  // Create backup directory
  const backupDir = path.join("./data", "backups");
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
}

// Helper functions to read/write encrypted data
function readEncryptedData(fileName) {
  try {
    const data = encryption.loadEncryptedData(fileName);

    // Return appropriate default values based on file type
    if (fileName === SETTINGS_FILE) {
      // Return default settings if no data exists
      return (
        data || {
          goldPricePerOunce: 3355.3,
          lastUpdated: new Date().toISOString(),
          autoUpdate: true, // Always enabled for automatic daily updates
          dealerMarkup: 0.75,
          currency: "USD",
        }
      );
    } else {
      // Return empty array for inventory and sales files
      return data || [];
    }
  } catch (error) {
    console.error(`Error reading encrypted file ${fileName}:`, error);

    // Return appropriate defaults based on file type
    if (fileName === SETTINGS_FILE) {
      return {
        goldPricePerOunce: 3355.3,
        lastUpdated: new Date().toISOString(),
        autoUpdate: true, // Always enabled for automatic daily updates
        currency: "USD",
      };
    } else {
      return [];
    }
  }
}

function writeEncryptedData(fileName, data) {
  try {
    encryption.saveEncryptedData(fileName, data);

    // Create backup
    encryption.backupEncryptedData(fileName);

    return true;
  } catch (error) {
    console.error(`Error writing encrypted file ${fileName}:`, error);
    return false;
  }
}

// Routes
app.get("/", (req, res) => {
  const inventory = readEncryptedData(INVENTORY_FILE);
  const sales = readEncryptedData(SALES_FILE);
  const settings = readEncryptedData(SETTINGS_FILE);

  // Calculate totals using new gold value calculation
  const totalInventoryValue = inventory.reduce((sum, item) => {
    const goldValue = calculateGoldValue(
      item.weight,
      item.purity,
      settings.goldPricePerOunce
    );
    return sum + goldValue.marketValue;
  }, 0);

  const totalSales = sales.reduce((sum, sale) => sum + sale.price, 0);
  const totalProfit = sales.reduce(
    (sum, sale) => sum + (sale.price - sale.cost),
    0
  );

  res.render("index", {
    inventory,
    sales,
    settings,
    totalInventoryValue,
    totalSales,
    totalProfit,
    goldPurity: GOLD_PURITY,
    dealerMarkup: DEALER_MARKUP,
  });
});

app.get("/add-item", (req, res) => {
  const settings = readEncryptedData(SETTINGS_FILE);
  res.render("add-item", {
    settings,
    goldPurity: GOLD_PURITY,
    dealerMarkup: DEALER_MARKUP,
  });
});

app.post("/add-item", (req, res) => {
  const { name, type, weight, purity, cost, description } = req.body;
  const inventory = readEncryptedData(INVENTORY_FILE);
  const settings = readEncryptedData(SETTINGS_FILE);

  // Calculate gold value for this item
  const goldValue = calculateGoldValue(
    parseFloat(weight),
    parseFloat(purity),
    settings.goldPricePerOunce
  );

  const newItem = {
    id: Date.now().toString(),
    name,
    type,
    weight: parseFloat(weight),
    purity: parseFloat(purity),
    cost: parseFloat(cost),
    description,
    dateAdded: new Date().toISOString(),
    // Add calculated gold values
    karat: getKaratFromPurity(parseFloat(purity)),
    pureGoldGrams: goldValue.pureGoldGrams,
    marketValue: goldValue.marketValue,
    dealerValue: goldValue.dealerValue,
    markupPercentage: goldValue.markupPercentage,
  };

  inventory.push(newItem);

  if (writeEncryptedData(INVENTORY_FILE, inventory)) {
    res.redirect("/");
  } else {
    res.status(500).send("Error saving item. Please try again.");
  }
});

app.get("/sell-item/:id", (req, res) => {
  const inventory = readEncryptedData(INVENTORY_FILE);
  const item = inventory.find((i) => i.id === req.params.id);
  if (item) {
    const settings = readEncryptedData(SETTINGS_FILE);
    // Recalculate current gold value for accurate pricing
    const currentGoldValue = calculateGoldValue(
      item.weight,
      item.purity,
      settings.goldPricePerOunce
    );
    res.render("sell-item", {
      item: { ...item, currentGoldValue },
      settings,
    });
  } else {
    res.redirect("/");
  }
});

app.post("/sell-item/:id", (req, res) => {
  const { price } = req.body;
  const inventory = readEncryptedData(INVENTORY_FILE);
  const sales = readEncryptedData(SALES_FILE);

  const itemIndex = inventory.findIndex((i) => i.id === req.params.id);
  if (itemIndex !== -1) {
    const item = inventory[itemIndex];

    // Record the sale
    const sale = {
      id: Date.now().toString(),
      itemId: item.id,
      itemName: item.name,
      itemType: item.type,
      weight: item.weight,
      cost: item.cost,
      price: parseFloat(price),
      profit: parseFloat(price) - item.cost,
      dateSold: new Date().toISOString(),
      // Add gold value information
      karat: item.karat,
      purity: item.purity,
      pureGoldGrams: item.pureGoldGrams,
      marketValue: item.marketValue,
      dealerValue: item.dealerValue,
    };

    sales.push(sale);

    // Save sales data
    if (!writeEncryptedData(SALES_FILE, sales)) {
      return res.status(500).send("Error saving sale. Please try again.");
    }

    // Remove item from inventory
    inventory.splice(itemIndex, 1);

    if (!writeEncryptedData(INVENTORY_FILE, inventory)) {
      return res
        .status(500)
        .send("Error updating inventory. Please try again.");
    }
  }

  res.redirect("/");
});

app.get("/settings", (req, res) => {
  const settings = readEncryptedData(SETTINGS_FILE);
  res.render("settings", {
    settings,
    goldPurity: GOLD_PURITY,
    dealerMarkup: DEALER_MARKUP,
  });
});

app.post("/settings", (req, res) => {
  const { goldPricePerOunce, autoUpdate } = req.body;
  const currentSettings = readEncryptedData(SETTINGS_FILE);

  const settings = {
    ...currentSettings,
    goldPricePerOunce: parseFloat(goldPricePerOunce),
    autoUpdate: autoUpdate === "on",
    lastUpdated: new Date().toISOString(),
  };

  if (writeEncryptedData(SETTINGS_FILE, settings)) {
    res.redirect("/");
  } else {
    res.status(500).send("Error saving settings. Please try again.");
  }
});

// API endpoint to fetch current gold price
app.get("/api/gold-price", async (req, res) => {
  try {
    const currentPricePerOunce = await fetchCurrentGoldPrice();
    const today = new Date().toDateString();
    const apiCallCount = getDailyAPICallCount(today);

    res.json({
      success: true,
      pricePerOunce: currentPricePerOunce,
      pricePerGram: currentPricePerOunce / 31.1034768,
      timestamp: new Date().toISOString(),
      apiStatus: {
        enabled: GOLD_API_CONFIG.enabled,
        dailyCalls: apiCallCount,
        maxDailyCalls: GOLD_API_CONFIG.maxDailyCalls,
      },
    });
  } catch (error) {
    console.error("Error fetching gold price:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// API endpoint to update gold price automatically
app.post("/api/update-gold-price", async (req, res) => {
  try {
    const currentPricePerOunce = await fetchCurrentGoldPrice();
    const settings = readEncryptedData(SETTINGS_FILE);

    settings.goldPricePerOunce = currentPricePerOunce;
    settings.lastUpdated = new Date().toISOString();

    if (writeEncryptedData(SETTINGS_FILE, settings)) {
      res.json({
        success: true,
        newPricePerOunce: currentPricePerOunce,
        newPricePerGram: currentPricePerOunce / 31.1034768,
        message: "Gold price updated successfully",
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Failed to save updated price",
      });
    }
  } catch (error) {
    console.error("Error updating gold price:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// API endpoint to calculate gold value for a specific item
app.post("/api/calculate-gold-value", (req, res) => {
  try {
    const { weight, purity } = req.body;
    const settings = readEncryptedData(SETTINGS_FILE);

    if (!weight || !purity) {
      return res.status(400).json({
        success: false,
        error: "Weight and purity are required",
      });
    }

    const goldValue = calculateGoldValue(
      parseFloat(weight),
      parseFloat(purity),
      settings.goldPricePerOunce
    );

    res.json({
      success: true,
      calculation: goldValue,
      karat: getKaratFromPurity(parseFloat(purity)),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// API endpoint to calculate gold prices for multiple karats at a given weight
app.post("/api/calculate-gold-prices-multiple-karats", (req, res) => {
  try {
    const { weight, karats } = req.body;
    const settings = readEncryptedData(SETTINGS_FILE);

    if (!weight) {
      return res.status(400).json({
        success: false,
        error: "Weight is required",
      });
    }

    // Use provided karats or default to all supported karats
    const requestedKarats = karats || [
      "9K",
      "10K",
      "12K",
      "14K",
      "16K",
      "18K",
      "21K",
      "22K",
      "24K",
    ];

    // Filter to only include supported karats
    const validKarats = requestedKarats.filter((karat) => GOLD_PURITY[karat]);

    const goldPrices = calculateGoldPricesForMultipleKarats(
      parseFloat(weight),
      settings.goldPricePerOunce,
      validKarats
    );

    res.json({
      success: true,
      weight: parseFloat(weight),
      goldPricePerOunce: settings.goldPricePerOunce,
      calculations: goldPrices,
      formula: "total(x,w,k) = (x / 31.1034768) * (k/24) * w",
      constants: {
        troyOunceToGrams: 31.1034768,
        supportedKarats: Object.keys(GOLD_PURITY),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.delete("/item/:id", (req, res) => {
  const inventory = readEncryptedData(INVENTORY_FILE);
  const filteredInventory = inventory.filter(
    (item) => item.id !== req.params.id
  );

  if (writeEncryptedData(INVENTORY_FILE, filteredInventory)) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false, error: "Failed to delete item" });
  }
});

// Data management routes
app.get("/api/backup", (req, res) => {
  try {
    const inventory = readEncryptedData(INVENTORY_FILE);
    const sales = readEncryptedData(SALES_FILE);
    const settings = readEncryptedData(SETTINGS_FILE);

    const backup = {
      inventory,
      sales,
      settings,
      timestamp: new Date().toISOString(),
      version: "1.0",
    };

    const backupPath = encryption.saveEncryptedData(
      "backup_" + Date.now(),
      backup
    );
    res.json({ success: true, backupPath });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/api/wipe-data", (req, res) => {
  try {
    const { confirm } = req.body;
    if (confirm !== "DELETE ALL DATA") {
      return res
        .status(500)
        .json({ success: false, error: "Confirmation text does not match" });
    }

    encryption.wipeEncryptedData(INVENTORY_FILE);
    encryption.wipeEncryptedData(SALES_FILE);
    encryption.wipeEncryptedData(SETTINGS_FILE);

    // Reinitialize with default data
    initializeDataFiles();

    res.json({
      success: true,
      message: "All data has been permanently deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/api/export", (req, res) => {
  try {
    const inventory = readEncryptedData(INVENTORY_FILE);
    const sales = readEncryptedData(SALES_FILE);
    const settings = readEncryptedData(SETTINGS_FILE);

    const exportData = {
      inventory,
      sales,
      settings,
      exportDate: new Date().toISOString(),
      version: "1.0",
    };

    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="jewelry-inventory-export-${Date.now()}.json"`
    );
    res.json(exportData);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Initialize data files and start server
initializeDataFiles();

// Set up automatic daily gold price updates
// TEMPORARILY DISABLED - Uncomment these lines to re-enable automatic updates
// setInterval(autoUpdateGoldPrice, 24 * 60 * 60 * 1000); // Check every 24 hours
// setTimeout(autoUpdateGoldPrice, 5000); // Wait 5 seconds after startup

app.listen(PORT, () => {
  console.log(
    `🔐 Encrypted Jewelry Inventory Tracker running on http://localhost:${PORT}`
  );
  console.log("📁 Data is encrypted and stored locally for maximum privacy");
  console.log(
    "🔒 Real data is isolated from GitHub - only example data is shared"
  );
  console.log(
    "💰 MetalpriceAPI integration TEMPORARILY DISABLED (set enabled: true to re-enable)"
  );
  console.log("🔄 Automatic updates disabled - API calls will not be made");
  console.log("Press Ctrl+C to stop the server");
});
