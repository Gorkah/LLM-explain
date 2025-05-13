/**
 * app.js - Funcionalidades interactivas para página web educativa sobre LLMs
 * 
 * Este archivo contiene todas las funcionalidades JavaScript para mejorar
 * la experiencia de usuario en la página educativa sobre LLMs.
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todas las funcionalidades
    initToggleSections();
    initMobileMenu();
    initBackToTopButton();
    initCharts();
    initAccordions();
    initTabs();
    initDarkMode();
    initScrollAnimations();
    initTooltips();
    initQuiz();
    initFormValidation();
    initSearch();
    initModelFilters();
    initTableSorting();
    initCarousel();
    initModals();
    initDynamicContent();
    initLoadingSpinners();
    initToastNotifications();
    initVisualFeedback();
    initFontSizeChanger();
    initKeyboardShortcuts();
    initFocusManagement();
    initAPIIntegration();
    initNewsWidget();
    initTimeline();
    initTranslator();
    initPromptGenerator();
    initTextProcessor();
});

/**
 * INTERACCIONES BÁSICAS
 */

// 1. Función para mostrar/ocultar secciones
function initToggleSections() {
    const toggleButtons = document.querySelectorAll('.toggle-section-btn');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const isVisible = targetSection.classList.contains('visible') || 
                                 !targetSection.classList.contains('hidden');
                
                if (isVisible) {
                    targetSection.classList.remove('visible');
                    targetSection.classList.add('hidden');
                    button.textContent = 'Mostrar sección';
                } else {
                    targetSection.classList.remove('hidden');
                    targetSection.classList.add('visible');
                    button.textContent = 'Ocultar sección';
                }
            }
        });
    });
}

// 2. Menú desplegable responsive para móviles
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Cerrar menú al hacer click en un enlace
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// 3. Botón "Volver arriba"
function initBackToTopButton() {
    // Crear botón si no existe
    let backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.setAttribute('aria-label', 'Volver arriba');
        backToTopBtn.setAttribute('title', 'Volver arriba');
        document.body.appendChild(backToTopBtn);
    }
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Acción del botón
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * VISUALIZACIÓN DE DATOS
 */

// 1. Gráficos comparativos usando Chart.js
function initCharts() {
    // Verificar si Chart.js está disponible
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js no está disponible. Asegúrate de incluirlo antes de este script.');
        return;
    }
    
    const chartContainers = document.querySelectorAll('.chart-container');
    
    chartContainers.forEach(container => {
        const canvas = container.querySelector('canvas');
        if (!canvas) return;
        
        const chartType = container.getAttribute('data-chart-type') || 'bar';
        const chartTitle = container.getAttribute('data-chart-title') || '';
        
        // Ejemplo de datos para modelos LLM
        // En producción estos datos deberían venir de un API o archivo JSON
        const chartData = {
            labels: ['GPT-4', 'Claude 3', 'Gemini', 'Llama 3', 'Mistral'],
            datasets: [{
                label: 'Rendimiento (Puntuación)',
                data: [90, 88, 85, 82, 80],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        };
        
        new Chart(canvas, {
            type: chartType,
            data: chartData,
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: !!chartTitle,
                        text: chartTitle
                    },
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
}

// 2. Acordeón para mostrar/ocultar detalles
function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Toggle active class
            header.classList.toggle('active');
            
            // Toggle panel visibility
            const panel = header.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        });
    });
}

// 3. Tabs para organizar contenido
function initTabs() {
    const tabContainers = document.querySelectorAll('.tabs-container');
    
    tabContainers.forEach(container => {
        const tabButtons = container.querySelectorAll('.tab-button');
        const tabPanels = container.querySelectorAll('.tab-panel');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                
                // Desactivar todos los botones y paneles
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));
                
                // Activar el botón y panel seleccionados
                button.classList.add('active');
                container.querySelector(`.tab-panel[data-tab="${tabId}"]`).classList.add('active');
            });
        });
        
        // Activar el primer tab por defecto si no hay ninguno activo
        if (!container.querySelector('.tab-button.active')) {
            const firstButton = container.querySelector('.tab-button');
            if (firstButton) firstButton.click();
        }
    });
}

/**
 * INTERACTIVIDAD
 */

