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
      contact_phone_label: "الهاتف:",
      contact_email_label: "البريد الإلكتروني:",
      copy: "© 2025 Fennec Visionary. جميع الحقوق محفوظة.",
      search_placeholder: "ابحث عن عمل...",
      no_results_heading: "لم يتم العثور على نتائج",
      no_results_text: "جرب استخدام كلمات بحث أخرى",
      howItWorksTitle: "مراحل العمل",
      howItWorksSubtitle: "عملية تعاون مدروسة لضمان نتائج ملموسة وفعّالة.",
      step1Title: "المرحلة 1: البحث ",
      step1Desc: "ندرس لك نشاطك وأهدافك وجمهورك لفهم احتياجاتك بوضوح ودقة.    ",
      step2Title: "المرحلة 2: التخطيط",
      step2Desc:
        "نضع لك استراتيجية واضحة واتجاهاً إبداعياً يعكس هوية علامتك التجارية.",
      step3Title: "المرحلة 3: التصميم",
      step3Desc:
        "نحوّل أفكارك إلى هوية بصرية متناسقة وقوية تترك أثراً دائماً في جمهور علامتك.",
      step4Title: "المرحلة 4: التسليم",
      step4Desc:
        "نقدّم لك الملفات النهائية مع دعم ومتابعة لضمان انطلاقة ناجحة وواثقة لعملك.",
      testimonials_title: "آراء العملاء",
      testimonial_1_text:
        "تجربة رائعة! المصمم قدم لي هوية بصرية فاقت توقعاتي، كان محترفاً ومتعاوناً جدا.",
      testimonial_1_name: "محمد علي",
      testimonial_1_role: "مدير شركة",
      testimonial_2_text:
        "أنصح بالتعامل معه بشدة. قام بتصميم موقع ويب بسيط وجذاب في وقت قياسي.",
      testimonial_2_name: "فاطمة الزهراء",
      testimonial_2_role: "مؤسسة شركة ناشئة",
      testimonial_3_text:
        "عمل متقن وتواصل ممتاز. فهم متطلباتي بسرعة وقدم لي تصميمًا فريدًا ومبدعًا.",
      testimonial_3_name: "عبد القادر",
      testimonial_3_role: "صاحب متجر إلكتروني",
      testimonial_4_text:
        "المصمم مبدع في أفكاره ومرن في التعديلات. سعيد جدًا بالنتيجة النهائية لتصميم التغليف.",
      testimonial_4_name: "نور الهدى",
      testimonial_4_role: "صاحبة علامة تجارية",
      testimonial_5_text:
        "بكل احترافية، حوّل رؤيتي إلى تصميم شعار يعبر عن علامتي التجارية تمامًا. شكرًا جزيلًا.",
      testimonial_5_name: "يوسف الخالد",
      testimonial_5_role: "ريادي أعمال",
      testimonial_6_text:
        "سرعة في الإنجاز وجودة عالية في التصميم. كان اختيارًا موفقًا للتعاون معه في هذا المشروع.",
      testimonial_6_name: "مريم صقر",
      testimonial_6_role: "مديرة مشروع",
      testimonial_7_text:
        "التصميم الجديد لقائمة الطعام أبهرني. لقد أضاف لمسة عصرية وفنية رائعة.",
      testimonial_7_name: "خالد السعدي",
      testimonial_7_role: "صاحب مطعم",
      testimonial_8_text:
        "ساعدني في تصميم شعار يعكس فني. النتيجة كانت استثنائية وأشكرك على صبرك واهتمامك بالتفاصيل.",
      testimonial_8_name: "ليلى مراد",
      testimonial_8_role: "فنانة تشكيلية",
      testimonial_9_text:
        "تصميم إعلاناتي على السوشيال ميديا أحدث فرقاً كبيراً. زيادة في التفاعل والعملاء.",
      testimonial_9_name: "هشام العماري",
      testimonial_9_role: "مدرب شخصي",
      testimonial_10_text:
        "التعامل كان مريحاً للغاية. فهم احتياجاتي وأضاف لمسات سحرية لتصاميم بطاقات الأعمال.",
      testimonial_10_name: "سارة عبد الله",
      testimonial_10_role: "مصممة أزياء",
      experienceTitle: "🦊 Fennec Visionary | إبداع بصري يصنع هوية مميزة",
      about_me_bio:
        "مصمم جرافيك بخبرة تفوق 12 عامًا، متخصص في تصميم الشعارات والهويات البصرية وبروفايلات الشركات، إضافة إلى الكتالوجات، المطبوعات، وتصاميم السوشيال ميديا. تعاونت مع كبرى الشركات محليًا ودوليًا في الخليج والسعودية وكندا وأمريكا، مقدّمًا حلولًا إبداعية مبتكرة تعكس الاحترافية والتميّز.\n\nشعارنا مستوحى من الفنك الجزائري، رمز الذكاء والهوية الوطنية، ليجسد مزيجًا فريدًا من الثقافة، الإبداع، والاحتراف."
    },
    en: {
      skip_link: "Skip to main content",
      nav_services: "Services",
      nav_how_it_works: "Process",
      nav_works: "Creations",
      nav_testimonials: "Reviews",
      nav_tools: "Tools",
      nav_contact: "Contact",
      nav_about_me: "About",
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
      contact_title: "Contact Us",
      contact_phone_label: "Phone:",
      contact_email_label: "Email:",
      copy: "© 2025 Fennec Visionary. All rights reserved.",
      search_placeholder: "Search for work...",
      no_results_heading: "No Results Found",
      no_results_text: "Try using different keywords",
      howItWorksTitle: "How We Work",
      howItWorksSubtitle:
        "A carefully crafted collaboration process designed to deliver real and effective results.",
      step1Title: "Phase 1: Discovery",
      step1Desc:
        "We analyze your business, goals, and audience to gain a clear understanding of your needs.",
      step2Title: "Phase 2: Planning",
      step2Desc:
        "We build a clear strategy and set a creative direction that reflects your brand identity.",
      step3Title: "Phase 3: Design",
      step3Desc:
        "We shape ideas into a consistent and memorable visual identity that inspires trust and growth.",
      step4Title: "Phase 4: Delivery",
      step4Desc:
        "We deliver the final files and provide support to ensure a confident launch.",
      testimonials_title: "Customer Reviews",
      testimonial_1_text:
        "A great experience! The designer provided a visual identity that exceeded my expectations. He was very professional and cooperative.",
      testimonial_1_name: "Mohamed Ali",
      testimonial_1_role: "Company Manager",
      testimonial_2_text:
        "I highly recommend working with him. He designed a simple yet attractive website in record time.",
      testimonial_2_name: "Fatima Al-Zahra",
      testimonial_2_role: "Startup Founder",
      testimonial_3_text:
        "Excellent work and communication. He quickly understood my requirements and delivered a unique and creative design.",
      testimonial_3_name: "Abdul Qader",
      testimonial_3_role: "Online Store Owner",
      testimonial_4_text:
        "The designer is creative with his ideas and flexible with modifications. I am very happy with the final packaging design.",
      testimonial_4_name: "Noor Al-Huda",
      testimonial_4_role: "Brand Owner",
      testimonial_5_text:
        "With complete professionalism, he transformed my vision into a logo design that perfectly represents my brand. Thank you very much.",
      testimonial_5_name: "Youssef Al-Khaled",
      testimonial_5_role: "Entrepreneur",
      testimonial_6_text:
        "Fast execution and high-quality design. It was a successful choice to collaborate with him on this project.",
      testimonial_6_name: "Mariam Saqr",
      testimonial_6_role: "Project Manager",
      testimonial_7_text:
        "The new menu design for my restaurant impressed me. It added a wonderful modern and artistic touch.",
      testimonial_7_name: "Khaled Al-Saadi",
      testimonial_7_role: "Restaurant Owner",
      testimonial_8_text:
        "He helped me design a logo that reflects my art. The result was exceptional, and I thank you for your patience and attention to detail.",
      testimonial_8_name: "Laila Mourad",
      testimonial_8_role: "Fine Artist",
      testimonial_9_text:
        "The design of my social media ads made a big difference. There was an increase in engagement and clients.",
      testimonial_9_name: "Hisham Al-Ammari",
      testimonial_9_role: "Personal Trainer",
      testimonial_10_text:
        "The experience was very comfortable. He understood my needs and added magical touches to the business card designs.",
      testimonial_10_name: "Sara Abdullah",
      testimonial_10_role: "Fashion Designer",
      experienceTitle:
        "🦊 Fennec Visionary | Visual Creativity that Builds Unique Identity",
      about_me_bio:
        "A graphic designer with over 12 years of experience, specialized in logos, visual identities, and corporate profiles, as well as catalogues, print materials, and social media designs. I have collaborated with leading companies locally and internationally across the Gulf, Saudi Arabia, Canada, and the USA, delivering innovative solutions that reflect professionalism and excellence.\n\nOur logo is inspired by the Algerian fennec, a symbol of ingenuity and national identity, embodying a unique blend of culture, creativity, and professionalism."
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
      contact_phone_label: "Téléphone:",
      contact_email_label: "E-mail:",
      copy: "© 2025 Fennec Visionary. Tous droits réservés.",
      search_placeholder: "Rechercher un travail...",
      no_results_heading: "Aucun Résultat Trouvé",
      no_results_text: "Essayez d'utiliser des mots-clés différents",
      howItWorksTitle: "Étapes de Travail",
      howItWorksSubtitle: "Un processus de collaboration conçu pour garantir des résultats concrets et efficaces.",
      step1Title: "Phase 1: Découverte",
      step1Desc: "Nous étudions votre activité, vos objectifs et votre audience afin de cerner clairement vos besoins",
      step2Title: "Phase 2: Planification",
      step2Desc: "Nous élaborons une stratégie claire et une direction créative adaptées à l’identité de votre marque.",
      step3Title: "Phase 3: Design",
      step3Desc: "Nous transformons les idées en une identité visuelle cohérente et mémorable.",
      step4Title: "Phase 4: Livraison",
      step4Desc: "Nous fournissons les fichiers finaux avec un accompagnement pour un lancement en toute confiance.",
      testimonials_title: "Avis Clients",
      testimonial_1_text: "Une excellente expérience ! Le designer m'a fourni une identité visuelle qui a dépassé mes attentes. Il était très professionnel et coopératif.",
      testimonial_1_name: "Mohamed Ali",
      testimonial_1_role: "Directeur de société",
      testimonial_2_text: "Je le recommande vivement. Il a conçu un site web simple mais attrayant en un temps record.",
      testimonial_2_name: "Fatima Al-Zahra",
      testimonial_2_role: "Fondatrice de startup",
      testimonial_3_text: "Excellent travail et communication. Il a rapidement compris mes besoins et a livré un design unique et créatif.",
      testimonial_3_name: "Abdul Qader",
      testimonial_3_role: "Propriétaire de boutique en ligne",
      testimonial_4_text: "Le designer est créatif dans ses idées et flexible avec les modifications. Je suis très satisfait du résultat final pour le design d'emballage.",
      testimonial_4_name: "Noor Al-Huda",
      testimonial_4_role: "Propriétaire de marque",
      testimonial_5_text: "Avec un professionnalisme total, il a transformé ma vision en un logo qui représente parfaitement ma marque. Un grand merci.",
      testimonial_5_name: "Youssef Al-Khaled",
      testimonial_5_role: "Entrepreneur",
      testimonial_6_text: "Exécution rapide et conception de haute qualité. Ce fut un excellent choix de collaborer avec lui sur ce projet.",
      testimonial_6_name: "Mariam Saqr",
      testimonial_6_role: "Cheffe de projet",
      testimonial_7_text: "Le nouveau design du menu de mon restaurant m'a impressionné. Il a ajouté une touche moderne et artistique merveilleuse.",
      testimonial_7_name: "Khaled Al-Saadi",
      testimonial_7_role: "Propriétaire de restaurant",
      testimonial_8_text: "Il m'a aidé à concevoir un logo qui reflète mon art. Le résultat a été exceptionnel, et je vous remercie pour votre patience et votre attention aux détails.",
      testimonial_8_name: "Laila Mourad",
      testimonial_8_role: "Artiste peintre",
      testimonial_9_text: "La conception de mes publicités sur les réseaux sociaux a fait une grande différence. Il y a eu une augmentation de l'engagement et des clients.",
      testimonial_9_name: "Hisham Al-Ammari",
      testimonial_9_role: "Coach personnel",
      testimonial_10_text: "L'expérience était très agréable. Il a compris mes besoins et a ajouté des touches magiques aux designs des cartes de visite.",
      testimonial_10_name: "Sara Abdullah",
      testimonial_10_role: "Créatrice de mode",
      experienceTitle:
        "🦊 Fennec Visionary | Créativité Visuelle qui Bâtit une Identité Unique",
      about_me_bio:
        "Graphiste avec plus de 12 ans d'expérience, spécialisé dans la conception de logos, d'identités visuelles et de profils d'entreprise, ainsi que dans les catalogues, les imprimés et les designs de réseaux sociaux. J'ai collaboré avec de grandes entreprises locales et internationales dans le Golfe, en Arabie Saoudite, au Canada et aux États-Unis, en fournissant des solutions innovantes qui reflètent le professionnalisme et l'excellence.\n\nNotre logo est inspiré du fennec algérien, un symbole d'ingéniosité et d'identité nationale, incarnant un mélange unique de culture, de créativité, et de professionnalisme."
    },
  };

  // بيانات الأعمال
  const portfolioItems = [
    {
      id: 1,
      title: "تصميم شعار شركة تقنية",
      tags: ["all", "logos", "branding"],
      imageUrl: "images/works/logo1.jpg",
      detailsUrl: "details/logo1.html",
    },
    {
      id: 2,
      title: "هوية بصرية كاملة لمطعم",
      tags: ["all", "branding"],
      imageUrl: "images/works/branding1.jpg",
      detailsUrl: "details/branding1.html",
    },
    {
      id: 3,
      title: "فلاير ترويجي لمناسبة",
      tags: ["all", "flyers", "print"],
      imageUrl: "images/works/flyer1.jpg",
      detailsUrl: "details/flyer1.html",
    },
    {
      id: 4,
      title: "تصاميم سوشيال ميديا",
      tags: ["all", "social-media"],
      imageUrl: "images/works/social1.jpg",
      detailsUrl: "details/social1.html",
    },
    {
      id: 5,
      title: "تصميم تغليف لمنتج",
      tags: ["all", "packaging"],
      imageUrl: "images/works/packaging1.jpg",
      detailsUrl: "details/packaging1.html",
    },
    {
      id: 6,
      title: "رسم توضيحي",
      tags: ["all", "illustrations"],
      imageUrl: "images/works/illustration1.jpg",
      detailsUrl: "details/illustration1.html",
    },
    {
      id: 7,
      title: "شعار عصري",
      tags: ["all", "logos"],
      imageUrl: "images/works/logo2.jpg",
      detailsUrl: "details/logo2.html",
    },
    {
      id: 8,
      title: "علامة تجارية",
      tags: ["all", "branding"],
      imageUrl: "images/works/branding2.jpg",
      detailsUrl: "details/branding2.html",
    },
    {
      id: 9,
      title: "مطوية إعلانية",
      tags: ["all", "flyers"],
      imageUrl: "images/works/flyer2.jpg",
      detailsUrl: "details/flyer2.html",
    },
    {
      id: 10,
      title: "بوست انستغرام",
      tags: ["all", "social-media"],
      imageUrl: "images/works/social2.jpg",
      detailsUrl: "details/social2.html",
    },
    {
      id: 11,
      title: "عبوة منتج",
      tags: ["all", "packaging"],
      imageUrl: "images/works/packaging2.jpg",
      detailsUrl: "details/packaging2.html",
    },
    {
      id: 12,
      title: "رسم رقمي",
      tags: ["all", "illustrations"],
      imageUrl: "images/works/illustration2.jpg",
      detailsUrl: "details/illustration2.html",
    },
  ];

  const testimonialsData = [
    {
      image: "images/testimonials/client1.png",
      stars: 5,
      textKey: "testimonial_1_text",
      nameKey: "testimonial_1_name",
      roleKey: "testimonial_1_role",
    },
    {
      image: "images/testimonials/client2.png",
      stars: 4,
      textKey: "testimonial_2_text",
      nameKey: "testimonial_2_name",
      roleKey: "testimonial_2_role",
    },
    {
      image: "images/testimonials/client3.png",
      stars: 5,
      textKey: "testimonial_3_text",
      nameKey: "testimonial_3_name",
      roleKey: "testimonial_3_role",
    },
    {
      image: "images/testimonials/client4.png",
      stars: 4,
      textKey: "testimonial_4_text",
      nameKey: "testimonial_4_name",
      roleKey: "testimonial_4_role",
    },
    {
      image: "images/testimonials/client5.png",
      stars: 5,
      textKey: "testimonial_5_text",
      nameKey: "testimonial_5_name",
      roleKey: "testimonial_5_role",
    },
    {
      image: "images/testimonials/client6.png",
      stars: 4,
      textKey: "testimonial_6_text",
      nameKey: "testimonial_6_name",
      roleKey: "testimonial_6_role",
    },
    {
      image: "images/testimonials/client7.jpg",
      stars: 5,
      textKey: "testimonial_7_text",
      nameKey: "testimonial_7_name",
      roleKey: "testimonial_7_role",
    },
    {
      image: "images/testimonials/client8.png",
      stars: 4,
      textKey: "testimonial_8_text",
      nameKey: "testimonial_8_name",
      roleKey: "testimonial_8_role",
    },
    {
      image: "images/testimonials/client9.png",
      stars: 5,
      textKey: "testimonial_9_text",
      nameKey: "testimonial_9_name",
      roleKey: "testimonial_9_role",
    },
    {
      image: "images/testimonials/client10.jpg",
      stars: 4,
      textKey: "testimonial_10_text",
      nameKey: "testimonial_10_name",
      roleKey: "testimonial_10_role",
    },
  ];

  const itemsPerPage = 6;
  let currentPage = 1;

  // وظيفة تحديث محتوى الصفحة بناءً على اللغة
  function updateContent(lang) {
    const elements = document.querySelectorAll("[data-lang-key]");
    elements.forEach((el) => {
      const key = el.getAttribute("data-lang-key");
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Handle placeholder specifically for search input
    if (searchInput) {
      searchInput.setAttribute("placeholder", translations[lang]["search_placeholder"]);
    }
  }

  // تبديل الوضع (فاتح/داكن)
  function toggleMode() {
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
  }

  if (modeToggle) {
    modeToggle.addEventListener("click", toggleMode);
  }

  // تبديل اللغة
  function toggleLanguage() {
    const lang = languageSelect.value;
    body.classList.remove("rtl", "ltr");
    body.classList.add(lang === "ar" ? "rtl" : "ltr");
    updateContent(lang);
    localStorage.setItem("siteLang", lang);
    displayTestimonials();
  }

  if (languageSelect) {
    languageSelect.addEventListener("change", toggleLanguage);
  }

  // عرض الأعمال بناءً على الصفحة والبحث
  function displayWorks(items) {
    if (!worksGrid) return;
    worksGrid.innerHTML = "";
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = items.slice(startIndex, endIndex);

    if (paginatedItems.length === 0) {
      document.getElementById("no-results").style.display = "block";
    } else {
      document.getElementById("no-results").style.display = "none";
      paginatedItems.forEach((item) => {
        const itemDiv = document.createElement("a");
        itemDiv.href = "#"; // Disable original link
        itemDiv.classList.add("item");
        itemDiv.dataset.aos = "fade-up";
        itemDiv.setAttribute("data-tags", item.tags.join(" "));
        itemDiv.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.title}" loading="lazy">
                <div class="item-overlay">
                    <h3 class="item-title">${item.title}</h3>
                    <p class="item-tags">${item.tags.join(", ")}</p>
                </div>
            `;
        worksGrid.appendChild(itemDiv);
      });

      // إعادة تفعيل Lightbox2
      lightbox.init();
    }
  }

  // إنشاء عناصر الترقيم
  function setupPagination(items) {
    if (!paginationContainer) return;
    paginationContainer.innerHTML = "";
    const pageCount = Math.ceil(items.length / itemsPerPage);

    for (let i = 1; i <= pageCount; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.classList.add("page-number");
      if (i === currentPage) {
        btn.classList.add("active");
      }
      btn.addEventListener("click", () => {
        currentPage = i;
        displayWorks(items);
        updatePaginationButtons(pageCount);
      });
      paginationContainer.appendChild(btn);
    }
  }

  // تحديث أزرار الترقيم
  function updatePaginationButtons(pageCount) {
    if (!paginationContainer) return;
    const buttons = paginationContainer.querySelectorAll(".page-number");
    buttons.forEach((btn, index) => {
      btn.classList.toggle("active", index + 1 === currentPage);
    });
  }

  // تصفية وعرض الأعمال
  function filterAndDisplay() {
    const activeTag = document.querySelector(".tag-link.active").dataset.tag;
    const searchTerm = searchInput.value.toLowerCase();
    let filteredItems = portfolioItems;

    if (activeTag !== "all") {
      filteredItems = filteredItems.filter((item) =>
        item.tags.includes(activeTag)
      );
    }

    if (searchTerm) {
      filteredItems = filteredItems.filter((item) =>
        item.title.toLowerCase().includes(searchTerm)
      );
    }

    currentPage = 1; // Reset to the first page for new filtering/search
    displayWorks(filteredItems);
    setupPagination(filteredItems);
  }

  // إضافة معالجات الأحداث
  if (tags) {
    tags.forEach((tag) => {
      tag.addEventListener("click", (e) => {
        e.preventDefault();
        tags.forEach((t) => t.classList.remove("active"));
        e.target.classList.add("active");
        filterAndDisplay();
      });
    });
  }

  if (searchButton) {
    searchButton.addEventListener("click", filterAndDisplay);
    searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        filterAndDisplay();
      }
    });
  }

  // Testimonials Slider
  const slider = document.querySelector(".testimonial-slider");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let slideIndex = 0;

  function displayTestimonials() {
    if (!slider) return;
    const lang = languageSelect.value;
    slider.innerHTML = "";
    testimonialsData.forEach(item => {
      const starsHTML = '<span class="stars-rating">' + '★'.repeat(item.stars) + '☆'.repeat(5 - item.stars) + '</span>';
      const testimonialItem = document.createElement("div");
      testimonialItem.classList.add("testimonial-item");
      testimonialItem.innerHTML = `
        <img src="${item.image}" alt="${translations[lang][item.nameKey]}" class="client-image">
        ${starsHTML}
        <p class="testimonial-text" data-lang-key="${item.textKey}">${translations[lang][item.textKey]}</p>
        <div class="client-info">
          <span class="client-name" data-lang-key="${item.nameKey}">${translations[lang][item.nameKey]}</span>
          <span class="client-role" data-lang-key="${item.roleKey}">${translations[lang][item.roleKey]}</span>
        </div>
      `;
      slider.appendChild(testimonialItem);
    });
  }

  function moveSlider(direction) {
    const slideWidth = slider.querySelector(".testimonial-item").clientWidth;
    const totalItems = slider.querySelectorAll(".testimonial-item").length;

    slideIndex += direction;

    if (slideIndex < 0) {
      slideIndex = totalItems - 1;
    } else if (slideIndex >= totalItems) {
      slideIndex = 0;
    }

    const newTransform = -slideIndex * slideWidth;
    slider.style.transform = `translateX(${newTransform}px)`;
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => moveSlider(1));
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => moveSlider(-1));
  }

  // Dynamic Text for About Me
  const dynamicTextElement = document.getElementById("dynamicText");
  const words = [
    "مصمم جرافيك",
    "خبير في الهوية البصرية",
    "مبدع رقمي",
    "شريكك في النجاح",
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];
    let displayText = "";

    if (isDeleting) {
      displayText = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      displayText = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    dynamicTextElement.textContent = displayText;
    let typingSpeed = 150;

    if (isDeleting) {
      typingSpeed /= 2;
    }

    if (!isDeleting && displayText === currentWord) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && displayText === "") {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  // Scroll to section for nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  const closeMenu = () => {
    mainNav.classList.remove("is-open");
  };

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("is-open");
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Language and mode toggle
  const savedLang = localStorage.getItem("siteLang") || "ar";
  const savedMode = localStorage.getItem("siteMode") || "light-mode";

  body.classList.add(savedMode);
  body.classList.add(savedLang === "ar" ? "rtl" : "ltr");
  if (languageSelect) {
    languageSelect.value = savedLang;
  }
  if (modeToggle) {
    modeToggle.innerHTML =
      savedMode === "light-mode"
        ? '<i class="fas fa-moon"></i>'
        : '<i class="fas fa-sun"></i>';
  }

  updateContent(savedLang);
  displayWorks(portfolioItems);
  setupPagination(portfolioItems);
  displayTestimonials();
  type();
  AOS.init({ once: true });
});
