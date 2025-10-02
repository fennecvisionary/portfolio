document.addEventListener("DOMContentLoaded", () => {
    // تحديد العناصر الأساسية في الصفحة
    const body = document.body;
    const modeToggle = document.getElementById("mode-toggle");
    const languageSelect = document.getElementById("language-select");
    const worksGrid = document.getElementById("works-grid");
    const paginationContainer = document.getElementById("pagination-container");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const tags = document.querySelectorAll(".tag-link");
    const navLinks = document.querySelectorAll(".main-nav a");
    const hoverImage = document.getElementById("hover-tool-image");

    // إضافة تعريفات العناصر الجديدة للقائمة المنسدلة (تعديل القائمة)
    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");
    const menuClose = document.querySelector(".menu-close"); // الزر الجديد للإغلاق

    // وظيفة إغلاق القائمة
    function closeMenu() {
        mainNav.classList.remove("is-open");
    }

    // وظيفة فتح/إغلاق القائمة
    function toggleMenu() {
        mainNav.classList.toggle("is-open");
    }

    // ربط أزرار التحكم بالوظائف
    if (menuToggle) {
        menuToggle.addEventListener("click", toggleMenu);
    }
    if (menuClose) {
        menuClose.addEventListener("click", closeMenu);
    }

    // إغلاق القائمة عند النقر على أي رابط (لتسهيل التنقل في الهاتف)
    navLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    // بيانات اللغات (محتوى ملف data.js) - تم نقله هنا لتوفير الكود كاملاً
    const translations = {
        ar: {
            skip_link: "تخطي إلى المحتوى الرئيسي",
            menu_toggle: "فتح القائمة",
            nav_services: "خدماتي",
            nav_how_it_works: "كيف نعمل",
            nav_works: "أعمالي",
            nav_testimonials: "آراء العملاء",
            nav_tools: "أدواتنا",
            nav_contact: "تواصل معي",
            nav_about_me: "عني",
            header_btn_contact: "تواصل معي",
            hero_title: "تصميمات بصرية تخطف الأنظار، وتحقق الأهداف",
            hero_description: "أنا Fennec Visionary، مصمم جرافيك متخصص في بناء العلامات التجارية والهويات البصرية القوية التي تترك أثراً.",
            hero_btn_works: "شاهد أعمالي",
            hero_btn_contact: "اطلب خدمتي",
            services_title: "خدماتي",
            services_subtitle: "حلول تصميم شاملة لهويتك البصرية وتواجدك الرقمي.",
            service_logo: "تصميم الشعارات",
            service_logo_desc: "إنشاء شعارات فريدة وعصرية تعكس جوهر علامتك التجارية.",
            service_card: "بطاقات العمل",
            service_card_desc: "تصميم بطاقات عمل احترافية تترك انطباعاً مميزاً.",
            service_brochure: "الفلاير والبروشور",
            service_brochure_desc: "تصاميم مطبوعة إبداعية لإيصال رسالتك بوضوح.",
            service_invoice: "الفواتير",
            service_invoice_desc: "قوالب فواتير ووثائق عمل أنيقة ومنظمة.",
            service_catalog: "الكتالوجات",
            service_catalog_desc: "تصميم كتالوجات منتجات رقمية ومطبوعة جذابة.",
            service_social: "قوالب السوشيال ميديا",
            service_social_desc: "هوية موحدة وجاهزة للاستخدام على منصات التواصل.",
            service_packaging: "تصميم التغليف",
            service_packaging_desc: "حلول تغليف مبتكرة تلفت الانتباه في الرفوف.",
            service_tshirt: "تيشرتات",
            service_tshirt_desc: "تصاميم فريدة ومبتكرة للملابس والمطبوعات.",
            works_title: "إبداعاتنا",
            works_subtitle: "جولة سريعة في أحدث أعمالنا المختارة بعناية.",
            search_placeholder: "ابحث عن تصميم محدد...",
            search_button: "بحث",
            tag_all: "الكل",
            tag_logos: "شعارات",
            tag_branding: "هوية بصرية",
            tag_social_media: "سوشيال ميديا",
            tag_packaging: "تغليف",
            tag_print_design: "تصميم مطبوع",
            how_it_works_title: "منهجيتنا في العمل",
            how_it_works_subtitle: "عملية مدروسة لضمان أفضل النتائج والتعبير عن رؤيتك بدقة.",
            step_brief: "الإحاطة والتحليل",
            step_brief_desc: "نستمع جيداً لاحتياجاتك، رؤيتك، وجمهورك المستهدف لنفهم المشروع بالكامل.",
            step_concept: "وضع المفهوم الأساسي",
            step_concept_desc: "نقدم مقترحات أولية ومفاهيم تصميمية مبتكرة تتوافق مع الإحاطة.",
            step_design: "التصميم والتطوير",
            step_design_desc: "نطور التصميمات المختارة، مع التركيز على التفاصيل والدقة البصرية.",
            step_final: "المراجعة والتسليم",
            step_final_desc: "نقوم بالمراجعات النهائية وتسليم الملفات المصدرية بجودة عالية.",
            testimonials_title: "آراء العملاء",
            testimonials_subtitle: "ما يقوله عملاؤنا عن التجربة والنتائج.",
            testimonial_1_text: "تصميم شعار احترافي ومبتكر، تجاوز توقعاتنا. السرعة في الإنجاز وجودة العمل لا تُضاهى. أنصح به بشدة!",
            testimonial_1_name: "أحمد س.",
            testimonial_1_role: "مدير تسويق",
            testimonial_2_text: "خدمة عملاء ممتازة وتفهم عميق للمتطلبات. ساهمت تصاميمهم في نقل علامتنا التجارية إلى مستوى جديد من التميز.",
            testimonial_2_name: "ليلى ح.",
            testimonial_2_role: "رائدة أعمال",
            testimonial_3_text: "أفضل مصمم تعاملت معه حتى الآن. الدقة في المواعيد والاحترافية في التعامل مع التعديلات شيء مذهل. شكراً جزيلاً!",
            testimonial_3_name: "خالد ع.",
            testimonial_3_role: "مالك شركة",
            about_me_title: "عني",
            about_me_p1: "أهلاً بك، أنا **Fennec Visionary**، مصمم جرافيك متمرس بخبرة تزيد عن 7 سنوات في تحويل الأفكار إلى هويات بصرية قوية ومؤثرة.",
            about_me_p2: "شغفي يكمن في تصميم **الشعارات، الهويات البصرية، وتصاميم السوشيال ميديا**، مع التركيز دائماً على الابتكار والوضوح الوظيفي للتصميم.",
            about_me_p3: "أؤمن بأن التصميم الجيد ليس مجرد مظهر جميل، بل هو حل لمشكلة تسويقية ويحمل رسالة واضحة. فلنتعاون سوياً لبناء بصمتك البصرية الفريدة.",
            about_me_btn_contact: "تواصل الآن",
            tools_title: "الأدوات التي أستخدمها",
            tool_photoshop: "Adobe Photoshop",
            tool_illustrator: "Adobe Illustrator",
            tool_indesign: "Adobe InDesign",
            tool_aftereffects: "Adobe After Effects",
            tool_figma: "Figma",
            contact_title: "تواصل معي",
            contact_subtitle: "هل أنت مستعد لبدء مشروعك القادم؟ تواصل معي اليوم!",
            form_name: "الاسم الكامل",
            form_email: "البريد الإلكتروني",
            form_service: "الخدمة المطلوبة",
            form_service_select: "اختر خدمة",
            form_service_other: "أخرى",
            form_message: "رسالتك",
            form_submit: "إرسال الرسالة",
            social_links_title: "أو تواصل عبر:"
        },
        en: {
            skip_link: "Skip to main content",
            menu_toggle: "Open Menu",
            nav_services: "Services",
            nav_how_it_works: "How I Work",
            nav_works: "My Works",
            nav_testimonials: "Testimonials",
            nav_tools: "Tools",
            nav_contact: "Contact Me",
            nav_about_me: "About Me",
            header_btn_contact: "Get In Touch",
            hero_title: "Visionary Designs That Capture Attention and Achieve Goals",
            hero_description: "I am Fennec Visionary, a graphic designer specializing in building strong, impactful visual identities and branding.",
            hero_btn_works: "View My Works",
            hero_btn_contact: "Request Service",
            services_title: "My Services",
            services_subtitle: "Comprehensive design solutions for your visual identity and digital presence.",
            service_logo: "Logo Design",
            service_logo_desc: "Creating unique and modern logos that reflect the core of your brand.",
            service_card: "Business Cards",
            service_card_desc: "Designing professional business cards that leave a lasting impression.",
            service_brochure: "Flyers and Brochures",
            service_brochure_desc: "Creative print designs to clearly convey your message.",
            service_invoice: "Invoices",
            service_invoice_desc: "Elegant and organized invoice and business document templates.",
            service_catalog: "Catalogs",
            service_catalog_desc: "Designing attractive digital and print product catalogs.",
            service_social: "Social Media Templates",
            service_social_desc: "Unified and ready-to-use identity for social media platforms.",
            service_packaging: "Packaging Design",
            service_packaging_desc: "Innovative packaging solutions that stand out on shelves.",
            service_tshirt: "T-Shirts",
            service_tshirt_desc: "Unique and creative designs for apparel and prints.",
            works_title: "My Creative Works",
            works_subtitle: "A quick tour of my carefully selected latest projects.",
            search_placeholder: "Search for a specific design...",
            search_button: "Search",
            tag_all: "All",
            tag_logos: "Logos",
            tag_branding: "Branding",
            tag_social_media: "Social Media",
            tag_packaging: "Packaging",
            tag_print_design: "Print Design",
            how_it_works_title: "My Working Methodology",
            how_it_works_subtitle: "A well-thought-out process to ensure the best results and accurate expression of your vision.",
            step_brief: "Briefing & Analysis",
            step_brief_desc: "We carefully listen to your needs, vision, and target audience to fully understand the project.",
            step_concept: "Concept Development",
            step_concept_desc: "We present initial proposals and innovative design concepts aligned with the brief.",
            step_design: "Design & Development",
            step_design_desc: "We develop the chosen designs, focusing on visual detail and accuracy.",
            step_final: "Review & Delivery",
            step_final_desc: "We conduct final reviews and deliver high-quality source files.",
            testimonials_title: "Client Testimonials",
            testimonials_subtitle: "What our clients say about the experience and results.",
            testimonial_1_text: "Professional and innovative logo design, exceeding our expectations. The speed of execution and quality of work are unmatched. Highly recommended!",
            testimonial_1_name: "Ahmed S.",
            testimonial_1_role: "Marketing Manager",
            testimonial_2_text: "Excellent customer service and deep understanding of requirements. Their designs helped elevate our brand to a new level of excellence.",
            testimonial_2_name: "Laila H.",
            testimonial_2_role: "Entrepreneur",
            testimonial_3_text: "The best designer I've dealt with so far. The punctuality and professionalism in handling modifications are amazing. Thank you very much!",
            testimonial_3_name: "Khaled A.",
            testimonial_3_role: "Company Owner",
            about_me_title: "About Me",
            about_me_p1: "Hello, I am **Fennec Visionary**, an experienced graphic designer with over 7 years of expertise in transforming ideas into powerful and influential visual identities.",
            about_me_p2: "My passion lies in designing **Logos, Visual Identities, and Social Media Graphics**, always focusing on innovation and functional clarity in design.",
            about_me_p3: "I believe good design is not just a beautiful appearance; it's a solution to a marketing problem and carries a clear message. Let's collaborate to build your unique visual footprint.",
            about_me_btn_contact: "Contact Now",
            tools_title: "Tools I Use",
            tool_photoshop: "Adobe Photoshop",
            tool_illustrator: "Adobe Illustrator",
            tool_indesign: "Adobe InDesign",
            tool_aftereffects: "Adobe After Effects",
            tool_figma: "Figma",
            contact_title: "Get In Touch",
            contact_subtitle: "Ready to start your next project? Contact me today!",
            form_name: "Full Name",
            form_email: "Email Address",
            form_service: "Requested Service",
            form_service_select: "Select a service",
            form_service_other: "Other",
            form_message: "Your Message",
            form_submit: "Send Message",
            social_links_title: "Or connect via:"
        }
    };


    // وظيفة تطبيق اللغة
    function applyLanguage(lang) {
        const t = translations[lang];
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (t[key]) {
                if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
                    el.setAttribute('placeholder', t[key]);
                } else {
                    el.textContent = t[key];
                }
            }
        });
        // Update direction
        body.classList.remove("rtl", "ltr");
        body.classList.add(lang === "en" ? "ltr" : "rtl");
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', lang === "en" ? "ltr" : "rtl");
    }

    // ===================================
    // بيانات الأعمال المُنشأة (100 عمل بـ 3 صور)
    // ===================================
    let worksData = [];
    const NUM_WORKS = 100;
    const allTags = ['logos', 'branding', 'social_media', 'packaging', 'print_design'];

    // وظيفة لإنشاء 100 عمل بـ 3 صور لكل عمل (لأغراض الاختبار)
    function generateDummyWorks(count) {
        const dummyWorks = [];
        for (let i = 1; i <= count; i++) {
            const randomTags = [allTags[Math.floor(Math.random() * allTags.length)]];
            if (Math.random() > 0.6) {
                let secondTag = allTags[Math.floor(Math.random() * allTags.length)];
                if (secondTag !== randomTags[0]) {
                    randomTags.push(secondTag);
                }
            }
            const workID = String(i).padStart(3, '0'); // مثل 001, 002
            dummyWorks.push({
                id: i,
                title_key: `work_title_${i}`,
                desc_key: `work_desc_${i}`,
                tags: randomTags,
                // مسارات صور وهمية بـ 3 صور (يجب استبدالها بمسارات صورك الحقيقية)
                images: [
                    `images/works/work-${workID}-1.jpg`,
                    `images/works/work-${workID}-2.jpg`,
                    `images/works/work-${workID}-3.jpg`,
                ],
            });

            // إضافة ترجمة وهمية لبيانات الترجمة الرئيسية
            translations.ar[`work_title_${i}`] = `تصميم إبداعي رقم ${i}`;
            translations.ar[`work_desc_${i}`] = `تفاصيل العمل ${i} في ${randomTags[0]}`;
            translations.en[`work_title_${i}`] = `Creative Design No. ${i}`;
            translations.en[`work_desc_${i}`] = `Details for work ${i} in ${randomTags[0]}`;
        }
        return dummyWorks;
    }

    worksData = generateDummyWorks(NUM_WORKS);


    // ===================================
    // منطق عرض الأعمال (مع تحديث السلايدر)
    // ===================================
    const itemsPerPage = 6;
    let currentPage = 1;
    let currentTag = 'all';
    let currentSearch = '';


    // ** وظيفة تهيئة السلايدر (Swiper) **
    function initializeSwipers() {
        // نستخدم setTimeout لضمان أن Swiper سيتم تهيئته بعد اكتمال عرض DOM
        setTimeout(() => {
            document.querySelectorAll('.work-swiper-item').forEach(swiperElement => {
                const isRTL = body.classList.contains('rtl');

                // التحقق ما إذا كان Swiper قد تم تهيئته مسبقاً على هذا العنصر
                if (swiperElement.swiper) {
                    swiperElement.swiper.destroy(true, true);
                }

                new Swiper(swiperElement, {
                    direction: 'horizontal',
                    loop: true, // التنقل الدائري بين الصور
                    effect: 'slide',
                    speed: 400,
                    // التنقل بواسطة الأزرار
                    navigation: {
                        nextEl: swiperElement.querySelector('.swiper-button-next'),
                        prevEl: swiperElement.querySelector('.swiper-button-prev'),
                    },
                    // التنقل بواسطة النقاط (الترقيم)
                    pagination: {
                        el: swiperElement.querySelector('.swiper-pagination'),
                        clickable: true,
                    },
                    // دعم الاتجاه من اليمين لليسار
                    rtl: isRTL,
                });
            });
        }, 50); // تأخير بسيط لضمان تهيئة DOM
    }


    function loadWorks() {
        if (worksData.length === 0) {
            worksGrid.innerHTML = `<p class="text-center">عفواً، لم يتم تحميل بيانات الأعمال.</p>`;
            return;
        }

        worksGrid.classList.remove('loading');

        // 1. Filter by Tag
        let filteredWorks = worksData.filter(work => {
            if (currentTag === 'all') return true;
            return work.tags.includes(currentTag);
        });

        // 2. Filter by Search (case-insensitive)
        if (currentSearch) {
            const searchLower = currentSearch.toLowerCase();
            const lang = localStorage.getItem("siteLang") || 'ar';

            filteredWorks = filteredWorks.filter(work => {
                const title = translations[lang][work.title_key] || '';
                const titleMatch = title.toLowerCase().includes(searchLower);
                const tagsMatch = work.tags.some(tag => tag.toLowerCase().includes(searchLower));
                return titleMatch || tagsMatch;
            });
        }

        const totalPages = Math.ceil(filteredWorks.length / itemsPerPage);
        currentPage = Math.min(currentPage, totalPages > 0 ? totalPages : 1);

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const worksToDisplay = filteredWorks.slice(start, end);

        worksGrid.innerHTML = '';
        const lang = localStorage.getItem("siteLang") || 'ar';


        if (worksToDisplay.length === 0) {
            worksGrid.innerHTML = `<p class="text-center">عفواً، لا توجد نتائج مطابقة لفلتر البحث أو التصنيف المحدد.</p>`;
        } else {
            worksToDisplay.forEach(work => {
                const title = translations[lang][work.title_key] || work.title_key;

                const item = document.createElement('div');
                item.className = 'work-item';
                item.setAttribute('data-aos', 'zoom-in');
                item.setAttribute('data-tags', work.tags.join(' '));

                // الهيكل الجديد للسلايدر (Swiper)
                item.innerHTML = `
                    <div class="swiper-container work-swiper-item" dir="ltr">
                        <div class="swiper-wrapper">
                            ${work.images.map((imgUrl, index) => `
                                <div class="swiper-slide">
                                    <a href="${imgUrl}" data-lightbox="work-group-${work.id}" data-title="${title} (صورة ${index + 1}/3)" aria-label="عرض العمل: ${title} - صورة ${index + 1}">
                                        <img src="${imgUrl}" alt="${title} صورة ${index + 1}">
                                    </a>
                                </div>
                            `).join('')}
                        </div>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-pagination"></div>
                    </div>
                `;
                worksGrid.appendChild(item);
            });

            // تهيئة السلايدرات بعد إضافة العناصر لـ DOM
            initializeSwipers();
        }

        renderPagination(totalPages);
    }

    // وظيفة عرض التنقل بين الصفحات (التقليب بين الأعمال)
    function renderPagination(totalPages) {
        paginationContainer.innerHTML = '';
        const isRTL = body.classList.contains('rtl');

        if (totalPages > 1) {
            // زر السابق
            const prevLink = document.createElement('a');
            prevLink.href = "#works";
            prevLink.textContent = isRTL ? '>' : '<';
            prevLink.className = `page-link ${currentPage === 1 ? 'disabled' : ''}`;
            prevLink.addEventListener('click', (e) => {
                e.preventDefault();
                if (currentPage > 1) {
                    currentPage--;
                    loadWorks();
                }
            });
            paginationContainer.appendChild(prevLink);

            // أرقام الصفحات
            for (let i = 1; i <= totalPages; i++) {
                const pageLink = document.createElement('a');
                pageLink.href = "#works";
                pageLink.textContent = i;
                pageLink.className = `page-link ${currentPage === i ? 'active' : ''}`;
                pageLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    currentPage = i;
                    loadWorks();
                });
                paginationContainer.appendChild(pageLink);
            }

            // زر التالي
            const nextLink = document.createElement('a');
            nextLink.href = "#works";
            nextLink.textContent = isRTL ? '<' : '>';
            nextLink.className = `page-link ${currentPage === totalPages ? 'disabled' : ''}`;
            nextLink.addEventListener('click', (e) => {
                e.preventDefault();
                if (currentPage < totalPages) {
                    currentPage++;
                    loadWorks();
                }
            });
            paginationContainer.appendChild(nextLink);
        }
    }

    // ربط أحداث الفلتر والبحث
    tags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            tags.forEach(t => t.classList.remove('active'));
            e.currentTarget.classList.add('active');
            currentTag = e.currentTarget.getAttribute('data-tag');
            currentPage = 1;
            loadWorks();
        });
    });

    searchButton.addEventListener('click', (e) => {
        currentSearch = searchInput.value.trim();
        currentTag = 'all'; // Reset tag filter
        tags.forEach(t => t.classList.remove('active'));
        document.querySelector('[data-tag="all"]').classList.add('active');
        currentPage = 1;
        loadWorks();
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchButton.click();
        }
    });


    // ===================================
    // Language and mode toggle logic
    // ===================================

    // Load saved settings from localStorage
    const savedLang = localStorage.getItem("siteLang") || "ar";
    const savedMode = localStorage.getItem("siteMode") || "light-mode";

    // Apply saved settings
    body.classList.add(savedMode);
    applyLanguage(savedLang);
    languageSelect.value = savedLang;
    modeToggle.innerHTML =
        savedMode === "light-mode"
            ? '<i class="fas fa-moon"></i>'
            : '<i class="fas fa-sun"></i>';

    // Toggle language
    languageSelect.addEventListener("change", () => {
        const lang = languageSelect.value;
        localStorage.setItem("siteLang", lang);
        applyLanguage(lang);
        loadWorks(); // Reload works to update titles and descriptions and re-initialize swipers
    });

    // Toggle mode
    modeToggle.addEventListener("click", () => {
        if (body.classList.contains("light-mode")) {
            body.classList.remove("light-mode");
            body.classList.add("dark-mode");
            modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem("siteMode", "dark-mode");
        } else {
            body.classList.remove("dark-mode");
            body.classList.add("light-mode");
            modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem("siteMode", "light-mode");
        }
    });


    // ===================================
    // Initial Loads and Animations
    // ===================================
    AOS.init({
        duration: 800,
        once: true,
    });

    // Load current works on page load
    loadWorks();

    // Update current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Tooltip image on hover (Assuming a separate div for image)
    if (hoverImage) {
        const toolIcons = document.querySelectorAll('.tool-icon');
        toolIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                const toolName = icon.getAttribute('data-tool');
                const imageUrl = `images/tool-previews/${toolName}.jpg`; // Adjust path as needed
                hoverImage.src = imageUrl;
                hoverImage.style.opacity = '1';
                hoverImage.style.transform = 'scale(1)';
            });

            icon.addEventListener('mouseleave', () => {
                hoverImage.style.opacity = '0';
                hoverImage.style.transform = 'scale(0.9)';
            });
        });
    }
});
