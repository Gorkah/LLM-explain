/**
 * app.js - Funcionalidades interactivas para pÃ¡gina web educativa sobre LLMs
 * 
 * Este archivo contiene todas las funcionalidades JavaScript para mejorar
 * la experiencia de usuario en la pÃ¡gina educativa sobre LLMs.
 */

// Esperar a que el DOM estÃ© completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, inicializando funcionalidades...');
    
    // Inicializar todas las funcionalidades bÃ¡sicas
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
    
    // Inicializar grÃ¡ficos despuÃ©s de una pequeÃ±a espera para asegurar que Chart.js estÃ© cargado
    setTimeout(() => {
        console.log('Inicializando grÃ¡ficos...');
        initCharts();
    }, 500);
    
    // Inicializar las funcionalidades
    enhanceTrivia(); // Trivia interactiva
    initFocusReadingMode(); // Modo de lectura enfocada
    initTextGenerationSimulator(); // Simulador de generaciÃ³n de texto
    initScrollEffect(); // Efecto de scroll en la navegaciÃ³n
});

/**
 * INTERACCIONES BÃSICAS
 */

// 1. FunciÃ³n para mostrar/ocultar secciones
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
                    button.textContent = 'Mostrar secciÃ³n';
                } else {
                    targetSection.classList.remove('hidden');
                    targetSection.classList.add('visible');
                    button.textContent = 'Ocultar secciÃ³n';
                }
            }
        });
    });
}

// 2. MenÃº desplegable responsive para mÃ³viles
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Cerrar menÃº al hacer click en un enlace
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// 3. BotÃ³n "Volver arriba"
function initBackToTopButton() {
    // Crear botÃ³n si no existe
    let backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = 'â†‘';
        backToTopBtn.setAttribute('aria-label', 'Volver arriba');
        backToTopBtn.setAttribute('title', 'Volver arriba');
        document.body.appendChild(backToTopBtn);
    }
    
    // Mostrar/ocultar botÃ³n segÃºn scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // AcciÃ³n del botÃ³n
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * VISUALIZACIÃ“N DE DATOS
 */

