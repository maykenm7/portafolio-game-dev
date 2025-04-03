document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.setAttribute('data-theme', 'dark');
        darkModeToggle.checked = true;
    }
    
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Typed.js Animation
    const typed = new Typed('.typed', {
        strings: ['Unity Developer', 'C# Programmer', 'Game Designer', '2D/3D Artist'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        showCursor: true,
        cursorChar: '|',
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navbarNav.classList.remove('active');
                navbarToggler.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarNav = document.querySelector('.navbar-nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Back to top button
        const backToTop = document.getElementById('backToTop');
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // Mobile Menu Toggle
    navbarToggler.addEventListener('click', function() {
        navbarNav.classList.toggle('active');
        
        if (navbarNav.classList.contains('active')) {
            this.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            this.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Project Modal
    const projectModal = document.getElementById('projectModal');
    const projectViews = document.querySelectorAll('.project-view');
    const modalClose = document.querySelector('.modal-close');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTech = document.getElementById('modalTech');
    const modalFeatures = document.getElementById('modalFeatures');
    const modalDemoLink = document.getElementById('modalDemoLink');
    const modalCodeLink = document.getElementById('modalCodeLink');
    const modalGallery = document.querySelector('.modal-gallery');
    
    // Project data
    const projects = [
        {
            id: 1,
            title: "Animales3D",
            description: "Juego 3D donde controlas un animal que puede moverse con las teclas A/D y disparar con la barra espaciadora.",
            tech: ["Unity", "C#", "3D"],
            features: [
                "Movimiento del personaje en 3D",
                "Sistema de disparo",
                "Detección de colisiones",
                "IA básica para enemigos"
            ],
            images: [
                "assets/images/projects/animales3d-1.jpg",
                "assets/images/projects/animales3d-2.jpg",
                "assets/images/projects/animales3d-3.jpg"
            ],
            demo: "#",
            code: "#"
        },
        {
            id: 2,
            title: "Avioneta",
            description: "Juego 2D de una avioneta que debe esquivar obstáculos usando las teclas W/S para moverse hacia arriba y abajo.",
            tech: ["Unity", "C#", "2D"],
            features: [
                "Control de la avioneta con teclado",
                "Generación procedural de obstáculos",
                "Sistema de puntuación",
                "Dificultad progresiva"
            ],
            images: [
                "assets/images/projects/avioneta-1.jpg",
                "assets/images/projects/avioneta-2.jpg"
            ],
            demo: "#",
            code: "#"
        },
        {
            id: 3,
            title: "Fuerza De Salto",
            description: "Juego de plataformas 2D con mecánica de salto variable según el tiempo que se mantenga presionada la barra espaciadora.",
            tech: ["Unity", "C#", "2D", "Mobile"],
            features: [
                "Mecánica de salto variable",
                "Diseño de niveles",
                "Optimización para móviles",
                "Controles táctiles"
            ],
            images: [
                "assets/images/projects/fuerza-salto-1.jpg",
                "assets/images/projects/fuerza-salto-2.jpg"
            ],
            demo: "#",
            code: "#"
        },
        {
            id: 4,
            title: "Isla Orbital",
            description: "Aventura 3D donde controlas una esfera que recoge power-ups en una isla flotante en el espacio.",
            tech: ["Unity", "C#", "3D"],
            features: [
                "Movimiento de cámara en 3D",
                "Sistema de power-ups",
                "Física personalizada",
                "Diseño de ambiente espacial"
            ],
            images: [
                "assets/images/projects/isla-orbital-1.jpg",
                "assets/images/projects/isla-orbital-2.jpg",
                "assets/images/projects/isla-orbital-3.jpg"
            ],
            demo: "#",
            code: "#"
        }
    ];
    
    // Open modal when project is clicked
    projectViews.forEach(view => {
        view.addEventListener('click', function(e) {
            e.preventDefault();
            
            const projectId = parseInt(this.getAttribute('data-id'));
            const project = projects.find(p => p.id === projectId);
            
            if (project) {
                // Set main modal content
                modalImage.src = project.images[0];
                modalImage.alt = project.title;
                modalTitle.textContent = project.title;
                modalDescription.textContent = project.description;
                
                // Set tech tags
                modalTech.innerHTML = '';
                project.tech.forEach(tech => {
                    const techSpan = document.createElement('span');
                    techSpan.textContent = tech;
                    modalTech.appendChild(techSpan);
                });
                
                // Set features list
                modalFeatures.innerHTML = '';
                project.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    modalFeatures.appendChild(li);
                });
                
                // Set links
                modalDemoLink.href = project.demo;
                modalCodeLink.href = project.code;
                
                // Set gallery images
                modalGallery.innerHTML = '';
                project.images.forEach((image, index) => {
                    const img = document.createElement('img');
                    img.src = image;
                    img.alt = `${project.title} - ${index + 1}`;
                    
                    if (index === 0) {
                        img.classList.add('active');
                    }
                    
                    img.addEventListener('click', function() {
                        modalImage.src = this.src;
                        document.querySelectorAll('.modal-gallery img').forEach(img => img.classList.remove('active'));
                        this.classList.add('active');
                    });
                    
                    modalGallery.appendChild(img);
                });
                
                // Show modal
                projectModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', function() {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside content
    projectModal.addEventListener('click', function(e) {
        if (e.target === projectModal) {
            projectModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For this example, we'll just log it and show an alert
            console.log({ name, email, subject, message });
            
            // Show success message
            alert('¡Mensaje enviado con éxito! Gracias por contactarme, te responderé lo antes posible.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Add animations on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.skill-card, .project-card, .contact-item, .repo-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('fade-in');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});