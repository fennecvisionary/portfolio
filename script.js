document.addEventListener("DOMContentLoaded", () => {
    // تحديد العناصر الأساسية في الصفحة
    const body = document.body;
    const modeToggle = document.getElementById("mode-toggle");
    const languageSelect = document.getElementById("language-select");
    const worksSection = document.getElementById("works");
    const gridContainer = worksSection.querySelector(".grid");
    const paginationContainer = worksSection.querySelector(".pagination");
    const searchInput = document.getElementById("searchInput");

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
        }
    };

    // وظيفة تبديل الوضع (ليلي/نهاري)
    function toggleMode() {
        body.classList.toggle("dark-mode");
        body.classList.toggle("light-mode");
        const isDarkMode = body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", isDarkMode);
        modeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
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
            body.classList.add("ar");
        } else {
            body.classList.remove("ar");
        }
        localStorage.setItem("language", lang);
    }

    // تهيئة الصفحة عند التحميل
    function initialize() {
        // تهيئة الوضع الليلي/النهاري
        const savedMode = localStorage.getItem("darkMode");
        if (savedMode === "true") {
            body.classList.remove("light-mode");
            body.classList.add("dark-mode");
            modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            body.classList.remove("dark-mode");
            body.classList.add("light-mode");
            modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }

        // تهيئة اللغة
        const savedLang = localStorage.getItem("language") || "ar";
        languageSelect.value = savedLang;
        setLanguage(savedLang);

        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // إنشاء عناصر الأعمال تلقائيًا (يمكنك تعديل عددها هنا)
    const totalWorks = 100;
    const itemsPerPage = 16;
    let allWorks = [];

    // بيانات افتراضية للأعمال
    const workImages = ["work1.jpg", "work2.jpg", "work3.jpg", "work4.jpg", "work5.jpg", "work6.jpg", "work7.jpg", "work8.jpg"];
    const workTitles = ["شعار", "تغليف", "بطاقة عمل", "وسائل تواصل", "فلاير", "تي شيرت", "فني", "موقع"];

    for (let i = 1; i <= totalWorks; i++) {
        const imageIndex = (i - 1) % workImages.length;
        const imageFile = workImages[imageIndex];
        const titleIndex = (i - 1) % workTitles.length;
        const workTitle = workTitles[titleIndex];

        allWorks.push({
            id: `work${i}`,
            image: `images/${imageFile}`,
            title: `تصميم ${workTitle} العمل ${i}`,
            link: `works/work${i}.html`
        });
    }

    function renderWorks(works, page = 1) {
        gridContainer.innerHTML = ''; // مسح المحتوى الحالي
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = works.slice(start, end);

        paginatedItems.forEach(work => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("item");
            itemDiv.setAttribute("data-aos", "fade-up");
            itemDiv.setAttribute("data-aos-delay", "100");
            itemDiv.setAttribute("data-work-id", work.id);
            
            itemDiv.innerHTML = `
                <a href="${work.link}">
                    <img src="${work.image}" alt="${work.title}" loading="lazy">
                </a>
                <div class="overlay">
                    <a href="${work.link}" class="details-link" aria-label="شاهد تفاصيل العمل ${work.id.replace('work', '')}"><i class="fas fa-arrow-up-right-from-square"></i></a>
                </div>
            `;
            gridContainer.appendChild(itemDiv);
        });

        // تحديث أزرار AOS بعد إضافة العناصر
        AOS.refresh();
    }

    function renderPagination(works) {
        paginationContainer.innerHTML = '';
        const pageCount = Math.ceil(works.length / itemsPerPage);

        for (let i = 1; i <= pageCount; i++) {
            const pageLink = document.createElement("a");
            pageLink.href = "#works";
            pageLink.classList.add("page-link");
            pageLink.textContent = i;
            pageLink.addEventListener("click", (e) => {
                e.preventDefault();
                renderWorks(works, i);
                document.querySelectorAll(".page-link").forEach(link => link.classList.remove("active"));
                pageLink.classList.add("active");
            });
            paginationContainer.appendChild(pageLink);
        }

        // تفعيل الصفحة الأولى تلقائيًا
        const firstPageLink = paginationContainer.querySelector(".page-link");
        if (firstPageLink) {
            firstPageLink.classList.add("active");
        }
    }

    // وظيفة البحث والترشيح
    searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const filteredWorks = allWorks.filter(work => 
            work.title.toLowerCase().includes(searchTerm)
        );
        renderWorks(filteredWorks);
        renderPagination(filteredWorks);
    });

    // إضافة المستمعين للأحداث
    modeToggle.addEventListener("click", toggleMode);
    languageSelect.addEventListener("change", (e) => setLanguage(e.target.value));

    // تشغيل وظيفة التهيئة عند تحميل الصفحة
    initialize();

    // عرض الأعمال للمرة الأولى
    renderWorks(allWorks, 1);
    renderPagination(allWorks);

});
// Carousel functionality for work pages
function initializeCarousel(container) {
    if (!container) return;

    const slide = container.querySelector('.carousel-slide');
    const dotsContainer = container.querySelector('.carousel-dots');
    const prevButton = document.getElementById('prev-work');
    const nextButton = document.getElementById('next-work');

    if (!slide || !dotsContainer) return;

    const images = slide.querySelectorAll('img');
    let currentIndex = 0;

    function updateCarousel() {
        const offset = -currentIndex * 100;
        slide.style.transform = `translateX(${offset}%)`;
        updateDots();
    }

    function updateDots() {
        dotsContainer.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    dotsContainer.querySelectorAll('.dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
            updateCarousel();
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        });
    }

    // Initial state
    updateCarousel();
}

// Initialize the carousel on page load
document.addEventListener('DOMContentLoaded', () => {
    const workDetailsSection = document.querySelector('.work-details');
    if (workDetailsSection) {
        initializeCarousel(workDetailsSection.querySelector('.carousel-container'));
    }
});
