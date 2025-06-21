# API Key Validation API

This API allows you to validate API keys for the Research API service.

## Endpoint

```
POST /api/validate-key
GET /api/validate-key?key={apiKey}
```

## Authentication

No authentication required for key validation.

## POST Request

### Request Body

```json
{
  "apiKey": "your-api-key-here"
}
```

### Example

```bash
curl -X POST http://localhost:3000/api/validate-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "your-api-key-here"}'
```

## GET Request

### Query Parameters

- `key` (required): The API key to validate

### Example

```bash
curl "http://localhost:3000/api/validate-key?key=your-api-key-here"
```

## Response Format

### Success Response (Valid Key)

```json
{
  "isValid": true,
  "key": {
    "id": 1,
    "name": "My API Key",
    "created_at": "2024-01-01T00:00:00.000Z"
  },
  "message": "API key is valid"
}
```

### Error Response (Invalid Key)

```json
{
  "isValid": false,
  "message": "Invalid API key"
}
```

### Error Response (Missing Key)

```json
{
  "error": "API key is required"
}
```

### Error Response (Server Error)

```json
{
  "error": "Internal server error"
}
```

## Status Codes

- `200`: Request successful (both valid and invalid keys return 200)
- `400`: Bad request (missing API key)
- `500`: Internal server error

## Usage Examples

### JavaScript/Node.js

```javascript
// Using fetch
const validateKey = async (apiKey) => {
  const response = await fetch('/api/validate-key', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ apiKey }),
  });
  
  const result = await response.json();
  return result;
};

// Using GET request
const validateKeyGet = async (apiKey) => {
  const response = await fetch(`/api/validate-key?key=${encodeURIComponent(apiKey)}`);
  const result = await response.json();
  return result;
};
```

### Python

```python
import requests

def validate_key(api_key):
    response = requests.post(
        'http://localhost:3000/api/validate-key',
        json={'apiKey': api_key}
    )
    return response.json()
```

### cURL

```bash
# POST request
curl -X POST http://localhost:3000/api/validate-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "test-key-123"}'

# GET request
curl "http://localhost:3000/api/validate-key?key=test-key-123"
``` 