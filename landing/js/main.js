const WHATSAPP_NUMBER = '573013709791';
const WHATSAPP_BASE_URL = 'https://wa.me/';

const WHATSAPP_MESSAGES = {
    contacto: 'Hola, me gustaría obtener más información sobre Contafy.',
    soporte: 'Hola, necesito soporte técnico para Contafy.'
};

const isDevelopment = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1' ||
                      window.location.hostname === '';

const API_BASE_URL = isDevelopment 
    ? 'http://127.0.0.1:8000'
    : 'https://api.contafy.com';

const SYSTEM_URL = 'https://soft-contabilidad-9rwk.vercel.app';

const API_ENDPOINTS = {
    register: `${API_BASE_URL}/api/auth/register`,
    requestDemo: `${API_BASE_URL}/api/landing/request-demo`,
    contact: `${API_BASE_URL}/api/landing/contact`
};

const utils = {
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    validatePhone(phone) {
        const re = /^[0-9]{10}$/;
        return re.test(phone.replace(/\s+/g, ''));
    },
    
    formatPhone(phone) {
        return phone.replace(/\D/g, '');
    },
    
    showError(input, message) {
        const errorElement = document.getElementById(`${input.id}Error`);
        if (errorElement) {
            errorElement.textContent = message;
            input.classList.add('error');
        }
    },
    
    clearError(input) {
        const errorElement = document.getElementById(`${input.id}Error`);
        if (errorElement) {
            errorElement.textContent = '';
            input.classList.remove('error');
        }
    },
    
    validateField(input) {
        const value = input.value.trim();
        let isValid = true;
        
        this.clearError(input);
        
        if (input.hasAttribute('required') && !value) {
            this.showError(input, 'Este campo es obligatorio');
            isValid = false;
        }
        
        if (input.type === 'email' && value && !this.validateEmail(value)) {
            this.showError(input, 'Ingresa un email válido');
            isValid = false;
        }
        
        if (input.type === 'tel' && value && !this.validatePhone(value)) {
            this.showError(input, 'Ingresa un teléfono válido (10 dígitos)');
            isValid = false;
        }
        
        return isValid;
    }
};