// 1. GrÃ¡ficos comparativos usando Chart.js
function initCharts() {
    // Verificar si Chart.js estÃ¡ disponible
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js no estÃ¡ disponible. AsegÃºrate de incluirlo antes de este script.');
        return;
    }
    
    const chartContainers = document.querySelectorAll('.chart-container');
    
    chartContainers.forEach(container => {
        const canvas = container.querySelector('canvas');
        if (!canvas) return;
        
        const chartType = container.getAttribute('data-chart-type') || 'bar';
        const chartTitle = container.getAttribute('data-chart-title') || '';
        
        // Ejemplo de datos para modelos LLM
        // En producciÃ³n estos datos deberÃ­an venir de un API o archivo JSON
        const chartData = {
            labels: ['GPT-4', 'Claude 3', 'Gemini', 'Llama 3', 'Mistral'],
            datasets: [{
                label: 'Rendimiento (PuntuaciÃ³n)',
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

// 2. AcordeÃ³n para mostrar/ocultar detalles
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
                
                // Activar el botÃ³n y panel seleccionados
                button.classList.add('active');
                const selectedPanel = container.querySelector(`.tab-panel[data-tab="${tabId}"]`);
                if (selectedPanel) {
                    selectedPanel.classList.add('active');
                    selectedPanel.style.display = 'block';
                    console.log('Panel activado:', tabId);
                } else {
                    console.error('No se encontrÃ³ el panel:', tabId);
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
    
    // Forzar siempre el modo claro por defecto al iniciar
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    
    // Solo usar localStorage para recordar cambios posteriores
    const currentTheme = localStorage.getItem('theme');
    
    // Si el usuario habÃ­a seleccionado explÃ­citamente modo oscuro antes, respetarlo
    if (currentTheme === 'dark') {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    }
    
    if (darkModeToggle) {
        // Actualizar etiqueta del botÃ³n
        updateDarkModeButtonLabel();
        
        darkModeToggle.addEventListener('click', () => {
            const isDarkMode = document.body.classList.contains('dark-theme');
            
            // Cambiar tema
            document.body.classList.toggle('dark-theme');
            document.body.classList.toggle('light-theme');
            
            // Guardar preferencia
            localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
            
            // Actualizar etiqueta del botÃ³n
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
                    
                    // Opcional: dejar de observar despuÃ©s de animar
                    if (entry.target.hasAttribute('data-animate-once')) {
                        observer.unobserve(entry.target);
                    }
                } else if (!entry.target.hasAttribute('data-animate-once')) {
                    // Si no es una animaciÃ³n de una sola vez, quitamos la clase al salir del viewport
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
    // Primero, eliminar cualquier tooltip que pudiera estar persistiendo al final de la web
    const oldTooltips = document.querySelectorAll('.tooltip-container');
    oldTooltips.forEach(tooltip => tooltip.remove());
    
    // Crear un solo contenedor para todos los tooltips
    const tooltipContainer = document.createElement('div');
    tooltipContainer.className = 'tooltip-container';
    document.body.appendChild(tooltipContainer);
    
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        
        // Eliminar el atributo title si existe para evitar tooltips nativos del navegador
        if (element.hasAttribute('title')) {
            element.removeAttribute('title');
        }
        
        // Crear elemento tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
        tooltipContainer.appendChild(tooltip);
        
        // Eventos para mostrar/ocultar tooltip
        element.addEventListener('mouseenter', () => {
            const rect = element.getBoundingClientRect();
            tooltip.style.top = rect.bottom + window.scrollY + 10 + 'px';
            tooltip.style.left = rect.left + window.scrollX + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
        });
        
        element.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
        });
    });
}
// FunciÃ³n para mostrar/ocultar la tabla de modelos LLM
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

// Archivo principal que carga todos los mÃ³dulos
document.addEventListener('DOMContentLoaded', () => {
    // InicializaciÃ³n especÃ­fica para la tabla de modelos
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
    initTabs(); // Inicializar las pestaÃ±as
    createNavigationMenu();
    enhanceTrivia();
    initCharts(); // Inicializar grÃ¡ficos
    initTableSearch(); // Filtrado de bÃºsqueda
    initTableSorting(); // OrdenaciÃ³n de tabla
    initSmoothScroll(); // Desplazamiento suave
    
    // Inicializar efecto de navegaciÃ³n al scroll
    initScrollEffect();
    
    // Mostrar notificaciÃ³n de bienvenida (solo una vez por sesiÃ³n)
    if (!sessionStorage.getItem('welcomeShown')) {
        setTimeout(() => {
            showToast('Benvingut a la guia interactiva sobre LLMs!', 'success');
            sessionStorage.setItem('welcomeShown', 'true');
        }, 1000);
    }
});

// FunciÃ³n para control del modo oscuro - simplificada y mÃ¡s robusta
function initDarkModeToggle() {
    console.log('Inicializando modo oscuro...');
    
    // 1. Obtener el botÃ³n del DOM
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    if (!darkModeBtn) {
        console.error('BotÃ³n de modo oscuro no encontrado en el DOM');
        return; // Salir si no se encuentra el botÃ³n
    }
    
    console.log('BotÃ³n de modo oscuro encontrado:', darkModeBtn);
    
    // 2. Comprobar preferencia guardada o preferencia del sistema
    let userPrefersDark = localStorage.getItem('darkMode') === 'true';
    
    // Si no hay preferencia guardada, comprobar preferencia del sistema
    if (localStorage.getItem('darkMode') === null) {
        userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    console.log('Modo oscuro preferido:', userPrefersDark);
    
    // 3. FunciÃ³n para aplicar el tema oscuro
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
    
    // 4. FunciÃ³n para aplicar el tema claro
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
    
    // 5. Aplicar el tema inicial basado en la preferencia
    if (userPrefersDark) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
    
    // 6. FunciÃ³n para alternar el modo
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

// FunciÃ³n para crear botÃ³n Volver Arriba
function initBackToTopButton() {
    // Crear botÃ³n si no existe
    let backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        backToTopBtn.setAttribute('aria-label', 'Tornar a dalt');
        backToTopBtn.setAttribute('title', 'Tornar a dalt');
        document.body.appendChild(backToTopBtn);
        
        // AÃ±adir el texto descriptivo
        const btnText = document.createElement('span');
        btnText.className = 'back-to-top-text';
        btnText.textContent = 'Tornar a dalt';
        backToTopBtn.appendChild(btnText);
    }
    
    // Mostrar/ocultar botÃ³n segÃºn scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
            
            // AÃ±adir efecto de desplazamiento basado en scroll
            const scrollPercentage = Math.min(1, (window.pageYOffset - 300) / 1000);
            backToTopBtn.style.transform = `translateY(${(1 - scrollPercentage) * 10}px)`;
            backToTopBtn.style.opacity = 0.2 + (scrollPercentage * 0.8);
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // AÃ±adir efecto hover
    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.classList.add('hover');
    });
    
    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.classList.remove('hover');
    });
    
    // AcciÃ³n del botÃ³n
    backToTopBtn.addEventListener('click', () => {
        // AÃ±adir clase de animaciÃ³n de clic
        backToTopBtn.classList.add('clicked');
        
        // Quitar la clase despuÃ©s de la animaciÃ³n
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
    // AÃ±adir clase animate-on-scroll a todas las secciones
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
                    
                    // Opcional: dejar de observar despuÃ©s de animar
                    if (entry.target.hasAttribute('data-animate-once')) {
                        observer.unobserve(entry.target);
                    }
                } else if (!entry.target.hasAttribute('data-animate-once')) {
                    // Si no es una animaciÃ³n de una sola vez, quitamos la clase al salir del viewport
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
    
    // Primero, limpiar cualquier tooltip antiguo que estÃ© causando problemas
    const oldTooltips = document.querySelectorAll('[data-tooltip]');
    oldTooltips.forEach(el => {
        el.removeAttribute('data-tooltip');
    });
    
    // Ahora agregar tooltips solo a los elementos especÃ­ficos
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
        
        // AÃ±adir nuevos listeners
        element.addEventListener('mouseenter', element._tooltipEnterHandler);
        element.addEventListener('mouseleave', element._tooltipLeaveHandler);
    });
    
    // Limpiar cualquier tooltip huÃ©rfano que pueda haber quedado
    const orphanTooltips = document.querySelectorAll('.tooltip');
    orphanTooltips.forEach(tooltip => {
        if (tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
        }
    });
}

// Acordeones para mostrar/ocultar informaciÃ³n
function initAccordions() {
    // Convertir secciones en acordeones
    const sections = document.querySelectorAll('section');
    
    // Lista de secciones que siempre deben mostrarse
    const importantSections = ['explicacio', 'comparativa', 'casos-us', 'enllacos', 'riscs', 'trivia'];
    
    sections.forEach(section => {
        // Omitir las secciones importantes
        if (importantSections.includes(section.id)) {
            // Solo aÃ±adir una clase visual para indicar que es expandible
            const h2 = section.querySelector('h2');
            if (h2) {
                h2.classList.add('section-title');
            }
            return;
        }
        
        // Para el resto de secciones, crear acordeones
        const h2 = section.querySelector('h2');
        if (h2) {
            // Convertir el h2 en un header de acordeÃ³n
            h2.classList.add('accordion-header');
            h2.addEventListener('click', () => {
                // Toggle active class
                h2.classList.toggle('active');
                
                // Determinar el contenido del acordeÃ³n (todo excepto el h2)
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
    
    // Asegurarse de que el contenido de las secciones importantes estÃ© visible
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

// Crear menÃº de navegaciÃ³n automÃ¡tico
function createNavigationMenu() {
    // Buscar secciones para generar menÃº
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
    
    // Crear lista de navegaciÃ³n
    let navList = nav.querySelector('ul');
    if (!navList) {
        navList = document.createElement('ul');
        nav.appendChild(navList);
    } else {
        // Limpiar lista existente
        navList.innerHTML = '';
    }
    
    // Agregar elementos al menÃº
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
    
    // AÃ±adir toggle menÃº para mÃ³viles
    let menuToggle = nav.querySelector('.menu-toggle');
    if (!menuToggle) {
        menuToggle = document.createElement('div');
        menuToggle.className = 'menu-toggle';
        for (let i = 0; i < 3; i++) {
            const span = document.createElement('span');
            menuToggle.appendChild(span);
        }
        nav.insertBefore(menuToggle, navList);
        
        // Convertir la lista en menÃº mÃ³vil
        navList.classList.add('mobile-menu');
        
        // AÃ±adir evento al toggle
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }
}

// Mejorar la secciÃ³n de trivia
function enhanceTrivia() {
    const triviaSection = document.getElementById('trivia');
    if (!triviaSection) return;
    
    // Eliminar el botÃ³n de trivia original
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
            explanation: 'GPT-4 Ã©s un model desenvolupat per OpenAI, llanÃ§at el marÃ§ de 2023.'
        },
        {
            question: 'Quin Ã©s el model amb mÃ©s parÃ metres d\'aquesta llista?',
            options: ['GPT-4o', 'Claude 3 Opus', 'Llama 3 70B', 'COHERE Command R+'],
            correctIndex: 3,
            explanation: 'COHERE Command R+ tÃ© aproximadament 140 bilions de parÃ metres, el que el fa el mÃ©s gran de la llista.'
        },
        {
            question: 'Quina d\'aquestes empreses ofereix models completament oberts?',
            options: ['OpenAI', 'Anthropic', 'Meta', 'Google'],
            correctIndex: 2,
            explanation: 'Meta ha llanÃ§at la seva sÃ¨rie de models LLaMA com a models completament de codi obert.'
        },
        {
            question: 'Quin any va ser llanÃ§at el primer model GPT?',
            options: ['2017', '2018', '2020', '2022'],
            correctIndex: 1,
            explanation: 'El primer model GPT (Generative Pre-trained Transformer) va ser llanÃ§at per OpenAI al juny de 2018.'
        },
        {
            question: 'Quin Ã©s el principal problema Ã¨tic dels LLMs?',
            options: ['Consumeixen molta energia', 'Poden generar desinformaciÃ³', 'SÃ³n massa costosos', 'No entenen realment el context'],
            correctIndex: 1,
            explanation: 'La capacitat de generar contingut fals perÃ² versemblant Ã©s un dels principals riscos Ã¨tics dels LLMs.'
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
    
    // FunciÃ³n para mostrar una pregunta
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
                <button class="quiz-next-btn" style="display:none;">SegÃ¼ent pregunta</button>
                <div class="quiz-score">PuntuaciÃ³: <span>${score}</span>/${quizQuestions.length}</div>
            </div>
        `;
        
        quizContainer.innerHTML = quizHTML;
        
        // AÃ±adir interactividad a las opciones
        const options = quizContainer.querySelectorAll('.quiz-option');
        const feedback = quizContainer.querySelector('.quiz-feedback');
        const nextBtn = quizContainer.querySelector('.quiz-next-btn');
        
        options.forEach(option => {
            option.addEventListener('click', () => {
                if (answered) return;
                
                answered = true;
                const selectedIndex = parseInt(option.getAttribute('data-index'));
                const isCorrect = selectedIndex === question.correctIndex;
                
                // Actualizar puntuaciÃ³n
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
                
                // Mostrar notificaciÃ³n
                showToast(isCorrect ? 'Resposta correcta!' : 'Resposta incorrecta', isCorrect ? 'success' : 'error');
                
                // Mostrar botÃ³n de siguiente
                nextBtn.style.display = 'block';
            });
        });
        
        // Configurar botÃ³n de siguiente
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
    
    // FunciÃ³n para mostrar puntuaciÃ³n final
    function showFinalScore() {
        const percentage = Math.round((score / quizQuestions.length) * 100);
        let message;
        
        if (percentage >= 80) {
            message = 'ExcelÂ·lent! Ets un expert en LLMs!';
        } else if (percentage >= 60) {
            message = 'Molt bÃ©! Tens bons coneixements sobre LLMs.';
        } else if (percentage >= 40) {
            message = 'No estÃ  malament, perÃ² podries millorar els teus coneixements sobre LLMs.';
        } else {
            message = 'Potser hauries de revisar mÃ©s informaciÃ³ sobre LLMs. Segueix aprenent!';
        }
        
        const finalHTML = `
            <div class="quiz-final">
                <h3>Quiz complet!</h3>
                <div class="quiz-final-score">PuntuaciÃ³ final: ${score}/${quizQuestions.length} (${percentage}%)</div>
                <p>${message}</p>
                <button class="quiz-restart-btn">Tornar a comenÃ§ar</button>
            </div>
        `;
        
        quizContainer.innerHTML = finalHTML;
        
        // AÃ±adir evento para reiniciar
        const restartBtn = quizContainer.querySelector('.quiz-restart-btn');
        restartBtn.addEventListener('click', () => {
            currentQuestionIndex = 0;
            score = 0;
            showQuestion(currentQuestionIndex);
        });
        
        // Mostrar notificaciÃ³n
        showToast(`Has completat el quiz amb una puntuaciÃ³ de ${percentage}%`, 'success');
    }
    
    // Iniciar el quiz mostrando la primera pregunta
    showQuestion(currentQuestionIndex);
}

// FunciÃ³n para mostrar notificaciones tipo toast
function showToast(message, type = 'info') {
    console.log(`Toast: ${message} (${type})`);
    
    // Crear elemento toast si no existe
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // Crear nuevo toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${getIconForToastType(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="toast-close"><i class="fas fa-times"></i></button>
    `;
    
    // AÃ±adir al contenedor
    toastContainer.appendChild(toast);
    
    // Mostrar con animaciÃ³n
    setTimeout(() => {
        toast.classList.add('visible');
    }, 10);
    
    // Configurar cierre automÃ¡tico
    const autoCloseTime = 5000; // 5 segundos
    const autoCloseTimeout = setTimeout(() => {
        closeToast(toast);
    }, autoCloseTime);
    
    // AÃ±adir evento de cierre manual
    const closeBtn = toast.querySelector('.toast-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            clearTimeout(autoCloseTimeout);
            closeToast(toast);
        });
    }
    
    // FunciÃ³n para cerrar toast con animaciÃ³n
    function closeToast(toastElement) {
        toastElement.classList.remove('visible');
        setTimeout(() => {
            if (toastElement.parentNode) {
                toastElement.parentNode.removeChild(toastElement);
            }
        }, 300);
    }
    
    // Determinar icono segÃºn tipo
    function getIconForToastType(toastType) {
        switch(toastType) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'warning': return 'fa-exclamation-triangle';
            case 'info':
            default: return 'fa-info-circle';
        }
    }
}

/**
 * NUEVAS FUNCIONALIDADES AVANZADAS
 */

// 1. Modo Lectura Enfocada - Elimina distracciones para mejorar la concentraciÃ³n
function initFocusReadingMode() {
    console.log('Inicializando modo de lectura enfocada...');
    
    // Usar el botÃ³n que ya existe en el HTML
    const focusModeBtn = document.getElementById('focus-mode-toggle');
    if (!focusModeBtn) {
        console.error('BotÃ³n de modo lectura no encontrado');
        return;
    }
    
    // Variable para seguir el estado
    let focusModeActive = false;
    let originalStyles = {};
    
    // FunciÃ³n para activar/desactivar el modo lectura
    focusModeBtn.addEventListener('click', () => {
        focusModeActive = !focusModeActive;
        
        if (focusModeActive) {
            // Activar modo lectura
            document.body.classList.add('focus-reading-mode');
            focusModeBtn.classList.add('active');
            
            // Guardar posiciÃ³n actual
            const scrollPosition = window.scrollY;
            
            // Ocultar elementos distractores (excepto los esenciales)
            const distractors = document.querySelectorAll('.back-to-top, .feature-item, .chart-container');
            distractors.forEach(el => {
                // Usamos un identificador Ãºnico para cada elemento
                const id = el.id || `element-${Math.random().toString(36).substr(2, 9)}`;
                if (!el.id) el.id = id;
                originalStyles[id] = el.style.display;
                el.style.display = 'none';
            });
            
            // Aumentar tamaÃ±o de texto para mejorar legibilidad
            const content = document.querySelectorAll('.section-content p');
            content.forEach(p => {
                p.style.fontSize = '1.2em';
                p.style.lineHeight = '1.8';
                p.style.maxWidth = '70ch';
                p.style.margin = '0 auto 1.5rem auto';
            });
            
            // Mostrar mensaje
            showToast('Modo lectura activado. Pulsa ESC para salir.', 'info');
            
            // Restaurar posiciÃ³n de scroll
            window.scrollTo(0, scrollPosition);
            
            // AÃ±adir control de teclado para salir
            document.addEventListener('keydown', exitFocusModeOnEsc);
        } else {
            // Desactivar modo lectura
            exitFocusMode();
        }
    });
    
    // FunciÃ³n para salir del modo lectura con ESC
    function exitFocusModeOnEsc(e) {
        if (e.key === 'Escape') {
            exitFocusMode();
        }
    }
    
    // FunciÃ³n para desactivar el modo lectura
    function exitFocusMode() {
        document.body.classList.remove('focus-reading-mode');
        focusModeBtn.classList.remove('active');
        
        // Restaurar elementos ocultos
        const distractors = document.querySelectorAll('.back-to-top, .feature-item, .chart-container');
        distractors.forEach(el => {
            const id = el.id;
            if (id && originalStyles[id]) {
                el.style.display = originalStyles[id];
            } else {
                el.style.display = '';
            }
        });
        
        // Restaurar tamaÃ±o de texto
        const content = document.querySelectorAll('.section-content p');
        content.forEach(p => {
            p.style.fontSize = '';
            p.style.lineHeight = '';
            p.style.maxWidth = '';
            p.style.margin = '';
        });
        
        // Eliminar listener de teclado
        document.removeEventListener('keydown', exitFocusModeOnEsc);
        
        // Resetear estado
        focusModeActive = false;
        originalStyles = {};
    }
}

// Filtrado de bÃºsqueda para la tabla
function initTableSearch() {
    const searchInput = document.getElementById('search-models');
    if (!searchInput) return;

    searchInput.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();
        const table = document.getElementById('taula-models');
        if (!table) return;
        
        const rows = table.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// 2. Contador de tokens LLM - Utilidad para contar tokens en texto
function initTokenCounter() {
    console.log('Inicializando contador de tokens...');
    
    // Crear el elemento contador
    const mainContainer = document.querySelector('main.container');
    if (!mainContainer) return;
    
    // Crear la secciÃ³n de contador de tokens
    const tokenSection = document.createElement('section');
    tokenSection.className = 'card animate-on-scroll';
    tokenSection.id = 'token-counter';
    tokenSection.innerHTML = `
        <div class="section-header">
            <i class="fas fa-calculator section-icon"></i>
            <h2>Calculadora de Tokens</h2>
        </div>
        <div class="section-content">
            <p>Los modelos LLM procesan el texto dividiÃ©ndolo en tokens. Puedes usar esta herramienta para estimar cuÃ¡ntos tokens utilizarÃ­a un modelo para procesar tu texto.</p>
            <div class="token-calculator">
                <textarea id="token-input" placeholder="Escribe o pega tu texto aquÃ­ para calcular los tokens..." rows="5" class="token-textarea"></textarea>
                <div class="token-stats">
                    <div class="token-stat">
                        <span class="token-label">Caracteres:</span>
                        <span id="char-count" class="token-value">0</span>
                    </div>
                    <div class="token-stat">
                        <span class="token-label">Palabras:</span>
                        <span id="word-count" class="token-value">0</span>
                    </div>
                    <div class="token-stat">
                        <span class="token-label">Tokens (aprox):</span>
                        <span id="token-count" class="token-value">0</span>
                    </div>
                </div>
                <div class="token-info">
                    <p class="token-info-text">Los tokens son unidades de texto que procesan los LLM. En idiomas como el espaÃ±ol, un token suele equivaler a ~4-5 caracteres o ~0.75 palabras.</p>
                </div>
            </div>
        </div>
    `;
    
    // Insertar antes de la secciÃ³n de riesgos o al final
    const risksSection = document.getElementById('riscs');
    if (risksSection) {
        mainContainer.insertBefore(tokenSection, risksSection);
    } else {
        mainContainer.appendChild(tokenSection);
    }
    
    // Implementar la lÃ³gica de conteo
    const tokenInput = document.getElementById('token-input');
    const charCount = document.getElementById('char-count');
    const wordCount = document.getElementById('word-count');
    const tokenCount = document.getElementById('token-count');
    
    if (tokenInput && charCount && wordCount && tokenCount) {
        tokenInput.addEventListener('input', calculateTokens);
        
        function calculateTokens() {
            const text = tokenInput.value;
            
            // Contar caracteres
            const chars = text.length;
            charCount.textContent = chars.toLocaleString();
            
            // Contar palabras
            const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
            wordCount.textContent = words.toLocaleString();
            
            // Estimar tokens (aproximadamente 4 caracteres por token para espaÃ±ol)
            // Esta es una estimaciÃ³n simple, los tokenizadores reales son mÃ¡s complejos
            const tokens = Math.ceil(chars / 4);
            tokenCount.textContent = tokens.toLocaleString();
            
            // Cambiar color segÃºn cantidad de tokens
            if (tokens > 2000) {
                tokenCount.style.color = '#ff3b30'; // Rojo para muchos tokens
            } else if (tokens > 1000) {
                tokenCount.style.color = '#ffcc00'; // Amarillo para cantidad media
            } else {
                tokenCount.style.color = ''; // Color normal para pocos tokens
            }
        }
    }
}

// OrdenaciÃ³n de la tabla
function initTableSorting() {
    const table = document.getElementById('taula-models');
    if (!table) return;
    
    const headers = table.querySelectorAll('th[data-sort]');
    
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const column = header.getAttribute('data-sort');
            const isAsc = header.classList.contains('asc');
            
            // Cambiar direcciÃ³n de ordenaciÃ³n
            headers.forEach(h => h.classList.remove('asc', 'desc'));
            header.classList.add(isAsc ? 'desc' : 'asc');
            
            // Ordenar filas
            const rows = Array.from(table.querySelectorAll('tbody tr'));
            
            rows.sort((a, b) => {
                let aValue = a.querySelector(`td:nth-child(${getColumnIndex(column)})`).textContent.toLowerCase();
                let bValue = b.querySelector(`td:nth-child(${getColumnIndex(column)})`).textContent.toLowerCase();
                
                // Intentar convertir a nÃºmero si es posible
                if (!isNaN(aValue) && !isNaN(bValue)) {
                    aValue = parseFloat(aValue);
                    bValue = parseFloat(bValue);
                }
                
                // Comparar valores
                if (aValue < bValue) return isAsc ? -1 : 1;
                if (aValue > bValue) return isAsc ? 1 : -1;
                return 0;
            });
            
            // Re-insertar filas ordenadas
            const tbody = table.querySelector('tbody');
            rows.forEach(row => tbody.appendChild(row));
        });
    });
    
    // FunciÃ³n auxiliar para obtener Ã­ndice de columna
    function getColumnIndex(column) {
        const headers = Array.from(table.querySelectorAll('th'));
        for (let i = 0; i < headers.length; i++) {
            if (headers[i].getAttribute('data-sort') === column) {
                return i + 1; // CSS nth-child es 1-indexed
            }
        }
        return 1;
    }
}

// Scroll suave para los enlaces de navegaciÃ³n
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
                top: targetElement.offsetTop - 80, // Ajustar para considerar la navegaciÃ³n fixed
                behavior: 'smooth'
            });
        });
    });
}

