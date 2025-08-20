// Language system for Jewelry Inventory Tracker
const LanguageManager = {
  currentLanguage: "en",

  // Language data
  translations: {
    en: {
      // Header
      "header-title": "💎 Gold Jewelry Inventory",
      "header-subtitle": "Simple tracking for your jewelry business",

      // Summary Cards
      "inventory-value": "📦 Inventory Value",
      "total-sales": "💰 Total Sales",
      "total-profit": "📈 Total Profit",

      // Action Buttons
      "add-new-item": "➕ Add New Item",
      settings: "⚙️ Settings",

      // Tables
      "current-inventory": "📋 Current Inventory",
      "recent-sales": "💵 Recent Sales",
      name: "Name",
      type: "Type",
      weight: "Weight (g)",
      purity: "Purity",
      cost: "Cost",
      "est-value": "Est. Value",
      "date-added": "Date Added",
      actions: "Actions",
      "sale-price": "Sale Price",
      profit: "Profit",
      buyer: "Buyer",
      "date-sold": "Date Sold",

      // Buttons
      sell: "💰 Sell",
      delete: "🗑️ Delete",

      // Empty State
      "no-items": "📦 No Items in Inventory",
      "start-adding":
        "Start by adding your first jewelry item to track your inventory!",
      "add-first-item": "➕ Add Your First Item",

      // Add Item Page
      "add-new-jewelry": "➕ Add New Jewelry Item",
      "add-item-subtitle": "Add a new item to your inventory",
      "back-dashboard": "🏠 Back to Dashboard",
      "item-name": "Item Name *",
      "item-name-placeholder": "e.g., Gold Ring, Necklace, Bracelet",
      "jewelry-type": "Jewelry Type *",
      "select-jewelry-type": "Select jewelry type...",
      ring: "Ring",
      necklace: "Necklace",
      bracelet: "Bracelet",
      earrings: "Earrings",
      pendant: "Pendant",
      chain: "Chain",
      watch: "Watch",
      other: "Other",
      "weight-grams": "Weight (grams) *",
      "weight-placeholder": "0.00",
      "gold-purity": "Gold Purity (%) *",
      "select-purity": "Select purity...",
      "purchase-cost": "Purchase/Cost Price ($) *",
      "cost-placeholder": "0.00",
      description: "Description (optional)",
      "description-placeholder": "Additional details about the item...",
      "save-item": "💾 Save Item",
      cancel: "❌ Cancel",

      // Sell Item Page
      "sell-item": "💰 Sell Item",
      "sell-item-subtitle": "Record the sale of your jewelry item",
      "item-details": "📋 Item Details",
      "original-cost": "Original Cost",
      "sale-price-label": "Sale Price ($) *",
      "sale-price-placeholder": "0.00",
      "buyer-name": "Buyer Name (optional)",
      "buyer-placeholder": "Customer name or business",
      "sale-notes": "Sale Notes (optional)",
      "notes-placeholder": "Any additional notes about the sale...",
      "complete-sale": "💰 Complete Sale",

      // Settings Page
      "settings-title": "⚙️ Settings",
      "settings-subtitle": "Configure your jewelry inventory tracking",
      "current-gold-price": "Current Gold Price (per gram) *",
      "gold-price-tip":
        "💡 This is used to estimate the value of your inventory items",
      currency: "Currency *",
      "tips-title": "💡 Tips for Using the System",
      "gold-price-tip-text":
        "Update this regularly to get accurate inventory valuations.",
      "adding-items-tip":
        "Always weigh your jewelry accurately for precise tracking.",
      "purity-tip": "Use a testing kit to determine actual gold purity.",
      "sales-tip":
        "Record all sales immediately to maintain accurate profit tracking.",
      "backup-tip":
        "Your data is stored locally in the 'data' folder - back it up regularly!",
      "save-settings": "💾 Save Settings",

      // Messages
      "delete-confirm":
        "Are you sure you want to delete this item? This action cannot be undone.",
      "error-deleting": "Error deleting item. Please try again.",
      "sale-confirm":
        'Are you sure you want to sell "{itemName}" for ${price}? This will result in a {profitText}.',
      profit: "profit of ${amount}",
      loss: "loss of ${amount}",
      "settings-confirm":
        "Are you sure you want to update these settings? This will affect inventory valuations.",
      "invalid-gold-price": "Please enter a valid gold price greater than 0.",

      // Language Toggle
      "language-toggle": "SPA/ENG",
    },

    es: {
      // Header
      "header-title": "💎 Inventario de Joyería de Oro",
      "header-subtitle": "Seguimiento simple para tu negocio de joyería",

      // Summary Cards
      "inventory-value": "📦 Valor del Inventario",
      "total-sales": "💰 Ventas Totales",
      "total-profit": "📈 Ganancia Total",

      // Action Buttons
      "add-new-item": "➕ Agregar Nuevo Artículo",
      settings: "⚙️ Configuración",

      // Tables
      "current-inventory": "📋 Inventario Actual",
      "recent-sales": "💵 Ventas Recientes",
      name: "Nombre",
      type: "Tipo",
      weight: "Peso (g)",
      purity: "Pureza",
      cost: "Costo",
      "est-value": "Valor Est.",
      "date-added": "Fecha Agregado",
      actions: "Acciones",
      "sale-price": "Precio de Venta",
      profit: "Ganancia",
      buyer: "Comprador",
      "date-sold": "Fecha Vendido",

      // Buttons
      sell: "💰 Vender",
      delete: "🗑️ Eliminar",

      // Empty State
      "no-items": "📦 No Hay Artículos en el Inventario",
      "start-adding":
        "¡Comienza agregando tu primer artículo de joyería para rastrear tu inventario!",
      "add-first-item": "➕ Agregar Tu Primer Artículo",

      // Add Item Page
      "add-new-jewelry": "➕ Agregar Nuevo Artículo de Joyería",
      "add-item-subtitle": "Agregar un nuevo artículo a tu inventario",
      "back-dashboard": "🏠 Volver al Panel",
      "item-name": "Nombre del Artículo *",
      "item-name-placeholder": "ej., Anillo de Oro, Collar, Pulsera",
      "jewelry-type": "Tipo de Joyería *",
      "select-jewelry-type": "Seleccionar tipo de joyería...",
      ring: "Anillo",
      necklace: "Collar",
      bracelet: "Pulsera",
      earrings: "Aretes",
      pendant: "Dije",
      chain: "Cadena",
      watch: "Reloj",
      other: "Otro",
      "weight-grams": "Peso (gramos) *",
      "weight-placeholder": "0.00",
      "gold-purity": "Pureza del Oro (%) *",
      "select-purity": "Seleccionar pureza...",
      "purchase-cost": "Precio de Compra/Costo ($) *",
      "cost-placeholder": "0.00",
      description: "Descripción (opcional)",
      "description-placeholder": "Detalles adicionales sobre el artículo...",
      "save-item": "💾 Guardar Artículo",
      cancel: "❌ Cancelar",

      // Sell Item Page
      "sell-item": "💰 Vender Artículo",
      "sell-item-subtitle": "Registrar la venta de tu artículo de joyería",
      "item-details": "📋 Detalles del Artículo",
      "original-cost": "Costo Original",
      "sale-price-label": "Precio de Venta ($) *",
      "sale-price-placeholder": "0.00",
      "buyer-name": "Nombre del Comprador (opcional)",
      "buyer-placeholder": "Nombre del cliente o empresa",
      "sale-notes": "Notas de Venta (opcional)",
      "notes-placeholder": "Cualquier nota adicional sobre la venta...",
      "complete-sale": "💰 Completar Venta",

      // Settings Page
      "settings-title": "⚙️ Configuración",
      "settings-subtitle": "Configurar tu seguimiento de inventario de joyería",
      "current-gold-price": "Precio Actual del Oro (por gramo) *",
      "gold-price-tip":
        "💡 Esto se usa para estimar el valor de los artículos de tu inventario",
      currency: "Moneda *",
      "tips-title": "💡 Consejos para Usar el Sistema",
      "gold-price-tip-text":
        "Actualiza esto regularmente para obtener valoraciones precisas del inventario.",
      "adding-items-tip":
        "Siempre pesa tu joyería con precisión para un seguimiento exacto.",
      "purity-tip":
        "Usa un kit de prueba para determinar la pureza real del oro.",
      "sales-tip":
        "Registra todas las ventas inmediatamente para mantener un seguimiento preciso de las ganancias.",
      "backup-tip":
        "¡Tus datos se almacenan localmente en la carpeta 'data' - haz una copia de seguridad regularmente!",
      "save-settings": "💾 Guardar Configuración",

      // Messages
      "delete-confirm":
        "¿Estás seguro de que quieres eliminar este artículo? Esta acción no se puede deshacer.",
      "error-deleting":
        "Error al eliminar el artículo. Por favor, inténtalo de nuevo.",
      "sale-confirm":
        '¿Estás seguro de que quieres vender "{itemName}" por ${price}? Esto resultará en una {profitText}.',
      profit: "ganancia de ${amount}",
      loss: "pérdida de ${amount}",
      "settings-confirm":
        "¿Estás seguro de que quieres actualizar esta configuración? Esto afectará las valoraciones del inventario.",
      "invalid-gold-price":
        "Por favor, ingresa un precio válido del oro mayor que 0.",

      // Language Toggle
      "language-toggle": "ENG/SPA",
    },
  },

  // Initialize language system
  init() {
    this.loadLanguageFromCookie();
    this.updatePageLanguage();
    this.createLanguageToggle();
  },

  // Load language preference from cookie
  loadLanguageFromCookie() {
    const savedLanguage = this.getCookie("preferred-language");
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es")) {
      this.currentLanguage = savedLanguage;
    }
  },

  // Save language preference to cookie
  saveLanguageToCookie(language) {
    this.setCookie("preferred-language", language, 365); // Save for 1 year
  },

  // Switch language
  switchLanguage() {
    this.currentLanguage = this.currentLanguage === "en" ? "es" : "en";
    this.saveLanguageToCookie(this.currentLanguage);
    this.updatePageLanguage();
    this.updateLanguageToggle();
  },

  // Update all text on the page
  updatePageLanguage() {
    // Update elements with data-translate attribute
    const elements = document.querySelectorAll("[data-translate]");
    elements.forEach((element) => {
      const key = element.getAttribute("data-translate");
      if (this.translations[this.currentLanguage][key]) {
        element.textContent = this.translations[this.currentLanguage][key];
      }
    });

    // Update placeholders
    const inputs = document.querySelectorAll(
      "input[data-translate-placeholder]"
    );
    inputs.forEach((input) => {
      const key = input.getAttribute("data-translate-placeholder");
      if (this.translations[this.currentLanguage][key]) {
        input.placeholder = this.translations[this.currentLanguage][key];
      }
    });

    // Update select options
    this.updateSelectOptions();

    // Update HTML lang attribute
    document.documentElement.lang = this.currentLanguage;
  },

  // Update select options for jewelry types
  updateSelectOptions() {
    const typeSelect = document.getElementById("type");
    if (typeSelect) {
      const options = typeSelect.querySelectorAll("option");
      options.forEach((option) => {
        const key = option.getAttribute("data-translate");
        if (key && this.translations[this.currentLanguage][key]) {
          option.textContent = this.translations[this.currentLanguage][key];
        }
      });
    }
  },

  // Create language toggle button
  createLanguageToggle() {
    // Check if toggle already exists
    if (document.getElementById("language-toggle")) {
      return;
    }

    const header = document.querySelector(".header");
    if (!header) return;

    const toggle = document.createElement("button");
    toggle.id = "language-toggle";
    toggle.className = "btn language-toggle";
    toggle.textContent =
      this.translations[this.currentLanguage]["language-toggle"];
    toggle.onclick = () => this.switchLanguage();

    // Insert after header title
    const title = header.querySelector("h1");
    if (title) {
      title.parentNode.insertBefore(toggle, title.nextSibling);
    }
  },

  // Update language toggle button text
  updateLanguageToggle() {
    const toggle = document.getElementById("language-toggle");
    if (toggle) {
      toggle.textContent =
        this.translations[this.currentLanguage]["language-toggle"];
    }
  },

  // Cookie utility functions
  setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  },

  getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
};

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  LanguageManager.init();
});
