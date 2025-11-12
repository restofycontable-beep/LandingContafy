# Landing Page Contafy

Landing page para Contafy - Sistema Contable Inteligente. Desarrollada con HTML5, CSS3 y JavaScript vanilla (sin dependencias externas).

## 🚀 Características

- **HTML5 semántico** - Estructura accesible y SEO-friendly
- **CSS3 con variables CSS** - Fácil personalización y mantenimiento
- **JavaScript ES6+** - Código moderno y eficiente
- **Sin dependencias externas** - Vanilla JS puro
- **Totalmente responsive** - Mobile-first approach
- **Optimizado para rendimiento** - Lazy loading, preload de recursos críticos
- **Accesible** - ARIA labels, navegación por teclado, contraste adecuado

## 📁 Estructura del Proyecto

```
landing/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos principales
├── js/
│   └── main.js         # JavaScript funcional
├── images/
│   └── logo.png        # Logo de Contafy (agregar aquí)
├── vercel.json         # Configuración para Vercel
└── README.md           # Este archivo
```

## 🎨 Secciones de la Landing Page

1. **Header/Navbar**

   - Logo de Contafy
   - Menú de navegación (Características, Descripción, Beneficios, Contacto)
   - Botones: "Solicitar Demo" y "Contactar WhatsApp"
   - Menú hamburguesa responsive

2. **Hero Section**

   - Título principal
   - Subtítulo descriptivo
   - CTAs: "Registrarse" y "Solicitar Demo"

3. **Características Principales**

   - 10 características destacadas del sistema
   - Cards con animaciones al hacer scroll

4. **Descripción del Sistema**

   - ¿Qué es Contafy?
   - ¿Cómo funciona?
   - ¿Para quién está diseñado?
   - Beneficios principales

5. **Beneficios**

   - 5 beneficios clave
   - Cards con gradiente

6. **Formularios**

   - Registro de Usuario (Nombre, email, empresa, teléfono)
   - Solicitud de Demo (Nombre, email, empresa, mensaje)
   - Validación en frontend
   - Preparados para integración con backend

7. **Footer**
   - Información de contacto
   - Botones de WhatsApp (Contacto y Soporte)
   - Enlaces rápidos

## 🎨 Paleta de Colores

- **Primario:** `#ff193e` (rojo del proyecto)
- **Secundario:** `#e11d48`
- **Oscuro:** `#dc2626`
- **Fondo:** `#f1f5f9`
- **Texto:** `#1e293b`
- **Texto secundario:** `#64748b`

## 📱 Breakpoints Responsive

- **Mobile:** 480px
- **Tablet:** 768px
- **Desktop:** 1024px

## ⚙️ Funcionalidades JavaScript

### 1. Navegación

- Smooth scroll a secciones
- Menú hamburguesa funcional
- Active state en navegación según scroll

### 2. Formularios

- Validación de campos en tiempo real
- Validación de email y teléfono
- Manejo de envío (preparado para backend)
- Mensajes de éxito/error
- Estados de loading
- LocalStorage temporal (opcional)

### 3. Botones WhatsApp

- Función para abrir WhatsApp con número: `+573013709791`
- Mensajes predefinidos según el botón (Contacto o Soporte)
- Enlace directo: `https://wa.me/573013709791?text=`

### 4. Animaciones

- Scroll animations (fade in)
- Hover effects
- Loading states en formularios
- Lazy loading de imágenes

## 🔧 Configuración

### Logo

El logo debe colocarse en:

- `landing/images/logoContafy.png` (o el nombre que hayas usado)

**Tamaños recomendados:**

- 200x60px (header)
- 400x120px (hero)

**Referencias en HTML:**

```html
<img src="images/logoContafy.png" alt="Contafy Logo" />
```

### Endpoints del Backend (Futuro)

Los formularios están preparados para integrarse con estos endpoints:

- `POST /api/auth/register` - Registro de usuario
- `POST /api/landing/request-demo` - Solicitud de demo
- `POST /api/landing/contact` - Formulario de contacto

Para activar la integración, descomenta las líneas correspondientes en `js/main.js`.

## 🚀 Despliegue en Vercel

1. Conecta tu repositorio a Vercel
2. Configura el directorio raíz como `landing/`
3. Vercel detectará automáticamente la configuración en `vercel.json`

### Configuración Manual

Si necesitas configurar manualmente:

- **Framework Preset:** Other
- **Root Directory:** `landing`
- **Build Command:** (dejar vacío)
- **Output Directory:** (dejar vacío)

## 📊 SEO y Accesibilidad

### SEO

- Meta tags (title, description, keywords)
- Open Graph tags
- Schema.org markup
- HTML semántico

### Accesibilidad

- HTML semántico
- ARIA labels
- Navegación por teclado
- Contraste de colores adecuado
- Alt text en imágenes

## 🎯 Optimizaciones

### Performance

- CSS minificado (recomendado para producción)
- JavaScript minificado (recomendado para producción)
- Imágenes optimizadas
- Lazy loading de imágenes
- Preload de recursos críticos

### Seguridad

- Headers de seguridad configurados en `vercel.json`
- Validación de formularios en frontend
- Sanitización de datos (implementar en backend)

## 📝 Notas de Desarrollo

- El código está preparado para integración futura con backend
- Los formularios guardan datos temporalmente en LocalStorage (remover en producción)
- Las animaciones usan IntersectionObserver para mejor rendimiento
- Compatible con navegadores modernos (ES6+)

## 🔄 Próximos Pasos

1. Agregar el logo de Contafy en `images/logo.png`
2. Configurar los endpoints del backend cuando estén disponibles
3. Minificar CSS y JS para producción
4. Optimizar imágenes
5. Configurar dominio personalizado en Vercel

## 📄 Licencia

© 2024 Contafy. Todos los derechos reservados.