// 3. Simulador de generaciÃ³n de texto LLM - Demuestra cÃ³mo un LLM genera texto
function initTextGenerationSimulator() {
    const promptInput = document.getElementById('prompt-input');
    const generateBtn = document.getElementById('generate-btn');
    const speedControl = document.getElementById('gen-speed');
    const thinkingIndicator = document.getElementById('thinking-indicator');
    const outputText = document.getElementById('output-text');
    
    if (!promptInput || !generateBtn || !speedControl || !thinkingIndicator || !outputText) {
        console.log('Elementos del simulador no encontrados');
        return;
    }
    
    // Respuestas predefinidas para diferentes tipos de prompts
    const predefinedResponses = {
        'que es un llm': "Un LLM (Large Language Model o Modelo de Lenguaje Grande) es un tipo de modelo de inteligencia artificial entrenado con enormes cantidades de texto para comprender y generar lenguaje humano. Estos modelos utilizan redes neuronales profundas, especialmente arquitecturas basadas en transformers, que les permiten capturar patrones complejos del lenguaje, contexto y significado. Los LLMs son capaces de realizar diversas tareas como responder preguntas, resumir textos, traducir idiomas, escribir diferentes tipos de contenido y mantener conversaciones, todo sin ser programados especÃ­ficamente para cada tarea.",
        'como funciona un llm': "Un LLM funciona procesando y prediciendo texto palabra por palabra (o token por token). Cuando recibe un texto de entrada, analiza su estructura y contenido utilizando una arquitectura de redes neuronales llamada transformer. Esta arquitectura contiene capas de atenciÃ³n que permiten al modelo enfocarse en diferentes partes del texto para entender relaciones y contexto. Durante el entrenamiento, el modelo aprende patrones estadÃ­sticos del lenguaje analizando billones de palabras. Cuando genera texto, el modelo predice la siguiente palabra mÃ¡s probable basÃ¡ndose en el contexto anterior, creando asÃ­ respuestas coherentes y relevantes que parecen escritas por un humano.",
        'ejemplos de llm': "Algunos ejemplos destacados de LLMs (Modelos de Lenguaje Grandes) son:\n\n- GPT-4 y GPT-4o de OpenAI\n- Claude 3 de Anthropic\n- Gemini de Google\n- Llama 2 y Llama 3 de Meta\n- Mistral y Mixtral de Mistral AI\n- COHERE Command\n- Falcon de Technology Innovation Institute\n\nCada uno tiene caracterÃ­sticas particulares, diferentes tamaÃ±os (nÃºmero de parÃ¡metros) y casos de uso especÃ­ficos donde destacan mÃ¡s que otros. Algunos son completamente abiertos, mientras que otros solo estÃ¡n disponibles a travÃ©s de APIs comerciales.",
        'para que sirven los llm': "Los LLMs tienen numerosas aplicaciones prÃ¡cticas:\n\n- Asistentes virtuales para responder preguntas y proporcionar informaciÃ³n\n- GeneraciÃ³n de contenido como artÃ­culos, resÃºmenes y textos creativos\n- TraducciÃ³n entre idiomas con alta precisiÃ³n\n- AnÃ¡lisis de sentimiento y extracciÃ³n de informaciÃ³n de textos\n- ProgramaciÃ³n asistida y generaciÃ³n de cÃ³digo\n- Sistemas de educaciÃ³n personalizada\n- InvestigaciÃ³n cientÃ­fica y anÃ¡lisis de literatura mÃ©dica\n- CreaciÃ³n de chatbots y sistemas de atenciÃ³n al cliente automatizados\n- Ayuda en la toma de decisiones empresariales\n\nSu versatilidad los hace Ãºtiles en casi cualquier campo que involucre procesamiento de lenguaje natural."
    };
    
    // Respuesta por defecto si no hay coincidencia
    const defaultResponse = "Un LLM (Large Language Model) funciona analizando patrones en grandes cantidades de texto durante su entrenamiento. Cuando recibe un prompt, utiliza estos patrones aprendidos para generar texto que sea coherente y relevante al contexto proporcionado. El proceso de generaciÃ³n ocurre token por token, donde el modelo predice la siguiente palabra mÃ¡s probable basÃ¡ndose en lo que ha 'aprendido' previamente y en el contexto actual de la conversaciÃ³n. Esta capacidad permite a los LLMs realizar tareas complejas de lenguaje sin haber sido programados especÃ­ficamente para cada una.";
    
    let generationInterval;
    let isGenerating = false;
    
    // Manejar clic en botÃ³n de generaciÃ³n
    generateBtn.addEventListener('click', () => {
        if (isGenerating) {
            // Si ya estÃ¡ generando, detener
            stopGeneration();
            return;
        }
        
        // Obtener el prompt y limpiar espacios
        const prompt = promptInput.value.trim().toLowerCase();
        
        if (!prompt) {
            showToast('Por favor, escribe un prompt primero', 'warning');
            return;
        }
        
        // Iniciar generaciÃ³n
        startGeneration(prompt);
    });
    
    // Permitir iniciar generaciÃ³n con Enter
    promptInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !isGenerating) {
            generateBtn.click();
        }
    });
    
    // FunciÃ³n para iniciar la generaciÃ³n
    function startGeneration(prompt) {
        // Cambiar el estado del botÃ³n
        generateBtn.innerHTML = '<i class="fas fa-stop"></i> Detener';
        isGenerating = true;
        
        // Limpiar output anterior
        outputText.textContent = '';
        
        // Mostrar indicador de 'thinking'
        thinkingIndicator.style.display = 'flex';
        outputText.style.opacity = '0.5';
        
        // Seleccionar respuesta segÃºn el prompt
        let responseText = defaultResponse;
        
        // Buscar coincidencias en las respuestas predefinidas
        for (const key in predefinedResponses) {
            if (prompt.includes(key)) {
                responseText = predefinedResponses[key];
                break;
            }
        }
        
        // Simular tiempo de procesamiento (thinking)
        setTimeout(() => {
            // Ocultar indicador de thinking
            thinkingIndicator.style.display = 'none';
            outputText.style.opacity = '1';
            
            // Dividir la respuesta en tokens (palabras para simplificar)
            const tokens = responseText.split(/([\s.,;:!?\n]+)/);
            let tokenIndex = 0;
            
            // Calcular velocidad basada en el control deslizante (invertida)
            // Valor mÃ¡s alto significa intervalo mÃ¡s corto = mÃ¡s rÃ¡pido
            const speed = 11 - parseInt(speedControl.value);
            const interval = speed * 50; // Convertir a milisegundos
            
            // Generar texto token por token
            generationInterval = setInterval(() => {
                if (tokenIndex < tokens.length) {
                    outputText.textContent += tokens[tokenIndex];
                    tokenIndex++;
                    
                    // Auto-scroll mientras se genera
                    outputText.scrollTop = outputText.scrollHeight;
                } else {
                    // Terminado
                    stopGeneration();
                    showToast('GeneraciÃ³n completada', 'success');
                }
            }, interval);
        }, 1500); // 1.5 segundos de "thinking"
    }
    
    // Control de velocidad - actualizaciÃ³n en tiempo real
    speedControl.addEventListener('input', () => {
        if (isGenerating) {
            // Si estÃ¡ generando, actualizar la velocidad
            stopGeneration(false); // Detener sin resetear UI
            
            // Reiniciar con nueva velocidad
            const prompt = promptInput.value.trim();
            if (prompt) {
                startGeneration(prompt);
            }
        }
    });
    
    // FunciÃ³n para detener la generaciÃ³n
    function stopGeneration(resetUI = true) {
        clearInterval(generationInterval);
        isGenerating = false;
        
        if (resetUI) {
            generateBtn.innerHTML = '<i class="fas fa-play"></i> Generar resposta';
            thinkingIndicator.style.display = 'none';
            outputText.style.opacity = '1';
        }
    }
    // Ya hemos definido las variables y configurado todo arriba
    // Estamos listos para usar el simulador
}

