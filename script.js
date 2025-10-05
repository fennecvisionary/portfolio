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
    // تحديد عناصر قسم آراء العملاء
    // ===================================
    const testimonialsContainer = document.querySelector(".testimonials-grid");
    const testimonialCards = document.querySelectorAll(".testimonial-card");
    const prevArrow = document.querySelector(".arrow-prev");
    const nextArrow = document.querySelector(".arrow-next");
    
    let currentTestimonialIndex = 0;
    const totalTestimonials = testimonialCards.length;
    
    // متغيرات التمرير اليدوي (Swiping)
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    const SLIDER_SENSITIVITY = 100; // حساسية السحب بالبكسل لتغيير الشريحة
    // ===================================

    // ===================================
    // بيانات الترجمة (Translation Data) - 10 آراء للعملاء
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
        testimonial_4_text: "النتائج كانت مذهلة، وموقع الويب الذي صمموه لنا أصبح محط إعجاب الجميع. تعاون فعال ومحترف.",
        testimonial_4_name: "فاطمة م.",
        testimonial_4_role: "مطور منتجات",
        testimonial_5_text: "احترافية عالية والتزام بالمواعيد. التصاميم كانت عصرية وتلبي تماماً متطلبات علامتنا التجارية.",
        testimonial_5_name: "يوسف ن.",
        testimonial_5_role: "مستثمر",
        testimonial_6_text: "تجربة رائعة! سهولة في التواصل وقدرة ممتازة على تحويل الأفكار إلى تصاميم جذابة وواقعية. أنصح بهم.",
        testimonial_6_name: "مريم أ.",
        testimonial_6_role: "صاحبة متجر إلكتروني",
        testimonial_7_text: "الجودة تفوق السعر بكثير. حصلنا على هوية بصرية متكاملة ساهمت في نمو أعمالنا بشكل كبير.",
        testimonial_7_name: "علي ز.",
        testimonial_7_role: "مدير مشروع",
        testimonial_8_text: "مهارات تصميم استثنائية. فهموا رؤيتنا بسرعة وقدموا حلولاً إبداعية غير تقليدية.",
        testimonial_8_name: "نورة س.",
        testimonial_8_role: "محلل بيانات",
        testimonial_9_text: "خدمة لا تشوبها شائبة. من أول خطوة إلى تسليم المشروع النهائي، كان كل شيء سلساً ومتقناً.",
        testimonial_9_name: "طارق ج.",
        testimonial_9_role: "مصمم داخلي",
        testimonial_10_text: "أكثر ما أعجبني هو المرونة في التعامل وتقبل التعديلات بصدر رحب. النتيجة النهائية فاقت التوقعات.",
        testimonial_10_name: "هند ع.",
        testimonial_10_role: "مديرة محتوى",
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
        tool_AdobeXD: "Adobe XD",
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
        social_links_title: "أو تواصل عبر:",
        contact_or_social: "أو تواصل مباشرةً عبر:", // المفتاح الجديد لعبارة التواصل
        status_online: "متصل حاليًا 👋",
        status_offline: "غير متصل حاليًا 😴",
        working_hours_title: "أوقات العمل",
        period_morning: "الفترة الصباحية",
        time_morning: "8:00 سا - 16:00 سا",
        period_evening: "الفترة المسائية",
        time_evening: "19:00 سا - 01:00 سا",
        faq_title: "الأسئلة الشائعة والمتكررة (FAQ)",
        faq_q1: "ما هي الخدمات التي تقدمونها بالتحديد؟",
        faq_a1: "نحن متخصصون في خدمات التصميم الفيكتور، الأيقونات، تصميم التيشرتات (T-shirt Design)، وتصميم بطاقات العمل (Business Cards) باحترافية عالية.",
        
        faq_q2: "كم يستغرق إنجاز طلب التصميم الفيكتوري؟",
        faq_a2: "يعتمد وقت الإنجاز على تعقيد المشروع، لكن تتراوح معظم المشاريع بين 3 إلى 7 أيام عمل بعد تأكيد المتطلبات والاتفاق.",
        
        faq_q3: "ماذا تعني 'منهجيتنا' في العمل؟",
        faq_a3: "منهجيتنا هي خطوات عمل منظمة تبدأ بالاستماع وفهم احتياجات العميل، تليها مرحلة التفكير والتصميم الأولي، ثم المراجعة والتعديل، وصولاً إلى التسليم النهائي للملفات.",
        
        faq_q4: "هل يمكنني طلب مراجعات على التصميم؟",
        faq_a4: "بالتأكيد! نحن نؤمن بأن رضا العميل هو الأهم. نتيح عدد محدد من المراجعات ضمن الاتفاق لتضمن حصولك على التصميم المثالي.",
        
        faq_q5: "ما هي أنواع الملفات التي سأستلمها عند الانتهاء؟",
        faq_a5: "سنزودك بملفات فيكتور مصدرية (مثل AI أو EPS) بالإضافة إلى ملفات جاهزة للاستخدام (مثل PNG بخلفية شفافة و JPEG) لضمان أعلى جودة.",
        
        faq_q6: "كيف يتم التواصل معكم لطلب خدمة أو استفسار؟",
        faq_a6: "يمكنك استخدام نموذج 'تواصل معي' الموجود في الصفحة، أو إرسال بريد إلكتروني مباشر، وسنقوم بالرد عليك في غضون 24 ساعة.",
        
        faq_q7: "هل تقدمون خصومات للطلبات الكبيرة أو المتعددة؟",
        faq_a7: "نعم، يرجى التواصل معنا لمناقشة تفاصيل مشروعك المتعدد، ويمكننا حينها تقديم عرض سعر خاص ومناسب لك.",
        
        faq_q8: "ماذا يرمز الثعلب البرتقالي في تصميمكم؟",
        faq_a8: "الثعلب البرتقالي يرمز إلى **الذكاء** و**السرعة** و**الفطنة** في التصميم، وهي القيم التي نعتمد عليها لتقديم حلول إبداعية ومميزة لعملائنا.",
    },
    en: {
        skip_link: "Skip to main content",
        menu_toggle: "Open Menu",
        nav_services: "Services",
        nav_how_it_works: "How It Works",
        nav_works: "My Works",
        nav_testimonials: "Testimonials",
        nav_tools: "Our Tools",
        nav_contact: "Contact Me",
        nav_about_me: "About Me",
        header_btn_contact: "Contact Me",
        hero_title: "Visual Designs That Grab Attention and Achieve Goals",
        hero_description: "I am Fennec Visionary, a graphic designer specializing in building strong, influential visual brands and identities.",
        hero_btn_works: "View My Work",
        hero_btn_contact: "Request a Service",
        services_title: "My Services",
        services_subtitle: "Comprehensive design solutions for your visual identity and digital presence.",
        service_logo: "Logo Design",
        service_logo_desc: "Creating unique and modern logos that reflect the essence of your brand.",
        service_card: "Business Cards",
        service_card_desc: "Designing professional business cards that leave a lasting impression.",
        service_brochure: "Flyers and Brochures",
        service_brochure_desc: "Creative print designs to clearly convey your message.",
        service_invoice: "Invoices",
        service_invoice_desc: "Elegant and organized templates for invoices and business documents.",
        service_catalog: "Catalogs",
        service_catalog_desc: "Designing attractive digital and print product catalogs.",
        service_social: "Social Media Templates",
        service_social_desc: "A unified, ready-to-use identity for social media platforms.",
        service_packaging: "Packaging Design",
        service_packaging_desc: "Innovative packaging solutions that stand out on the shelves.",
        service_tshirt: "T-Shirts",
        service_tshirt_desc: "Unique and creative designs for clothing and printed materials.",
        works_title: "My Creations",
        works_subtitle: "A quick tour of our latest carefully selected works.",
        search_placeholder: "Search for a specific design...",
        search_button: "Search",
        tag_all: "All",
        tag_logos: "Logos",
        tag_branding: "Branding",
        tag_social_media: "Social Media",
        tag_packaging: "Packaging",
        tag_print_design: "Print Design",
        how_it_works_title: "Our Methodology",
        how_it_works_subtitle: "A well-thought-out process to ensure the best results and accurately express your vision.",
        step_brief: "Briefing and Analysis",
        step_brief_desc: "We listen closely to your needs, vision, and target audience to fully understand the project.",
        step_concept: "Concept Development",
        step_concept_desc: "We present initial proposals and innovative design concepts that align with the brief.",
        step_design: "Design and Development",
        step_design_desc: "We develop the chosen designs, focusing on detail and visual precision.",
        step_final: "Review and Delivery",
        step_final_desc: "We conduct final reviews and deliver the source files with high quality.",
        testimonials_title: "Client Testimonials",
        testimonials_subtitle: "What our clients say about the experience and the results.",
        testimonial_1_text: "A professional and innovative logo design that exceeded our expectations. Unmatched speed and quality of work. I highly recommend him!",
        testimonial_1_name: "Ahmed S.",
        testimonial_1_role: "Marketing Manager",
        testimonial_2_text: "Excellent customer service and deep understanding of requirements. Their designs helped elevate our brand to a new level of excellence.",
        testimonial_2_name: "Laila H.",
        testimonial_2_role: "Entrepreneur",
        testimonial_3_text: "The best designer I have worked with so far. The punctuality and professionalism in handling modifications are amazing. Thank you!",
        testimonial_3_name: "Khaled A.",
        testimonial_3_role: "Company Owner",
        testimonial_4_text: "The results were amazing, and the website they designed for us became the focus of everyone's admiration. Effective and professional cooperation.",
        testimonial_4_name: "Fatimah M.",
        testimonial_4_role: "Product Developer",
        testimonial_5_text: "High professionalism and punctuality. The designs were modern and perfectly met our brand requirements.",
        testimonial_5_name: "Yousef N.",
        testimonial_5_role: "Investor",
        testimonial_6_text: "Great experience! Easy communication and excellent ability to turn ideas into attractive and realistic designs. I recommend them.",
        testimonial_6_name: "Mariam A.",
        testimonial_6_role: "E-commerce Store Owner",
        testimonial_7_text: "The quality far exceeds the price. We obtained an integrated visual identity that greatly contributed to the growth of our business.",
        testimonial_7_name: "Ali Z.",
        testimonial_7_role: "Project Manager",
        testimonial_8_text: "Exceptional design skills. They quickly understood our vision and provided creative, unconventional solutions.",
        testimonial_8_name: "Noura S.",
        testimonial_8_role: "Data Analyst",
        testimonial_9_text: "Impeccable service. From the first step to the final project delivery, everything was smooth and perfected.",
        testimonial_9_name: "Tariq J.",
        testimonial_9_role: "Interior Designer",
        testimonial_10_text: "What impressed me most was the flexibility in dealing and the willingness to accept modifications openly. The final result exceeded expectations.",
        testimonial_10_name: "Hind A.",
        testimonial_10_role: "Content Manager",
        about_me_title: "About Me",
        about_me_p1: "Hello, I am **Fennec Visionary**, an experienced graphic designer with over 7 years of expertise in transforming ideas into strong, impactful visual identities.",
        about_me_p2: "My passion lies in designing **Logos, Visual Identities, and Social Media Designs**, always focusing on innovation and functional clarity in design.",
        about_me_p3: "I believe that good design is not just a beautiful appearance, but a solution to a marketing problem and carries a clear message. Let's collaborate to build your unique visual footprint.",
        about_me_btn_contact: "Contact Now",
        tools_title: "Tools I Use",
        tools_subtitle: "Professional creative tools to ensure high quality in every design.",
        tool_photoshop: "Adobe Photoshop",
        tool_illustrator: "Adobe Illustrator",
        tool_indesign: "Adobe InDesign",
        tool_AdobeXD: "Adobe XD",
        tool_figma: "Figma",
        contact_title: "Contact Me",
        contact_subtitle: "Ready to start your next project? Contact me today!",
        form_name: "Full Name",
        form_email: "Email Address",
        form_service: "Requested Service",
        form_service_select: "Select a Service",
        form_service_other: "Other",
        form_message: "Your Message",
        form_submit: "Send Message",
        social_links_title: "Or contact via:",
        contact_or_social: "Or contact directly via:", // المفتاح الجديد لعبارة التواصل
        status_online: "Currently Online 👋",
        status_offline: "Currently Offline 😴",
        working_hours_title: "Working Hours",
        period_morning: "Morning Period",
        time_morning: "8:00 AM - 4:00 PM",
        period_evening: "Evening Period",
        time_evening: "7:00 PM - 1:00 AM",
        faq_title: "Frequently Asked Questions (FAQ)",
        
        faq_q1: "What services do you offer exactly?",
        faq_a1: "We specialize in professional vector design, icon design, t-shirt design, and business card design.",
        
        faq_q2: "How long does a vector design request take?",
        faq_a2: "The turnaround time depends on the project's complexity, but most projects range from 3 to 7 business days after confirming requirements and agreement.",
        
        faq_q3: "What does 'Our Methodology' mean?",
        faq_a3: "Our methodology is an organized workflow starting with listening to and understanding the client's needs, followed by conception and initial design, then review and modification, leading up to the final file delivery.",
        
        faq_q4: "Can I request revisions to the design?",
        faq_a4: "Absolutely! Client satisfaction is paramount. We allow a specific number of revisions within the agreed terms to ensure you get the perfect design.",
        
        faq_q5: "What file types will I receive upon completion?",
        faq_a5: "You will receive source vector files (such as AI or EPS) in addition to ready-to-use files (such as PNG with a transparent background and JPEG) to ensure the highest quality.",
        
        faq_q6: "How can I contact you to request a service or inquire?",
        faq_a6: "You can use the 'Contact Me' form on the page, or send a direct email. We typically respond within 24 hours.",
        
        faq_q7: "Do you offer discounts for large or multiple orders?",
        faq_a7: "Yes, please contact us to discuss the details of your multiple project, and we can then provide a special, suitable quote.",
        
        faq_q8: "What does the orange fox symbolize in your design?",
        faq_a8: "The orange fox symbolizes **intelligence**, **speed**, and **cunning** in design—values we rely on to deliver creative and distinctive solutions to our clients.",
    }
};

    // ===================================
    // بيانات الأعمال ومحرك الفلترة والترقيم (لم يتم تغييرها)
    // ===================================

    const WORKS_PER_PAGE = 9;
    const worksData = [];
    let currentPage = 1;
    let currentFilter = 'all';
    let currentSearchTerm = '';

    // توليد البيانات الأولية
    for (let i = 1; i <= 100; i++) {
        const categories = ['logos', 'branding', 'social_media', 'packaging', 'print_design'];
        const tags = [categories[i % categories.length], categories[(i + 1) % categories.length]].filter((v, idx, a) => a.indexOf(v) === idx);
        
        const imageBase = `images/works/work_${i}`; 

        worksData.push({
            id: i,
            title: `Project Title ${i}`,
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

    // وظائف الإحصائيات التفاعلية
    function initializeStats() {
        const storedStats = JSON.parse(localStorage.getItem('worksStats')) || {};
        let needsUpdate = false;
        
        worksData.forEach(work => {
            const id = work.id;
            
            if (storedStats[id]) {
                work.likes = storedStats[id].likes || work.likes;
                work.saved = storedStats[id].saved || work.saved;
                work.views = storedStats[id].views || work.views; 
            }
            
             if (!storedStats[id]) {
                storedStats[id] = { likes: work.likes, saved: work.saved, views: work.views };
                needsUpdate = true;
             }
        });
        
        if (needsUpdate || !localStorage.getItem('worksStats')) {
            localStorage.setItem('worksStats', JSON.stringify(storedStats));
        }

        return worksData;
    }

    function updateStatAndRender(workId, statType) {
        let stats = JSON.parse(localStorage.getItem('worksStats'));
        const work = worksData.find(w => w.id === workId);

        if (!work || !stats[workId]) return;

        let countKey = statType === 'like' ? 'likes' : 'saved';

        const userActionKey = `user_${statType}_${workId}`;
        const hasActed = localStorage.getItem(userActionKey) === 'true';
        
        if (hasActed) {
            stats[workId][countKey]--;
            localStorage.removeItem(userActionKey);
        } else {
            stats[workId][countKey]++;
            localStorage.setItem(userActionKey, 'true');
        }

        work[countKey] = stats[workId][countKey];

        localStorage.setItem('worksStats', JSON.stringify(stats));

        loadWorks(currentFilter, currentSearchTerm, currentPage);
    }
    
    function bindStatEvents() {
        document.querySelectorAll('.clickable-stat').forEach(stat => {
            stat.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const workId = parseInt(this.getAttribute('data-id'));
                const statType = this.getAttribute('data-action');
                
                updateStatAndRender(workId, statType);
            });
        });
    }


    function renderWorkCard(work) {
        const lang = localStorage.getItem("siteLang") || "ar";
        const likeText = lang === 'ar' ? 'إعجاب' : 'Like';
        const viewText = lang === 'ar' ? 'مشاهدة' : 'View';
        const saveText = lang === 'ar' ? 'حفظ' : 'Save';
        
        const primaryImage = work.images[0];
        
        const isLiked = localStorage.getItem(`user_like_${work.id}`) === 'true';
        const isSaved = localStorage.getItem(`user_save_${work.id}`) === 'true';
        
        let hiddenLinks = '';
        if (work.images.length > 1) {
            for (let j = 1; j < work.images.length; j++) {
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
                            <span title="${likeText}" class="stat-item clickable-stat ${isLiked ? 'active' : ''}" data-action="like" data-id="${work.id}"><i class="fas fa-heart"></i> <span class="stat-count">${work.likes}</span></span>
                            <span title="${viewText}" class="stat-item" data-action="view" data-id="${work.id}"><i class="fas fa-eye"></i> <span class="stat-count">${work.views}</span></span>
                            <span title="${saveText}" class="stat-item clickable-stat ${isSaved ? 'active' : ''}" data-action="save" data-id="${work.id}"><i class="fas fa-bookmark"></i> <span class="stat-count">${work.saved}</span></span>
                        </div>
                    </div>
                </a>
                ${hiddenLinks}
            </div>
        `;
    }

    // وظائف الترقيم والتحميل
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
                    loadWorks(currentFilter, currentSearchTerm, page);
                    document.getElementById('works').scrollIntoView({ behavior: 'smooth' });
                });
            }
            li.appendChild(a);
            return li;
        };

        const ul = document.createElement('ul');
        ul.className = 'pagination';
        const lang = localStorage.getItem("siteLang") || "ar";

        ul.appendChild(createPageItem(currentPage - 1, (lang === 'ar' ? 'السابق' : 'Previous'), currentPage === 1));

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

        ul.appendChild(createPageItem(currentPage + 1, (lang === 'ar' ? 'التالي' : 'Next'), currentPage === totalPages));

        paginationContainer.appendChild(ul);
    }

    function loadWorks(filter = currentFilter, searchTerm = currentSearchTerm, page = currentPage) {
        if (!worksGrid || !paginationContainer) return; 

        currentFilter = filter;
        currentSearchTerm = searchTerm;
        currentPage = page;

        let filteredWorks = worksData;

        if (filter !== 'all') {
            filteredWorks = filteredWorks.filter(work => work.primaryTag === filter);
        }

        if (searchTerm) {
            const lowerSearchTerm = searchTerm.toLowerCase();
            filteredWorks = filteredWorks.filter(work => 
                work.title.toLowerCase().includes(lowerSearchTerm) || 
                work.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm))
            );
        }
        
        if (filteredWorks.length === 0) {
            const message = localStorage.getItem("siteLang") === 'ar' ? 'عذراً، لا توجد أعمال مطابقة.' : 'Sorry, no matching works found.';
            worksGrid.innerHTML = `<div class="no-results-message">${message}</div>`;
            paginationContainer.innerHTML = '';
            return;
        }

        const startIndex = (currentPage - 1) * WORKS_PER_PAGE;
        const endIndex = startIndex + WORKS_PER_PAGE;
        const worksToDisplay = filteredWorks.slice(startIndex, endIndex);

        worksGrid.innerHTML = worksToDisplay.map(renderWorkCard).join('');
        
        bindStatEvents(); 

        renderPagination(filteredWorks.length, WORKS_PER_PAGE, currentPage);

        if (typeof lightbox !== 'undefined') {
            lightbox.option({
                'resizeDuration': 200,
                'wrapAround': true,
                'disableScrolling': true
            });
        }
    }

    // ========================================================
    // وظيفة تحديث شريط آراء العملاء (النهائية مع دعم Swiping)
    // ========================================================
    function updateTestimonialSlider() {
        // نستخدم testimonialCards.length بدلاً من totalTestimonials لتجنب مشاكل النطاق
        if (testimonialCards.length === 0 || !testimonialsContainer) return;

        // تحديد عدد البطاقات المرئية: 1 للهاتف، 3 لسطح المكتب
        const cardsInView = window.innerWidth <= 768 ? 1 : 3;
        const maxIndex = Math.max(0, testimonialCards.length - cardsInView);  

        // ضبط حدود المؤشر
        if (currentTestimonialIndex < 0) {
            currentTestimonialIndex = 0;
        }
        if (currentTestimonialIndex > maxIndex) {
            currentTestimonialIndex = maxIndex;
        }

        // حساب مسافة الانزلاق (بما في ذلك الفجوة 30px)
        const cardElement = testimonialCards[0];
        const cardWidth = cardElement.getBoundingClientRect().width;
        let spacing = 30; // يتوافق مع 'gap: 30px' في CSS
        let slideDistance = cardWidth + spacing;
        
        // حساب قيمة التحويل النهائية
        let translationX = currentTestimonialIndex * slideDistance;

        // تطبيق تعديل الاتجاه (RTL/LTR)
        const isRTL = document.documentElement.dir === 'rtl';
        if (!isRTL) {
            translationX = -translationX;
        } 
        
        // تطبيق التحويل وحفظ القيمة لنقطة بداية السحب التالية
        testimonialsContainer.style.transform = `translateX(${translationX}px)`;
        prevTranslate = translationX; 

        // تحديث حالة الأزرار
        if (testimonialCards.length <= cardsInView) {
            prevArrow.disabled = true;
            nextArrow.disabled = true;
        } else {
            prevArrow.disabled = currentTestimonialIndex === 0;
            nextArrow.disabled = currentTestimonialIndex === maxIndex;
        }
    }


    // ========================================================
    // تفعيل وظيفة السحب اليدوي (Touch Events)
    // ========================================================
    if (testimonialsContainer) {
        
        // 3.1. عند لمس الشاشة (touchstart)
        testimonialsContainer.addEventListener('touchstart', (event) => {
            if (window.innerWidth <= 768) { 
                isDragging = true;
                startX = event.touches[0].clientX;
                // تعطيل الـ transition مؤقتاً (يتطلب كلاس .no-transition في CSS)
                testimonialsContainer.classList.add('no-transition');
            }
        });

        // 3.2. أثناء تحريك اللمس (touchmove)
        testimonialsContainer.addEventListener('touchmove', (event) => {
            if (!isDragging || window.innerWidth > 768 || event.touches.length !== 1) return;

            const currentX = event.touches[0].clientX;
            const dragDistance = currentX - startX;
            
            // تطبيق الانتقال المؤقت للحركة السلسة
            currentTranslate = prevTranslate + dragDistance;
            testimonialsContainer.style.transform = `translateX(${currentTranslate}px)`;
        });

        // 4.3. عند إنهاء اللمس (touchend)
        testimonialsContainer.addEventListener('touchend', () => {
            if (!isDragging || window.innerWidth > 768) return;
            isDragging = false;
            
            // إعادة تفعيل الـ transition
            testimonialsContainer.classList.remove('no-transition'); 
            
            const movedBy = currentTranslate - prevTranslate; // المسافة النهائية المحسوبة

            // تحديد الاتجاه بناءً على مسافة السحب
            if (movedBy < -SLIDER_SENSITIVITY) { // سحب لليسار
                currentTestimonialIndex++;
            } else if (movedBy > SLIDER_SENSITIVITY) { // سحب لليمين
                currentTestimonialIndex--;
            }
            
            // تطبيق المؤشر النهائي والتأكد من الحدود
            updateTestimonialSlider();
        });
    }

    // ===================================
    // وظائف الترجمة والقائمة الجانبية والمظهر
    // ===================================
    
    function applyLanguage(lang) {
        const data = translations[lang];
        if (!data) return;

        body.className = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
        body.classList.add(lang === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (data[key]) {
                if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
                    el.setAttribute('placeholder', data[key]);
                } else if (el.tagName === 'A' && el.classList.contains('contact-btn')) {
                    const span = el.querySelector('.btn-text-mobile-hide');
                    if(span) {
                        span.textContent = data[key];
                    }
                    el.setAttribute('aria-label', data[key]);
                }
                 else if (el.tagName === 'SELECT' && el.hasAttribute('aria-label')) {
                    el.setAttribute('aria-label', data[key]);
                } else if (el.tagName === 'INPUT' && el.type === 'text') {
                     el.setAttribute('placeholder', data[key]);
                }
                else {
                    el.textContent = data[key];
                }
            }
        });
        
        // تحديث محتوى الجدول يدوياً
        const worksTable = document.querySelector('.working-hours-table');
        if (worksTable) {
            worksTable.querySelector('th[data-lang-key="working_hours_title"]').textContent = data.working_hours_title;
            
            const rows = worksTable.querySelectorAll('tbody tr');
            if (rows[0]) {
                rows[0].querySelector('td:first-child').textContent = data.period_morning;
                rows[0].querySelector('td:last-child').textContent = data.time_morning;
            }
            if (rows[1]) {
                rows[1].querySelector('td:first-child').textContent = data.period_evening;
                rows[1].querySelector('td:last-child').textContent = data.time_evening;
            }
        }

        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            serviceSelect.querySelectorAll('option').forEach(option => {
                const key = option.getAttribute('data-lang-key');
                if (key && data[key]) {
                    option.textContent = data[key];
                }
            });
        }
        
        checkOnlineStatus();
        
        // تحديث شريط الآراء لضبط اتجاهه الجديد وإعادة ضبطه
        currentTestimonialIndex = 0; 
        updateTestimonialSlider(); 
    }
    
    function closeMenu() {
        mainNav.classList.remove("is-open");
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>'; 
    }

    function toggleMenu() {
        mainNav.classList.toggle("is-open");

        if (mainNav.classList.contains("is-open")) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener("click", toggleMenu);
    }
    
    navLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    function checkOnlineStatus() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const totalMinutes = currentHour * 60 + currentMinute;
        
        const statusDot = document.getElementById('online-status-dot');
        const statusText = document.getElementById('status-text');
        const imageWrapper = document.getElementById('profile-image-wrapper'); 

        if (!statusDot || !statusText || !imageWrapper) return; 

        const lang = localStorage.getItem("siteLang") || "ar";
        const data = translations[lang] || {}; 

        const start1 = 8 * 60; // 8:00 ص
        const end1 = 16 * 60; // 4:00 م
        const start2 = 19 * 60; // 7:00 م
        const end2_normalized = 1 * 60; // 1:00 ص
        
        let isOnline = false;
        
        if (totalMinutes >= start1 && totalMinutes < end1) {
            isOnline = true;
        } 
        else if (totalMinutes >= start2 || totalMinutes < end2_normalized) {
            isOnline = true;
        }

        if (isOnline) {
            statusDot.classList.add('is-online');
            statusDot.classList.remove('is-offline');
            
            statusText.classList.add('is-online'); 
            statusText.classList.remove('is-offline');
            
            imageWrapper.classList.add('is-online');
            imageWrapper.classList.remove('is-offline');
            
            statusText.textContent = data.status_online || "Online Now"; 
        } else {
            statusDot.classList.add('is-offline');
            statusDot.classList.remove('is-online');
            
            statusText.classList.add('is-offline'); 
            statusText.classList.remove('is-online');
            
            imageWrapper.classList.add('is-offline');
            imageWrapper.classList.remove('is-online');
            
            statusText.textContent = data.status_offline || "Offline Now";
        }
    }

    checkOnlineStatus(); 
    setInterval(checkOnlineStatus, 60000); 

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

    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
        });
    }
    
    // ========================================================
    // ربط الأسهم والتحجيم بوظيفة update
    // ========================================================

    // ربط أحداث النقر بالأسهم
    if (prevArrow && nextArrow) {
        prevArrow.addEventListener('click', () => {
            currentTestimonialIndex--;
            updateTestimonialSlider();
        });

        nextArrow.addEventListener('click', () => {
            currentTestimonialIndex++;
            updateTestimonialSlider();
        });
    }

    // تحديث عند تغيير حجم النافذة
    window.addEventListener('resize', () => {
        // عند تغيير الحجم، نعود للشريحة الأولى لضمان إعادة الحساب الصحيحة
        currentTestimonialIndex = 0;
        updateTestimonialSlider();
    });


    // ********** التشغيل الأولي **********
    initializeStats();
    loadWorks(); 
    updateTestimonialSlider();

    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
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
    
    document.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 992) return; 

            const toolName = card.getAttribute('data-tool');
            if (toolName) {
                hoverImage.innerHTML = `<img src="images/tools/${toolName}.png" alt="${toolName}">`;
                hoverImage.style.display = 'block';
                const isRTL = document.documentElement.dir === 'rtl';
                let x = e.clientX;
                let y = e.clientY;

                if (isRTL) {
                    hoverImage.style.right = `${window.innerWidth - x + 20}px`;
                    hoverImage.style.left = 'auto';
                } else {
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

    tags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            tags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            loadWorks(tag.getAttribute('data-filter'), '', 1);
        });
    });

    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        tags.forEach(t => t.classList.remove('active'));
        document.querySelector('.tag-link[data-filter="all"]').classList.add('active');
        
        loadWorks('all', searchTerm, 1);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchButton.click();
        }
    });

});


// في ملف JavaScript الخاص بك (أو داخل <script> في نهاية <body>)

document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            
            // إغلاق كل الإجابات المفتوحة الأخرى أولاً
            faqQuestions.forEach(q => {
                if (q !== question && q.classList.contains('active')) {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('open');
                }
            });
            
            // تبديل حالة السؤال الحالي (فتح/إغلاق)
            question.classList.toggle('active');
            answer.classList.toggle('open');
        });
    });
});