// 1. Modo oscuro/claro con persistencia
function initDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Comprobar preferencia guardada en localStorage
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    } else if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
    } else if (prefersDarkScheme.matches) {
        // Si no hay preferencia guardada, usar la del sistema
        document.body.classList.add('dark-theme');
    }
    
    if (darkModeToggle) {
        // Actualizar etiqueta del botón
        updateDarkModeButtonLabel();
        
        darkModeToggle.addEventListener('click', () => {
            const isDarkMode = document.body.classList.contains('dark-theme');
            
            // Cambiar tema
            document.body.classList.toggle('dark-theme');
            document.body.classList.toggle('light-theme');
            
            // Guardar preferencia
            localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
            
            // Actualizar etiqueta del botón
            updateDarkModeButtonLabel();
        });
    }
    
    function updateDarkModeButtonLabel() {
        if (darkModeToggle) {
            const isDarkMode = document.body.classList.contains('dark-theme');
            darkModeToggle.textContent = isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
            darkModeToggle.setAttribute('aria-label', isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
        }
    }
}

// 2. Animaciones al hacer scroll
function initScrollAnimations() {
    // Usar Intersection Observer para detectar elementos que entran en viewport
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Opcional: dejar de observar después de animar
                    if (entry.target.hasAttribute('data-animate-once')) {
                        observer.unobserve(entry.target);
                    }
                } else if (!entry.target.hasAttribute('data-animate-once')) {
                    // Si no es una animación de una sola vez, quitamos la clase al salir del viewport
                    entry.target.classList.remove('animated');
                }
            });
        }, {
            threshold: 0.2 // 20% del elemento debe ser visible
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// 3. Tooltips informativos
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        
        // Crear elemento tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        
        // Eventos para mostrar/ocultar tooltip
        element.addEventListener('mouseenter', () => {
            document.body.appendChild(tooltip);
            
            const rect = element.getBoundingClientRect();
            tooltip.style.top = rect.bottom + window.scrollY + 10 + 'px';
            tooltip.style.left = rect.left + window.scrollX + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            
            tooltip.classList.add('visible');
        });
        
        element.addEventListener('mouseleave', () => {
            tooltip.classList.remove('visible');
            document.body.removeChild(tooltip);
        });
    });
}
// Función para mostrar/ocultar la tabla de modelos LLM
function toggleTaula() {
    const taula = document.getElementById('taula-models');
    if (taula) {
        if (taula.style.display === 'none') {
            taula.style.display = 'table';
        } else {
            taula.style.display = 'none';
        }
    }
}

// Archivo principal que carga todos los módulos
document.addEventListener('DOMContentLoaded', () => {
    // Inicialización específica para la tabla de modelos
    const taula = document.getElementById('taula-models');
    if (taula) {
        // Establecer un estado inicial visible
        taula.style.display = 'table';
    }
    
    // Inicializar todas las funcionalidades
    initDarkModeToggle();
    initBackToTopButton();
    initScrollAnimations();
    initTooltips();
    initAccordions();
    createNavigationMenu();
    enhanceTrivia();
});

// Función para crear botón de modo oscuro
function initDarkModeToggle() {
    // Crear botón si no existe
    let darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    if (!darkModeToggle) {
        darkModeToggle = document.createElement('button');
        darkModeToggle.className = 'dark-mode-toggle';
        darkModeToggle.innerHTML = '🌓';
        darkModeToggle.setAttribute('aria-label', 'Cambiar modo claro/oscuro');
        darkModeToggle.setAttribute('title', 'Cambiar modo claro/oscuro');
        document.body.appendChild(darkModeToggle);
    }
    
    // Comprobar preferencia guardada en localStorage
    const currentTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    } else if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
    } else if (prefersDarkScheme.matches) {
        // Si no hay preferencia guardada, usar la del sistema
        document.body.classList.add('dark-theme');
    }
    
    // Acción del botón
    darkModeToggle.addEventListener('click', () => {
        const isDarkMode = document.body.classList.contains('dark-theme');
        
        // Cambiar tema
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');
        
        // Guardar preferencia
        localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
        
        // Mostrar notificación
        showToast(`Modo ${isDarkMode ? 'claro' : 'oscuro'} activado`, 'success');
    });
}

// Función para cargar todos los módulos
function loadModules() {
    // Interacciones básicas
    BasicInteractions.init();
    // Visualización de datos
    DataVisualization.init();
    // Interactividad
    Interactivity.init();
    // Formularios interactivos
    Forms.init();
    // Gestión de contenido
    ContentManagement.init();
    // Elementos multimedia
    Multimedia.init();
    // Mejoras UX
    UXEnhancements.init();
    // Accesibilidad
    Accessibility.init();
    // Integración API
    APIIntegration.init();
    // Funcionalidades avanzadas
    AdvancedFeatures.init();
}
const BasicInteractions = {
    init: function() {
        this.initToggleSections();
        this.initMobileMenu();
        this.initBackToTopButton();
    },
    
    initToggleSections: function() {
        // Código para mostrar/ocultar secciones
    },
    
    initMobileMenu: function() {
        // Código para menú desplegable responsive
    },
    
    initBackToTopButton: function() {
        // Código para botón volver arriba
    }
};
