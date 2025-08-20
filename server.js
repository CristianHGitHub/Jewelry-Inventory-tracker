const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const DataEncryption = require("./utils/encryption");

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

// Initialize data files if they don't exist
function initializeDataFiles() {
  const defaultInventory = [];
  const defaultSales = [];
  const defaultSettings = {
    goldPrice: 50, // Default gold price per gram
    currency: "USD",
    businessName: "Your Jewelry Business",
    businessAddress: "",
    businessPhone: "",
    businessEmail: "",
    taxRate: 0,
    defaultPurity: 58.3,
    backupFrequency: "daily",
    privacyLevel: "encrypted",
    lastUpdated: new Date().toISOString(),
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
    return data || [];
  } catch (error) {
    console.error(`Error reading encrypted file ${fileName}:`, error);
    return [];
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

  // Calculate totals
  const totalInventoryValue = inventory.reduce(
    (sum, item) => sum + item.weight * settings.goldPrice,
    0
  );
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
  });
});

app.get("/add-item", (req, res) => {
  res.render("add-item");
});

app.post("/add-item", (req, res) => {
  const { name, type, weight, purity, cost, description } = req.body;
  const inventory = readEncryptedData(INVENTORY_FILE);

  const newItem = {
    id: Date.now().toString(),
    name,
    type,
    weight: parseFloat(weight),
    purity: parseFloat(purity),
    cost: parseFloat(cost),
    description,
    dateAdded: new Date().toISOString(),
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
    res.render("sell-item", { item });
  } else {
    res.redirect("/");
  }
});

app.post("/sell-item/:id", (req, res) => {
  const { price, buyer, notes } = req.body;
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
      buyer,
      notes,
      dateSold: new Date().toISOString(),
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
  res.render("settings", { settings });
});

app.post("/settings", (req, res) => {
  const {
    goldPrice,
    currency,
    businessName,
    businessAddress,
    businessPhone,
    businessEmail,
    taxRate,
    defaultPurity,
    backupFrequency,
  } = req.body;
  const currentSettings = readEncryptedData(SETTINGS_FILE);

  const settings = {
    ...currentSettings,
    goldPrice: parseFloat(goldPrice),
    currency,
    businessName: businessName || currentSettings.businessName,
    businessAddress: businessAddress || currentSettings.businessAddress,
    businessPhone: businessPhone || currentSettings.businessPhone,
    businessEmail: businessEmail || currentSettings.businessEmail,
    taxRate: parseFloat(taxRate) || 0,
    defaultPurity: parseFloat(defaultPurity) || 58.3,
    backupFrequency: backupFrequency || "daily",
    privacyLevel: "encrypted",
    lastUpdated: new Date().toISOString(),
  };

  if (writeEncryptedData(SETTINGS_FILE, settings)) {
    res.redirect("/");
  } else {
    res.status(500).send("Error saving settings. Please try again.");
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
    if (confirm !== "I UNDERSTAND THIS WILL DELETE ALL DATA PERMANENTLY") {
      return res
        .status(400)
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

app.listen(PORT, () => {
  console.log(
    `🔐 Encrypted Jewelry Inventory Tracker running on http://localhost:${PORT}`
  );
  console.log("📁 Data is encrypted and stored locally for maximum privacy");
  console.log(
    "🔒 Real data is isolated from GitHub - only example data is shared"
  );
  console.log("Press Ctrl+C to stop the server");
});
