document.addEventListener("DOMContentLoaded", () => {
    // تحديد العناصر الأساسية في الصفحة
    const body = document.body;
    const modeToggle = document.getElementById("mode-toggle");
    const languageSelect = document.getElementById("language-select");
    const worksGrid = document.getElementById("works-grid");
    const paginationContainer = document.getElementById("pagination-container");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const tags = document.querySelectorAll('.tag-link');

    // بيانات اللغات
    const translations = {
        ar: {
            skip_link: "تخطي إلى المحتوى الرئيسي",
            nav_services: "خدماتي",
            nav_tools: "أدواتي",
            nav_works: "أعمالي",
            nav_contact: "تواصل معي",
            services_title: "خدماتي",
            service_logo: "تصميم الشعارات",
            service_card: "بطاقات العمل",
            service_brochure: "الفلاير والبروشور",
            service_invoice: "الفواتير",
            service_catalog: "الكتالوجات",
            service_social: "قوالب السوشيال ميديا",
            service_packaging: "تصميم التغليف",
            service_tshirt: "القمصان والهوديز",
            tools_title: "أدواتي",
            works_title: "من أعمالي",
            contact_title: "تواصل معي",
            contact_phone_label: "الهاتف: ",
            contact_email_label: "البريد الإلكتروني: ",
            copy: "© 2025 Fennec Visionary. جميع الحقوق محفوظة.",
            search_placeholder: "ابحث عن عمل...",
            no_results_heading: "لم يتم العثور على نتائج",
            no_results_text: "جرب استخدام كلمات بحث أخرى",
            howItWorksTitle: 'كيف نعمل',
            howItWorksSubtitle: 'مرحلة التعاون الواضحة، المصممة لتقديم نتائج حقيقية.',
            step1Title: 'الخطوة 1: الاستكشاف',
            step1Desc: 'أبدأ بالتعمق في عملك وأهدافك وجمهورك. كل قرار مبني على وضوح، وليس على التخمين.',
            step2Title: 'الخطوة 2: التحديد',
            step2Desc: 'من الاستراتيجية إلى لوحات المزاج والتوجه الإبداعي، أقوم برسم كيف يجب أن تبدو علامتك التجارية وتشعُر بها وتتواصل.',
            step3Title: 'الخطوة 3: التصميم',
            step3Desc: 'هنا تتحول الرؤية إلى حقيقة. شعارات، أنظمة هوية، حركة والمزيد. كل ذلك مصمم للتواصل والبناء ليصمد.',
            step4Title: 'الخطوة 4: التسليم',
            step4Desc: 'الأصول النهائية، إرشادات العلامة التجارية، وحزمة التوديع لمساعدتك على الانطلاق بثقة. الدعم المستمر متاح.'
        },
        en: {
            skip_link: "Skip to main content",
            nav_services: "Services",
            nav_tools: "Tools",
            nav_works: "My Works",
            nav_contact: "Contact",
            services_title: "Services",
            service_logo: "Logo Design",
            service_card: "Business Cards",
            service_brochure: "Flyers & Brochures",
            service_invoice: "Invoices",
            service_catalog: "Catalogs",
            service_social: "Social Media Templates",
            service_packaging: "Packaging Design",
            service_tshirt: "T-shirts & Hoodies",
            tools_title: "My Tools",
            works_title: "My Portfolio",
            contact_title: "Contact Me",
            contact_phone_label: "Phone: ",
            contact_email_label: "Email: ",
            copy: "© 2025 Fennec Visionary. All rights reserved.",
            search_placeholder: "Search for work...",
            no_results_heading: "No Results Found",
            no_results_text: "Try using different keywords",
            howItWorksTitle: 'How It All Works',
            howItWorksSubtitle: 'A clear collaborative process built to deliver real results.',
            step1Title: 'Step 1: Discover',
            step1Desc: 'I begin with a deep dive into your business, goals, and audience. Every decision is grounded in clarity, not guesswork.',
            step2Title: 'Step 2: Define',
            step2Desc: 'From strategy to moodboards to creative direction, I map out how your brand should look, feel and communicate.',
            step3Title: 'Step 3: Design',
            step3Desc: 'This is where the vision comes to life. Logos, identity systems, motion and more. All crafted to connect and built to last.',
            step4Title: 'Step 4: Deliver',
            step4Desc: 'Final assets, brand guidelines and a goodbye packet to help you launch with confidence. Ongoing support is available.'
        },
        fr: {
            skip_link: "Passer au contenu principal",
            nav_services: "Services",
            nav_tools: "Outils",
            nav_works: "Mes Travaux",
            nav_contact: "Contact",
            services_title: "Mes Services",
            service_logo: "Conception de Logos",
            service_card: "Cartes de Visite",
            service_brochure: "Flyers & Brochures",
            service_invoice: "Factures",
            service_catalog: "Catalogues",
            service_social: "Modèles pour Réseaux Sociaux",
            service_packaging: "Conception d'Emballages",
            service_tshirt: "T-shirts et Hoodies",
            tools_title: "Mes Outils",
            works_title: "Mon Portfolio",
            contact_title: "Me Contacter",
            contact_phone_label: "Téléphone: ",
            contact_email_label: "E-mail: ",
            copy: "© 2025 Fennec Visionary. Tous droits réservés.",
            search_placeholder: "Rechercher un travail...",
            no_results_heading: "Aucun Résultat Trouvé",
            no_results_text: "Essayez d'utiliser des mots-clés différents",
            howItWorksTitle: 'Comment ça Marche',
            howItWorksSubtitle: 'Un processus collaboratif clair conçu pour produire de vrais résultats.',
            step1Title: 'Étape 1 : Découvrir',
            step1Desc: 'Je commence par une immersion profonde dans votre entreprise, vos objectifs et votre public. Chaque décision est basée sur la clarté, pas sur des suppositions.',
            step2Title: 'Étape 2 : Définir',
            step2Desc: 'De la stratégie aux tableaux d\'ambiance en passant par la direction créative, je définis comment votre marque doit paraître, se sentir et communiquer.',
            step3Title: 'Étape 3 : Concevoir',
            step3Desc: 'C\'est ici que la vision prend vie. Logos, systèmes d\'identité, mouvement et plus encore. Le tout conçu pour se connecter et durer.',
            step4Title: 'Étape 4 : Livrer',
            step4Desc: 'Les actifs finaux, les directives de marque et un paquet d\'adieu pour vous aider à vous lancer en toute confiance. Un soutien continu est disponible.'
        }
    };

    // إضافة أنماط للنتائج غير الموجودة
    const noResultsStyle = document.createElement('style');
    noResultsStyle.textContent = `
        .no-results {
            grid-column: 1 / -1;
            text-align: center;
            padding: 3rem;
            color: var(--light-text-color);
        }
        .dark-mode .no-results {
            color: var(--dark-text-color);
        }
        .no-results i {
            font-size: 4rem;
            margin-bottom: 1rem;
            color: var(--primary-color);
        }
        .no-results h3 {
            margin-bottom: 0.5rem;
            color: inherit;
        }
        .page-link.prev-page, .page-link.next-page {
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        body.rtl .page-link.prev-page i {
            transform: rotate(180deg);
        }
        body.rtl .page-link.next-page i {
            transform: rotate(180deg);
        }
    `;
    document.head.appendChild(noResultsStyle);

    // وظيفة تبديل الوضع (ليلي/نهاري)
    function toggleMode() {
        body.classList.toggle("dark-mode");
        body.classList.toggle("light-mode");
        const isDarkMode = body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", isDarkMode);
        modeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        modeToggle.setAttribute('aria-label', isDarkMode ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن');
    }

    // وظيفة تبديل اللغة
    function setLanguage(lang) {
        // تحديث النصوص باستخدام data-lang-key
        document.querySelectorAll("[data-lang-key]").forEach(element => {
            const key = element.getAttribute("data-lang-key");
            const translation = translations[lang][key];
            if (translation) {
                if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // تحديث النصوص في قسم "كيف نعمل"
        document.querySelector('#how-it-works h2').textContent = translations[lang]['howItWorksTitle'];
        document.querySelector('#how-it-works .subtitle').textContent = translations[lang]['howItWorksSubtitle'];
        
        document.querySelector('.steps-container .step-card:nth-of-type(1) .step-title').textContent = translations[lang]['step1Title'];
        document.querySelector('.steps-container .step-card:nth-of-type(1) .step-description').textContent = translations[lang]['step1Desc'];
        
        document.querySelector('.steps-container .step-card:nth-of-type(2) .step-title').textContent = translations[lang]['step2Title'];
        document.querySelector('.steps-container .step-card:nth-of-type(2) .step-description').textContent = translations[lang]['step2Desc'];
        
        document.querySelector('.steps-container .step-card:nth-of-type(3) .step-title').textContent = translations[lang]['step3Title'];
        document.querySelector('.steps-container .step-card:nth-of-type(3) .step-description').textContent = translations[lang]['step3Desc'];
        
        document.querySelector('.steps-container .step-card:nth-of-type(4) .step-title').textContent = translations[lang]['step4Title'];
        document.querySelector('.steps-container .step-card:nth-of-type(4) .step-description').textContent = translations[lang]['step4Desc'];

        // تحديث اتجاه الصفحة (RTL/LTR)
        if (lang === "ar") {
            document.documentElement.dir = "rtl";
            document.documentElement.lang = "ar";
            body.classList.add("rtl");
            body.classList.remove("ltr");
        } else {
            document.documentElement.dir = "ltr";
            document.documentElement.lang = lang;
            body.classList.add("ltr");
            body.classList.remove("rtl");
        }
        localStorage.setItem("language", lang);
        
        // تحديث placeholder لـ searchInput
        searchInput.placeholder = translations[lang].search_placeholder;
    }

    // تهيئة الصفحة عند التحميل
    function initialize() {
        // تهيئة الوضع الليلي/النهاري
        const savedMode = localStorage.getItem("darkMode");
        if (savedMode === "true") {
            body.classList.add("dark-mode");
            body.classList.remove("light-mode");
            modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            modeToggle.setAttribute('aria-label', 'تفعيل الوضع الفاتح');
        } else {
            body.classList.add("light-mode");
            body.classList.remove("dark-mode");
            modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            modeToggle.setAttribute('aria-label', 'تفعيل الوضع الداكن');
        }

        // تهيئة اللغة
        const savedLang = localStorage.getItem("language") || "ar";
        languageSelect.value = savedLang;
        setLanguage(savedLang);

        // تهيئة AOS
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                easing: 'ease-in-out',
                once: true,
                mirror: false
            });
        }

        // تهيئة Lightbox
        if (typeof lightbox !== 'undefined') {
            lightbox.option({
                'resizeDuration': 200,
                'wrapAround': true,
                'showImageNumberLabel': true,
                'positionFromTop': 100
            });
        }
    }

    // بيانات الأعمال
    const totalWorks = 100;
    const itemsPerPage = 16;
    let allWorks = [];
    let currentPage = 1;

    // فئات الأعمال
    const workCategories = ["شعار", "تغليف", "بطاقة عمل", "تصميم مواقع", "فلاير", "تي شيرت", "رسم", "هوية بصرية"];

    // إنشاء بيانات الأعمال بشكل ديناميكي
    for (let i = 1; i <= totalWorks; i++) {
        const categoryIndex = (i - 1) % workCategories.length;
        const category = workCategories[categoryIndex];
        
        const galleryImages = [
            `images/work${i}/1.jpg`,
            `images/work${i}/2.jpg`,
            `images/work${i}/3.jpg`
        ];
        
        allWorks.push({
            id: `work${i}`,
            title: `تصميم ${category} رقم ${i}`,
            mainImage: galleryImages[0],
            galleryImages: galleryImages,
            category: category,
            details: `هذا العمل هو مثال رائع لتصميم ${category} تم إنشاؤه باستخدام أحدث تقنيات التصميم.`
        });
    }

    // عرض الأعمال في الشبكة
    function renderWorks(works, page = 1) {
        worksGrid.innerHTML = '';
        currentPage = page;
        
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = works.slice(start, end);

        if (paginatedItems.length === 0) {
            const currentLang = localStorage.getItem("language") || "ar";
            worksGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>${translations[currentLang].no_results_heading}</h3>
                    <p>${translations[currentLang].no_results_text}</p>
                </div>
            `;
            paginationContainer.innerHTML = '';
            return;
        }

        paginatedItems.forEach((work, index) => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("item");
            itemDiv.setAttribute("data-aos", "fade-up");
            itemDiv.setAttribute("data-aos-delay", `${(index % 4) * 100}`);
            itemDiv.setAttribute("data-work-id", work.id);
            
            let lightboxLinks = '';
            if (work.galleryImages && work.galleryImages.length > 1) {
                work.galleryImages.slice(1).forEach((imgSrc, imgIndex) => {
                    lightboxLinks += `<a href="${imgSrc}" data-lightbox="work-gallery-${work.id}" data-title="${work.title} - صورة ${imgIndex + 2}"></a>`;
                });
            }
            
            itemDiv.innerHTML = `
                <a href="${work.mainImage}" data-lightbox="work-gallery-${work.id}" class="work-link" data-title="${work.title}">
                    <img src="${work.mainImage}" alt="${work.title}" loading="lazy">
                    <div class="overlay">
                        <i class="fas fa-eye"></i>
                    </div>
                </a>
                ${lightboxLinks}
            `;
            worksGrid.appendChild(itemDiv);
        });
        
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
        if (typeof lightbox !== 'undefined') {
            lightbox.init();
        }
        renderPagination(works);
    }

    // إنشاء أزرار الترقيم
    function renderPagination(works) {
        paginationContainer.innerHTML = '';
        const pageCount = Math.ceil(works.length / itemsPerPage);

        if (pageCount <= 1) return;

        // زر الصفحة السابقة
        if (currentPage > 1) {
            const prevLink = document.createElement("a");
            prevLink.href = "#works";
            prevLink.classList.add("page-link", "prev-page");
            prevLink.innerHTML = '<i class="fas fa-chevron-right"></i>';
            prevLink.addEventListener("click", (e) => {
                e.preventDefault();
                renderWorks(works, currentPage - 1);
                window.scrollTo({
                    top: worksGrid.offsetTop - 100,
                    behavior: 'smooth'
                });
            });
            paginationContainer.appendChild(prevLink);
        }

        // أزرار الصفحات
        for (let i = 1; i <= pageCount; i++) {
            const pageLink = document.createElement("a");
            pageLink.href = "#works";
            pageLink.classList.add("page-link");
            if (i === currentPage) pageLink.classList.add("active");
            pageLink.textContent = i;
            pageLink.addEventListener("click", (e) => {
                e.preventDefault();
                renderWorks(works, i);
                window.scrollTo({
                    top: worksGrid.offsetTop - 100,
                    behavior: 'smooth'
                });
            });
            paginationContainer.appendChild(pageLink);
        }

        // زر الصفحة التالية
        if (currentPage < pageCount) {
            const nextLink = document.createElement("a");
            nextLink.href = "#works";
            nextLink.classList.add("page-link", "next-page");
            nextLink.innerHTML = '<i class="fas fa-chevron-left"></i>';
            nextLink.addEventListener("click", (e) => {
                e.preventDefault();
                renderWorks(works, currentPage + 1);
                window.scrollTo({
                    top: worksGrid.offsetTop - 100,
                    behavior: 'smooth'
                });
            });
            paginationContainer.appendChild(nextLink);
        }
    }

    // وظيفة البحث والترشيح
    function filterWorks(searchTerm) {
        searchTerm = searchTerm.toLowerCase().trim();
        
        if (!searchTerm) {
            return allWorks;
        }
        
        return allWorks.filter(work => 
            work.title.toLowerCase().includes(searchTerm) ||
            work.category.toLowerCase().includes(searchTerm) ||
            work.details.toLowerCase().includes(searchTerm)
        );
    }

    // البحث عند الكتابة
    searchInput.addEventListener("input", (e) => {
        const filteredWorks = filterWorks(e.target.value);
        renderWorks(filteredWorks, 1);
    });

    // البحث عند الضغط على زر البحث
    searchButton.addEventListener("click", () => {
        const filteredWorks = filterWorks(searchInput.value);
        renderWorks(filteredWorks, 1);
    });

    // البحث عند الضغط على Enter
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const filteredWorks = filterWorks(searchInput.value);
            renderWorks(filteredWorks, 1);
        }
    });

    // إضافة المستمعين للأحداث
    modeToggle.addEventListener("click", toggleMode);
    languageSelect.addEventListener("change", (e) => {
        setLanguage(e.target.value);
        // أعد عرض الأعمال بعد تغيير اللغة لتحديث النصوص
        renderWorks(allWorks, currentPage);
    });

    // إضافة مستمعي الأحداث للوسوم
    tags.forEach(tag => {
        tag.addEventListener('click', function(event) {
            event.preventDefault();
            const searchTerm = this.textContent.trim();
            searchInput.value = searchTerm;
            const filteredWorks = filterWorks(searchTerm);
            renderWorks(filteredWorks, 1);
            
            // تمرير الشاشة إلى قسم الأعمال
            window.scrollTo({
                top: worksGrid.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });

    // تشغيل وظيفة التهيئة عند تحميل الصفحة
    initialize();

    // عرض الأعمال للمرة الأولى
    renderWorks(allWorks, 1);
});
