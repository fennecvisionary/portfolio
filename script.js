// script.js
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

    // إضافة تعريفات العناصر الجديدة للقائمة المنسدلة
    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    // ===================================
    // بيانات الترجمة (Translation Data)
    // ===================================
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
            tools_subtitle: "أدوات إبداعية احترافية لضمان جودة عالية في كل تصميم.",
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
            service_tshirt_desc: "Unique and creative designs for apparel and print.",
            works_title: "My Creative Works",
            works_subtitle: "A quick tour of our carefully selected latest projects.",
            search_placeholder: "Search for a specific design...",
            search_button: "Search",
            tag_all: "All",
            tag_logos: "Logos",
            tag_branding: "Branding",
            tag_social_media: "Social Media",
            tag_packaging: "Packaging",
            tag_print_design: "Print Design",
            how_it_works_title: "My Working Methodology",
            how_it_works_subtitle: "A thoughtful process to ensure the best results and accurately express your vision.",
            step_brief: "Briefing and Analysis",
            step_brief_desc: "We listen closely to your needs, vision, and target audience to fully understand the project.",
            step_concept: "Conceptualization",
            step_concept_desc: "We present initial proposals and innovative design concepts aligned with the brief.",
            step_design: "Design and Development",
            step_design_desc: "We develop the chosen designs, focusing on visual detail and accuracy.",
            step_final: "Review and Delivery",
            step_final_desc: "We conduct final reviews and deliver high-quality source files.",
            testimonials_title: "Client Testimonials",
            testimonials_subtitle: "What our clients say about the experience and results.",
            testimonial_1_text: "Professional and innovative logo design, exceeded our expectations. The speed of completion and quality of work are unmatched. Highly recommended!",
            testimonial_1_name: "Ahmed S.",
            testimonial_1_role: "Marketing Manager",
            testimonial_2_text: "Excellent customer service and deep understanding of requirements. Their designs helped take our brand to a new level of excellence.",
            testimonial_2_name: "Laila H.",
            testimonial_2_role: "Entrepreneur",
            testimonial_3_text: "The best designer I have worked with so far. Punctuality and professionalism in handling adjustments are amazing. Thank you!",
            testimonial_3_name: "Khalid A.",
            testimonial_3_role: "Company Owner",
            about_me_title: "About Me",
            about_me_p1: "Hello, I am **Fennec Visionary**, a seasoned graphic designer with over 7 years of experience transforming ideas into strong, impactful visual identities.",
            about_me_p2: "My passion lies in designing **logos, visual identities, and social media designs**, always focusing on innovation and functional clarity of design.",
            about_me_p3: "I believe that good design is not just a beautiful appearance, but a solution to a marketing problem and carries a clear message. Let's collaborate to build your unique visual footprint.",
            about_me_btn_contact: "Contact Now",
            tools_title: "Tools I Use",
            tools_subtitle: "Professional creative tools to ensure high quality in every design.",
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


    // ===================================
    // بيانات الأعمال ومحرك الفلترة والترقيم
    // ===================================

    const WORKS_PER_PAGE = 9;
    const worksData = [];
    let currentPage = 1;
    let currentFilter = 'all';
    let currentSearchTerm = '';

    // محاكاة 100 عمل، كل عمل يحتوي على 3 صور
    for (let i = 1; i <= 100; i++) {
        const categories = ['logos', 'branding', 'social_media', 'packaging', 'print_design'];
        const tags = [categories[i % categories.length], categories[(i + 1) % categories.length]].filter((v, idx, a) => a.indexOf(v) === idx);
        
        // **********************************************
        // 🚨 التغيير هنا: كل عمل الآن يحمل مصفوفة من 3 صور
        // يجب أن تتأكد من وجود المسارات: 
        // images/works/work_1_1.jpg, images/works/work_1_2.jpg, images/works/work_1_3.jpg
        // **********************************************
        const imageBase = `images/works/work_${i}`; // مسار أساسي (مثلاً: images/works/work_1)

        worksData.push({
            id: i,
            title: `Project Title ${i}`,
            // مصفوفة مسارات الصور: الصورة الأولى هي الواجهة، والباقي للتفاصيل
            images: [
                `${imageBase}_1.jpg`, 
                `${imageBase}_2.jpg`, 
                `${imageBase}_3.jpg`
            ],
            tags: tags,
            views: Math.floor(Math.random() * 500) + 10,
            likes: Math.floor(Math.random() * 100) + 5,
            saved: Math.floor(Math.random() * 20) + 1,
            primaryTag: tags[0]
        });
    }

    function renderWorkCard(work) {
        const lang = localStorage.getItem("siteLang") || "ar";
        const likeText = lang === 'ar' ? 'إعجاب' : 'Like';
        const viewText = lang === 'ar' ? 'مشاهدة' : 'View';
        const saveText = lang === 'ar' ? 'حفظ' : 'Save';
        
        // الصورة الأولى في المصفوفة هي صورة الواجهة
        const primaryImage = work.images[0];
        
        // إنشاء روابط Lightbox إضافية للصورتين الثانية والثالثة (مخفية)
        let hiddenLinks = '';
        if (work.images.length > 1) {
            // يبدأ من الصورة الثانية (المؤشر 1)
            for (let j = 1; j < work.images.length; j++) {
                // نستخدم class="hidden" لإخفاء الروابط من العرض، لكن Lightbox سيجدها
                hiddenLinks += `
                    <a href="${work.images[j]}" data-lightbox="portfolio-group-${work.id}" data-title="${work.title} - ${lang === 'ar' ? 'صورة' : 'Image'} ${j + 1}" class="hidden" aria-hidden="true">
                        ${work.title} ${lang === 'ar' ? 'صورة إضافية' : 'Extra Image'} ${j + 1}
                    </a>
                `;
            }
        }

        return `
            <div class="work-item ${work.primaryTag}" data-aos="fade-up">
                <a href="${primaryImage}" data-lightbox="portfolio-group-${work.id}" data-title="${work.title} - ${lang === 'ar' ? 'صورة' : 'Image'} 1" aria-label="${work.title} ${lang === 'ar' ? 'صورة الواجهة' : 'Primary Image'}">
                    <img src="${primaryImage}" alt="${work.title}" loading="lazy">
                    <div class="work-overlay">
                        <div class="work-title">${work.title}</div>
                        <div class="work-stats">
                            <span title="${likeText}" class="stat-item"><i class="fas fa-heart"></i> ${work.likes}</span>
                            <span title="${viewText}" class="stat-item"><i class="fas fa-eye"></i> ${work.views}</span>
                            <span title="${saveText}" class="stat-item"><i class="fas fa-bookmark"></i> ${work.saved}</span>
                        </div>
                    </div>
                </a>
                ${hiddenLinks}
            </div>
        `;
    }

    function renderPagination(totalWorks, worksPerPage, currentPage) {
        if (!paginationContainer) return;
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(totalWorks / worksPerPage);

        if (totalPages <= 1) return;

        const createPageItem = (page, text, isDisabled = false, isCurrent = false) => {
            const li = document.createElement('li');
            li.className = `page-item ${isCurrent ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`;
            const a = document.createElement('a');
            a.className = 'page-link';
            a.href = '#';
            a.textContent = text;
            a.setAttribute('data-page', page);
            if (!isDisabled && !isCurrent) {
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    // الانتقال لصفحة جديدة
                    loadWorks(currentFilter, currentSearchTerm, page);
                    // الانتقال إلى بداية قسم الأعمال بعد تغيير الصفحة
                    document.getElementById('works').scrollIntoView({ behavior: 'smooth' });
                });
            }
            li.appendChild(a);
            return li;
        };

        const ul = document.createElement('ul');
        ul.className = 'pagination';
        const lang = localStorage.getItem("siteLang") || "ar";

        // زر السابق
        ul.appendChild(createPageItem(currentPage - 1, (lang === 'ar' ? 'السابق' : 'Previous'), currentPage === 1));

        // ترقيم الصفحات (عرض مبسط)
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        if (currentPage <= 3) endPage = Math.min(totalPages, 5);
        if (currentPage > totalPages - 2) startPage = Math.max(1, totalPages - 4);

        if (startPage > 1) {
            ul.appendChild(createPageItem(1, '1'));
            if (startPage > 2) {
                const liDots = document.createElement('li');
                liDots.className = 'page-item disabled';
                liDots.innerHTML = '<span class="page-link">...</span>';
                ul.appendChild(liDots);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            ul.appendChild(createPageItem(i, i.toString(), false, i === currentPage));
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const liDots = document.createElement('li');
                liDots.className = 'page-item disabled';
                liDots.innerHTML = '<span class="page-link">...</span>';
                ul.appendChild(liDots);
            }
            ul.appendChild(createPageItem(totalPages, totalPages.toString()));
        }

        // زر التالي
        ul.appendChild(createPageItem(currentPage + 1, (lang === 'ar' ? 'التالي' : 'Next'), currentPage === totalPages));

        paginationContainer.appendChild(ul);
    }

    function loadWorks(filter = currentFilter, searchTerm = currentSearchTerm, page = currentPage) {
        if (!worksGrid || !paginationContainer) return; 

        // حفظ الحالة الجديدة
        currentFilter = filter;
        currentSearchTerm = searchTerm;
        currentPage = page;

        // 1. التصفية
        let filteredWorks = worksData;

        if (filter !== 'all') {
            filteredWorks = filteredWorks.filter(work => work.primaryTag === filter);
        }

        // 2. البحث
        if (searchTerm) {
            const lowerSearchTerm = searchTerm.toLowerCase();
            filteredWorks = filteredWorks.filter(work => 
                work.title.toLowerCase().includes(lowerSearchTerm) || 
                work.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm))
            );
        }
        
        // عرض رسالة إذا لم توجد نتائج
        if (filteredWorks.length === 0) {
            const message = localStorage.getItem("siteLang") === 'ar' ? 'عذراً، لا توجد أعمال مطابقة.' : 'Sorry, no matching works found.';
            worksGrid.innerHTML = `<div class="no-results-message">${message}</div>`;
            paginationContainer.innerHTML = '';
            return;
        }

        // 3. حساب الترقيم
        const startIndex = (currentPage - 1) * WORKS_PER_PAGE;
        const endIndex = startIndex + WORKS_PER_PAGE;
        const worksToDisplay = filteredWorks.slice(startIndex, endIndex);

        // 4. عرض الأعمال
        worksGrid.innerHTML = worksToDisplay.map(renderWorkCard).join('');

        // 5. عرض الترقيم
        renderPagination(filteredWorks.length, WORKS_PER_PAGE, currentPage);

        // إعادة تهيئة Lightbox
        if (typeof lightbox !== 'undefined') {
            lightbox.option({
                'resizeDuration': 200,
                'wrapAround': true,
                'disableScrolling': true
            });
        }
    }


    // ===================================
    // وظائف الترجمة (لم يتم تعديلها)
    // ===================================

    function applyLanguage(lang) {
        const data = translations[lang];
        if (!data) return;

        // تحديث اتجاه الصفحة (RTL/LTR)
        body.className = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
        body.classList.add(lang === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

        // تطبيق النصوص الجديدة
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (data[key]) {
                // إذا كان العنصر هو input/textarea/placeholder، حدث الخاصية
                if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
                    el.setAttribute('placeholder', data[key]);
                } else if (el.tagName === 'A' && el.classList.contains('contact-btn')) {
                     // تحديث النص داخل سبان زر التواصل
                    const span = el.querySelector('.btn-text-mobile-hide');
                    if(span) {
                        span.textContent = data[key];
                    }
                    el.setAttribute('aria-label', data[key]);
                }
                 else if (el.tagName === 'SELECT' && el.hasAttribute('aria-label')) {
                    // إذا كان SELECT، لا يحدث النص مباشرة، نعتمد على محتواه
                    el.setAttribute('aria-label', data[key]);
                } else if (el.tagName === 'INPUT' && el.type === 'text') {
                     el.setAttribute('placeholder', data[key]);
                }
                else {
                    el.textContent = data[key];
                }
            }
        });
        
        // تحديث خيارات الـ SELECT
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            // تحديث نصوص خيارات الـ select بناءً على data-lang-key
            serviceSelect.querySelectorAll('option').forEach(option => {
                const key = option.getAttribute('data-lang-key');
                if (key && data[key]) {
                    option.textContent = data[key];
                }
            });
        }
    }
    
    // ===================================
    // وظائف القائمة الجانبية (لم يتم تعديلها)
    // ===================================

    function closeMenu() {
        mainNav.classList.remove("is-open");
        // التأكد من أن أيقونة زر الفتح تعود للهامبرغر عند الإغلاق
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>'; 
    }

    function toggleMenu() {
        mainNav.classList.toggle("is-open");

        // تبديل أيقونة زر الفتح بناءً على حالة القائمة
        if (mainNav.classList.contains("is-open")) {
            // القائمة مفتوحة: عرض أيقونة الإغلاق (X)
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            // القائمة مغلقة: عرض أيقونة الفتح (الهامبرغر)
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }

    // ربط أزرار التحكم بالوظائف
    if (menuToggle) {
        menuToggle.addEventListener("click", toggleMenu);
    }
    
    // إغلاق القائمة عند النقر على أي رابط (لتسهيل التنقل في الهاتف)
    navLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    // ===================================
    // منطق اللغة والمظهر (لم يتم تعديله)
    // ===================================

    const savedLang = localStorage.getItem("siteLang") || "ar";
    const savedMode = localStorage.getItem("siteMode") || "light-mode";

    body.classList.add(savedMode);
    applyLanguage(savedLang);
    languageSelect.value = savedLang;
    modeToggle.innerHTML = savedMode === "light-mode" ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';

    languageSelect.addEventListener("change", () => {
        const lang = languageSelect.value;
        localStorage.setItem("siteLang", lang);
        applyLanguage(lang);
        loadWorks();
    });

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
    // التحميل الأولي والرسوم المتحركة (لم يتم تعديله)
    // ===================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
        });
    }
    
    loadWorks(); 

    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // ===================================
    // منطق التمرير لأعلى (لم يتم تعديله)
    // ===================================
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.visibility = 'visible';
            } else {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.visibility = 'hidden';
            }
        });
    }
    
    // ===================================
    // منطق الأدوات العائمة (لم يتم تعديله)
    // ===================================
    document.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 992) return; 

            const toolName = card.getAttribute('data-tool');
            if (toolName) {
                hoverImage.innerHTML = `<img src="images/tools/${toolName}.png" alt="${toolName}">`;
                hoverImage.style.display = 'block';
                // Adjust position based on RTL/LTR
                const isRTL = document.documentElement.dir === 'rtl';
                
                // تحديد موضع الفأرة
                let x = e.clientX;
                let y = e.clientY;

                // إذا كانت RTL، ضع الصورة على اليسار من المؤشر
                if (isRTL) {
                    hoverImage.style.right = `${window.innerWidth - x + 20}px`;
                    hoverImage.style.left = 'auto';
                } else {
                    // إذا كانت LTR، ضع الصورة على اليمين من المؤشر
                    hoverImage.style.left = `${x + 20}px`;
                    hoverImage.style.right = 'auto';
                }
                
                hoverImage.style.top = `${y + 20}px`;
            }
        });

        card.addEventListener('mouseleave', () => {
            hoverImage.style.display = 'none';
            hoverImage.innerHTML = '';
        });
    });

    // ===================================
    // منطق الفلترة والبحث (لم يتم تعديله)
    // ===================================

    // ربط أحداث الفلترة
    tags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            // إزالة حالة النشاط من كل الأزرار
            tags.forEach(t => t.classList.remove('active'));
            // تعيين حالة النشاط للزر الحالي
            tag.classList.add('active');
            // استدعاء دالة loadWorks مع الفلتر الجديد، وإعادة تعيين البحث والصفحة إلى 1
            loadWorks(tag.getAttribute('data-filter'), '', 1);
        });
    });

    // ربط حدث البحث
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        // إزالة تحديد الفلاتر عند البحث، وبدء من الصفحة الأولى
        tags.forEach(t => t.classList.remove('active'));
        document.querySelector('.tag-link[data-filter="all"]').classList.add('active');
        
        loadWorks('all', searchTerm, 1);
    });

    // تفعيل البحث بالضغط على Enter
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchButton.click();
        }
    });

});
