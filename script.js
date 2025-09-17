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
    const navLinks = document.querySelectorAll('.main-nav a');


    // بيانات اللغات
    const translations = {
        ar: {
            skip_link: "تخطي إلى المحتوى الرئيسي",
            nav_services: "الخدمات",
            nav_how_it_works: "منهجيتنا",
            nav_works: "إبداعاتنا",
            nav_testimonials: "آراء العملاء",
            nav_tools: "أدواتنا",
            nav_contact: "تواصل",
            nav_about_me: "عني",
            services_title: "خدماتنا",
            service_logo: "تصميم الشعارات",
            service_card: "بطاقات العمل",
            service_brochure: "الفلاير والبروشور",
            service_invoice: "الفواتير",
            service_catalog: "الكتالوجات",
            service_social: "قوالب السوشيال ميديا",
            service_packaging: "تصميم التغليف",
            service_tshirt: "القمصان والهوديز",
            tools_title: "أدواتنا",
            works_title: "إبداعاتنا",
            contact_title: "تواصل معنا",
            contact_phone_label: "الهاتف: +213 696 947 598",
            contact_email_label: "البريد الإلكتروني: fennecvisionary@gmail.com",
            copy: "© 2025 Fennec Visionary. جميع الحقوق محفوظة.",
            search_placeholder: "ابحث عن عمل...",
            no_results_heading: "لم يتم العثور على نتائج",
            no_results_text: "جرب استخدام كلمات بحث أخرى",
            howItWorksTitle: 'مراحل العمل',
            howItWorksSubtitle: 'عملية تعاون مدروسة لضمان نتائج ملموسة وفعّالة.',
            step1Title: 'المرحلة 1: البحث ',
            step1Desc: 'أدرس نشاطك وأهدافك وجمهورك لفهم احتياجاتك بوضوح ودقة.',
            step2Title: 'المرحلة 2: التخطيط',
            step2Desc: 'أدرس نشاطك وأهدافك وجمهورك بدقة لفهم احتياجاتك بوضوح وضمان انطلاقة صحيحة.',
            step3Title: 'المرحلة 3: التصميم',
            step3Desc: 'أضع استراتيجية واضحة ورؤية إبداعية متكاملة تعكس هوية علامتك التجارية بصدق.',
            step4Title: 'المرحلة 4: التسليم',
            step4Desc: 'أقدّم الملفات النهائية مع دعم ومتابعة لضمان انطلاقة ناجحة وواثقة لعملك.',
            testimonials_title: "آراء العملاء",
            testimonial_1_text: "تجربة رائعة! المصمم قدم لي هوية بصرية فاقت توقعاتي، كان محترفاً ومتعاوناً جدا.",
            testimonial_1_name: "محمد علي",
            testimonial_1_role: "مدير شركة",
            testimonial_2_text: "أنصح بالتعامل معه بشدة. قام بتصميم موقع ويب بسيط وجذاب في وقت قياسي.",
            testimonial_2_name: "فاطمة الزهراء",
            testimonial_2_role: "مؤسسة شركة ناشئة",
            testimonial_3_text: "عمل متقن وتواصل ممتاز. فهم متطلباتي بسرعة وقدم لي تصميمًا فريدًا ومبدعًا.",
            testimonial_3_name: "عبد القادر",
            testimonial_3_role: "صاحب متجر إلكتروني",
            testimonial_4_text: "المصمم مبدع في أفكاره ومرن في التعديلات. سعيد جدًا بالنتيجة النهائية لتصميم التغليف.",
            testimonial_4_name: "نور الهدى",
            testimonial_4_role: "صاحبة علامة تجارية",
            testimonial_5_text: "بكل احترافية، حوّل رؤيتي إلى تصميم شعار يعبر عن علامتي التجارية تمامًا. شكرًا جزيلًا.",
            testimonial_5_name: "يوسف الخالد",
            testimonial_5_role: "ريادي أعمال",
            testimonial_6_text: "سرعة في الإنجاز وجودة عالية في التصميم. كان اختيارًا موفقًا للتعاون معه في هذا المشروع.",
            testimonial_6_name: "مريم صقر",
            testimonial_6_role: "مديرة مشروع",
            testimonial_7_text: "التصميم الجديد لقائمة الطعام أبهرني. لقد أضاف لمسة عصرية وفنية رائعة.",
            testimonial_7_name: "خالد السعدي",
            testimonial_7_role: "صاحب مطعم",
            testimonial_8_text: "ساعدني في تصميم شعار يعكس فني. النتيجة كانت استثنائية وأشكرك على صبرك واهتمامك بالتفاصيل.",
            testimonial_8_name: "ليلى مراد",
            testimonial_8_role: "فنانة تشكيلية",
            testimonial_9_text: "تصميم إعلاناتي على السوشيال ميديا أحدث فرقاً كبيراً. زيادة في التفاعل والعملاء.",
            testimonial_9_name: "هشام العماري",
            testimonial_9_role: "مدرب شخصي",
            testimonial_10_text: "التعامل كان مريحاً للغاية. فهم احتياجاتي وأضاف لمسات سحرية لتصاميم بطاقات الأعمال.",
            testimonial_10_name: "سارة عبد الله",
            testimonial_10_role: "مصممة أزياء"
        },
        en: {
            skip_link: "Skip to main content",
            nav_services: "Services",
            nav_how_it_works: "Process",
            nav_works: "Creations",
            nav_testimonials: "Reviews",
            nav_tools: "Tools",
            nav_contact: "Contact",
            nav_about_me: "À Propos",
            services_title: "Services",
            service_logo: "Logo Design",
            service_card: "Business Cards",
            service_brochure: "Flyers & Brochures",
            service_invoice: "Invoices",
            service_catalog: "Catalogs",
            service_social: "Social Media Templates",
            service_packaging: "Packaging Design",
            service_tshirt: "T-shirts & Hoodies",
            tools_title: "Our Tools",
            works_title: "Our Creations",
            contact_title: "Nos Contacts",
            contact_phone_label: "Phone: +213 696 947 598",
            contact_email_label: "Email: fennecvisionary@gmail.com",
            copy: "© 2025 Fennec Visionary. All rights reserved.",
            search_placeholder: "Search for work...",
            no_results_heading: "No Results Found",
            no_results_text: "Try using different keywords",
            howItWorksTitle: 'How We Work',
            howItWorksSubtitle: 'A carefully crafted collaboration process designed to deliver real and effective results.',
            step1Title: 'Phase 1: Discovery',
            step1Desc: 'I study your business, goals, and audience to fully understand your needs.',
            step2Title: 'Phase 2: Planning',
            step2Desc: 'I build a clear strategy and creative direction aligned with your brand identity.',
            step3Title: 'Phase 3: Design',
            step3Desc: 'I shape ideas into a consistent and memorable visual identity.',
            step4Title: 'Phase 4: Delivery',
            step4Desc: 'I provide the final files with support to ensure a confident launch.',
            testimonials_title: "Customer Reviews",
            testimonial_1_text: "A great experience! The designer provided a visual identity that exceeded my expectations. He was very professional and cooperative.",
            testimonial_1_name: "Mohamed Ali",
            testimonial_1_role: "Company Manager",
            testimonial_2_text: "I highly recommend working with him. He designed a simple yet attractive website in record time.",
            testimonial_2_name: "Fatima Al-Zahra",
            testimonial_2_role: "Startup Founder",
            testimonial_3_text: "Excellent work and communication. He quickly understood my requirements and delivered a unique and creative design.",
            testimonial_3_name: "Abdul Qader",
            testimonial_3_role: "Online Store Owner",
            testimonial_4_text: "The designer is creative with his ideas and flexible with modifications. I am very happy with the final packaging design.",
            testimonial_4_name: "Noor Al-Huda",
            testimonial_4_role: "Brand Owner",
            testimonial_5_text: "With complete professionalism, he transformed my vision into a logo design that perfectly represents my brand. Thank you very much.",
            testimonial_5_name: "Youssef Al-Khaled",
            testimonial_5_role: "Entrepreneur",
            testimonial_6_text: "Fast execution and high-quality design. It was a successful choice to collaborate with him on this project.",
            testimonial_6_name: "Mariam Saqr",
            testimonial_6_role: "Project Manager",
            testimonial_7_text: "The new menu design for my restaurant impressed me. It added a wonderful modern and artistic touch.",
            testimonial_7_name: "Khaled Al-Saadi",
            testimonial_7_role: "Restaurant Owner",
            testimonial_8_text: "He helped me design a logo that reflects my art. The result was exceptional, and I thank you for your patience and attention to detail.",
            testimonial_8_name: "Laila Mourad",
            testimonial_8_role: "Fine Artist",
            testimonial_9_text: "The design of my social media ads made a big difference. There was an increase in engagement and clients.",
            testimonial_9_name: "Hisham Al-Ammari",
            testimonial_9_role: "Personal Trainer",
            testimonial_10_text: "The experience was very comfortable. He understood my needs and added magical touches to the business card designs.",
            testimonial_10_name: "Sara Abdullah",
            testimonial_10_role: "Fashion Designer"
        },
        fr: {
            skip_link: "Passer au contenu principal",
            nav_services: "Services",
            nav_how_it_works: "Processus",
            nav_works: "Créations",
            nav_tools: "Outils",
            nav_testimonials: "Avis",
            nav_contact: "Contact",
            nav_about_me: "About",
            services_title: "Mes Services",
            service_logo: "Conception de Logos",
            service_card: "Cartes de Visite",
            service_brochure: "Flyers & Brochures",
            service_invoice: "Factures",
            service_catalog: "Catalogues",
            service_social: "Modèles pour Réseaux Sociaux",
            service_packaging: "Conception d'Emballages",
            service_tshirt: "T-shirts et Hoodies",
            tools_title: "Nos Outils",
            works_title: "Nos Créations",
            contact_title: "Nos Contacts",
            contact_phone_label: "Téléphone: +213 696 947 598",
            contact_email_label: "E-mail: fennecvisionary@gmail.com",
            copy: "© 2025 Fennec Visionary. Tous droits réservés.",
            search_placeholder: "Rechercher un travail...",
            no_results_heading: "Aucun Résultat Trouvé",
            no_results_text: "Essayez d'utiliser des mots-clés différents",
            howItWorksTitle: 'Étapes de Travail',
            howItWorksSubtitle: 'Un processus de collaboration conçu pour garantir des résultats concrets et efficaces.',
            step1Title: 'Phase 1: Découverte',
            step1Desc: 'J’étudie votre activité, vos objectifs et votre audience pour bien cerner vos besoins',
            step2Title: 'Phase 2: Planification',
            step2Desc: 'J’élabore une stratégie claire et une direction créative adaptées à l’identité de votre marque.',
            step3Title: 'Phase 3: Design',
            step3Desc: 'Je transforme les idées en une identité visuelle cohérente et mémorable.',
            step4Title: 'Phase 4: Livraison',
            step4Desc: 'Je fournis les fichiers finaux avec un accompagnement pour un lancement en toute confiance.',
            testimonials_title: "Avis Clients",
            testimonial_1_text: "Une excellente expérience ! Le designer a fourni une identité visuelle qui a dépassé mes attentes. Il a été très professionnel et coopératif.",
            testimonial_1_name: "Mohamed Ali",
            testimonial_1_role: "Manager d'entreprise",
            testimonial_2_text: "Je recommande vivement de travailler avec lui. Il a conçu un site web simple mais attrayant en un temps record.",
            testimonial_2_name: "Fatima Al-Zahra",
            testimonial_2_role: "Fondatrice de startup",
            testimonial_3_text: "Un travail impeccable et une excellente communication. Il a rapidement compris mes exigences et a livré un design unique et créatif.",
            testimonial_3_name: "Abdul Qader",
            testimonial_3_role: "Propriétaire de boutique en ligne",
            testimonial_4_text: "Le designer est créatif dans ses idées et flexible avec les modifications. Je suis très satisfait du design final de l'emballage.",
            testimonial_4_name: "Noor Al-Huda",
            testimonial_4_role: "Propriétaire de marque",
            testimonial_5_text: "Avec un professionnalisme total, il a transformé ma vision en un logo qui représente parfaitement ma marque. Merci beaucoup.",
            testimonial_5_name: "Youssef Al-Khaled",
            testimonial_5_role: "Entrepreneur",
            testimonial_6_text: "Rapidité d'exécution et haute qualité de conception. C'était un excellent choix de collaborer avec lui sur ce projet.",
            testimonial_6_name: "Mariam Saqr",
            testimonial_6_role: "Chef de projet",
            testimonial_7_text: "Le nouveau design du menu de mon restaurant m'a impressionné. Il a ajouté une touche moderne et artistique merveilleuse.",
            testimonial_7_name: "Khaled Al-Saadi",
            testimonial_7_role: "Propriétaire de restaurant",
            testimonial_8_text: "Il m'a aidé à concevoir un logo qui reflète mon art. Le résultat a été exceptionnel, et je vous remercie pour votre patience et votre attention aux détails.",
            testimonial_8_name: "Laila Mourad",
            testimonial_8_role: "Artiste plasticienne",
            testimonial_9_text: "La conception de mes publicités sur les réseaux sociaux a fait une grande différence. Il y a eu une augmentation de l'engagement et des clients.",
            testimonial_9_name: "Hisham Al-Ammari",
            testimonial_9_role: "Coach personnel",
            testimonial_10_text: "La collaboration a été très agréable. Il a compris mes besoins et a ajouté des touches magiques aux designs de cartes de visite.",
            testimonial_10_name: "Sara Abdullah",
            testimonial_10_role: "Créatrice de mode"
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

      /// تحديث نصوص قسم "كيف نعمل"
document.querySelector('#how-it-works h2').textContent = translations[lang]['howItWorksTitle'];
document.querySelector('#how-it-works .subtitle').textContent = translations[lang]['howItWorksSubtitle'];
        
// تحديث نصوص كل خطوة بشكل ديناميكي
for (let i = 1; i <= 4; i++) {
    document.querySelector(`.steps-container .step-card:nth-of-type(${i}) .step-title`).textContent = translations[lang][`step${i}Title`];
    document.querySelector(`.steps-container .step-card:nth-of-type(${i}) .step-description`).textContent = translations[lang][`step${i}Desc`];
}

// إضافة الكود الخاص بتغيير الاتجاه
if (lang === "ar") {
    document.body.classList.add("rtl");
    document.body.classList.remove("ltr");
} else {
    document.body.classList.add("ltr");
    document.body.classList.remove("rtl");
}
// JavaScript لتأثير النبض وتغيير الصورة
document.addEventListener('DOMContentLoaded', () => {
    const dynamicTitle = document.querySelector('.dynamic-text-title');
    const toolItems = document.querySelectorAll('.tool-item');
    const hoverImage = document.getElementById('hover-tool-image');

    // تأثير النبض على الماوس
    if (dynamicTitle) {
        dynamicTitle.textContent = "مصمم غرافيكي"; // العنوان الثابت
        dynamicTitle.addEventListener('mousemove', (e) => {
            const cursor = document.createElement('span');
            cursor.classList.add('pulse-cursor');
            cursor.style.left = `${e.offsetX}px`;
            cursor.style.top = `${e.offsetY}px`;
            dynamicTitle.appendChild(cursor);
            setTimeout(() => {
                cursor.remove();
            }, 500);
        });
    }

    // تبديل الصور عند التمرير
    toolItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            const toolName = item.getAttribute('data-tool-name');
            hoverImage.src = `images/${toolName}-full.jpg`; // تأكد من وجود هذه الصور
            hoverImage.classList.remove('hidden');
        });
        item.addEventListener('mouseout', () => {
            hoverImage.classList.add('hidden');
        });
    });
});
        // تحديث نصوص آراء العملاء
        for (let i = 1; i <= 10; i++) {
            const testimonialCard = document.querySelector(`.testimonial-card:nth-of-type(${i})`);
            if (testimonialCard) {
                const nameElement = testimonialCard.querySelector('h4');
                const roleElement = testimonialCard.querySelector('span');
                const textElement = testimonialCard.querySelector('p');
                
                if (nameElement) nameElement.textContent = translations[lang][`testimonial_${i}_name`];
                if (roleElement) roleElement.textContent = translations[lang][`testimonial_${i}_role`];
                if (textElement) textElement.textContent = translations[lang][`testimonial_${i}_text`];
            }
        }
        
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
    
    // إضافة فئة "active" للرابط عند النقر عليه
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });


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
const itemsPerPage = 12;
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
            e.preventDefault();
            const filteredWorks = filterWorks(searchInput.value);
            renderWorks(filteredWorks, 1);
        }
    });

    // إضافة المستمعين للأحداث
    modeToggle.addEventListener("click", toggleMode);
    languageSelect.addEventListener("change", (e) => {
        setLanguage(e.target.value);
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
