/**
 * app.js - Funcionalidades interactivas para página web educativa sobre LLMs
 * 
 * Este archivo contiene todas las funcionalidades JavaScript para mejorar
 * la experiencia de usuario en la página educativa sobre LLMs.
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, inicializando funcionalidades...');
    
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
    initAITypingEffect(); // Efecto de escritura tipo IA
    
    // Inicializar gráficos después de una pequeña espera para asegurar que Chart.js esté cargado
    setTimeout(() => {
        console.log('Inicializando gráficos...');
        initCharts();
    }, 500);
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
    
    // Inicializar efecto de navegación al scroll
    initScrollEffect();
    
    // Mostrar notificación de bienvenida (solo una vez por sesión)
    if (!sessionStorage.getItem('welcomeShown')) {
        setTimeout(() => {
            showToast('Benvingut a la guia interactiva sobre LLMs!', 'success');
            sessionStorage.setItem('welcomeShown', 'true');
        }, 1000);
    }
});

// Función para control del modo oscuro - siempre inicia en modo claro por defecto
function initDarkModeToggle() {
    console.log('Inicializando modo oscuro...');
    
    // 1. Obtener el botón del DOM
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    if (!darkModeBtn) {
        console.error('Botón de modo oscuro no encontrado en el DOM');
        return; // Salir si no se encuentra el botón
    }
    
    console.log('Botón de modo oscuro encontrado:', darkModeBtn);
    
    // 2. Comprobar si hay una preferencia explícita guardada por el usuario
    // Si no hay preferencia guardada o es la primera visita, usar modo claro
    const explicitUserPreference = localStorage.getItem('darkMode');
    
    // 3. Función para aplicar el tema oscuro
    function enableDarkMode() {
        console.log('ACTIVANDO modo oscuro');
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.classList.add('dark-theme');
        document.body.classList.add('dark-theme');
        darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        darkModeBtn.setAttribute('aria-label', 'Cambiar a modo claro');
        darkModeBtn.setAttribute('title', 'Cambiar a modo claro');
        localStorage.setItem('darkMode', 'true');
    }
    
    // 4. Función para aplicar el tema claro
    function disableDarkMode() {
        console.log('DESACTIVANDO modo oscuro');
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.classList.remove('dark-theme');
        document.body.classList.remove('dark-theme');
        darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        darkModeBtn.setAttribute('aria-label', 'Cambiar a modo oscuro');
        darkModeBtn.setAttribute('title', 'Cambiar a modo oscuro');
        localStorage.setItem('darkMode', 'false');
    }
    
    // 5. Aplicar el tema inicial - SIEMPRE iniciar en modo claro excepto si el usuario
    // ha seleccionado explícitamente el modo oscuro en una visita anterior
    if (explicitUserPreference === 'true') {
        enableDarkMode();
    } else {
        // Asegurar que se inicia en modo claro por defecto
        disableDarkMode();
    }
    
    // 6. Función para alternar el modo
    function toggleDarkMode(e) {
        e.preventDefault();
        console.log('Alternando modo oscuro...');
        
        // Comprobar estado actual
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
        
        // Forzar redibujado de los grafos y otros componentes visuales
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);
    }
    
    // 7. Eliminar eventos existentes y agregar el nuevo
    const newToggle = darkModeBtn.cloneNode(true);
    darkModeBtn.parentNode.replaceChild(newToggle, darkModeBtn);
    newToggle.addEventListener('click', toggleDarkMode);
    
    console.log('Control de modo oscuro inicializado correctamente');
}

// Función para crear botón Volver Arriba
function initBackToTopButton() {
    // Crear botón si no existe
    let backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        backToTopBtn.setAttribute('aria-label', 'Tornar a dalt');
        backToTopBtn.setAttribute('title', 'Tornar a dalt');
        document.body.appendChild(backToTopBtn);
        
        // Añadir el texto descriptivo
        const btnText = document.createElement('span');
        btnText.className = 'back-to-top-text';
        btnText.textContent = 'Tornar a dalt';
        backToTopBtn.appendChild(btnText);
    }
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
            
            // Añadir efecto de desplazamiento basado en scroll
            const scrollPercentage = Math.min(1, (window.pageYOffset - 300) / 1000);
            backToTopBtn.style.transform = `translateY(${(1 - scrollPercentage) * 10}px)`;
            backToTopBtn.style.opacity = 0.2 + (scrollPercentage * 0.8);
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Añadir efecto hover
    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.classList.add('hover');
    });
    
    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.classList.remove('hover');
    });
    
    // Acción del botón
    backToTopBtn.addEventListener('click', () => {
        // Añadir clase de animación de clic
        backToTopBtn.classList.add('clicked');
        
        // Quitar la clase después de la animación
        setTimeout(() => {
            backToTopBtn.classList.remove('clicked');
        }, 300);
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
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
    // Removemos tooltips de h2 que estaban causando problemas
    // Ahora solo aplicamos tooltips a las cabeceras de tabla
    const elementsForTooltip = [
        { selector: '#taula-models th', text: 'Haz clic para ordenar' }
    ];
    
    // Primero, limpiar cualquier tooltip antiguo que esté causando problemas
    const oldTooltips = document.querySelectorAll('[data-tooltip]');
    oldTooltips.forEach(el => {
        el.removeAttribute('data-tooltip');
    });
    
    // Ahora agregar tooltips solo a los elementos específicos
    elementsForTooltip.forEach(item => {
        const elements = document.querySelectorAll(item.selector);
        elements.forEach(element => {
            element.setAttribute('data-tooltip', item.text);
        });
    });
    
    // Implementar funcionalidad de tooltip
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        
        // Quitar listeners antiguos si existen
        element.removeEventListener('mouseenter', element._tooltipEnterHandler);
        element.removeEventListener('mouseleave', element._tooltipLeaveHandler);
        
        // Crear y guardar nuevos handlers
        element._tooltipEnterHandler = (e) => {
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
        };
        
        element._tooltipLeaveHandler = () => {
            if (element.tooltip) {
                element.tooltip.classList.remove('visible');
                setTimeout(() => {
                    if (element.tooltip && element.tooltip.parentNode) {
                        element.tooltip.parentNode.removeChild(element.tooltip);
                    }
                    element.tooltip = null;
                }, 300);
            }
        };
        
        // Añadir nuevos listeners
        element.addEventListener('mouseenter', element._tooltipEnterHandler);
        element.addEventListener('mouseleave', element._tooltipLeaveHandler);
    });
    
    // Limpiar cualquier tooltip huérfano que pueda haber quedado
    const orphanTooltips = document.querySelectorAll('.tooltip');
    orphanTooltips.forEach(tooltip => {
        if (tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
        }
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
    
    // Definir las preguntas del quiz
    const quizQuestions = [
        {
            question: 'Qui ha creat GPT-4?',
            options: ['OpenAI', 'Google', 'Microsoft', 'Meta'],
            correctIndex: 0,
            explanation: 'GPT-4 és un model desenvolupat per OpenAI, llançat el març de 2023.'
        },
        {
            question: 'Quin és el model amb més paràmetres d\'aquesta llista?',
            options: ['GPT-4o', 'Claude 3 Opus', 'Llama 3 70B', 'COHERE Command R+'],
            correctIndex: 3,
            explanation: 'COHERE Command R+ té aproximadament 140 bilions de paràmetres, el que el fa el més gran de la llista.'
        },
        {
            question: 'Quina d\'aquestes empreses ofereix models completament oberts?',
            options: ['OpenAI', 'Anthropic', 'Meta', 'Google'],
            correctIndex: 2,
            explanation: 'Meta ha llançat la seva sèrie de models LLaMA com a models completament de codi obert.'
        },
        {
            question: 'Quin any va ser llançat el primer model GPT?',
            options: ['2017', '2018', '2020', '2022'],
            correctIndex: 1,
            explanation: 'El primer model GPT (Generative Pre-trained Transformer) va ser llançat per OpenAI al juny de 2018.'
        },
        {
            question: 'Quin és el principal problema ètic dels LLMs?',
            options: ['Consumeixen molta energia', 'Poden generar desinformació', 'Són massa costosos', 'No entenen realment el context'],
            correctIndex: 1,
            explanation: 'La capacitat de generar contingut fals però versemblant és un dels principals riscos ètics dels LLMs.'
        }
    ];
    
    // Crear un quiz interactivo
    const quizContainer = document.createElement('div');
    quizContainer.className = 'quiz-container';
    triviaSection.querySelector('.section-content').appendChild(quizContainer);
    
    // Variables para seguimiento del quiz
    let currentQuestionIndex = 0;
    let score = 0;
    let answered = false;
    
    // Función para mostrar una pregunta
    function showQuestion(questionIndex) {
        const question = quizQuestions[questionIndex];
        answered = false;
        
        const quizHTML = `
            <div class="quiz-progress">Pregunta ${questionIndex + 1} de ${quizQuestions.length}</div>
            <div class="quiz-question">${question.question}</div>
            <div class="quiz-options">
                ${question.options.map((option, index) => 
                    `<div class="quiz-option" data-index="${index}">${option}</div>`
                ).join('')}
            </div>
            <div class="quiz-feedback"></div>
            <div class="quiz-controls">
                <button class="quiz-next-btn" style="display:none;">Següent pregunta</button>
                <div class="quiz-score">Puntuació: <span>${score}</span>/${quizQuestions.length}</div>
            </div>
        `;
        
        quizContainer.innerHTML = quizHTML;
        
        // Añadir interactividad a las opciones
        const options = quizContainer.querySelectorAll('.quiz-option');
        const feedback = quizContainer.querySelector('.quiz-feedback');
        const nextBtn = quizContainer.querySelector('.quiz-next-btn');
        
        options.forEach(option => {
            option.addEventListener('click', () => {
                if (answered) return;
                
                answered = true;
                const selectedIndex = parseInt(option.getAttribute('data-index'));
                const isCorrect = selectedIndex === question.correctIndex;
                
                // Actualizar puntuación
                if (isCorrect) score++;
                quizContainer.querySelector('.quiz-score span').textContent = score;
                
                // Marcar opciones
                options.forEach((opt, idx) => {
                    if (idx === selectedIndex) {
                        opt.classList.add('selected');
                        opt.classList.add(isCorrect ? 'correct' : 'incorrect');
                    } 
                    if (idx === question.correctIndex) {
                        opt.classList.add('correct');
                    }
                });
                
                // Mostrar feedback
                feedback.textContent = `${isCorrect ? 'Correcte!' : 'Incorrecte.'} ${question.explanation}`;
                feedback.className = `quiz-feedback ${isCorrect ? 'success' : 'error'}`;
                
                // Mostrar notificación
                showToast(isCorrect ? 'Resposta correcta!' : 'Resposta incorrecta', isCorrect ? 'success' : 'error');
                
                // Mostrar botón de siguiente
                nextBtn.style.display = 'block';
            });
        });
        
        // Configurar botón de siguiente
        nextBtn.addEventListener('click', () => {
            if (currentQuestionIndex < quizQuestions.length - 1) {
                currentQuestionIndex++;
                showQuestion(currentQuestionIndex);
            } else {
                // Mostrar resumen final
                showFinalScore();
            }
        });
    }
    
    // Función para mostrar puntuación final
    function showFinalScore() {
        const percentage = Math.round((score / quizQuestions.length) * 100);
        let message;
        
        if (percentage >= 80) {
            message = 'Excel·lent! Ets un expert en LLMs!';
        } else if (percentage >= 60) {
            message = 'Molt bé! Tens bons coneixements sobre LLMs.';
        } else if (percentage >= 40) {
            message = 'No està malament, però podries millorar els teus coneixements sobre LLMs.';
        } else {
            message = 'Potser hauries de revisar més informació sobre LLMs. Segueix aprenent!';
        }
        
        const finalHTML = `
            <div class="quiz-final">
                <h3>Quiz complet!</h3>
                <div class="quiz-final-score">Puntuació final: ${score}/${quizQuestions.length} (${percentage}%)</div>
                <p>${message}</p>
                <button class="quiz-restart-btn">Tornar a començar</button>
            </div>
        `;
        
        quizContainer.innerHTML = finalHTML;
        
        // Añadir evento para reiniciar
        const restartBtn = quizContainer.querySelector('.quiz-restart-btn');
        restartBtn.addEventListener('click', () => {
            currentQuestionIndex = 0;
            score = 0;
            showQuestion(currentQuestionIndex);
        });
        
        // Mostrar notificación
        showToast(`Has completat el quiz amb una puntuació de ${percentage}%`, 'success');
    }
    
    // Iniciar el quiz mostrando la primera pregunta
    showQuestion(currentQuestionIndex);
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

// Efecto de cambio en la barra de navegación al hacer scroll
function initScrollEffect() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Animación de fondo con grafos para representar redes neuronales
function initGraphBackground() {
    const canvas = document.getElementById('graph-background');
    if (!canvas) {
        console.error('Canvas no encontrado. Creando uno nuevo.');
        // Crear el canvas si no existe
        const newCanvas = document.createElement('canvas');
        newCanvas.id = 'graph-background';
        document.body.prepend(newCanvas); // Insertarlo al principio del body
        canvas = newCanvas;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('No se pudo obtener el contexto 2D del canvas');
        return;
    }
    
    console.log('Inicializando fondo de grafos');
    
    // Ajustar canvas al tamaño de la ventana
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        console.log(`Canvas redimensionado a ${canvas.width}x${canvas.height}`);
    }
    
    // Llamar al resize inicialmente y al cambiar tamaño de ventana
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Configuración de la animación
    const nodes = [];
    const maxNodes = 120; // Aumentado para mayor densidad
    const nodeRadius = 4; // Nodos más grandes para mayor visibilidad
    const nodeConnectionRadius = 200; // Radio mayor para más conexiones
    const nodeSpeed = 0.25; // Velocidad más lenta para un efecto más elegante
    
    // Colores adaptados al tema claro/oscuro con más intensidad
    function getColors() {
        const isDark = document.body.classList.contains('dark-theme') || 
                       document.documentElement.getAttribute('data-theme') === 'dark';
        return {
            node: isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(67, 97, 238, 0.65)',
            line: isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(67, 97, 238, 0.35)',
            highlight: isDark ? 'rgba(124, 180, 255, 0.9)' : 'rgba(239, 71, 111, 0.9)'
        };
    }
    
    // Crear nodos
    for (let i = 0; i < maxNodes; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speedX: (Math.random() - 0.5) * nodeSpeed,
            speedY: (Math.random() - 0.5) * nodeSpeed,
            radius: Math.random() * 2 + nodeRadius - 1, // Tamaños variados
            lastUpdate: 0
        });
    }
    
    // Función de animación
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const colors = getColors();
        
        // Dibujar conexiones entre nodos cercanos primero (para que queden debajo)
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
                    ctx.strokeStyle = `rgba(67, 97, 238, ${opacity * 0.4})`;
                    ctx.lineWidth = opacity * 1.8;
                    ctx.stroke();
                }
            }
        }
        
        // Actualizar posición de nodos y dibujarlos
        nodes.forEach(node => {
            node.x += node.speedX;
            node.y += node.speedY;
            
            // Rebotar en los bordes
            if (node.x < 0 || node.x > canvas.width) node.speedX *= -1;
            if (node.y < 0 || node.y > canvas.height) node.speedY *= -1;
            
            // Dibujar nodo
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = colors.node;
            ctx.fill();
            
            // Añadir brillo
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(67, 97, 238, 0.15)`;
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    // Iniciar animación
    animate();
    console.log('Animación de grafos iniciada');
    
    // Cambiar colores cuando cambia el modo oscuro/claro
    document.addEventListener('themeChanged', () => {
        console.log('Tema cambiado, actualizando colores de grafos');
    });
    
    // Verificar que el canvas sea visible
    setTimeout(() => {
        const computedStyle = window.getComputedStyle(canvas);
        console.log(`Visibilidad del canvas: ${computedStyle.visibility}, Opacidad: ${computedStyle.opacity}, Z-index: ${computedStyle.zIndex}`);
    }, 1000);
}

// Función para crear efecto de escritura tipo IA
function initAITypingEffect() {
    console.log('Inicializando efecto de escritura tipo IA...');
    
    // Selectores de texto para aplicar el efecto
    const textElements = document.querySelectorAll('.section-content > p, .intro, .tagline, .feature-item p, .accordion-panel p, .tab-panel p');
    
    // Configuración del efecto
    const config = {
        initialDelay: 100,        // Retraso inicial antes de empezar a escribir
        typeSpeed: [5, 12],     // Rango de velocidad de escritura [min, max] en ms
        deleteSpeed: [25, 40],   // Rango de velocidad de borrado [min, max] en ms
        pauseBeforeDelete: 1500, // Pausa antes de borrar texto en ms
        pauseBeforeStart: 500,   // Pausa antes de empezar a escribir el texto en ms
        typeErrors: true,        // Si se deben simular errores de tipeo
        errorRate: 0.04,         // Tasa de errores (0.03 = 3%)
        cursorBlinkSpeed: 600,   // Velocidad de parpadeo del cursor en ms
        aiThinking: [1, 2]       // Rango de tiempo [min, max] que la IA "piensa" antes de escribir en ms
    };
    
    // Función para obtener un número aleatorio entre min y max
    const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    
    // Función para simular la escritura de un texto
    function typeElement(element) {
        if (!element || element.dataset.aiTyped === 'true') return;
        
        // Marcar como procesado
        element.dataset.aiTyped = 'true';
        
        // Texto original
        const originalText = element.textContent;
        // Vaciar el elemento
        element.textContent = '';
        
        // Crear elemento para el cursor
        const cursorEl = document.createElement('span');
        cursorEl.className = 'ai-cursor';
        cursorEl.textContent = '|';
        element.appendChild(cursorEl);
        
        // Establecer intervalo para parpadeo del cursor
        const cursorInterval = setInterval(() => {
            cursorEl.style.opacity = cursorEl.style.opacity === '0' ? '1' : '0';
        }, config.cursorBlinkSpeed);
        
        // Tiempo que la IA "piensa" antes de escribir
        const thinkingTime = randomInRange(config.aiThinking[0], config.aiThinking[1]) * 100;
        
        // Esperar antes de empezar a escribir
        setTimeout(() => {
            // Mostrar efecto de pensar (3 puntos apareciendo)
            showThinkingEffect(element, cursorEl, () => {
                // Al terminar de "pensar", escribir
                typeText(element, originalText, 0, cursorEl, cursorInterval);
            });
        }, config.initialDelay + thinkingTime);
    }
    
    // Función para mostrar efecto de IA pensando
    function showThinkingEffect(element, cursorEl, callback) {
        const thinkingEl = document.createElement('span');
        thinkingEl.className = 'ai-thinking';
        element.insertBefore(thinkingEl, cursorEl);
        
        let dots = 0;
        const dotInterval = setInterval(() => {
            dots = (dots + 1) % 4;
            thinkingEl.textContent = '.'.repeat(dots);
            
            if (dots === 0) {
                clearInterval(dotInterval);
                element.removeChild(thinkingEl);
                callback();
            }
        }, 300);
    }
    
    // Función para escribir el texto letra por letra
    function typeText(element, text, index, cursorEl, cursorInterval) {
        if (index < text.length) {
            // Calcular velocidad para esta letra
            const typeSpeed = randomInRange(config.typeSpeed[0], config.typeSpeed[1]);
            
            // Escribir la siguiente letra
            setTimeout(() => {
                // Simular errores de tipeo
                if (config.typeErrors && Math.random() < config.errorRate && /[a-zA-Z0-9]/.test(text[index])) {
                    // Obtener un carácter cercano en el teclado
                    const nearbyChars = getNearbyKeys(text[index]);
                    const wrongChar = nearbyChars[Math.floor(Math.random() * nearbyChars.length)];
                    
                    // Insertar el carácter erróneo, mostrarlo y luego corregirlo
                    const textNode = document.createTextNode(wrongChar);
                    element.insertBefore(textNode, cursorEl);
                    
                    // Esperar un momento y luego borrar el error
                    setTimeout(() => {
                        element.removeChild(textNode);
                        typeText(element, text, index, cursorEl, cursorInterval);
                    }, 200);
                } else {
                    // Insertar letra correcta
                    const textNode = document.createTextNode(text[index]);
                    element.insertBefore(textNode, cursorEl);
                    typeText(element, text, index + 1, cursorEl, cursorInterval);
                }
            }, typeSpeed);
        } else {
            // Texto completo, eliminar cursor
            clearInterval(cursorInterval);
            element.removeChild(cursorEl);
            element.dataset.aiTyped = 'complete';
        }
    }
    
    // Mapa de teclas cercanas para simular errores de tipeo
    function getNearbyKeys(char) {
        const keyboardMap = {
            'a': ['s', 'q', 'z'],
            'b': ['v', 'g', 'h', 'n'],
            'c': ['x', 'd', 'f', 'v'],
            'd': ['s', 'e', 'r', 'f', 'c', 'x'],
            'e': ['w', 's', 'd', 'r'],
            'f': ['d', 'r', 't', 'g', 'v', 'c'],
            'g': ['f', 't', 'y', 'h', 'b', 'v'],
            'h': ['g', 'y', 'u', 'j', 'n', 'b'],
            'i': ['u', 'j', 'k', 'o'],
            'j': ['h', 'u', 'i', 'k', 'm', 'n'],
            'k': ['j', 'i', 'o', 'l', 'm'],
            'l': ['k', 'o', 'p', 'ñ'],
            'm': ['n', 'j', 'k', 'l'],
            'n': ['b', 'h', 'j', 'm'],
            'o': ['i', 'k', 'l', 'p'],
            'p': ['o', 'l', 'ñ'],
            'q': ['w', 'a', 's'],
            'r': ['e', 'd', 'f', 't'],
            's': ['a', 'w', 'e', 'd', 'x', 'z'],
            't': ['r', 'f', 'g', 'y'],
            'u': ['y', 'h', 'j', 'i'],
            'v': ['c', 'f', 'g', 'b'],
            'w': ['q', 'a', 's', 'e'],
            'x': ['z', 's', 'd', 'c'],
            'y': ['t', 'g', 'h', 'u'],
            'z': ['a', 's', 'x'],
            'ñ': ['l', 'p'],
            '0': ['9', '-', 'p'],
            '1': ['q', '2'],
            '2': ['1', 'q', 'w', '3'],
            '3': ['2', 'w', 'e', '4'],
            '4': ['3', 'e', 'r', '5'],
            '5': ['4', 'r', 't', '6'],
            '6': ['5', 't', 'y', '7'],
            '7': ['6', 'y', 'u', '8'],
            '8': ['7', 'u', 'i', '9'],
            '9': ['8', 'i', 'o', '0'],
            ' ': [' ']
        };
        
        // Obtener lista de teclas cercanas o devolver la misma tecla
        return (keyboardMap[char.toLowerCase()] || [char]);
    }
    
    // Iniciar el efecto cuando los elementos sean visibles en el viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.aiTyped) {
                // Aplicar efecto con un ligero retraso basado en la posición del elemento
                const delay = Array.from(textElements).indexOf(entry.target) * 100;
                setTimeout(() => typeElement(entry.target), delay);
            }
        });
    }, { threshold: 0.2 }); // Empezar cuando el 20% del elemento sea visible
    
    // Observar todos los elementos de texto seleccionados
    textElements.forEach(element => {
        observer.observe(element);
    });
    
    // Aplicar el efecto inmediatamente al texto de introducción
    const introElements = document.querySelectorAll('.intro');
    if (introElements.length > 0) {
        setTimeout(() => typeElement(introElements[0]), 100);
    }
    
    console.log('Efecto de escritura tipo IA inicializado');
}
