# API Setup Guide

## Getting Your API Key

To use live gold prices, you need to get an API key from [MetalpriceAPI](https://metalpriceapi.com/dashboard).

1. Visit [https://metalpriceapi.com/dashboard](https://metalpriceapi.com/dashboard)
2. Sign up for a free account
3. Get your API key from the dashboard

## Configuration

### 1. Update API Key

Edit `server.js` and replace `YOUR_API_KEY_HERE` with your actual API key:

```javascript
const GOLD_API_SOURCES = [
  {
    name: "MetalpriceAPI",
    url: "https://api.metalpriceapi.com/v1/latest?api_key=YOUR_ACTUAL_API_KEY&base=XAU&currencies=USD",
    headers: {
      "Content-Type": "application/json",
    },
  },
  // ... other sources
];
```

### 2. Enable API

Change the API configuration in `server.js`:

```javascript
const API_CONFIG = {
  enabled: true, // Set to true to enable API calls
  maxDailyCalls: 2, // Maximum API calls per day
  testMode: false, // Set to false to use live API
};
```

### 3. Test Mode

For testing without API calls, keep these settings:

```javascript
const API_CONFIG = {
  enabled: false, // Disabled for testing
  maxDailyCalls: 2, // Limit when enabled
  testMode: true, // Use fallback prices
};
```

## API Limits

- **Free Plan**: 100 requests per month
- **Daily Limit**: 2 requests per day (configurable)
- **Fallback**: Automatic fallback to reliable prices if API fails

## Testing

Test your API configuration:

```bash
# Check API status
curl "http://localhost:3000/api/gold-price"

# Toggle API on/off
curl -X POST "http://localhost:3000/api/toggle-api"
```

## Troubleshooting

- **Invalid API Key**: Check your key at MetalpriceAPI dashboard
- **Rate Limited**: Wait for daily limit reset or upgrade plan
- **API Down**: System automatically uses fallback prices
