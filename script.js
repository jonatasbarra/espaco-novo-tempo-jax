const content = {
    pt: {
        "brand-subtitle": "Igreja Adventista em Jacksonville",
        "nav-home": "Início",
        "nav-services": "Cultos",
        "nav-community": "Comunidade",
        "nav-bible": "Bíblia",
        "nav-contact": "Contato",
        "mobile-home": "Início",
        "mobile-services": "Cultos",
        "mobile-community": "Grupos",
        "mobile-bible": "Bíblia",
        "mobile-contact": "Contato",
        "hero-kicker": "Todos são bem-vindos",
        "hero-title": "Um lugar para adorar, aprender e servir.",
        "hero-text": "Junte-se a nossa comunidade brasileira em Jacksonville para crescer na fé, criar amizades e viver a Palavra de Deus.",
        "hero-primary": "Ver horários",
        "hero-secondary": "Fale conosco",
        "info-day-label": "Culto principal",
        "info-day": "Sábado, 10:00 AM",
        "info-city-label": "Local",
        "info-study-label": "Estudos bíblicos",
        "info-study": "Gratuitos e em grupo",
        "services-kicker": "Encontros semanais",
        "services-title": "Cultos com louvor, estudo e comunhão.",
        "services-text": "Aos sábados nos reunimos para estudar a Bíblia, adorar juntos e receber visitantes com alegria.",
        "community-kicker": "Vida em comunidade",
        "community-title": "Espaços para cada fase da caminhada.",
        "bible-kicker": "Estude a Bíblia",
        "bible-title": "Comece uma conversa simples sobre fé.",
        "bible-text": "Você pode participar de estudos bíblicos gratuitos, presenciais ou online, no seu ritmo.",
        "bible-button": "Quero participar",
        "contact-kicker": "Contato",
        "contact-title": "Venha nos visitar em Jacksonville.",
        "contact-text": "Envie uma mensagem para confirmar o próximo encontro ou pedir mais informações.",
        "contact-location-label": "Localização",
        "footer-top": "Voltar ao topo",
        schedule: [
            { label: "Escola Sabatina", time: "Sábado, 10:00 AM" },
            { label: "Culto de adoração", time: "Sábado, 11:00 AM" },
            { label: "Pequenos grupos", time: "Durante a semana" }
        ],
        groups: [
            {
                title: "Jovens",
                text: "Encontros para amizade, louvor e conversas sobre os desafios da vida cristã."
            },
            {
                title: "Desbravadores",
                text: "Aventuras, natureza, disciplina e crescimento para crianças e adolescentes."
            },
            {
                title: "Famílias",
                text: "Momentos de apoio, oração e comunhão para fortalecer a casa."
            }
        ]
    },
    en: {
        "brand-subtitle": "Adventist church in Jacksonville",
        "nav-home": "Home",
        "nav-services": "Services",
        "nav-community": "Community",
        "nav-bible": "Bible",
        "nav-contact": "Contact",
        "mobile-home": "Home",
        "mobile-services": "Services",
        "mobile-community": "Groups",
        "mobile-bible": "Bible",
        "mobile-contact": "Contact",
        "hero-kicker": "Everyone is welcome",
        "hero-title": "A place to worship, learn and serve.",
        "hero-text": "Join our Brazilian community in Jacksonville to grow in faith, build friendships and live God's Word.",
        "hero-primary": "See schedule",
        "hero-secondary": "Contact us",
        "info-day-label": "Main service",
        "info-day": "Saturday, 10:00 AM",
        "info-city-label": "Location",
        "info-study-label": "Bible studies",
        "info-study": "Free and in groups",
        "services-kicker": "Weekly gatherings",
        "services-title": "Services with worship, study and fellowship.",
        "services-text": "On Saturdays we gather to study the Bible, worship together and welcome visitors with joy.",
        "community-kicker": "Community life",
        "community-title": "Spaces for every step of the journey.",
        "bible-kicker": "Study the Bible",
        "bible-title": "Start a simple conversation about faith.",
        "bible-text": "You can join free Bible studies, in person or online, at your own pace.",
        "bible-button": "I want to join",
        "contact-kicker": "Contact",
        "contact-title": "Visit us in Jacksonville.",
        "contact-text": "Send a message to confirm the next gathering or ask for more information.",
        "contact-location-label": "Location",
        "footer-top": "Back to top",
        schedule: [
            { label: "Sabbath School", time: "Saturday, 10:00 AM" },
            { label: "Worship service", time: "Saturday, 11:00 AM" },
            { label: "Small groups", time: "During the week" }
        ],
        groups: [
            {
                title: "Youth",
                text: "Gatherings for friendship, worship and honest talks about Christian life."
            },
            {
                title: "Pathfinders",
                text: "Adventure, nature, discipline and growth for children and teenagers."
            },
            {
                title: "Families",
                text: "Support, prayer and fellowship to strengthen the home."
            }
        ]
    }
};

const languageButtons = document.querySelectorAll("[data-lang]");
const translatedElements = document.querySelectorAll("[data-i18n]");
const scheduleList = document.querySelector("#schedule-list");
const groupGrid = document.querySelector("#group-grid");
const navLinks = document.querySelectorAll(".desktop-nav a, .mobile-nav a");
const sections = document.querySelectorAll("main section[id]");

let currentLanguage = localStorage.getItem("siteLanguage") || "pt";

function renderSchedule(language) {
    scheduleList.innerHTML = content[language].schedule
        .map((item) => `
            <li>
                <span>${item.label}</span>
                <strong>${item.time}</strong>
            </li>
        `)
        .join("");
}

function renderGroups(language) {
    groupGrid.innerHTML = content[language].groups
        .map((group, index) => `
            <article class="group-card reveal">
                <span class="number">0${index + 1}</span>
                <h3>${group.title}</h3>
                <p>${group.text}</p>
            </article>
        `)
        .join("");

    observeRevealItems();
}

function setLanguage(language) {
    currentLanguage = language;
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
    localStorage.setItem("siteLanguage", language);

    translatedElements.forEach((element) => {
        const key = element.dataset.i18n;

        if (content[language][key]) {
            element.textContent = content[language][key];
        }
    });

    languageButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.lang === language);
    });

    renderSchedule(language);
    renderGroups(language);
}

function updateActiveNav() {
    let activeId = "inicio";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 130;

        if (window.scrollY >= sectionTop) {
            activeId = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
    });
}

let revealObserver;

function observeRevealItems() {
    const revealItems = document.querySelectorAll(".reveal:not(.visible)");

    if (!("IntersectionObserver" in window)) {
        revealItems.forEach((item) => item.classList.add("visible"));
        return;
    }

    if (!revealObserver) {
        revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.18 });
    }

    revealItems.forEach((item) => revealObserver.observe(item));
}

languageButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

window.addEventListener("scroll", updateActiveNav, { passive: true });

document.querySelector("#current-year").textContent = new Date().getFullYear();
setLanguage(currentLanguage);
observeRevealItems();
updateActiveNav();
