/**
 * app.js - Funcionalidades interactivas para página web educativa sobre LLMs
 * 
 * Este archivo contiene todas las funcionalidades JavaScript para mejorar
 * la experiencia de usuario en la página educativa sobre LLMs.
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todas las funcionalidades
    initMobileMenu();
    initBackToTopButton();
    initAccordions();
    initTabs();
    initDarkModeToggle();
    initScrollAnimations();
    initTooltips();
    initTableSearch();
    initTableSorting();
    initSmoothScroll();
    initGraphBackground(); // Inicializar el fondo animado de grafos
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
    console.log('Inicializando tabs...');
    const tabContainers = document.querySelectorAll('.tabs-container');
    console.log('Encontrados', tabContainers.length, 'contenedores de tabs');
    
    tabContainers.forEach(container => {
        const tabButtons = container.querySelectorAll('.tab-button');
        const tabPanels = container.querySelectorAll('.tab-panel');
        
        console.log('Tabs en este contenedor:', tabButtons.length);
        console.log('Paneles en este contenedor:', tabPanels.length);
        
        // Primero ocultar todos los paneles
        tabPanels.forEach(panel => {
            panel.style.display = 'none';
            panel.classList.remove('active');
        });
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                console.log('Click en tab:', tabId);
                
                // Desactivar todos los botones y paneles
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => {
                    panel.classList.remove('active');
                    panel.style.display = 'none';
                });
                
                // Activar el botón y panel seleccionados
                button.classList.add('active');
                const selectedPanel = container.querySelector(`.tab-panel[data-tab="${tabId}"]`);
                if (selectedPanel) {
                    selectedPanel.classList.add('active');
                    selectedPanel.style.display = 'block';
                    console.log('Panel activado:', tabId);
                } else {
                    console.error('No se encontró el panel:', tabId);
                }
            });
        });
        
        // Activar el primer tab por defecto si no hay ninguno activo
        if (!container.querySelector('.tab-button.active')) {
            const firstButton = container.querySelector('.tab-button');
            if (firstButton) {
                console.log('Activando primer tab por defecto');
                firstButton.click();
            }
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
    initTabs(); // Inicializar las pestañas
    createNavigationMenu();
    enhanceTrivia();
    initCharts(); // Inicializar gráficos
    initTableSearch(); // Filtrado de búsqueda
    initTableSorting(); // Ordenación de tabla
    initSmoothScroll(); // Desplazamiento suave
    
    // Mostrar notificación de bienvenida
    setTimeout(() => {
        showToast('Benvingut a la guia interactiva sobre LLMs!', 'success');
    }, 1000);
});

// Función para crear botón de modo oscuro
function initDarkModeToggle() {
    // Verificar si ya existe el botón para no duplicarlo
    let darkModeBtn = document.querySelector('.dark-mode-toggle');
    
    if (!darkModeBtn) {
        // Crear botón si no existe
        darkModeBtn = document.createElement('button');
        darkModeBtn.className = 'dark-mode-toggle';
        darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        darkModeBtn.setAttribute('aria-label', 'Cambiar a modo oscuro');
        darkModeBtn.setAttribute('title', 'Cambiar a modo oscuro');
        
        // Agregar a un contenedor o al body
        const headerControls = document.querySelector('.header-controls');
        if (headerControls) {
            headerControls.appendChild(darkModeBtn);
        } else {
            document.body.appendChild(darkModeBtn);
        }
    }
    
    // Verificar preferencia guardada
    const darkModePreference = localStorage.getItem('darkMode') === 'true';
    
    // Aplicar modo oscuro si estaba activado
    if (darkModePreference) {
        document.body.classList.add('dark-theme');
        document.documentElement.setAttribute('data-theme', 'dark');
        darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        darkModeBtn.setAttribute('aria-label', 'Cambiar a modo claro');
        darkModeBtn.setAttribute('title', 'Cambiar a modo claro');
    }
    
    // Función que cambia el modo
    function toggleDarkMode() {
        const isDarkMode = document.body.classList.toggle('dark-theme');
        
        // Actualizar también el atributo data-theme para CSS
        if (isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
            darkModeBtn.setAttribute('aria-label', 'Cambiar a modo claro');
            darkModeBtn.setAttribute('title', 'Cambiar a modo claro');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
            darkModeBtn.setAttribute('aria-label', 'Cambiar a modo oscuro');
            darkModeBtn.setAttribute('title', 'Cambiar a modo oscuro');
        }
        
        // Guardar preferencia
        localStorage.setItem('darkMode', isDarkMode);
        
        // Emitir evento para que otros componentes puedan reaccionar al cambio de tema
        const event = new CustomEvent('themeChanged', { detail: { darkMode: isDarkMode } });
        document.dispatchEvent(event);
    }
    
    // Asociar evento al botón
    darkModeBtn.addEventListener('click', toggleDarkMode);
}

// Función para crear botón Volver Arriba
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
        
        // Mostrar notificación
        showToast('Has vuelto al inicio', 'info');
    });
}

// Animaciones al hacer scroll
function initScrollAnimations() {
    // Añadir clase animate-on-scroll a todas las secciones
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (!section.classList.contains('animate-on-scroll')) {
            section.classList.add('animate-on-scroll');
            section.setAttribute('data-animate-once', 'true');
        }
    });
    
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

// Tooltips informativos
function initTooltips() {
    // Añadir tooltips a elementos relevantes
    const elementsForTooltip = [
        { selector: 'h2', text: 'Haz clic para leer más sobre esta sección' },
        { selector: '#taula-models th', text: 'Haz clic para ordenar' },
        { selector: 'a', text: 'Enlace externo' }
    ];
    
    elementsForTooltip.forEach(item => {
        const elements = document.querySelectorAll(item.selector);
        elements.forEach(element => {
            if (!element.hasAttribute('data-tooltip')) {
                element.setAttribute('data-tooltip', item.text);
            }
        });
    });
    
    // Implementar funcionalidad de tooltip
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        
        element.addEventListener('mouseenter', (e) => {
            // Crear elemento tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);
            
            // Posicionar el tooltip
            const rect = element.getBoundingClientRect();
            tooltip.style.top = rect.bottom + window.scrollY + 10 + 'px';
            tooltip.style.left = rect.left + window.scrollX + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            
            tooltip.classList.add('visible');
            
            // Guardar referencia al tooltip
            element.tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', () => {
            if (element.tooltip) {
                element.tooltip.classList.remove('visible');
                setTimeout(() => {
                    if (element.tooltip && element.tooltip.parentNode) {
                        element.tooltip.parentNode.removeChild(element.tooltip);
                    }
                    element.tooltip = null;
                }, 300);
            }
        });
    });
}

// Acordeones para mostrar/ocultar información
function initAccordions() {
    // Convertir secciones en acordeones
    const sections = document.querySelectorAll('section');
    
    // Lista de secciones que siempre deben mostrarse
    const importantSections = ['explicacio', 'comparativa', 'casos-us', 'enllacos', 'riscs', 'trivia'];
    
    sections.forEach(section => {
        // Omitir las secciones importantes
        if (importantSections.includes(section.id)) {
            // Solo añadir una clase visual para indicar que es expandible
            const h2 = section.querySelector('h2');
            if (h2) {
                h2.classList.add('section-title');
            }
            return;
        }
        
        // Para el resto de secciones, crear acordeones
        const h2 = section.querySelector('h2');
        if (h2) {
            // Convertir el h2 en un header de acordeón
            h2.classList.add('accordion-header');
            h2.addEventListener('click', () => {
                // Toggle active class
                h2.classList.toggle('active');
                
                // Determinar el contenido del acordeón (todo excepto el h2)
                const children = Array.from(section.children);
                children.forEach(child => {
                    if (child !== h2) {
                        if (h2.classList.contains('active')) {
                            child.style.display = 'block';
                        } else {
                            child.style.display = 'none';
                        }
                    }
                });
            });
            
            // Ocultar inicialmente el contenido
            const children = Array.from(section.children);
            children.forEach(child => {
                if (child !== h2) {
                    child.style.display = 'none';
                }
            });
        }
    });
    
    // Asegurarse de que el contenido de las secciones importantes esté visible
    importantSections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const content = section.querySelector('.section-content');
            if (content) {
                content.style.display = 'block';
            }
        }
    });
}

// Crear menú de navegación automático
function createNavigationMenu() {
    // Buscar secciones para generar menú
    const sections = document.querySelectorAll('section');
    if (sections.length === 0) return;
    
    // Crear elemento nav si no existe
    let nav = document.querySelector('nav');
    if (!nav) {
        nav = document.createElement('nav');
        const header = document.querySelector('header');
        if (header && header.nextSibling) {
            document.body.insertBefore(nav, header.nextSibling);
        } else {
            document.body.insertBefore(nav, document.body.firstChild);
        }
    }
    
    // Crear lista de navegación
    let navList = nav.querySelector('ul');
    if (!navList) {
        navList = document.createElement('ul');
        nav.appendChild(navList);
    } else {
        // Limpiar lista existente
        navList.innerHTML = '';
    }
    
    // Agregar elementos al menú
    sections.forEach(section => {
        if (section.id) {
            const h2 = section.querySelector('h2');
            if (h2) {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = `#${section.id}`;
                link.textContent = h2.textContent;
                listItem.appendChild(link);
                navList.appendChild(listItem);
                
                // Hacer los IDs navegables
                section.id = section.id;
            }
        }
    });
    
    // Añadir toggle menú para móviles
    let menuToggle = nav.querySelector('.menu-toggle');
    if (!menuToggle) {
        menuToggle = document.createElement('div');
        menuToggle.className = 'menu-toggle';
        for (let i = 0; i < 3; i++) {
            const span = document.createElement('span');
            menuToggle.appendChild(span);
        }
        nav.insertBefore(menuToggle, navList);
        
        // Convertir la lista en menú móvil
        navList.classList.add('mobile-menu');
        
        // Añadir evento al toggle
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }
}

// Mejorar la sección de trivia
function enhanceTrivia() {
    const triviaSection = document.getElementById('trivia');
    if (!triviaSection) return;
    
    // Eliminar el botón de trivia original
    const oldButton = triviaSection.querySelector('button');
    if (oldButton) {
        oldButton.remove();
    }
    
    // Crear un quiz interactivo
    const quizContainer = document.createElement('div');
    quizContainer.className = 'quiz-container';
    
    const quizHTML = `
        <div class="quiz-question">Quiz: ¿Quién ha creado GPT-4?</div>
        <div class="quiz-options">
            <div class="quiz-option" data-correct="true">OpenAI</div>
            <div class="quiz-option">Google</div>
            <div class="quiz-option">Microsoft</div>
            <div class="quiz-option">Meta</div>
        </div>
        <div class="quiz-feedback"></div>
        <button class="quiz-next-btn" style="display:none;">Siguiente pregunta</button>
    `;
    
    quizContainer.innerHTML = quizHTML;
    triviaSection.appendChild(quizContainer);
    
    // Añadir interactividad al quiz
    const options = quizContainer.querySelectorAll('.quiz-option');
    const feedback = quizContainer.querySelector('.quiz-feedback');
    const nextBtn = quizContainer.querySelector('.quiz-next-btn');
    
    let answered = false;
    
    options.forEach(option => {
        option.addEventListener('click', () => {
            if (answered) return;
            
            answered = true;
            const isCorrect = option.getAttribute('data-correct') === 'true';
            
            // Marcar opciones
            options.forEach(opt => {
                if (opt === option) {
                    opt.classList.add('selected');
                    opt.classList.add(isCorrect ? 'correct' : 'incorrect');
                } else if (opt.getAttribute('data-correct') === 'true') {
                    opt.classList.add('correct');
                }
            });
            
            // Mostrar feedback
            feedback.textContent = isCorrect ? '¡Correcto! GPT-4 es un modelo desarrollado por OpenAI.' : 'Incorrecto. GPT-4 es un modelo desarrollado por OpenAI.';
            feedback.className = `quiz-feedback ${isCorrect ? 'success' : 'error'}`;
            
            // Mostrar notificación
            showToast(isCorrect ? '¡Respuesta correcta!' : 'Respuesta incorrecta', isCorrect ? 'success' : 'error');
            
            // Mostrar botón de siguiente (en una versión completa habría más preguntas)
            nextBtn.style.display = 'block';
        });
    });
    
    nextBtn.addEventListener('click', () => {
        showToast('En la versión completa habría más preguntas', 'info');
    });
}

// Función para mostrar notificaciones tipo toast
function showToast(message, type = 'info') {
    // Crear contenedor de toasts si no existe
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // Crear toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-message">${message}</div>
        <button class="toast-close">&times;</button>
    `;
    
    // Añadir toast al contenedor
    toastContainer.appendChild(toast);
    
    // Mostrar toast con animación
    setTimeout(() => {
        toast.classList.add('visible');
    }, 10);
    
    // Botón para cerrar
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.classList.remove('visible');
        setTimeout(() => {
            toastContainer.removeChild(toast);
        }, 300);
    });
    
    // Auto-cerrar después de 4 segundos
    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.remove('visible');
            setTimeout(() => {
                if (toast.parentNode) {
                    toastContainer.removeChild(toast);
                }
            }, 300);
        }
    }, 4000);
}

// Filtrado de búsqueda para la tabla
function initTableSearch() {
    const searchInput = document.getElementById('search-models');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const table = document.getElementById('taula-models');
        if (!table) return;
        
        const rows = table.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const match = text.includes(searchTerm);
            row.style.display = match ? '' : 'none';
        });
        
        if (searchTerm.length > 0) {
            showToast(`Filtrant per: "${searchTerm}"`, 'info');
        }
    });
}

// Ordenación de la tabla
function initTableSorting() {
    const table = document.getElementById('taula-models');
    if (!table) return;
    
    const headers = table.querySelectorAll('th[data-sort]');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const sortKey = header.getAttribute('data-sort');
            const isAscending = header.classList.contains('sort-asc');
            
            // Cambiar indicador de dirección de ordenación
            headers.forEach(h => h.classList.remove('sort-asc', 'sort-desc'));
            header.classList.add(isAscending ? 'sort-desc' : 'sort-asc');
            
            // Ordenar filas
            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));
            
            rows.sort((rowA, rowB) => {
                const cellA = rowA.cells[Array.from(headers).indexOf(header)].textContent.trim();
                const cellB = rowB.cells[Array.from(headers).indexOf(header)].textContent.trim();
                
                return isAscending ? 
                    cellA.localeCompare(cellB, 'ca', { sensitivity: 'base' }) : 
                    cellB.localeCompare(cellA, 'ca', { sensitivity: 'base' });
            });
            
            // Reordenar el DOM
            rows.forEach(row => tbody.appendChild(row));
            
            showToast(`Taula ordenada per ${header.textContent.trim()}`, 'info');
        });
    });
}

// Scroll suave para los enlaces de navegación
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Ajustar para considerar la navegación fixed
                behavior: 'smooth'
            });
        });
    });
}

// Animación de fondo con grafos para representar redes neuronales
function initGraphBackground() {
    const canvas = document.getElementById('graph-background');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Ajustar canvas al tamaño de la ventana
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Llamar al resize inicialmente y al cambiar tamaño de ventana
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Configuración de la animación
    const nodes = [];
    const maxNodes = 80; // Cantidad de nodos
    const nodeRadius = 2;
    const nodeConnectionRadius = 150; // Radio para conectar nodos
    const nodeSpeed = 0.3;
    
    // Colores adaptados al tema claro/oscuro
    function getColors() {
        const isDark = document.body.classList.contains('dark-theme');
        return {
            node: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(67, 97, 238, 0.5)',
            line: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(67, 97, 238, 0.2)',
            highlight: isDark ? 'rgba(124, 180, 255, 0.8)' : 'rgba(239, 71, 111, 0.8)'
        };
    }
    
    // Crear nodos
    for (let i = 0; i < maxNodes; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speedX: (Math.random() - 0.5) * nodeSpeed,
            speedY: (Math.random() - 0.5) * nodeSpeed,
            lastUpdate: 0
        });
    }
    
    // Función de animación
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const colors = getColors();
        
        // Actualizar posición de nodos
        nodes.forEach(node => {
            node.x += node.speedX;
            node.y += node.speedY;
            
            // Rebotar en los bordes
            if (node.x < 0 || node.x > canvas.width) node.speedX *= -1;
            if (node.y < 0 || node.y > canvas.height) node.speedY *= -1;
            
            // Dibujar nodo
            ctx.beginPath();
            ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
            ctx.fillStyle = colors.node;
            ctx.fill();
        });
        
        // Dibujar conexiones entre nodos cercanos
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < nodeConnectionRadius) {
                    // Opacidad basada en la distancia
                    const opacity = 1 - (distance / nodeConnectionRadius);
                    
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(67, 97, 238, ${opacity * 0.25})`;
                    ctx.lineWidth = opacity * 1.5;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Iniciar animación
    animate();
    
    // Cambiar colores cuando cambia el modo oscuro/claro
    document.addEventListener('themeChanged', () => {
        // Los colores se actualizarán en el siguiente frame
    });
}