const whatsapp = {
    openWhatsApp(type = 'contacto') {
        const message = encodeURIComponent(WHATSAPP_MESSAGES[type] || WHATSAPP_MESSAGES.contacto);
        const url = `${WHATSAPP_BASE_URL}${WHATSAPP_NUMBER}?text=${message}`;
        window.open(url, '_blank');
    },
    
    openWithMessage(message) {
        const encodedMessage = encodeURIComponent(message);
        const url = `${WHATSAPP_BASE_URL}${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        window.open(url, '_blank');
    }
};

const navigation = {
    init() {
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
                    
                    menu.toggle(false);
                    navigation.updateActiveState(href);
                }
            });
        });
        
        window.addEventListener('scroll', () => {
            navigation.updateActiveOnScroll();
        });
        
        navigation.updateActiveOnScroll();
    },
    
    updateActiveState(href) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === href) {
                link.classList.add('active');
            }
        });
    },
    
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

const menu = {
    init() {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                this.toggle();
            });
            
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

const scrollAnimations = {
    init() {
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
        
        document.querySelectorAll('.feature-card, .description-item, .benefit-card').forEach(el => {
            observer.observe(el);
        });
        
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
            images.forEach(img => img.classList.add('loaded'));
        }
    }
};

const forms = {
    init() {
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister(registerForm);
            });
            
            registerForm.querySelectorAll('input').forEach(input => {
                input.addEventListener('blur', () => {
                    utils.validateField(input);
                });
            });
        }
        
        const demoForm = document.getElementById('demoForm');
        if (demoForm) {
            demoForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleDemo(demoForm);
            });
            
            demoForm.querySelectorAll('input, textarea').forEach(input => {
                input.addEventListener('blur', () => {
                    utils.validateField(input);
                });
            });
        }
    },
    
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
    
    showMessage(form, type, message) {
        const messageElement = form.querySelector('.form-message') || document.getElementById('demoFormMessage');
        if (messageElement) {
            messageElement.className = `form-message ${type}`;
            messageElement.textContent = message;
            messageElement.style.display = 'block';
            
            messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            if (type === 'success') {
                setTimeout(() => {
                    messageElement.style.display = 'none';
                }, 5000);
            }
        }
    },
    
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
        
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        try {
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
                const errorMessage = result.message || result.error || 'Error al procesar el registro';
                throw new Error(errorMessage);
            }
            
            const successMessage = result.message || '¡Registro exitoso! Redirigiendo al sistema...';
            this.showMessage(form, 'success', successMessage);
            form.reset();
            
            setTimeout(() => {
                window.open(SYSTEM_URL, '_blank');
            }, 2000);
            
        } catch (error) {
            console.error('Error al registrar:', error);
            
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
    
    async handleDemo(form) {
        if (!this.validateForm(form)) {
            this.showMessage(form, 'error', 'Por favor, completa todos los campos correctamente.');
            return;
        }
        
        const submitButton = form.querySelector('button[type="submit"]');
        const phoneInput = document.getElementById('demoPhone');
        const phone = phoneInput ? utils.formatPhone(phoneInput.value) : '';
        
        const formData = {
            name: document.getElementById('demoName').value.trim(),
            email: document.getElementById('demoEmail').value.trim(),
            company: document.getElementById('demoCompany').value.trim(),
            phone: phone,
            message: document.getElementById('demoMessage') ? document.getElementById('demoMessage').value.trim() : ''
        };
        
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        try {
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
                const errorMessage = result.message || result.error || 'Error al procesar la solicitud';
                throw new Error(errorMessage);
            }
            
            const successMessage = result.message || '¡Solicitud de demo enviada! Revisaremos tu solicitud y te contactaremos pronto para coordinar el acceso de prueba.';
            this.showMessage(form, 'success', successMessage);
            form.reset();
            
        } catch (error) {
            console.error('Error al solicitar demo:', error);
            
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

const buttons = {
    init() {
        const btnSolicitarDemo = document.getElementById('btnSolicitarDemo');
        if (btnSolicitarDemo) {
            btnSolicitarDemo.addEventListener('click', () => {
                this.scrollToSection('demo');
            });
        }
        
        const btnContactoWhatsApp = document.getElementById('btnContactoWhatsApp');
        if (btnContactoWhatsApp) {
            btnContactoWhatsApp.addEventListener('click', () => {
                whatsapp.openWhatsApp('contacto');
            });
        }
        
        const btnHeroDemo = document.getElementById('btnHeroDemo');
        if (btnHeroDemo) {
            btnHeroDemo.addEventListener('click', () => {
                this.scrollToSection('demo');
            });
        }
        
        const btnHeroVerDemo = document.getElementById('btnHeroVerDemo');
        if (btnHeroVerDemo) {
            btnHeroVerDemo.addEventListener('click', () => {
                alert('Próximamente: Video demo de Contafy');
            });
        }
        
        const btnDolorCTA = document.getElementById('btnDolorCTA');
        if (btnDolorCTA) {
            btnDolorCTA.addEventListener('click', () => {
                this.scrollToSection('demo');
            });
        }
        
        const btnTransformacionCTA = document.getElementById('btnTransformacionCTA');
        if (btnTransformacionCTA) {
            btnTransformacionCTA.addEventListener('click', () => {
                this.scrollToSection('demo');
            });
        }
        
        const btnCTAFinal = document.getElementById('btnCTAFinal');
        if (btnCTAFinal) {
            btnCTAFinal.addEventListener('click', () => {
                this.scrollToSection('demo');
            });
        }
        
        const btnFAQWhatsApp = document.getElementById('btnFAQWhatsApp');
        if (btnFAQWhatsApp) {
            btnFAQWhatsApp.addEventListener('click', () => {
                whatsapp.openWhatsApp('contacto');
            });
        }
        
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
    },
    
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = section.offsetTop - headerHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            menu.toggle(false);
        }
    }
};

const faq = {
    init() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            question.style.cursor = 'pointer';
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                if (answer && answer.classList.contains('faq-answer')) {
                    const isVisible = answer.style.display !== 'none';
                    answer.style.display = isVisible ? 'none' : 'block';
                    question.style.color = isVisible ? '' : 'var(--color-primary)';
                }
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    navigation.init();
    menu.init();
    scrollAnimations.init();
    forms.init();
    buttons.init();
    faq.init();
    
    console.log('Contafy Landing Page - Cargada correctamente');
});

window.addEventListener('error', (e) => {
    console.error('Error en la aplicación:', e.error);
});
