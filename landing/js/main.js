// Configuración
const WHATSAPP_NUMBER = '573013709791';
const WHATSAPP_BASE_URL = 'https://wa.me/';

// Mensajes predefinidos para WhatsApp
const WHATSAPP_MESSAGES = {
    contacto: 'Hola, me gustaría obtener más información sobre Contafy.',
    soporte: 'Hola, necesito soporte técnico para Contafy.'
};

// Configuración del Backend
// Detecta automáticamente el entorno (desarrollo o producción)
const isDevelopment = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1' ||
                      window.location.hostname === '';

// URL del backend según el entorno
const API_BASE_URL = isDevelopment 
    ? 'http://127.0.0.1:8000'  // Desarrollo local
    : 'https://api.contafy.com'; // Producción (cambiar cuando tengas la URL)

// URL del sistema principal de Contafy
const SYSTEM_URL = 'https://soft-contabilidad-9rwk.vercel.app';

const API_ENDPOINTS = {
    register: `${API_BASE_URL}/api/auth/register`,
    requestDemo: `${API_BASE_URL}/api/landing/request-demo`, // Para implementar después
    contact: `${API_BASE_URL}/api/landing/contact`
};

// Utilidades
const utils = {
    // Validación de email
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Validación de teléfono (formato colombiano)
    validatePhone(phone) {
        const re = /^[0-9]{10}$/;
        return re.test(phone.replace(/\s+/g, ''));
    },
    
    // Formatear teléfono
    formatPhone(phone) {
        return phone.replace(/\D/g, '');
    },
    
    // Mostrar mensaje de error
    showError(input, message) {
        const errorElement = document.getElementById(`${input.id}Error`);
        if (errorElement) {
            errorElement.textContent = message;
            input.classList.add('error');
        }
    },
    
    // Limpiar error
    clearError(input) {
        const errorElement = document.getElementById(`${input.id}Error`);
        if (errorElement) {
            errorElement.textContent = '';
            input.classList.remove('error');
        }
    },
    
    // Validar campo
    validateField(input) {
        const value = input.value.trim();
        let isValid = true;
        
        // Limpiar error previo
        this.clearError(input);
        
        // Validación requerida
        if (input.hasAttribute('required') && !value) {
            this.showError(input, 'Este campo es obligatorio');
            isValid = false;
        }
        
        // Validación de email
        if (input.type === 'email' && value && !this.validateEmail(value)) {
            this.showError(input, 'Ingresa un email válido');
            isValid = false;
        }
        
        // Validación de teléfono
        if (input.type === 'tel' && value && !this.validatePhone(value)) {
            this.showError(input, 'Ingresa un teléfono válido (10 dígitos)');
            isValid = false;
        }
        
        return isValid;
    }
};

