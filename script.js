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
            nav_services: 'Mes Services',
            nav_tools: 'Outils',
            nav_works: 'Nos Travaux',
            nav_contact: 'Contact',
            // Sections
            services_title: 'Mes Services',
            tools_title: 'Outils',
            works_title: 'De Nos Travaux',
            contact_title: 'Contactez-moi',
            // Services
            service_logo: 'Conception de Logo',
            service_card: 'Carte de Visite',
            service_brochure: 'Flyer et Brochure',
            service_invoice: 'Facture',
            service_catalog: 'Catalogue',
            service_social: 'Modèles de Réseaux Sociaux',
            service_packaging: 'Conception d\'emballage',
            service_tshirt: 'T-shirt et Hoodie',
            // Contact Info
            contact_phone_label: 'Téléphone:',
            contact_email_label: 'E-mail:'
        }
    };

    // Helper function to set a cookie
    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = 'expires=' + d.toUTCString();
        document.cookie = name + '=' + value + ';' + expires + ';path=/';
    }

    // Helper function to get a cookie
    function getCookie(name) {
        const cname = name + '=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(cname) === 0) {
                return c.substring(cname.length, c.length);
            }
        }
        return '';
    }

    // Function to apply language based on selection
    function applyLanguage(lang) {
        // Set body direction and classes
        if (lang === 'ar') {
            body.classList.add('ar');
        } else {
            body.classList.remove('ar');
        }

        // Apply translations to all elements with data-lang-key
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
    const savedLang = getCookie('language') || 'en';

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

    // --- New Features for the Portfolio Items ---
    
    // Function to initialize data from localStorage or set defaults
    function initializeData(workId) {
        const data = localStorage.getItem(workId);
        if (data) {
            return JSON.parse(data);
        }
        return { likes: 0, views: 0, liked: false };
    }

    // Function to update the DOM with new data
    function updateDOM(workId, data) {
        const item = document.querySelector(`.item[data-work-id="${workId}"]`);
        if (item) {
            const likeCounter = item.querySelector('.like-btn .counter');
            const viewCounter = item.querySelector('.view-count .counter');
            const likeButton = item.querySelector('.like-btn');
            
            if (likeCounter) likeCounter.textContent = data.likes;
            if (viewCounter) viewCounter.textContent = data.views;
            
            // Set the liked state
            if (likeButton) {
                if (data.liked) {
                    likeButton.classList.add('liked');
                    likeButton.querySelector('i').classList.replace('far', 'fas');
                } else {
                    likeButton.classList.remove('liked');
                    likeButton.querySelector('i').classList.replace('fas', 'far');
                }
            }
        }
    }

    // Event delegation for the portfolio grid
    const worksSection = document.getElementById('works');
    if (worksSection) {
        worksSection.addEventListener('click', (event) => {
            const target = event.target.closest('.action-btn');
            if (!target) return;

            const item = target.closest('.item');
            if (!item) return;

            const workId = item.getAttribute('data-work-id');
            let data = initializeData(workId);

            if (target.classList.contains('like-btn')) {
                if (data.liked) {
                    data.likes--;
                    data.liked = false;
                } else {
                    data.likes++;
                    data.liked = true;
                }
            } else if (target.classList.contains('share-btn')) {
                if (navigator.share) {
                    const pageTitle = document.title;
                    const pageUrl = window.location.href;
                    const workUrl = item.querySelector('img').src;
                    navigator.share({
                        title: pageTitle,
                        url: workUrl || pageUrl
                    }).then(() => {
                        console.log('Thanks for sharing!');
                    }).catch(console.error);
                } else {
                    alert("Sharing is not supported on this browser.");
                }
            }
            
            // Save the updated data
            localStorage.setItem(workId, JSON.stringify(data));
            // Update the DOM
            updateDOM(workId, data);
        });

        // Initialize views and counters on page load
        document.querySelectorAll('.item').forEach(item => {
            const workId = item.getAttribute('data-work-id');
            let data = initializeData(workId);
            
            // Increment view count on page load
            data.views++;
            localStorage.setItem(workId, JSON.stringify(data));
            
            // Update counters on the page
            updateDOM(workId, data);
        });
    }

});
