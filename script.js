document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS library for animations
    AOS.init();
    
    const modeToggle = document.getElementById('mode-toggle');
    const languageSelect = document.getElementById('language-select');
    const body = document.body;

    // Translation data
    const translations = {
        en: {
            // General
            skip_link: 'Skip to main content',
            // Navigation
            nav_services: 'My Services',
            nav_tools: 'Tools',
            nav_works: 'Our Works',
            nav_contact: 'Contact',
            // Sections
            services_title: 'My Services',
            tools_title: 'Tools',
            nav_about: 'About',
            works_title: 'From Our Works',
            contact_title: 'Contact Me',
            // Services
            service_logo: 'Logo Design',
            service_card: 'Business Card',
            service_brochure: 'Flyer and Brochure',
            service_invoice: 'Invoice',
            service_catalog: 'Catalog',
            service_social: 'Social Media Templates',
            service_packaging: 'Packaging Design',
            service_tshirt: 'T-shirt and Hoodie',
            // Contact Info
            contact_phone_label: 'Phone:',
            contact_email_label: 'Email:'
        },
        ar: {
            // General
            skip_link: 'تخطي إلى المحتوى الرئيسي',
            // Navigation
            nav_services: 'خدماتي',
            nav_tools: 'أدواتي',
            nav_works: 'أعمالي',
            nav_contact: 'تواصل معي',
            nav_about: 'من نحن',
            // Sections
            services_title: 'خدماتي',
            tools_title: 'أدواتي',
            works_title: 'من أعمالي',
            contact_title: 'تواصل معي',
            // Services
            service_logo: 'تصميم الشعارات',
            service_card: 'بطاقات العمل',
            service_brochure: 'الفلاير والبروشور',
            service_invoice: 'الفواتير',
            service_catalog: 'الكتالوجات',
            service_social: 'قوالب السوشيال ميديا',
            service_packaging: 'تصميم التغليف',
            service_tshirt: 'القمصان والهوديز',
            // Contact Info
            contact_phone_label: 'الهاتف:',
            contact_email_label: 'البريد الإلكتروني:'
        },
        fr: {
            // General
            skip_link: 'Passer au contenu principal',
            // Navigation
            nav_services: 'Mes services',
            nav_tools: 'Outils',
            nav_works: 'Mes travaux',
            nav_contact: 'Me contacter',
            nav_about: 'À propos',
            // Sections
            services_title: 'Mes services',
            tools_title: 'Mes outils',
            works_title: 'Mes travaux',
            contact_title: 'Me contacter',
            // Services
            service_logo: 'Création de logo',
            service_card: 'Cartes de visite',
            service_brochure: 'Dépliants et brochures',
            service_invoice: 'Factures',
            service_catalog: 'Catalogues',
            service_social: 'Modèles de médias sociaux',
            service_packaging: 'Conception d\'emballages',
            service_tshirt: 'T-shirts et sweats à capuche',
            // Contact Info
            contact_phone_label: 'Téléphone:',
            contact_email_label: 'E-mail:'
        }
    };
    
    // Helper function to set cookies
    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // Helper function to get cookies
    function getCookie(name) {
        const cname = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(cname) === 0) {
                return c.substring(cname.length, c.length);
            }
        }
        return "";
    }

    // Function to apply language based on translations object
    function applyLanguage(lang) {
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (translations[lang] && translations[lang][key]) {
                const anchor = element.querySelector('a');
                if (anchor) {
                    element.textContent = translations[lang][key] + ' ';
                    element.appendChild(anchor);
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
    }

    // Initialize with saved preferences
    const savedMode = getCookie('mode');
    const savedLang = getCookie('language') || 'ar';

    if (savedMode) {
        body.classList.add(savedMode);
        if (savedMode === 'dark-mode') {
            modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    languageSelect.value = savedLang;
    applyLanguage(savedLang);

    // Event listeners
    modeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.replace('light-mode', 'dark-mode');
            modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            setCookie('mode', 'dark-mode', 365);
        } else {
            body.classList.replace('dark-mode', 'light-mode');
            modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            setCookie('mode', 'light-mode', 365);
        }
    });

    languageSelect.addEventListener('change', (event) => {
        const selectedLang = event.target.value;
        applyLanguage(selectedLang);
        setCookie('language', selectedLang, 365);
    });

    // Pagination logic
    const portfolioGrid = document.querySelector('.portfolio .grid');
    const paginationContainer = document.querySelector('.pagination');
    const workItems = Array.from(portfolioGrid.querySelectorAll('.item'));
    const itemsPerPage = 16;
    let currentPage = 1;

    function displayWorks(page) {
        portfolioGrid.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const itemsToShow = workItems.slice(start, end);
        itemsToShow.forEach(item => portfolioGrid.appendChild(item));
    }

    function setupPagination() {
        paginationContainer.innerHTML = '';
        const pageCount = Math.ceil(workItems.length / itemsPerPage);
        
        if (pageCount <= 1) {
            paginationContainer.style.display = 'none';
            return;
        }

        for (let i = 1; i <= pageCount; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.textContent = i;
            pageLink.classList.add('page-link');
            if (i === currentPage) {
                pageLink.classList.add('active');
            }
            pageLink.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                displayWorks(currentPage);
                document.querySelectorAll('.page-link').forEach(link => link.classList.remove('active'));
                pageLink.classList.add('active');
            });
            paginationContainer.appendChild(pageLink);
        }
    }

    // Search bar logic
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    function filterWorks(query) {
        const filteredWorks = workItems.filter(item => {
            const workTitle = item.querySelector('a[data-title]').getAttribute('data-title');
            return workTitle.toLowerCase().includes(query.toLowerCase());
        });
        
        portfolioGrid.innerHTML = '';
        if (filteredWorks.length > 0) {
            filteredWorks.forEach(item => portfolioGrid.appendChild(item));
        } else {
            portfolioGrid.innerHTML = '<p class="no-results">لا توجد نتائج مطابقة لبحثك.</p>';
        }
        paginationContainer.style.display = 'none'; // Hide pagination during search
    }

    searchButton.addEventListener('click', () => {
        filterWorks(searchInput.value.trim());
    });

    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            filterWorks(searchInput.value.trim());
        }
    });

    // Initial display
    displayWorks(currentPage);
    setupPagination();

    /* ----- Work Details Carousel Logic ----- */
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(carousel => {
        const slides = carousel.querySelector('.carousel-slide');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        const images = slides.querySelectorAll('img');
        const totalImages = images.length;
        let currentSlide = 0;

        // Create dots
        if (dotsContainer) {
            for (let i = 0; i < totalImages; i++) {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (i === 0) {
                    dot.classList.add('active');
                }
                dot.addEventListener('click', () => {
                    showSlide(i);
                });
                dotsContainer.appendChild(dot);
            }
        }

        function showSlide(index) {
            if (index >= totalImages) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = totalImages - 1;
            } else {
                currentSlide = index;
            }

            // Move the slides
            const offset = -currentSlide * 100;
            slides.style.transform = `translateX(${offset}%)`;

            // Update active dot
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.dot');
                dots.forEach(dot => dot.classList.remove('active'));
                dots[currentSlide].classList.add('active');
            }
        }

        // Add navigation buttons logic (if they exist in HTML)
        const nextButton = carousel.querySelector('.next-btn');
        const prevButton = carousel.querySelector('.prev-btn');

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                showSlide(currentSlide + 1);
            });
        }
        
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                showSlide(currentSlide - 1);
            });
        }
    });
});