// 4. Seguimiento de progreso - Para que los usuarios sepan quÃ© secciones han leÃ­do
function initProgressTracker() {
    console.log('Inicializando seguimiento de progreso...');
    // Esta funciÃ³n se implementarÃ¡ en una futura actualizaciÃ³n
    return;
    
}

// Efecto de cambio en la barra de navegaciÃ³n al hacer scroll
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

// 4. Seguimiento de progreso - Para que los usuarios sepan quÃ© secciones han leÃ­do
function initProgressTracker() {
    console.log('Inicializando seguimiento de progreso...');
    
    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return;
    
    // Obtener o inicializar el progreso en localStorage
    let progress = JSON.parse(localStorage.getItem('llmExplainProgress')) || {};
    
    // Crear indicador de progreso global
    const mainContainer = document.querySelector('main.container');
    if (mainContainer) {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-tracker';
        progressBar.innerHTML = `
            <div class="progress-info">
                <span>Tu progreso:</span>
                <span class="progress-percentage">0%</span>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar-fill"></div>
            </div>
            <button class="btn btn-sm btn-secondary reset-progress">Reiniciar progreso</button>
        `;
        
        // Insertar al principio del contenedor principal
        mainContainer.insertBefore(progressBar, mainContainer.firstChild);
        
        // BotÃ³n para reiniciar progreso
        const resetBtn = progressBar.querySelector('.reset-progress');
        resetBtn.addEventListener('click', () => {
            if (confirm('Â¿Seguro que quieres reiniciar tu progreso de lectura?')) {
                localStorage.removeItem('llmExplainProgress');
                progress = {};
                updateProgressIndicators();
                showToast('Progreso reiniciado correctamente', 'info');
            }
        });
    }
    
    // AÃ±adir indicadores de lectura a cada secciÃ³n
    sections.forEach(section => {
        const sectionId = section.id;
        const header = section.querySelector('.section-header');
        
        if (header) {
            const indicator = document.createElement('span');
            indicator.className = 'read-indicator';
            indicator.innerHTML = '<i class="fas fa-circle"></i>';
            indicator.setAttribute('data-section', sectionId);
            indicator.title = 'Marcar como leÃ­do';
            
            // Verificar si la secciÃ³n ya ha sido leÃ­da
            if (progress[sectionId]) {
                indicator.classList.add('read');
                indicator.title = 'Marcar como no leÃ­do';
            }
            
            header.appendChild(indicator);
            
            // Cambiar estado al hacer clic
            indicator.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleSectionReadStatus(sectionId);
            });
        }
        
        // Marcar como leÃ­do automÃ¡ticamente al desplazarse
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
                    // Si la secciÃ³n estÃ¡ visible en un 70% o mÃ¡s, marcarla como leÃ­da
                    if (!progress[sectionId]) {
                        progress[sectionId] = true;
                        localStorage.setItem('llmExplainProgress', JSON.stringify(progress));
                        updateProgressIndicators();
                    }
                }
            });
        }, { threshold: 0.7 });
        
        observer.observe(section);
    });
    
    // Actualizar todos los indicadores de progreso
    function updateProgressIndicators() {
        // Actualizar indicadores individuales
        document.querySelectorAll('.read-indicator').forEach(indicator => {
            const sectionId = indicator.getAttribute('data-section');
            if (progress[sectionId]) {
                indicator.classList.add('read');
                indicator.title = 'Marcar como no leÃ­do';
            } else {
                indicator.classList.remove('read');
                indicator.title = 'Marcar como leÃ­do';
            }
        });
        
        // Actualizar barra de progreso global
        const progressPercentage = document.querySelector('.progress-percentage');
        const progressBarFill = document.querySelector('.progress-bar-fill');
        
        if (progressPercentage && progressBarFill) {
            const totalSections = sections.length;
            const readSections = Object.values(progress).filter(Boolean).length;
            const percentage = totalSections > 0 ? Math.round((readSections / totalSections) * 100) : 0;
            
            progressPercentage.textContent = `${percentage}%`;
            progressBarFill.style.width = `${percentage}%`;
        }
    }
    
    // Cambiar estado de lectura de una secciÃ³n
    function toggleSectionReadStatus(sectionId) {
        progress[sectionId] = !progress[sectionId];
        localStorage.setItem('llmExplainProgress', JSON.stringify(progress));
        updateProgressIndicators();
    }
    
    // Actualizar indicadores al cargar la pÃ¡gina
    updateProgressIndicators();
}

