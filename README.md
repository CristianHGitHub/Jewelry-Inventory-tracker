# 💎 Gold Jewelry Inventory Tracker

A simple, user-friendly web application for tracking gold jewelry inventory, sales, and profits. Perfect for small jewelry businesses who need an easy-to-use system.

## Features

- 📦 **Inventory Management**: Add, view, and delete jewelry items
- 💰 **Sales Tracking**: Record sales and automatically calculate profits
- 📈 **Financial Overview**: Track total inventory value, sales, and profits
- ⚙️ **Settings**: Configure gold prices and currency
- 💾 **Local Storage**: All data stored locally on your computer
- 📱 **Easy Interface**: Large buttons and clear text for easy use

## Getting Started

### Prerequisites

- Node.js installed on your computer

### Installation

1. Open Terminal (Mac) or Command Prompt (Windows)
2. Navigate to the project folder:

   ```bash
   cd ~/Desktop/project/inventory-jewelry-tracker
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the application:

   ```bash
   npm start
   ```

5. Open your web browser and go to: `http://localhost:3000`

## How to Use

### 1. First Setup

- Go to **Settings** to set your current gold price per gram
- Choose your currency (USD, EUR, GBP, CAD, AUD)

### 2. Adding Jewelry Items

- Click **"Add New Item"**
- Enter item details:
  - Name (e.g., "Gold Ring")
  - Type (Ring, Necklace, Bracelet, etc.)
  - Weight in grams
  - Gold purity (9K, 14K, 18K, etc.)
  - Purchase/cost price
  - Optional description

### 3. Selling Items

- Click **"Sell"** next to any item in your inventory
- Enter the sale price
- Add buyer information (optional)
- Add sale notes (optional)
- Confirm the sale

### 4. Tracking Your Business

- **Dashboard** shows:
  - Total inventory value
  - Total sales
  - Total profit
  - Current inventory list
  - Recent sales history

## Data Storage

Your data is stored locally in the `data` folder:

- `inventory.json` - Current inventory items
- `sales.json` - Sales history
- `settings.json` - Application settings

**Important**: Back up the `data` folder regularly to prevent data loss!

## Tips for Best Results

1. **Accurate Weighing**: Always weigh jewelry precisely for accurate tracking
2. **Test Gold Purity**: Use a testing kit to determine actual gold purity
3. **Update Gold Prices**: Check and update gold prices regularly in settings
4. **Record Sales Immediately**: Enter sales as soon as they happen
5. **Regular Backups**: Copy the `data` folder to a safe location regularly

## Troubleshooting

- **Cannot access the website**: Make sure the server is running with `npm start`
- **Data not saving**: Check that the `data` folder exists and has write permissions
- **Calculations seem wrong**: Verify gold price in settings is current and accurate

## Stopping the Application

In the terminal where the server is running, press `Ctrl + C` to stop the application.

---

💡 **This system is designed for simplicity and ease of use. All data stays on your computer - no internet connection required for operation!**
# Jewelry-Inventory-tracker
