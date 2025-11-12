# Flujo de Solicitud de Demo - Contafy

## 📋 Flujo Completo del Usuario

### 1. Usuario Visita la Landing Page

- Ve información sobre Contafy
- Lee características y beneficios
- Decide solicitar una demo

### 2. Usuario Completa el Formulario de Demo

El usuario llena el formulario "Solicita tu Acceso de Prueba" con:

- **Nombre** (requerido)
- **Email** (requerido)
- **Empresa** (requerido)
- **Mensaje** (opcional)

### 3. Envío de la Solicitud

Cuando el usuario hace clic en "Solicitar Acceso de Prueba":

1. **Validación Frontend**: Se validan todos los campos
2. **Envío al Backend**: Se envía una petición `POST` a:
   ```
   POST http://127.0.0.1:8000/api/landing/request-demo
   ```
3. **Datos Enviados**:
   ```json
   {
     "name": "Juan Pérez",
     "email": "juan@empresa.com",
     "company": "Mi Empresa S.A.S.",
     "message": "Me gustaría conocer más sobre el sistema"
   }
   ```

### 4. Backend Procesa la Solicitud

El backend debe:

- Guardar la solicitud en la base de datos
- Enviar notificación al administrador (email, WhatsApp, etc.)
- Retornar respuesta de éxito

### 5. Respuesta al Usuario

- **Éxito**: Muestra mensaje "¡Solicitud de demo enviada! Revisaremos tu solicitud y te contactaremos pronto para coordinar el acceso de prueba."
- **Error**: Muestra mensaje de error específico

### 6. Administrador Revisa la Solicitud

El administrador recibe la notificación y puede:

- Ver los datos del usuario
- Revisar la empresa
- Decidir si aprobar o rechazar

### 7. Administrador Crea Acceso de Prueba

Si aprueba:

- Crea cuenta de usuario en el sistema
- Genera credenciales de acceso
- Envía email al usuario con:
  - URL del sistema: `https://soft-contabilidad-9rwk.vercel.app`
  - Credenciales de acceso (usuario/contraseña)
  - Instrucciones de uso

### 8. Usuario Recibe Acceso

- Recibe email con credenciales
- Accede al sistema usando el enlace del footer o el email
- Puede comenzar a usar la demo

## 🔧 Configuración del Backend

### Endpoint Requerido

```
POST /api/landing/request-demo
```

### Headers Esperados

```
Content-Type: application/json
Accept: application/json
```

### Formato de Respuesta - Éxito (200 OK)

```json
{
  "message": "Solicitud de demo recibida. Te contactaremos pronto.",
  "data": {
    "id": 123,
    "status": "pending"
  }
}
```

### Formato de Respuesta - Error (400, 500, etc.)

```json
{
  "message": "El email ya tiene una solicitud pendiente",
  "error": "DUPLICATE_REQUEST"
}
```

## 📧 Notificaciones al Administrador

El backend debe notificar al administrador cuando se recibe una solicitud. Opciones:

1. **Email**: Enviar email al administrador con los datos
2. **WhatsApp**: Enviar mensaje por WhatsApp (ya implementado en frontend como respaldo)
3. **Dashboard**: Mostrar en panel de administración
4. **Base de datos**: Guardar para revisión posterior

## 🔄 Flujo Alternativo (Sin Backend Inmediato)

Si el backend aún no está listo, el sistema:

1. Guarda los datos en localStorage (temporal)
2. Puede abrir WhatsApp con mensaje formateado para el administrador
3. El administrador puede revisar manualmente y crear el acceso

## ✅ Checklist para el Administrador

Cuando recibe una solicitud de demo:

- [ ] Revisar datos del usuario
- [ ] Verificar empresa
- [ ] Validar email
- [ ] Crear cuenta en el sistema
- [ ] Generar credenciales
- [ ] Enviar email con acceso
- [ ] Seguimiento después de 24-48 horas

## 📝 Notas Importantes

- El formulario de **Registro** está separado y crea cuenta directamente
- El formulario de **Demo** es para solicitar acceso de prueba
- El botón "Acceder al Sistema" solo está en el footer (para usuarios con cuenta)
- Los usuarios nuevos deben solicitar demo primero
