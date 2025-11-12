# Configuración de Backend - Contafy Landing

## 🔧 Configuración del Endpoint de Registro

El formulario de registro está conectado con el backend. Para configurarlo:

### 1. Cambiar la URL del Backend

Edita el archivo `landing/js/main.js` en la línea 13:

```javascript
const API_BASE_URL = "https://api.contafy.com"; // Cambia por tu URL
```

**Ejemplos:**

- Producción: `'https://api.contafy.com'`
- Desarrollo local: `'http://localhost:3000'`
- Staging: `'https://staging-api.contafy.com'`

### 2. Endpoint Esperado

El formulario de registro envía una petición `POST` a:

```
POST {API_BASE_URL}/api/auth/register
```

### 3. Formato de Datos Enviados

El formulario envía un objeto JSON con la siguiente estructura:

```json
{
  "name": "Juan Pérez",
  "email": "juan@empresa.com",
  "company": "Mi Empresa S.A.S.",
  "phone": "3013709791"
}
```

**Campos:**

- `name` (string, requerido): Nombre completo del usuario
- `email` (string, requerido): Email válido
- `company` (string, requerido): Nombre de la empresa
- `phone` (string, requerido): Teléfono sin espacios ni caracteres especiales (10 dígitos)

### 4. Respuesta Esperada del Backend

#### ✅ Respuesta Exitosa (200 OK)

```json
{
  "message": "Usuario registrado exitosamente",
  "data": {
    "id": 123,
    "name": "Juan Pérez",
    "email": "juan@empresa.com"
  }
}
```

El mensaje en `result.message` se mostrará al usuario. Si no hay mensaje, se mostrará uno por defecto.

#### ❌ Respuesta de Error (400, 401, 500, etc.)

```json
{
  "message": "El email ya está registrado",
  "error": "EMAIL_EXISTS"
}
```

O:

```json
{
  "error": "Error al procesar el registro"
}
```

El mensaje de error se mostrará al usuario.

### 5. Headers Enviados

El formulario envía los siguientes headers:

```javascript
{
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}
```

### 6. Manejo de Errores

El código maneja los siguientes casos:

- **Error de conexión**: Si no se puede conectar al servidor
- **Error del servidor**: Si el servidor responde con un código de error (400, 500, etc.)
- **Error de validación**: Si el servidor rechaza los datos

### 7. CORS (Cross-Origin Resource Sharing)

Si tu backend está en un dominio diferente al de la landing page, asegúrate de configurar CORS en tu backend:

**Ejemplo para Express.js:**

```javascript
app.use(
  cors({
    origin: "https://contafy.com", // URL de tu landing page
    credentials: true,
  })
);
```

**Headers necesarios:**

```
Access-Control-Allow-Origin: https://contafy.com
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Accept
```

### 8. Pruebas

Para probar la conexión:

1. Abre la consola del navegador (F12)
2. Completa el formulario de registro
3. Revisa la pestaña "Network" para ver la petición
4. Verifica la respuesta del servidor

### 9. Estado Actual

- ✅ **Registro**: Conectado y funcional
- ⏳ **Demo**: Pendiente de implementar (código preparado)

### 10. Próximos Pasos

Cuando el endpoint de demo esté listo, se implementará de la misma manera que el registro.

---

## 📝 Notas

- El código está listo para producción
- Los errores se muestran de forma amigable al usuario
- Se mantiene el estado de loading durante la petición
- El formulario se resetea después de un registro exitoso