// Efecto de cambio en la barra de navegaciÃ³n al hacer scroll
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

// AnimaciÃ³n de fondo con grafos para representar redes neuronales
function initGraphBackground() {
    let canvas = document.getElementById('graph-background');
    if (!canvas) {
        console.log('Canvas no encontrado. Creando uno nuevo.');
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
    
    // Ajustar canvas al tamaÃ±o de la ventana
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        console.log(`Canvas redimensionado a ${canvas.width}x${canvas.height}`);
    }
    
    // Llamar al resize inicialmente y al cambiar tamaÃ±o de ventana
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // ConfiguraciÃ³n de nodos y conexiones - mejorada para mayor visibilidad
    const nodes = [];
    const NUM_NODES = 50; // Aumentado el nÃºmero de nodos para mayor densidad
    const NODE_RADIUS = 3.5; // Aumentado ligeramente el tamaÃ±o de los nodos
    const CONNECTION_DISTANCE = 170; // Mayor distancia de conexiÃ³n
    const CONNECTION_OPACITY = 0.35; // Mayor opacidad para mejor visibilidad
    const nodeSpeed = 0.25; // Velocidad mÃ¡s lenta para un efecto mÃ¡s elegante
    
    // Colores adaptados al tema claro/oscuro con mÃ¡s intensidad
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
            radius: Math.random() * 2 + nodeRadius - 1, // TamaÃ±os variados
            lastUpdate: 0
        });
    }
    
    // FunciÃ³n de animaciÃ³n
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
        
        // Actualizar posiciÃ³n de nodos y dibujarlos
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
            
            // AÃ±adir brillo
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(67, 97, 238, 0.15)`;
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    // Iniciar animaciÃ³n
    animate();
    console.log('AnimaciÃ³n de grafos iniciada');
    
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

