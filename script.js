document.addEventListener("DOMContentLoaded", () => {
    // تحديد العناصر الأساسية في الصفحة
    const body = document.body;
    const modeToggle = document.getElementById("mode-toggle");
    const languageSelect = document.getElementById("language-select");
    const worksGrid = document.getElementById("works-grid");
    const paginationContainer = document.getElementById("pagination-container");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");

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
            search_placeholder: "ابحث عن عمل..."
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
            search_placeholder: "Search for work..."
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
            search_placeholder: "Rechercher un travail..."
        }
    };

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
        
        // تحديث نص زر البحث
        searchInput.placeholder = translations[lang].search_placeholder;
    }

    // تهيئة الصفحة عند التحميل
    function initialize() {
        // تهيئة الوضع الليلي/النهاري
        const savedMode = localStorage.getItem("darkMode");
        if (savedMode === "true") {
            body.classList.remove("light-mode");
            body.classList.add("dark-mode");
            modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            modeToggle.setAttribute('aria-label', 'تفعيل الوضع الفاتح');
        } else {
            body.classList.remove("dark-mode");
            body.classList.add("light-mode");
            modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            modeToggle.setAttribute('aria-label', 'تفعيل الوضع الداكن');
        }

        // تهيئة اللغة
        const savedLang = localStorage.getItem("language") || "ar";
        languageSelect.value = savedLang;
        setLanguage(savedLang);

        // تهيئة AOS
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });

        // تهيئة Lightbox
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'showImageNumberLabel': true,
            'positionFromTop': 100
        });
    }

   // بيانات الأعمال
const totalWorks = 100;
const itemsPerPage = 16;
let allWorks = [];

// فئات الأعمال
const workCategories = ["شعار", "تغليف", "بطاقة عمل", "تصميم مواقع", "فلاير", "تي شيرت", "رسم", "هوية بصرية"];

// إنشاء بيانات الأعمال بشكل ديناميكي
for (let i = 1; i <= totalWorks; i++) {
    const categoryIndex = (i - 1) % workCategories.length;
    const category = workCategories[categoryIndex];
    
    // إنشاء مصفوفة من 3 صور لكل عمل
    const galleryImages = [
        `images/work${i}/1.jpg`,
        `images/work${i}/2.jpg`,
        `images/work${i}/3.jpg`
    ];
    
    allWorks.push({
        id: `work${i}`,
        title: `تصميم ${category} رقم ${i}`,
        mainImage: galleryImages[0], // الصورة الرئيسية التي تظهر في الشبكة
        galleryImages: galleryImages, // جميع صور هذا العمل
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
            worksGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>لم يتم العثور على نتائج</h3>
                    <p>جرب استخدام كلمات بحث أخرى</p>
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
                <a href="works/work.html?id=${work.id}" class="work-link" data-title="${work.title}">
                    <img src="${work.mainImage}" alt="${work.title}" loading="lazy">
                    <div class="overlay">
                        <i class="fas fa-eye"></i>
                    </div>
                </a>
                ${lightboxLinks}
            `;
            worksGrid.appendChild(itemDiv);
        });
        
        // تحديث أزرار AOS بعد إضافة العناصر
        AOS.refresh();
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
            const filteredWorks = filterWorks(searchInput.value);
            renderWorks(filteredWorks, 1);
        }
    });

    // إضافة المستمعين للأحداث
    modeToggle.addEventListener("click", toggleMode);
    languageSelect.addEventListener("change", (e) => setLanguage(e.target.value));

    // تشغيل وظيفة التهيئة عند تحميل الصفحة
    initialize();

    // عرض الأعمال للمرة الأولى
    renderWorks(allWorks, 1);
});

// إضافة أنماط للنتائج غير الموجودة
const noResultsStyle = document.createElement('style');
noResultsStyle.textContent = `
    .no-results {
        grid-column: 1 / -1;
        text-align: center;
        padding: 3rem;
        color: #888;
    }
    
    .no-results i {
        font-size: 4rem;
        margin-bottom: 1rem;
        color: var(--primary-color);
    }
    
    .no-results h3 {
        margin-bottom: 0.5rem;
        color: var(--light-text-color);
    }
    
    .dark-mode .no-results h3 {
        color: var(--dark-text-color);
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

document.addEventListener('DOMContentLoaded', function() {
    const tags = document.querySelectorAll('.tag-link');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    tags.forEach(tag => {
        tag.addEventListener('click', function(event) {
            event.preventDefault(); // يمنع النقر من التوجه إلى أي مكان

            // يقوم بوضع نص الوسم في شريط البحث
            searchInput.value = this.textContent.trim();

            // يقوم بتشغيل البحث تلقائياً
            if(searchButton) {
                searchButton.click();
            }
        });
});
