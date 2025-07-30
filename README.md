# Proxy API para Google Apps Script

Este proyecto permite enviar solicitudes POST desde tu frontend a Google Apps Script sin problemas de CORS.

## Uso

1. Sube este proyecto a Vercel.
2. Tu endpoint será: `https://TU-APP.vercel.app/api/report`
3. Desde el frontend, realiza `fetch()` a ese endpoint, no directamente a Apps Script.

## Estructura

- `api/report.js`: Proxy que redirige la solicitud POST
