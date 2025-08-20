# Language System for Jewelry Inventory Tracker

## Overview

This jewelry inventory tracker now supports both English and Spanish languages with a user-friendly language toggle button. The language preference is automatically saved in cookies and remembered across browser sessions.

## Features

### 🌐 Bilingual Support

- **English (EN)**: Default language
- **Spanish (ES)**: Full translation of all interface elements

### 🔄 Language Toggle

- **SPA/ENG button**: Located in the header, below the main title
- **One-click switching**: Instantly changes between languages
- **Visual feedback**: Button text updates to show current language

### 💾 Persistent Storage

- **Cookie-based**: Language preference saved for 1 year
- **Automatic**: Remembers choice across browser sessions
- **Instant**: No page reload required when switching

## How It Works

### 1. Language Toggle Button

The language toggle button appears automatically in the header of every page:

- **English mode**: Shows "SPA/ENG" (click to switch to Spanish)
- **Spanish mode**: Shows "ENG/SPA" (click to switch to English)

### 2. Automatic Translation

All text elements with `data-translate` attributes are automatically translated:

- Page titles and headers
- Form labels and buttons
- Table headers
- Navigation links
- Error messages and confirmations

### 3. Dynamic Content

The system handles:

- **Static text**: Labels, buttons, headers
- **Form placeholders**: Input field hints
- **Select options**: Dropdown menu items
- **JavaScript messages**: Alerts and confirmations

## Technical Implementation

### Files Modified

- `public/js/language.js` - Core language system
- `public/css/style.css` - Language toggle button styling
- `views/index.ejs` - Main dashboard
- `views/add-item.ejs` - Add item form
- `views/sell-item.ejs` - Sell item form
- `views/settings.ejs` - Settings page

### Data Attributes Used

- `data-translate="key"` - For translatable text elements
- `data-translate-placeholder="key"` - For input placeholders

### Translation Keys

All translatable text uses consistent keys:

- `header-title`, `header-subtitle`
- `inventory-value`, `total-sales`, `total-profit`
- `add-new-item`, `settings`
- `name`, `type`, `weight`, `purity`, `cost`
- And many more...

## Usage Examples

### Switching Languages

1. **Navigate to any page** in the jewelry tracker
2. **Look for the language toggle button** (SPA/ENG or ENG/SPA) in the header
3. **Click the button** to switch languages
4. **All text updates instantly** without page reload

### Language Persistence

- **First visit**: Defaults to English
- **After switching**: Language choice saved in cookies
- **Return visits**: Automatically uses your preferred language
- **Cookie expiration**: Language preference saved for 1 year

## Browser Compatibility

- **Modern browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **Cookie support**: Required for language persistence
- **JavaScript**: Must be enabled for language switching

## Customization

### Adding New Languages

To add additional languages:

1. **Extend the translations object** in `language.js`
2. **Add new language codes** (e.g., 'fr' for French)
3. **Translate all keys** to the new language
4. **Update the language toggle** to cycle through all languages

### Adding New Translatable Text

To make new text translatable:

1. **Add translation keys** to both English and Spanish in `language.js`
2. **Add `data-translate="key"`** to HTML elements
3. **For placeholders**: Use `data-translate-placeholder="key"`

## Troubleshooting

### Language Not Switching

- **Check browser console** for JavaScript errors
- **Verify cookies are enabled** in browser settings
- **Clear browser cache** and refresh page

### Text Not Translating

- **Ensure `data-translate` attributes** are properly set
- **Check translation keys** exist in both languages
- **Verify JavaScript file** is loading correctly

### Button Not Appearing

- **Check CSS file** is loading properly
- **Verify header structure** matches expected format
- **Look for JavaScript errors** in browser console

## Benefits for Business Users

### Spanish-Speaking Customers

- **Professional appearance** in Spanish-speaking markets
- **Better user experience** for Spanish-speaking staff
- **Increased accessibility** for diverse customer base

### Business Efficiency

- **No need for separate systems** for different languages
- **Consistent interface** across all users
- **Easy language switching** for bilingual staff

### Professional Image

- **Multilingual capability** shows business sophistication
- **Customer-friendly interface** in preferred language
- **Modern, accessible design** enhances brand perception
