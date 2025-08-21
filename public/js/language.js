// Language system for Jewelry Inventory Tracker
const LanguageManager = {
  currentLanguage: "en",

  // Language data
  translations: {
    en: {
      // Page Titles
      "page-title-add": "Add Item - Jewelry Inventory Tracker",
      "page-title-settings": "Settings - Jewelry Inventory Tracker",
      "page-title-inventory": "Gold Jewelry Inventory Tracker",
      "page-title-sell": "Sell Jewelry Item",

      // Header
      "header-title": "Gold Jewelry Inventory",
      "header-subtitle": "Simple tracking for your jewelry business",

      // Navigation
      "nav-dashboard": "🏠 Dashboard",

      // Summary Cards
      "inventory-value": "Inventory",
      "total-sales": "Sales",
      "total-profit": "Profit",
      "summary-items": "items",
      "summary-market-value": "market value",
      "summary-revenue": "revenue",
      "summary-earned": "earned",

      // Action Buttons
      "add-new-item": "Add Item",
      "add-first-item": "Add Your First Item",
      settings: "Settings",

      // Tables
      "current-inventory": "Current Inventory",
      "recent-sales": "Recent Sales",
      "sales-title": "Recent Sales",
      "no-sales": "No sales recorded yet.",
      "no-inventory": "No items in inventory yet.",
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

      // Item specific
      "inventory-number": "Inventory Number",
      "item-type": "Type",
      "item-weight": "Weight (g)",
      "item-purity": "Purity",
      "item-karat": "Karat",
      "item-cost": "Cost",
      "item-market-value": "Market Value",
      "item-dealer-value": "Dealer Value",
      "item-actions": "Actions",
      "item-description": "Description",

      // Sale specific
      "sale-item": "Item",
      "sale-weight": "Weight (g)",
      "sale-purity": "Purity",
      "sale-karat": "Karat",
      "sale-cost": "Cost",
      "sale-price": "Sale Price",
      "sale-profit": "Profit",
      "sale-buyer": "Buyer",
      "sale-date": "Date",

      // Buttons
      sell: "Sell",
      delete: "Delete",

      // Empty State
      "no-items": "No Items in Inventory",
      "start-adding":
        "Start by adding your first jewelry item to track your inventory!",

      // Add Item Page
      "add-new-jewelry": "Add New Jewelry Item",
      "add-item-subtitle": "Add a new item to your inventory",
      "add-item": "Add Item",
      "back-dashboard": "Dashboard",
      "inventory-number": "Inventory Number",
      "inventory-number-placeholder": "001, 002, ...",
      "jewelry-type": "Item Type",
      "select-jewelry-type": "Select type",
      ring: "Ring",
      necklace: "Necklace",
      bracelet: "Bracelet",
      earrings: "Earrings",
      pendant: "Pendant",
      chain: "Chain",
      watch: "Watch",
      other: "Other",
      "weight-grams": "Weight (grams)",
      "weight-placeholder": "5.2",
      "gold-purity": "Gold Purity (%)",
      "select-purity": "Select purity",
      "purchase-cost": "Purchase Cost ($)",
      "cost-placeholder": "0.00",
      description: "Description",
      "description-placeholder": "Additional details about the item...",
      "save-item": "Add Item",
      "custom-purity": "Custom Purity",
      cancel: "Cancel",

      // Sell Item Page
      "sell-item": "Sell Item",
      "sell-item-subtitle": "Record the sale of your jewelry item",
      "item-details": "Item Details",
      name: "Inventory Number",
      "original-cost": "Original Cost",
      "sale-price-label": "Sale Price ($)",
      "sale-price-placeholder": "0.00",
      "buyer-name": "Buyer Name",
      "buyer-placeholder": "Customer name or business",
      "sale-notes": "Sale Notes",
      "notes-placeholder": "Any additional notes about the sale...",
      "complete-sale": "Complete Sale",

      // Settings Page
      "settings-title": "Settings",
      "settings-subtitle": "Configure your jewelry inventory tracking",
      "current-gold-price": "Gold Price (per troy ounce)",
      "auto-update": "Auto-update gold price",
      "gold-price-tip":
        "This is used to estimate the value of your inventory items",
      currency: "Currency",
      "tips-title": "Tips for Using the System",
      "gold-price-tip-text":
        "Update this regularly to get accurate inventory valuations.",
      "adding-items-tip":
        "Always weigh your jewelry accurately for precise tracking.",
      "purity-tip": "Use a testing kit to determine actual gold purity.",
      "sales-tip":
        "Record all sales immediately to maintain accurate profit tracking.",
      "backup-tip":
        "Your data is stored locally in the 'data' folder - back it up regularly!",
      "save-settings": "Save Settings",

      // Settings Content
      "live-gold-price": "Live Gold Price",
      current: "Current",
      "per-ounce": "per ounce",
      "per-gram": "Per Gram",
      updated: "Updated",
      "gold-purity-standards": "Gold Purity Standards",
      "data-management": "Data Management",
      "create-backup": "Create Backup",
      "export-data": "Export Data",
      "wipe-all-data": "Wipe All Data",

      // Gold Market Section
      "gold-market": "Gold Market",
      "gold-price": "Gold Price",
      "24k-gold": "24K gold",

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

      // Status Messages
      "updating-price": "Updating to live gold price...",
      "price-updated": "Gold price updated to: ${price} per troy ounce",
      "price-per-gram": "Price per gram: ${price}",
      "inventory-updated":
        "Your inventory values will now reflect the current market price!",
      "creating-backup": "Creating backup...",
      "backup-success": "Backup created successfully!",
      "exporting-data": "Exporting data...",
      "export-success": "Data exported successfully!",
      "wipe-warning": "⚠️ WARNING: This Action Cannot Be Undone!",
      "wipe-description":
        "This will permanently delete ALL your inventory, sales, and settings data. This action cannot be undone and will require you to start over.",
      "wipe-confirmation": "Type exactly: DELETE ALL DATA",
      "confirm-delete": "Confirm Delete",
      "wipe-success": "All data has been wiped. Redirecting to dashboard...",
      "confirmation-mismatch":
        "Confirmation text does not match. Please type exactly: ",

      // Language Toggle
      "language-toggle": "SPA/ENG",
    },

    es: {
      // Page Titles
      "page-title-add":
        "Agregar Artículo - Rastreador de Inventario de Joyería",
      "page-title-settings":
        "Configuración - Rastreador de Inventario de Joyería",
      "page-title-inventory": "Rastreador de Inventario de Joyería de Oro",
      "page-title-sell": "Vender Artículo de Joyería",

      // Header
      "header-title": "Inventario de Joyería de Oro",
      "header-subtitle": "Seguimiento simple para tu negocio de joyería",

      // Navigation
      "nav-dashboard": "🏠 Panel Principal",

      // Summary Cards
      "inventory-value": "Inventario",
      "total-sales": "Ventas",
      "total-profit": "Ganancia",
      "summary-items": "artículos",
      "summary-market-value": "valor de mercado",
      "summary-revenue": "ingresos",
      "summary-earned": "ganado",

      // Tables
      "current-inventory": "Inventario Actual",
      "recent-sales": "Ventas Recientes",
      "sales-title": "Ventas Recientes",
      "no-sales": "No hay ventas registradas aún.",
      "no-inventory": "No hay artículos en el inventario aún.",
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

      // Item specific
      "inventory-number": "Número de Inventario",
      "item-type": "Tipo",
      "item-weight": "Peso (g)",
      "item-purity": "Pureza",
      "item-karat": "Quilate",
      "item-cost": "Costo",
      "item-market-value": "Valor de Mercado",
      "item-dealer-value": "Valor del Comerciante",
      "item-actions": "Acciones",
      "item-description": "Descripción",

      // Sale specific
      "sale-item": "Artículo",
      "sale-weight": "Peso (g)",
      "sale-purity": "Pureza",
      "sale-karat": "Quilate",
      "sale-cost": "Costo",
      "sale-price": "Precio de Venta",
      "sale-profit": "Ganancia",
      "sale-buyer": "Comprador",
      "sale-date": "Fecha",

      // Action Buttons
      "add-new-item": "Agregar Artículo",
      "add-first-item": "Agregar Tu Primer Artículo",
      settings: "Configuración",

      // Buttons
      sell: "Vender",
      delete: "Eliminar",

      // Empty State
      "no-items": "No Hay Artículos en el Inventario",
      "start-adding":
        "¡Comienza agregando tu primer artículo de joyería para rastrear tu inventario!",

      // Add Item Page
      "add-new-jewelry": "Agregar Nuevo Artículo de Joyería",
      "add-item-subtitle": "Agregar un nuevo artículo a tu inventario",
      "add-item": "Agregar Artículo",
      "back-dashboard": "Panel Principal",
      "inventory-number": "Número de Inventario",
      "inventory-number-placeholder": "INV-001, INV-002, etc.",
      "jewelry-type": "Tipo de Artículo",
      "select-jewelry-type": "Seleccionar tipo",
      ring: "Anillo",
      necklace: "Collar",
      bracelet: "Pulsera",
      earrings: "Aretes",
      pendant: "Dije",
      chain: "Cadena",
      watch: "Reloj",
      other: "Otro",
      "weight-grams": "Peso (gramos)",
      "weight-placeholder": "5.2",
      "gold-purity": "Pureza del Oro (%)",
      "select-purity": "Seleccionar pureza",
      "purchase-cost": "Precio de Compra ($)",
      "cost-placeholder": "0.00",
      description: "Descripción",
      "description-placeholder": "Detalles adicionales sobre el artículo...",
      "save-item": "Agregar Artículo",
      "custom-purity": "Pureza Personalizada",
      cancel: "Cancelar",

      // Sell Item Page
      "sell-item": "Vender Artículo",
      "sell-item-subtitle": "Registrar la venta de tu artículo de joyería",
      "item-details": "Detalles del Artículo",
      name: "Número de Inventario",
      "original-cost": "Costo Original",
      "sale-price-label": "Precio de Venta ($)",
      "sale-price-placeholder": "0.00",
      "buyer-name": "Nombre del Comprador",
      "buyer-placeholder": "Nombre del cliente o empresa",
      "sale-notes": "Notas de Venta",
      "notes-placeholder": "Cualquier nota adicional sobre la venta...",
      "complete-sale": "Completar Venta",

      // Settings Page
      "settings-title": "Configuración",
      "settings-subtitle": "Configurar tu seguimiento de inventario de joyería",
      "current-gold-price": "Precio del Oro (por onza troy)",
      "auto-update": "Actualización automática del precio del oro",
      "gold-price-tip":
        "Esto se usa para estimar el valor de los artículos de tu inventario",
      currency: "Moneda",
      "tips-title": "Consejos para Usar el Sistema",
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
      "save-settings": "Guardar Configuración",

      // Settings Content
      "live-gold-price": "Precio del Oro en Vivo",
      current: "Actual",
      "per-ounce": "por onza",
      "per-gram": "Por Gramo",
      updated: "Actualizado",
      "gold-purity-standards": "Estándares de Pureza del Oro",
      "data-management": "Gestión de Datos",
      "create-backup": "Crear Respaldo",
      "export-data": "Exportar Datos",
      "wipe-all-data": "Borrar Todos los Datos",

      // Gold Market Section
      "gold-market": "Mercado del Oro",
      "gold-price": "Precio del Oro",
      "24k-gold": "Oro 24K",

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

      // Status Messages
      "updating-price": "Actualizando al precio del oro en vivo...",
      "price-updated": "Precio del oro actualizado a: ${price} por onza troy",
      "price-per-gram": "Precio por gramo: ${price}",
      "inventory-updated":
        "¡Los valores de tu inventario ahora reflejarán el precio actual del mercado!",
      "creating-backup": "Creando respaldo...",
      "backup-success": "¡Respaldo creado exitosamente!",
      "exporting-data": "Exportando datos...",
      "export-success": "¡Datos exportados exitosamente!",
      "wipe-warning": "⚠️ ADVERTENCIA: ¡Esta Acción No Se Puede Deshacer!",
      "wipe-description":
        "Esto eliminará permanentemente TODOS tus datos de inventario, ventas y configuración. Esta acción no se puede deshacer y tendrás que empezar de nuevo.",
      "wipe-confirmation": "Escribe exactamente: BORRAR TODOS LOS DATOS",
      "confirm-delete": "Confirmar Eliminación",
      "wipe-success":
        "Todos los datos han sido borrados. Redirigiendo al panel principal...",
      "confirmation-mismatch":
        "El texto de confirmación no coincide. Por favor escribe exactamente: ",

      // Language Toggle
      "language-toggle": "ENG/SPA",
    },
  },

  // Initialize language system
  init() {
    this.loadLanguageFromCookie();
    this.updatePageLanguage();
    this.createLanguageToggle();
    this.updatePageTitle();
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
    this.updatePageTitle();
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
      "input[data-translate-placeholder], textarea[data-translate-placeholder]"
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

    // Update dynamic text that might not have data-translate
    this.updateDynamicText();
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

    const puritySelect = document.getElementById("purity");
    if (puritySelect) {
      const options = puritySelect.querySelectorAll("option");
      options.forEach((option) => {
        const key = option.getAttribute("data-translate");
        if (key && this.translations[this.currentLanguage][key]) {
          option.textContent = this.translations[this.currentLanguage][key];
        }
      });
    }
  },

  // Update dynamic text that doesn't have data-translate attributes
  updateDynamicText() {
    // Update summary labels
    const summaryLabels = document.querySelectorAll(".summary-label");
    summaryLabels.forEach((label) => {
      const text = label.textContent.toLowerCase();
      if (text.includes("items")) {
        label.textContent =
          this.translations[this.currentLanguage]["summary-items"];
      } else if (text.includes("market value")) {
        label.textContent =
          this.translations[this.currentLanguage]["summary-market-value"];
      } else if (text.includes("revenue")) {
        label.textContent =
          this.translations[this.currentLanguage]["summary-revenue"];
      } else if (text.includes("earned")) {
        label.textContent =
          this.translations[this.currentLanguage]["summary-earned"];
      }
    });

    // Update navigation links
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach((link) => {
      if (link.textContent.includes("🏠")) {
        link.textContent =
          this.translations[this.currentLanguage]["nav-dashboard"];
      }
    });

    // Update action buttons
    const actionButtons = document.querySelectorAll(".action-buttons a");
    actionButtons.forEach((button) => {
      if (button.textContent.includes("Add Item")) {
        button.textContent =
          this.translations[this.currentLanguage]["add-new-item"];
      } else if (button.textContent.includes("Settings")) {
        button.textContent =
          this.translations[this.currentLanguage]["settings"];
      }
    });
  },

  // Update page title based on current page
  updatePageTitle() {
    const path = window.location.pathname;
    let titleKey = "page-title-inventory"; // default

    if (path.includes("/add-item")) {
      titleKey = "page-title-add";
    } else if (path.includes("/settings")) {
      titleKey = "page-title-settings";
    }

    if (this.translations[this.currentLanguage][titleKey]) {
      document.title = this.translations[this.currentLanguage][titleKey];
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