// Funciones de WhatsApp
const whatsapp = {
    // Abrir WhatsApp con mensaje predefinido
    openWhatsApp(type = 'contacto') {
        const message = encodeURIComponent(WHATSAPP_MESSAGES[type] || WHATSAPP_MESSAGES.contacto);
        const url = `${WHATSAPP_BASE_URL}${WHATSAPP_NUMBER}?text=${message}`;
        window.open(url, '_blank');
    },
    
    // Abrir WhatsApp con mensaje personalizado
    openWithMessage(message) {
        const encodedMessage = encodeURIComponent(message);
        const url = `${WHATSAPP_BASE_URL}${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        window.open(url, '_blank');
    }
};

// Navegación
const navigation = {
    init() {
        // Smooth scroll a secciones
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#header') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Cerrar menú móvil si está abierto
                    menu.toggle(false);
                    
                    // Actualizar estado activo
                    navigation.updateActiveState(href);
                }
            });
        });
        
        // Actualizar estado activo al hacer scroll
        window.addEventListener('scroll', () => {
            navigation.updateActiveOnScroll();
        });
        
        // Estado inicial
        navigation.updateActiveOnScroll();
    },
    
    // Actualizar estado activo en navegación
    updateActiveState(href) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === href) {
                link.classList.add('active');
            }
        });
    },
    
    // Actualizar estado activo según scroll
    updateActiveOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const headerHeight = document.querySelector('.header').offsetHeight;
        const scrollPosition = window.scrollY + headerHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
};

// Menú hamburguesa
const menu = {
    init() {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                this.toggle();
            });
            
            // Cerrar menú al hacer clic fuera
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                    this.toggle(false);
                }
            });
        }
    },
    
    toggle(force) {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (menuToggle && navMenu) {
            const isActive = navMenu.classList.contains('active');
            const shouldBeActive = force !== undefined ? force : !isActive;
            
            navMenu.classList.toggle('active', shouldBeActive);
            menuToggle.setAttribute('aria-expanded', shouldBeActive);
            document.body.style.overflow = shouldBeActive ? 'hidden' : '';
        }
    }
};

// Animaciones de scroll
const scrollAnimations = {
    init() {
        // Observador para animaciones fade in
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observar elementos con animación
        document.querySelectorAll('.feature-card, .description-item, .benefit-card').forEach(el => {
            observer.observe(el);
        });
        
        // Lazy loading de imágenes
        this.initLazyLoading();
    },
    
    initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback para navegadores sin IntersectionObserver
            images.forEach(img => img.classList.add('loaded'));
        }
    }
};

// Manejo de formularios
const forms = {
    init() {
        // Formulario de registro
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister(registerForm);
            });
            
            // Validación en tiempo real
            registerForm.querySelectorAll('input').forEach(input => {
                input.addEventListener('blur', () => {
                    utils.validateField(input);
                });
            });
        }
        
        // Formulario de demo
        const demoForm = document.getElementById('demoForm');
        if (demoForm) {
            demoForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleDemo(demoForm);
            });
            
            // Validación en tiempo real
            demoForm.querySelectorAll('input, textarea').forEach(input => {
                input.addEventListener('blur', () => {
                    utils.validateField(input);
                });
            });
        }
    },
    
    // Validar formulario completo
    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!utils.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    },
    
    // Mostrar mensaje de formulario
    showMessage(form, type, message) {
        const messageElement = form.querySelector('.form-message');
        if (messageElement) {
            messageElement.className = `form-message ${type}`;
            messageElement.textContent = message;
            messageElement.style.display = 'block';
            
            // Scroll al mensaje
            messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Ocultar después de 5 segundos si es éxito
            if (type === 'success') {
                setTimeout(() => {
                    messageElement.style.display = 'none';
                }, 5000);
            }
        }
    },
    
    // Manejar registro
    async handleRegister(form) {
        if (!this.validateForm(form)) {
            this.showMessage(form, 'error', 'Por favor, completa todos los campos correctamente.');
            return;
        }
        
        const submitButton = form.querySelector('button[type="submit"]');
        const formData = {
            name: document.getElementById('registerName').value.trim(),
            email: document.getElementById('registerEmail').value.trim(),
            company: document.getElementById('registerCompany').value.trim(),
            phone: utils.formatPhone(document.getElementById('registerPhone').value)
        };
        
        // Mostrar loading
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        try {
            // Enviar registro al backend
            const response = await fetch(API_ENDPOINTS.register, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                // Manejar errores del servidor
                const errorMessage = result.message || result.error || 'Error al procesar el registro';
                throw new Error(errorMessage);
            }
            
            // Registro exitoso
            const successMessage = result.message || '¡Registro exitoso! Redirigiendo al sistema...';
            this.showMessage(form, 'success', successMessage);
            form.reset();
            
            // Redirigir al sistema después de 2 segundos (opcional)
            setTimeout(() => {
                window.open(SYSTEM_URL, '_blank');
            }, 2000);
            
        } catch (error) {
            console.error('Error al registrar:', error);
            
            // Mensajes de error más específicos
            let errorMessage = 'Hubo un error al procesar tu registro. Por favor, intenta nuevamente.';
            
            if (error.message) {
                errorMessage = error.message;
            } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
                errorMessage = 'Error de conexión. Por favor, verifica tu conexión a internet e intenta nuevamente.';
            }
            
            this.showMessage(form, 'error', errorMessage);
        } finally {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }
    },
    
    // Manejar solicitud de demo
    async handleDemo(form) {
        if (!this.validateForm(form)) {
            this.showMessage(form, 'error', 'Por favor, completa todos los campos correctamente.');
            return;
        }
        
        const submitButton = form.querySelector('button[type="submit"]');
        const formData = {
            name: document.getElementById('demoName').value.trim(),
            email: document.getElementById('demoEmail').value.trim(),
            company: document.getElementById('demoCompany').value.trim(),
            message: document.getElementById('demoMessage').value.trim()
        };
        
        // Mostrar loading
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        try {
            // Enviar solicitud de demo al backend
            const response = await fetch(API_ENDPOINTS.requestDemo, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                // Manejar errores del servidor
                const errorMessage = result.message || result.error || 'Error al procesar la solicitud';
                throw new Error(errorMessage);
            }
            
            // Solicitud exitosa
            const successMessage = result.message || '¡Solicitud de demo enviada! Revisaremos tu solicitud y te contactaremos pronto para coordinar el acceso de prueba.';
            this.showMessage(form, 'success', successMessage);
            form.reset();
            
        } catch (error) {
            console.error('Error al solicitar demo:', error);
            
            // Mensajes de error más específicos
            let errorMessage = 'Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente.';
            
            if (error.message) {
                errorMessage = error.message;
            } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
                errorMessage = 'Error de conexión. Por favor, verifica tu conexión a internet e intenta nuevamente.';
            }
            
            this.showMessage(form, 'error', errorMessage);
        } finally {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }
    }
};

// Botones de acción
const buttons = {
    init() {
        // Botón Solicitar Demo (navbar)
        const btnSolicitarDemo = document.getElementById('btnSolicitarDemo');
        if (btnSolicitarDemo) {
            btnSolicitarDemo.addEventListener('click', () => {
                const contactoSection = document.getElementById('contacto');
                if (contactoSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = contactoSection.offsetTop - headerHeight;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                    menu.toggle(false);
                }
            });
        }
        
        // Botón Contactar WhatsApp (navbar)
        const btnContactoWhatsApp = document.getElementById('btnContactoWhatsApp');
        if (btnContactoWhatsApp) {
            btnContactoWhatsApp.addEventListener('click', () => {
                whatsapp.openWhatsApp('contacto');
            });
        }
        
        
        // Botones de WhatsApp en footer
        const btnFooterContacto = document.getElementById('btnFooterContacto');
        if (btnFooterContacto) {
            btnFooterContacto.addEventListener('click', () => {
                whatsapp.openWhatsApp('contacto');
            });
        }
        
        const btnFooterSoporte = document.getElementById('btnFooterSoporte');
        if (btnFooterSoporte) {
            btnFooterSoporte.addEventListener('click', () => {
                whatsapp.openWhatsApp('soporte');
            });
        }
    }
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    navigation.init();
    menu.init();
    scrollAnimations.init();
    forms.init();
    buttons.init();
    
    console.log('Contafy Landing Page - Cargada correctamente');
});

// Manejo de errores globales
window.addEventListener('error', (e) => {
    console.error('Error en la aplicación:', e.error);
});

