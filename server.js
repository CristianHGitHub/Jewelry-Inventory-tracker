const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Set up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

// Data file paths
const INVENTORY_FILE = "./data/inventory.json";
const SALES_FILE = "./data/sales.json";
const SETTINGS_FILE = "./data/settings.json";

// Initialize data files if they don't exist
function initializeDataFiles() {
  const defaultInventory = [];
  const defaultSales = [];
  const defaultSettings = {
    goldPrice: 50, // Default gold price per gram
    currency: "USD",
  };

  if (!fs.existsSync("./data")) {
    fs.mkdirSync("./data");
  }

  if (!fs.existsSync(INVENTORY_FILE)) {
    fs.writeFileSync(INVENTORY_FILE, JSON.stringify(defaultInventory, null, 2));
  }

  if (!fs.existsSync(SALES_FILE)) {
    fs.writeFileSync(SALES_FILE, JSON.stringify(defaultSales, null, 2));
  }

  if (!fs.existsSync(SETTINGS_FILE)) {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(defaultSettings, null, 2));
  }
}

// Helper functions to read/write data
function readJSONFile(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    console.error("Error reading file:", filePath, error);
    return [];
  }
}

function writeJSONFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing file:", filePath, error);
  }
}

// Routes
app.get("/", (req, res) => {
  const inventory = readJSONFile(INVENTORY_FILE);
  const sales = readJSONFile(SALES_FILE);
  const settings = readJSONFile(SETTINGS_FILE);

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
  const inventory = readJSONFile(INVENTORY_FILE);

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
  writeJSONFile(INVENTORY_FILE, inventory);

  res.redirect("/");
});

app.get("/sell-item/:id", (req, res) => {
  const inventory = readJSONFile(INVENTORY_FILE);
  const item = inventory.find((i) => i.id === req.params.id);
  if (item) {
    res.render("sell-item", { item });
  } else {
    res.redirect("/");
  }
});

app.post("/sell-item/:id", (req, res) => {
  const { price, buyer, notes } = req.body;
  const inventory = readJSONFile(INVENTORY_FILE);
  const sales = readJSONFile(SALES_FILE);

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
    writeJSONFile(SALES_FILE, sales);

    // Remove item from inventory
    inventory.splice(itemIndex, 1);
    writeJSONFile(INVENTORY_FILE, inventory);
  }

  res.redirect("/");
});

app.get("/settings", (req, res) => {
  const settings = readJSONFile(SETTINGS_FILE);
  res.render("settings", { settings });
});

app.post("/settings", (req, res) => {
  const { goldPrice, currency } = req.body;
  const settings = {
    goldPrice: parseFloat(goldPrice),
    currency,
  };
  writeJSONFile(SETTINGS_FILE, settings);
  res.redirect("/");
});

app.delete("/item/:id", (req, res) => {
  const inventory = readJSONFile(INVENTORY_FILE);
  const filteredInventory = inventory.filter(
    (item) => item.id !== req.params.id
  );
  writeJSONFile(INVENTORY_FILE, filteredInventory);
  res.json({ success: true });
});

// Initialize data files and start server
initializeDataFiles();

app.listen(PORT, () => {
  console.log(`Jewelry Inventory Tracker running on http://localhost:${PORT}`);
  console.log("Press Ctrl+C to stop the server");
});
