const STORAGE_KEY = "cvfast_app_data_v29_stable_clean";
const UNLOCK_KEY = "cvfast_pdf_unlocked_v1";
const UNLOCK_CODE = "cvfast_pdf_2026_ok";

// TODO: kad napraviš PayPal link, zameni ovde.
// PayPal return URL: https://cvfast.app/?unlock=cvfast_pdf_2026_ok
const PAYMENT_LINK = "https://www.paypal.com/ncp/payment/LU67SFVC967EY";

const SHOW_CVFAST_FOOTER_IN_PDF = false;
const LEGACY_CV_DATA_KEYS = ["cvfast_app_data_v24_clean", "cvfast_app_data_v25_clean", "cvfast_app_data_v28_clean_blank"];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function trackEvent(name, params = {}) {
  if (typeof gtag === "function") {
    gtag("event", name, {
      app_name: "cvfast.app",
      app_language: getLang ? getLang() : "unknown",
      ...params
    });
  }
}



const fields = [
  "cvLanguage",
  "template",
  "fullName",
  "jobTitle",
  "phone",
  "email",
  "location",
  "profile",
  "experience",
  "machines",
  "skills",
  "education",
  "traits",
  "languages"
];

const ui = {
  sr: {
    navHow: "Kako radi",
    navFeatures: "Prednosti",
    navStart: "Start CV",
    privacyBadge: "🛡️ Bez naloga • Bez slanja na server",
    heroTitle: "Napravi CV brzo",
    heroSubtitle: "Napravi i pregledaj CV besplatno. PDF i PNG preuzimanje se otključava jednokratnom podrškom.",
    startCv: "📄 Start CV",
    installApp: "⬇️ Preuzmi app",
    shareApp: "🔗 Podeli app",
    demoInitials: "MP",
    demoPhone: "📞 +381 64 000 0000",
    demoEmail: "✉️ milan.petrovic@example.com",
    cvProfile: "PROFIL",
    cvExperience: "RADNO ISKUSTVO",
    cvSkills: "VEŠTINE",
    demoName: "Milan Petrović",
    demoTitle: "Rukovalac građevinskih mašina",
    demoLocation: "📍 Beograd, Srbija",
    demoProfile: "Pouzdan i iskusan radnik sa fokusom na bezbednost, efikasnost i kvalitet rada.",
    demoExperience1: "Rukovalac mašina — primer firme",
    demoExperience2: "Zemljani radovi i priprema terena",
    demoSkill1: "Praktičan rad",
    demoSkill2: "Bezbednost",
    demoSkill3: "Preciznost",
    howTitle: "Kako radi",
    step1: "Unesi podatke",
    step2: "Pregledaj uživo",
    step3: "Preuzmi PDF",
    supportTitle: "Pregled je besplatan • PDF + PNG unlock €5",
    supportText: "Jednokratna podrška pomaže da cvfast.app ostane online.",
    browserNote: "🔒 Podaci ostaju u tvom browseru",
    feature1Title: "📱 Mobile first",
    feature1Text: "Radi na telefonu, laptopu i desktopu. CV možeš napraviti odmah.",
    feature2Title: "🧾 Live preview",
    feature2Text: "Svaka promena se odmah vidi na CV-u. Nema popunjavanja naslepo.",
    feature3Title: "🛡️ Privacy first",
    feature3Text: "Nema naloga i nema baze. Podaci se čuvaju samo u browseru korisnika.",
    builderEyebrow: "CV BUILDER",
    builderTitle: "Napravi svoj CV",
    templateShowcaseEyebrow: "CV ŠABLONI",
    templateShowcaseTitle: "Izaberi izgled CV-a",
    templateShowcaseNote: "Oba izgleda su vidljiva pre preuzimanja.",
    fullPreview: "👁 Vidi ceo CV",
    basicTitle: "1. Osnovni podaci",
    exampleBtn: "👁 Primer",
    cvLanguageLabel: "Jezik CV-a",
    templateLabel: "Šablon",
    fullNameLabel: "Ime i prezime",
    jobTitleLabel: "Pozicija",
    phoneLabel: "Telefon",
    emailLabel: "Email",
    locationLabel: "Lokacija",
    photoLabel: "Slika",
    profileTitle: "2. Profil",
    experienceTitle: "3. Radno iskustvo",
    machinesSkillsTitle: "4. Mašine i veštine",
    machinesLabel: "Mašine / alati",
    skillsLabel: "Veštine",
    educationExtraTitle: "6. Obrazovanje i dodatno",
    educationLabel: "Obrazovanje / licence / kurs",
    traitsLabel: "Lične osobine",
    languagesTitle: "5. Jezici",
    languageNameLabel: "Jezik",
    languageLevelLabel: "Nivo",
    languageNamePlaceholder: "npr. Engleski",
    addLanguage: "Dodaj jezik",
    removeLanguage: "Ukloni",
    languageLevelNote: "Koristi CEFR nivoe: A1, A2, B1, B2, C1, C2.",
    classicTemplateHint: "Čist CV na jednoj strani",
    sidebarTemplateHint: "Moderan CV sa bočnom kolonom",
    fillDemo: "Popuni demo",
    downloadPdf: "Preuzmi PDF",
    downloadPng: "Preuzmi PNG",
    clearData: "Obriši",
    livePreview: "Live CV Preview",
    autoSave: "Auto-save aktivan",
    translateBtn: "🌍 Prevedi preko Google Translate",
    supportModalTitle: "CV je spreman ✅",
    supportModalText: "Izrada i pregled CV-a su besplatni. Jednokratnom podrškom od 5€ otključavaš PDF i PNG preuzimanje u ovom browseru.",
    supportModalMuted: "Posle otključavanja možeš menjati CV i preuzimati više PDF/PNG verzija u ovom browseru, dok ne obrišeš podatke pregledača.",
    supportPayBtn: "☕ Podrži projekat 5€ i otključaj PDF + PNG",
    alreadyPaid: "",
    mvpNote: "PayPal će te vratiti u app. Otključavanje ostaje u ovom browseru dok ne obrišeš podatke pregledača.",
    privacyLink: "Privatnost",
    termsLink: "Uslovi korišćenja",
    supportLink: "Podrška",
    footerNote: "Bez naloga. Bez slanja CV podataka na server.",
    fullNamePlaceholder: "Enter your full name",
    jobTitlePlaceholder: "Enter your position",
    locationPlaceholder: "Beograd, Srbija",
    profilePlaceholder: "Kratak profesionalni opis...",
    experiencePlaceholder: "Jedna stavka po redu. Primer:\nRukovalac mašina — 10 godina iskustva\nZemljani radovi i priprema terena",
    machinesPlaceholder: "Add machines/tools, one per line",
    skillsPlaceholder: "Add skills, one per line",
    educationPlaceholder: "Kurs / obuka",
    traitsPlaceholder: "Odgovoran, pouzdan, precizan...",
    saved: "Sačuvano",
    dataCleared: "Podaci su obrisani",
    demoFilled: "Demo podaci ubačeni ✅",
    photoAdded: "Slika je dodata ✅",
    chooseTarget: "Izaberi EN ili DE kao jezik CV-a",
    enterTextFirst: "Prvo unesi tekst koji želiš da prevedeš",
    unlocked: "PDF + PNG otključani ✅",
    pdfUnlockedBrowser: "PDF + PNG su otključani u ovom browseru ✅",
    installIos: "Za iPhone: otvori cvfast.app u Safari browseru → tapni Share → Add to Home Screen.",
    installOther: "Ako se install prozor ne pojavi: u Chrome/Edge meniju izaberi Install app ili Add to Home Screen.",
    alreadyInstalled: "App je već instalirana ✅",
    installingApp: "Pripremam instalaciju...",
    installAccepted: "Aplikacija je instalirana na početni ekran ✅",
    installDismissed: "Instalacija je otkazana",
    linkCopied: "Link je kopiran ✅",
    confirmClear: "Da li sigurno želiš da obrišeš sve podatke iz browsera?",
    pdfError: "Greška pri preuzimanju. Proveri internet/CDN biblioteke."
  },
  en: {
    navHow: "How it works",
    navFeatures: "Features",
    navStart: "Start CV",
    privacyBadge: "🛡️ No account • No server upload",
    heroTitle: "Create your resume fast",
    heroSubtitle: "Build and preview your CV for free. PDF and PNG downloads unlock with a one-time €5 support payment. No subscription.",
    startCv: "📄 Start CV",
    installApp: "⬇️ Install app",
    shareApp: "🔗 Share app",
    demoInitials: "JW",
    demoPhone: "📞 +44 7000 000000",
    demoEmail: "✉️ john.worker@example.com",
    cvProfile: "PROFILE",
    cvExperience: "WORK EXPERIENCE",
    cvSkills: "SKILLS",
    demoName: "John Worker",
    demoTitle: "Heavy Equipment Operator",
    demoLocation: "📍 City, Country",
    demoProfile: "Reliable and experienced worker focused on safety, efficiency and quality of work.",
    demoExperience1: "Machine operator — sample company",
    demoExperience2: "Earthworks and site preparation",
    demoSkill1: "Practical work",
    demoSkill2: "Safety",
    demoSkill3: "Precision",
    howTitle: "How it works",
    step1: "Fill in your data",
    step2: "Preview live",
    step3: "Download PDF",
    supportTitle: "Free preview • one-time €5 PDF + PNG unlock",
    supportText: "Build first. Pay only when your CV is ready. No subscription.",
    browserNote: "🔒 Your data stays in your browser",
    feature1Title: "📱 Mobile first",
    feature1Text: "Works on phone, laptop and desktop. You can create your CV immediately.",
    feature2Title: "🧾 Live preview",
    feature2Text: "Every change appears instantly on your CV. No blind form filling.",
    feature3Title: "🛡️ Privacy first",
    feature3Text: "No account and no database. Data is stored only in the user’s browser.",
    builderEyebrow: "CV BUILDER",
    builderTitle: "Create your CV",
    templateShowcaseEyebrow: "CV TEMPLATES",
    templateShowcaseTitle: "Choose your CV design",
    templateShowcaseNote: "Both designs are visible before download.",
    fullPreview: "👁 View full CV",
    basicTitle: "1. Basic information",
    exampleBtn: "👁 Example",
    cvLanguageLabel: "CV language",
    templateLabel: "Template",
    fullNameLabel: "Full name",
    jobTitleLabel: "Position",
    phoneLabel: "Phone",
    emailLabel: "Email",
    locationLabel: "Location",
    photoLabel: "Photo",
    profileTitle: "2. Profile",
    experienceTitle: "3. Work experience",
    machinesSkillsTitle: "4. Machines and skills",
    machinesLabel: "Machines / tools",
    skillsLabel: "Skills",
    educationExtraTitle: "6. Education and extra",
    educationLabel: "Education / licences / course",
    traitsLabel: "Personal qualities",
    languagesTitle: "5. Languages",
    languageNameLabel: "Language",
    languageLevelLabel: "Level",
    languageNamePlaceholder: "e.g. English",
    addLanguage: "Add language",
    removeLanguage: "Remove",
    languageLevelNote: "Use CEFR levels: A1, A2, B1, B2, C1, C2.",
    classicTemplateHint: "Clean one-page CV",
    sidebarTemplateHint: "Modern CV with side column",
    fillDemo: "Fill demo",
    downloadPdf: "Download PDF",
    downloadPng: "Download PNG",
    clearData: "Clear",
    livePreview: "Live CV Preview",
    autoSave: "Auto-save active",
    translateBtn: "🌍 Translate with Google Translate",
    supportModalTitle: "Your CV is ready ✅",
    supportModalText: "Creating and previewing your CV is free. A one-time €5 support payment unlocks PDF and PNG downloads in this browser.",
    supportModalMuted: "After unlocking, you can edit your CV and download more PDF/PNG versions in this browser until you clear browser data. No subscription.",
    supportPayBtn: "☕ Support 5€ & unlock PDF + PNG",
    alreadyPaid: "",
    mvpNote: "After payment, PayPal returns you to cvfast.app. PDF downloads stay unlocked in this browser until you clear browser data.",
    privacyLink: "Privacy Policy",
    termsLink: "Terms of Use",
    supportLink: "Support",
    footerNote: "No account. No CV data upload to our server.",
    fullNamePlaceholder: "Enter your full name",
    jobTitlePlaceholder: "Enter your position",
    locationPlaceholder: "City, Country",
    profilePlaceholder: "Short professional profile...",
    experiencePlaceholder: "One item per line",
    machinesPlaceholder: "Add machines/tools, one per line",
    skillsPlaceholder: "Add skills, one per line",
    educationPlaceholder: "Training / course",
    traitsPlaceholder: "Responsible, reliable, precise...",
    saved: "Saved",
    dataCleared: "Data cleared",
    demoFilled: "Demo data inserted ✅",
    photoAdded: "Photo added ✅",
    chooseTarget: "Choose English or German as CV language",
    enterTextFirst: "First enter the text you want to translate",
    unlocked: "PDF + PNG unlocked ✅",
    pdfUnlockedBrowser: "PDF + PNG are unlocked in this browser ✅",
    installIos: "For iPhone: open cvfast.app in Safari → tap Share → Add to Home Screen.",
    installOther: "If the install prompt does not appear: use Chrome/Edge menu → Install app or Add to Home Screen.",
    alreadyInstalled: "App is already installed ✅",
    installingApp: "Preparing installation...",
    installAccepted: "App installed on Home Screen ✅",
    installDismissed: "Installation cancelled",
    linkCopied: "Link copied ✅",
    confirmClear: "Are you sure you want to delete all data from this browser?",
    pdfError: "Download error. Check internet/CDN libraries."
  },
  de: {
    navHow: "So funktioniert es",
    navFeatures: "Vorteile",
    navStart: "CV starten",
    privacyBadge: "🛡️ Kein Konto • Kein Server-Upload",
    heroTitle: "Lebenslauf schnell erstellen",
    heroSubtitle: "Lebenslauf kostenlos erstellen und ansehen. PDF- und PNG-Download nach einmaliger Unterstützung.",
    startCv: "📄 CV starten",
    installApp: "⬇️ App installieren",
    shareApp: "🔗 App teilen",
    demoInitials: "MA",
    demoPhone: "📞 +49 170 0000000",
    demoEmail: "✉️ max.arbeiter@example.com",
    cvProfile: "PROFIL",
    cvExperience: "BERUFSERFAHRUNG",
    cvSkills: "FÄHIGKEITEN",
    demoName: "Max Mustermann",
    demoTitle: "Baumaschinenführer",
    demoLocation: "📍 Stadt, Land",
    demoProfile: "Zuverlässiger und erfahrener Arbeiter mit Fokus auf Sicherheit, Effizienz und Arbeitsqualität.",
    demoExperience1: "Maschinenführer — Beispielfirma",
    demoExperience2: "Erdarbeiten und Baustellenvorbereitung",
    demoSkill1: "Praktische Arbeit",
    demoSkill2: "Sicherheit",
    demoSkill3: "Präzision",
    howTitle: "So funktioniert es",
    step1: "Daten eingeben",
    step2: "Live ansehen",
    step3: "PDF herunterladen",
    supportTitle: "Kostenlose Vorschau • PDF + PNG für 5€ freischalten",
    supportText: "Erst erstellen. Erst zahlen, wenn dein CV bereit ist. Kein Abo.",
    browserNote: "🔒 Deine Daten bleiben in deinem Browser",
    feature1Title: "📱 Mobile first",
    feature1Text: "Funktioniert auf Handy, Laptop und Desktop. Du kannst deinen Lebenslauf sofort erstellen.",
    feature2Title: "🧾 Live-Vorschau",
    feature2Text: "Jede Änderung erscheint sofort im Lebenslauf. Kein blindes Ausfüllen.",
    feature3Title: "🛡️ Datenschutz zuerst",
    feature3Text: "Kein Konto und keine Datenbank. Daten werden nur im Browser gespeichert.",
    builderEyebrow: "CV BUILDER",
    builderTitle: "Lebenslauf erstellen",
    templateShowcaseEyebrow: "CV-VORLAGEN",
    templateShowcaseTitle: "Wähle dein CV-Design",
    templateShowcaseNote: "Beide Designs sind vor dem Download sichtbar.",
    fullPreview: "👁 Ganzen CV ansehen",
    basicTitle: "1. Grunddaten",
    exampleBtn: "👁 Beispiel",
    cvLanguageLabel: "CV-Sprache",
    templateLabel: "Vorlage",
    fullNameLabel: "Vor- und Nachname",
    jobTitleLabel: "Position",
    phoneLabel: "Telefon",
    emailLabel: "E-Mail",
    locationLabel: "Ort",
    photoLabel: "Foto",
    profileTitle: "2. Profil",
    experienceTitle: "3. Berufserfahrung",
    machinesSkillsTitle: "4. Maschinen und Fähigkeiten",
    machinesLabel: "Maschinen / Werkzeuge",
    skillsLabel: "Fähigkeiten",
    educationExtraTitle: "6. Ausbildung und Zusatz",
    educationLabel: "Ausbildung / Lizenzen / Kurs",
    traitsLabel: "Persönliche Eigenschaften",
    languagesTitle: "5. Sprachen",
    languageNameLabel: "Sprache",
    languageLevelLabel: "Niveau",
    languageNamePlaceholder: "z. B. Deutsch",
    addLanguage: "Sprache hinzufügen",
    removeLanguage: "Entfernen",
    languageLevelNote: "Nutze CEFR-Niveaus: A1, A2, B1, B2, C1, C2.",
    classicTemplateHint: "Klarer einseitiger CV",
    sidebarTemplateHint: "Moderner CV mit Seitenleiste",
    fillDemo: "Demo ausfüllen",
    downloadPdf: "PDF herunterladen",
    downloadPng: "PNG herunterladen",
    clearData: "Löschen",
    livePreview: "Live CV Vorschau",
    autoSave: "Auto-save aktiv",
    translateBtn: "🌍 Mit Google Translate übersetzen",
    supportModalTitle: "Dein CV ist bereit ✅",
    supportModalText: "Erstellen und Vorschau sind kostenlos. Eine einmalige Unterstützung von 5€ schaltet PDF- und PNG-Downloads in diesem Browser frei.",
    supportModalMuted: "Nach der Freischaltung kannst du deinen CV bearbeiten und weitere PDF/PNG-Versionen herunterladen, bis du die Browserdaten löschst. Kein Abo.",
    supportPayBtn: "☕ 5€ unterstützen & PDF + PNG freischalten",
    alreadyPaid: "",
    mvpNote: "Nach der Zahlung bringt PayPal dich zurück zu cvfast.app. PDF-Downloads bleiben in diesem Browser freigeschaltet, bis du die Browserdaten löschst.",
    privacyLink: "Datenschutz",
    termsLink: "Nutzungsbedingungen",
    supportLink: "Support",
    footerNote: "Kein Konto. Kein Upload von CV-Daten auf unseren Server.",
    fullNamePlaceholder: "Vollständigen Namen eingeben",
    jobTitlePlaceholder: "Position eingeben",
    locationPlaceholder: "Stadt, Land",
    profilePlaceholder: "Kurzes berufliches Profil...",
    experiencePlaceholder: "Eine Position pro Zeile. Beispiel:\nMaschinenführer — 10 Jahre Erfahrung\nErdarbeiten und Baustellenvorbereitung",
    machinesPlaceholder: "Maschinen/Werkzeuge eingeben, eine Zeile pro Eintrag",
    skillsPlaceholder: "Fähigkeiten eingeben, eine Zeile pro Eintrag",
    educationPlaceholder: "Ausbildung / Kurs",
    traitsPlaceholder: "Verantwortungsbewusst, zuverlässig, präzise...",
    saved: "Gespeichert",
    dataCleared: "Daten gelöscht",
    demoFilled: "Demo-Daten eingefügt ✅",
    photoAdded: "Foto hinzugefügt ✅",
    chooseTarget: "Wähle EN oder DE als CV-Sprache",
    enterTextFirst: "Gib zuerst den Text ein, den du übersetzen möchtest",
    unlocked: "PDF + PNG freigeschaltet ✅",
    pdfUnlockedBrowser: "PDF + PNG sind in diesem Browser freigeschaltet ✅",
    installIos: "Für iPhone: cvfast.app in Safari öffnen → Teilen → Zum Home-Bildschirm hinzufügen.",
    installOther: "Wenn kein Installationsfenster erscheint: Chrome/Edge-Menü → App installieren oder Zum Startbildschirm hinzufügen.",
    alreadyInstalled: "App ist bereits installiert ✅",
    installingApp: "Installation wird vorbereitet...",
    installAccepted: "App wurde zum Startbildschirm hinzugefügt ✅",
    installDismissed: "Installation abgebrochen",
    linkCopied: "Link kopiert ✅",
    confirmClear: "Möchtest du wirklich alle Daten aus diesem Browser löschen?",
    pdfError: "Download-Fehler. Prüfe Internet/CDN-Bibliotheken."
  }
};

const cvLabels = {
  sr: {
    profile: "PROFIL",
    experience: "RADNO ISKUSTVO",
    machines: "MAŠINE / ALATI",
    skills: "VEŠTINE",
    education: "OBRAZOVANJE / LICENCE",
    traits: "LIČNE OSOBINE",
    languages: "JEZICI",
    placeholderName: "Ime Prezime",
    placeholderTitle: "Pozicija / zanimanje",
    footer: "Napravljeno preko cvfast.app",
    previewTitle: "Ovako će izgledati CV"
  },
  en: {
    profile: "PROFILE",
    experience: "WORK EXPERIENCE",
    machines: "MACHINES / TOOLS",
    skills: "SKILLS",
    education: "EDUCATION / LICENCES",
    traits: "PERSONAL QUALITIES",
    languages: "LANGUAGES",
    placeholderName: "Full Name",
    placeholderTitle: "Job title / position",
    footer: "Created with cvfast.app",
    previewTitle: "This is how your CV will look"
  },
  de: {
    profile: "PROFIL",
    experience: "BERUFSERFAHRUNG",
    machines: "MASCHINEN / WERKZEUGE",
    skills: "FÄHIGKEITEN",
    education: "AUSBILDUNG / LIZENZEN",
    traits: "PERSÖNLICHE EIGENSCHAFTEN",
    languages: "SPRACHEN",
    placeholderName: "Vorname Nachname",
    placeholderTitle: "Position / Beruf",
    footer: "Erstellt mit cvfast.app",
    previewTitle: "So wird dein Lebenslauf aussehen"
  }
};


const legalTexts = {
  sr: {
    privacy: {
      title: "Politika privatnosti",
      body: `
        <p><strong>cvfast.app</strong> je alat za izradu CV-a koji radi u browseru. Aplikacija ne zahteva registraciju i ne šalje tvoje CV podatke na naš server.</p>
        <h3>Koji podaci se koriste?</h3>
        <p>Podaci koje uneseš, uključujući ime, kontakt, radno iskustvo, veštine i sliku, čuvaju se lokalno u tvom browseru preko LocalStorage memorije.</p>
        <h3>LocalStorage</h3>
        <p>Ako obrišeš podatke browsera, koristiš drugi uređaj ili drugi browser, sačuvani CV podaci i PDF otključavanje mogu biti izgubljeni.</p>
        <h3>PDF i plaćanje/podrška</h3>
        <p>PDF se generiše u tvom browseru. Obradu podrške/plaćanja vrši PayPal. Mi ne čuvamo podatke tvoje platne kartice.</p>
        <h3>Google Translate</h3>
        <p>Ako koristiš Google Translate pomoć, tekst koji želiš da prevedeš može biti otvoren u Google Translate servisu i obrađen prema Google pravilima privatnosti.</p>
      `
    },
    terms: {
      title: "Uslovi korišćenja",
      body: `
        <p><strong>cvfast.app</strong> pruža jednostavan alat za kreiranje i pregled CV dokumenata.</p>
        <ul>
          <li>Ne garantujemo zaposlenje, razgovor za posao, ponudu za posao ili prihvatanje CV-a od strane poslodavca.</li>
          <li>Korisnik je odgovoran za tačnost podataka koje unosi u CV.</li>
          <li>Kreiranje i pregled CV-a su besplatni. PDF preuzimanje može zahtevati jednokratnu podršku.</li>
          <li>Pošto aplikacija radi bez naloga i bez baze podataka, otključavanje PDF-a čuva se samo u browseru/uređaju na kojem je otključano.</li>
          <li>Aplikacija se pruža “takva kakva jeste”. Funkcije mogu biti izmenjene, ažurirane ili uklonjene.</li>
        </ul>
      `
    },
    support: {
      title: "Podrška",
      body: `
        <p>Ako imaš problem sa PDF preuzimanjem, prikazom CV-a ili otključavanjem nakon podrške, kontaktiraj podršku.</p>
        <p><strong>Email:</strong> <a href="mailto:support.cvfast@gmail.com">support.cvfast@gmail.com</a></p>
        <p>Ako ovaj email još nije aktiviran, privremeno koristi kontakt koji bude naveden na zvaničnoj stranici projekta.</p>
      `
    }
  },
  en: {
    privacy: {
      title: "Privacy Policy",
      body: `
        <p><strong>cvfast.app</strong> is a browser-based CV builder. The app does not require registration and does not upload your CV data to our server.</p>
        <h3>What data is used?</h3>
        <p>The information you enter, including your name, contact details, work experience, skills and photo, is stored locally in your browser using LocalStorage.</p>
        <h3>LocalStorage</h3>
        <p>If you clear your browser data, use another device or another browser, your saved CV data and PDF unlock may be lost.</p>
        <h3>PDF and payment/support</h3>
        <p>PDF generation happens in your browser. Payment/support processing is handled by PayPal. We do not store your payment card details.</p>
        <h3>Google Translate</h3>
        <p>If you use the Google Translate helper, the text you choose to translate may be opened in Google Translate and processed under Google’s own policies.</p>
      `
    },
    terms: {
      title: "Terms of Use",
      body: `
        <p><strong>cvfast.app</strong> provides a simple tool for creating and previewing CV documents.</p>
        <ul>
          <li>We do not guarantee employment, interviews, job offers or acceptance by any employer.</li>
          <li>You are responsible for the accuracy of the information you enter into your CV.</li>
          <li>Creating and previewing a CV is free. PDF download may require a one-time support payment.</li>
          <li>Because the app works without accounts and without a database, PDF unlock is stored only in the browser/device used at the time of unlock.</li>
          <li>The app is provided “as is”. Features may be changed, updated or removed.</li>
        </ul>
      `
    },
    support: {
      title: "Support",
      body: `
        <p>If you have a problem with PDF download, CV display or unlock after support, contact support.</p>
        <p><strong>Email:</strong> <a href="mailto:support.cvfast@gmail.com">support.cvfast@gmail.com</a></p>
        <p>If this email is not active yet, use the contact provided on the official project page.</p>
      `
    }
  },
  de: {
    privacy: {
      title: "Datenschutz",
      body: `
        <p><strong>cvfast.app</strong> ist ein browserbasierter CV-/Lebenslauf-Builder. Die App erfordert keine Registrierung und lädt deine CV-Daten nicht auf unseren Server hoch.</p>
        <h3>Welche Daten werden verwendet?</h3>
        <p>Die Daten, die du eingibst, einschließlich Name, Kontaktdaten, Berufserfahrung, Fähigkeiten und Foto, werden lokal in deinem Browser über LocalStorage gespeichert.</p>
        <h3>LocalStorage</h3>
        <p>Wenn du Browserdaten löschst, ein anderes Gerät oder einen anderen Browser verwendest, können gespeicherte CV-Daten und PDF-Freischaltung verloren gehen.</p>
        <h3>PDF und Zahlung/Support</h3>
        <p>Die PDF-Erstellung erfolgt in deinem Browser. Die Verarbeitung von Unterstützung/Zahlung erfolgt über PayPal. Wir speichern keine Kreditkarten- oder Zahlungsdaten.</p>
        <h3>Google Translate</h3>
        <p>Wenn du die Google-Translate-Hilfe verwendest, kann der Text in Google Translate geöffnet und gemäß den Google-Richtlinien verarbeitet werden.</p>
      `
    },
    terms: {
      title: "Nutzungsbedingungen",
      body: `
        <p><strong>cvfast.app</strong> bietet ein einfaches Tool zum Erstellen und Anzeigen von CV-/Lebenslauf-Dokumenten.</p>
        <ul>
          <li>Wir garantieren keine Arbeitsstelle, kein Vorstellungsgespräch, kein Jobangebot und keine Annahme durch Arbeitgeber.</li>
          <li>Du bist für die Richtigkeit der eingegebenen Daten verantwortlich.</li>
          <li>Erstellung und Vorschau sind kostenlos. Der PDF-Download kann eine einmalige Unterstützung erfordern.</li>
          <li>Da die App ohne Konto und ohne Datenbank funktioniert, wird die PDF-Freischaltung nur im verwendeten Browser/Gerät gespeichert.</li>
          <li>Die App wird „wie sie ist“ bereitgestellt. Funktionen können geändert, aktualisiert oder entfernt werden.</li>
        </ul>
      `
    },
    support: {
      title: "Support",
      body: `
        <p>Wenn du ein Problem mit PDF-Download, CV-Anzeige oder Freischaltung nach Unterstützung hast, kontaktiere den Support.</p>
        <p><strong>Email:</strong> <a href="mailto:support.cvfast@gmail.com">support.cvfast@gmail.com</a></p>
        <p>Falls diese E-Mail noch nicht aktiv ist, nutze den Kontakt auf der offiziellen Projektseite.</p>
      `
    }
  }
};



const installTexts = {
  sr: {
    title: "Preuzmi cvfast.app",
    android: `
      <div class="install-steps">
        <div class="step-box">
          <h3>📱 Android / Chrome</h3>
          <ol>
            <li>Otvori cvfast.app u Chrome browseru.</li>
            <li>Tapni meni <strong>⋮</strong> gore desno.</li>
            <li>Izaberi <strong>Add to Home screen</strong> ili <strong>Install app</strong>.</li>
            <li>Potvrdi na <strong>Add</strong>.</li>
          </ol>
        </div>
      </div>
    `,
    ios: `
      <div class="install-steps">
        <div class="step-box">
          <h3>🍎 iPhone / Safari</h3>
          <ol>
            <li>Otvori cvfast.app u <strong>Safari</strong> browseru.</li>
            <li>Tapni <strong>Share</strong> dugme.</li>
            <li>Izaberi <strong>Add to Home Screen</strong>.</li>
            <li>Tapni <strong>Add</strong>.</li>
          </ol>
        </div>
      </div>
    `,
    desktop: `
      <div class="install-steps">
        <div class="step-box">
          <h3>💻 Laptop / Chrome / Edge</h3>
          <ol>
            <li>Otvori cvfast.app u Chrome ili Edge browseru.</li>
            <li>Klikni ikonicu za instalaciju u address baru ako se pojavi.</li>
            <li>Ako se ne pojavi, otvori meni <strong>⋮</strong> i izaberi <strong>Install app</strong>.</li>
          </ol>
        </div>
      </div>
    `,
    ok: "Razumem"
  },
  en: {
    title: "Install cvfast.app",
    android: `
      <div class="install-steps">
        <div class="step-box">
          <h3>📱 Android / Chrome</h3>
          <ol>
            <li>Open cvfast.app in Chrome.</li>
            <li>Tap the <strong>⋮</strong> menu.</li>
            <li>Choose <strong>Add to Home screen</strong> or <strong>Install app</strong>.</li>
            <li>Confirm with <strong>Add</strong>.</li>
          </ol>
        </div>
      </div>
    `,
    ios: `
      <div class="install-steps">
        <div class="step-box">
          <h3>🍎 iPhone / Safari</h3>
          <ol>
            <li>Open cvfast.app in <strong>Safari</strong>.</li>
            <li>Tap the <strong>Share</strong> button.</li>
            <li>Choose <strong>Add to Home Screen</strong>.</li>
            <li>Tap <strong>Add</strong>.</li>
          </ol>
        </div>
      </div>
    `,
    desktop: `
      <div class="install-steps">
        <div class="step-box">
          <h3>💻 Laptop / Chrome / Edge</h3>
          <ol>
            <li>Open cvfast.app in Chrome or Edge.</li>
            <li>Click the install icon in the address bar if it appears.</li>
            <li>If it does not appear, open the <strong>⋮</strong> menu and choose <strong>Install app</strong>.</li>
          </ol>
        </div>
      </div>
    `,
    ok: "Got it"
  },
  de: {
    title: "cvfast.app installieren",
    android: `
      <div class="install-steps">
        <div class="step-box">
          <h3>📱 Android / Chrome</h3>
          <ol>
            <li>Öffne cvfast.app in Chrome.</li>
            <li>Tippe auf das Menü <strong>⋮</strong>.</li>
            <li>Wähle <strong>Zum Startbildschirm hinzufügen</strong> oder <strong>App installieren</strong>.</li>
            <li>Bestätige mit <strong>Hinzufügen</strong>.</li>
          </ol>
        </div>
      </div>
    `,
    ios: `
      <div class="install-steps">
        <div class="step-box">
          <h3>🍎 iPhone / Safari</h3>
          <ol>
            <li>Öffne cvfast.app in <strong>Safari</strong>.</li>
            <li>Tippe auf <strong>Teilen</strong>.</li>
            <li>Wähle <strong>Zum Home-Bildschirm</strong>.</li>
            <li>Tippe auf <strong>Hinzufügen</strong>.</li>
          </ol>
        </div>
      </div>
    `,
    desktop: `
      <div class="install-steps">
        <div class="step-box">
          <h3>💻 Laptop / Chrome / Edge</h3>
          <ol>
            <li>Öffne cvfast.app in Chrome oder Edge.</li>
            <li>Klicke auf das Installationssymbol in der Adressleiste, falls es erscheint.</li>
            <li>Falls nicht, öffne das Menü <strong>⋮</strong> und wähle <strong>App installieren</strong>.</li>
          </ol>
        </div>
      </div>
    `,
    ok: "Verstanden"
  }
};


const demoDataByLang = {
  sr: {
    fullName: "Milan Petrović",
    jobTitle: "Rukovalac građevinskih mašina",
    phone: "+49 151 23456789",
    email: "milan.petrovic@example.com",
    location: "Beograd, Srbija",
    profile: "Iskusan i pouzdan radnik sa praktičnim iskustvom, fokusiran na bezbednost, tačnost i kvalitet rada.",
    experience: "Rukovalac mašina — 10 godina iskustva\nZemljani radovi i priprema terena\nRad u dinamičnim uslovima gradilišta",
    machines: "Bager CAT 330\nBuldozer D6R",
    skills: "Niskogradnja\nZemljani radovi\nBezbedan rad\nPreciznost\nTimski rad",
    education: "Kurs / obuka",
    traits: "Odgovoran, pouzdan, precizan i naviknut na rad u dinamičnim uslovima.",
    languages: JSON.stringify([{ name: "Engleski", level: "B2" }, { name: "Nemački", level: "A2" }])
  },
  en: {
    fullName: "John Worker",
    jobTitle: "Heavy Equipment Operator",
    phone: "+49 151 23456789",
    email: "john.worker@example.com",
    location: "City, Country",
    profile: "Experienced and reliable worker with practical field experience, focused on safety, precision and quality of work.",
    experience: "Machine operator — 10 years of experience\nEarthworks and site preparation\nWork in dynamic construction site conditions",
    machines: "CAT 330 excavator\nD6R bulldozer",
    skills: "Earthworks\nSite preparation\nSafe work\nPrecision\nTeamwork",
    education: "Training / course",
    traits: "Responsible, reliable, precise and used to working in dynamic conditions.",
    languages: JSON.stringify([{ name: "English", level: "B2" }, { name: "German", level: "A2" }])
  },
  de: {
    fullName: "Max Mustermann",
    jobTitle: "Baumaschinenführer",
    phone: "+49 151 23456789",
    email: "max.mustermann@example.com",
    location: "Stadt, Land",
    profile: "Erfahrener und zuverlässiger Arbeiter mit praktischer Erfahrung, Fokus auf Sicherheit, Genauigkeit und Qualität der Arbeit.",
    experience: "Maschinenführer — 10 Jahre Erfahrung\nErdarbeiten und Baustellenvorbereitung\nArbeit unter dynamischen Baustellenbedingungen",
    machines: "Bagger CAT 330\nBulldozer D6R",
    skills: "Erdarbeiten\nBaustellenvorbereitung\nSicheres Arbeiten\nPräzision\nTeamarbeit",
    education: "Ausbildung / Kurs",
    traits: "Verantwortungsbewusst, zuverlässig, präzise und an dynamische Arbeitsbedingungen gewöhnt.",
    languages: JSON.stringify([{ name: "Deutsch", level: "B2" }, { name: "Englisch", level: "B1" }])
  }
};

function emptyData() {
  return {
    appLanguage: "en",
    cvLanguage: "en",
    template: "softgray",
    fullName: "",
    jobTitle: "",
    phone: "",
    email: "",
    linkedin: "",
    location: "",
    photo: "",
    profile: "",
    experience: "",
    machines: "",
    skills: "",
    education: "",
    traits: "",
    languages: "[]"
  };
}

function loadStored() {
  try {
    const stored = { ...emptyData(), ...(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}) };
        return stored;
  } catch {
    return emptyData();
  }
}

function saveRaw(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getLang() {
  const stored = loadStored();
  return stored.appLanguage || stored.cvLanguage || "en";
}


function updateLanguageSelectLabels(lang) {
  const cvLanguage = $("#cvLanguage");
  if (!cvLanguage) return;

  const labels = {
    en: { en: "English", de: "German", sr: "Serbian" },
    de: { en: "Englisch", de: "Deutsch", sr: "Serbisch" },
    sr: { en: "Engleski", de: "Nemački", sr: "Srpski" }
  };

  [...cvLanguage.options].forEach((option) => {
    if (labels[lang] && labels[lang][option.value]) {
      option.textContent = labels[lang][option.value];
    }
  });
}


function applyLanguage(lang) {
  if (!ui[lang]) lang = "en";

  const data = loadStored();
  data.appLanguage = lang;
  data.cvLanguage = lang;
  saveRaw(data);

  document.documentElement.lang = lang;
  document.body?.setAttribute("data-app-lang", lang);
  const cvLang = $("#cvLanguage");
  if (cvLang) cvLang.value = lang;
  updateLanguageSelectLabels(lang);

  $$("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (Object.prototype.hasOwnProperty.call(ui[lang], key)) el.textContent = ui[lang][key];
  });

  $$("[data-placeholder]").forEach((el) => {
    const key = el.dataset.placeholder;
    if (Object.prototype.hasOwnProperty.call(ui[lang], key)) el.placeholder = ui[lang][key];
  });

  $$(".lang-pill, .lang-mini").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.setLang === lang);
  });

  renderLanguageEditor($("#languages")?.value || loadStored().languages || "[]");
  refreshPreview();
}

function getLanguageRows(includeDraft = false) {
  const hidden = $("#languages");
  const rows = parseLanguages(hidden?.value || "[]");

  if (includeDraft) {
    const name = ($("#languageName")?.value || "").trim();
    const level = ($("#languageLevel")?.value || "").trim().toUpperCase();
    const allowed = ["A1", "A2", "B1", "B2", "C1", "C2", "NATIVE"];
    const alreadyExists = rows.some((item) =>
      item.name.toLowerCase() === name.toLowerCase() && item.level === level
    );

    if (name && allowed.includes(level) && !alreadyExists) {
      rows.push({ name, level });
    }
  }

  return rows;
}

function getData(options = {}) {
  const stored = loadStored();
  const data = { ...emptyData(), ...stored };
  fields.forEach((field) => {
    const el = $("#" + field);
    if (el) data[field] = el.value || "";
  });

  // Important: preview/PDF must include the language currently typed in the
  // language row, even before the user presses "Add language".
  const languageRows = getLanguageRows(Boolean(options.includeLanguageDraft));
  data.languages = JSON.stringify(languageRows);

  data.appLanguage = stored.appLanguage || data.cvLanguage || "en";
  data.photo = stored.photo || "";
  return data;
}

function setFormData(data) {
  fields.forEach((field) => {
    const el = $("#" + field);
    if (el && data[field] !== undefined) el.value = data[field];
  });
  renderLanguageEditor(data.languages || "[]");
  updateTemplateChoice(data.template || "classic");
}

function saveData() {
  const data = getData();
  data.appLanguage = data.cvLanguage;
  updateTemplateChoice(data.template || "classic");
  saveRaw(data);
  showSaveStatus();
}

function showSaveStatus() {
  const status = $("#saveStatus");
  if (!status) return;
  const lang = getLang();
  status.textContent = ui[lang].saved;
  setTimeout(() => (status.textContent = ui[lang].autoSave), 900);
}

function splitLines(text) {
  return String(text || "")
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);
}


function parseLanguages(value) {
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => ({
        name: String(item.name || "").trim(),
        level: String(item.level || "").trim().toUpperCase()
      }))
      .filter((item) => item.name && ["A1", "A2", "B1", "B2", "C1", "C2", "NATIVE"].includes(item.level));
  } catch {
    return [];
  }
}

function formatLanguages(value) {
  return parseLanguages(value).map((item) => `${item.name} — ${item.level}`);
}

function renderLanguageEditor(value) {
  const list = $("#languageList");
  const hidden = $("#languages");
  if (!list || !hidden) return;
  const lang = getLang();
  const rows = parseLanguages(value || hidden.value);
  hidden.value = JSON.stringify(rows);
  if (!rows.length) {
    list.innerHTML = `<div class="empty-language-note">No language added yet. Type a language, choose A1-C2, then click Add language.</div>`;
    return;
  }
  list.innerHTML = rows.map((item, index) => `
    <div class="language-chip">
      <span>${esc(item.name)} <b>${esc(item.level)}</b></span>
      <button type="button" data-remove-language="${index}">${esc(ui[lang]?.removeLanguage || "Remove")}</button>
    </div>
  `).join("");
}

function clearLanguageDraftInputs() {
  const nameEl = $("#languageName");
  const levelEl = $("#languageLevel");
  if (nameEl) nameEl.value = "";
  if (levelEl) levelEl.value = "A1";
}

function addLanguageFromInputs() {
  const nameEl = $("#languageName");
  const levelEl = $("#languageLevel");
  const hidden = $("#languages");
  if (!nameEl || !levelEl || !hidden) return;
  const name = nameEl.value.trim();
  const level = levelEl.value;
  if (!name) {
    nameEl.focus();
    return;
  }
  const rows = parseLanguages(hidden.value);
  const existing = rows.find((item) => item.name.toLowerCase() === name.toLowerCase());
  if (existing) {
    existing.level = level;
  } else {
    rows.push({ name, level });
  }
  hidden.value = JSON.stringify(rows);
  nameEl.value = "";
  renderLanguageEditor(hidden.value);
  saveData();
  refreshPreview();
}

function esc(text) {
  return String(text || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function initials(name) {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "CV";
  return parts.slice(0, 2).map(p => p[0]?.toUpperCase()).join("");
}

function withPlaceholders(data) {
  // V32 safety rule: never inject demo data into the real CV preview or PDF.
  // Demo data may only be inserted by the Fill demo button or by the Example modal.
  return { ...data };
}


function updateTemplateChoice(template) {
  $$("[data-template-pick]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.templatePick === template);
  });
}


function cvIcon(name) {
  const icons = {
    profile: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5"></circle><path d="M4.5 20c1.4-4.1 4.1-6.2 7.5-6.2s6.1 2.1 7.5 6.2"></path></svg>',
    contact: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8c1.6 3.1 3.5 5 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.2 1.3.4 2.6.6 4 .6.5 0 .9.4.9.9v3.5c0 .5-.4.9-.9.9C10.8 21 3 13.2 3 3.9 3 3.4 3.4 3 3.9 3h3.5c.5 0 .9.4.9.9 0 1.4.2 2.7.6 4 .1.4 0 .8-.2 1.1l-2.1 1.8z"></path></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8c1.6 3.1 3.5 5 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.2 1.3.4 2.6.6 4 .6.5 0 .9.4.9.9v3.5c0 .5-.4.9-.9.9C10.8 21 3 13.2 3 3.9 3 3.4 3.4 3 3.9 3h3.5c.5 0 .9.4.9.9 0 1.4.2 2.7.6 4 .1.4 0 .8-.2 1.1l-2.1 1.8z"></path></svg>',
    email: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M4 7l8 6 8-6"></path></svg>',
    location: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-5.1 7-11a7 7 0 0 0-14 0c0 5.9 7 11 7 11z"></path><circle cx="12" cy="10" r="2.5"></circle></svg>',
    link: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"></path><path d="M14 11a5 5 0 0 0-7.1 0l-2 2a5 5 0 0 0 7.1 7.1l1.1-1.1"></path></svg>',
    experience: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M9 7V5.5A2.5 2.5 0 0 1 11.5 3h1A2.5 2.5 0 0 1 15 5.5V7"></path><path d="M3 12h18"></path></svg>',
    tools: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.7 6.3a4 4 0 0 0-5 5L3.8 17.2a2.1 2.1 0 0 0 3 3l5.9-5.9a4 4 0 0 0 5-5l-2.6 2.6-3-3 2.6-2.6z"></path></svg>',
    skills: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M8.5 14.5c-1.7-1.2-2.8-3.1-2.8-5.2A6.3 6.3 0 0 1 12 3a6.3 6.3 0 0 1 6.3 6.3c0 2.1-1.1 4-2.8 5.2-.8.6-.9 1.4-.9 2.5H9.4c0-1.1-.1-1.9-.9-2.5z"></path></svg>',
    education: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8l9-4 9 4-9 4-9-4z"></path><path d="M7 10.2v5.1c0 1.5 2.2 2.7 5 2.7s5-1.2 5-2.7v-5.1"></path><path d="M21 8v6"></path></svg>',
    languages: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18"></path><path d="M12 3c2.2 2.4 3.2 5.4 3.2 9s-1 6.6-3.2 9c-2.2-2.4-3.2-5.4-3.2-9S9.8 5.4 12 3z"></path></svg>',
    traits: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-4.3-7-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7 3.8C19 16.7 12 21 12 21z"></path></svg>'
  };
  return icons[name] || icons.profile;
}

function cvSectionIcon(key) {
  return `<span class="cv-section-icon">${cvIcon(key)}</span>`;
}

function cvContactIcon(key) {
  return `<span class="cv-contact-icon">${cvIcon(key)}</span>`;
}

function renderCv(target, data, options = {}) {
  const usePlaceholders = Boolean(options.placeholders);
  const d = usePlaceholders ? withPlaceholders(data) : data;
  const lang = cvLabels[d.cvLanguage] ? d.cvLanguage : "en";
  const L = cvLabels[lang];

  const machineItems = splitLines(d.machines);
  const skillItems = splitLines(d.skills);
  const expItems = splitLines(d.experience);
  const languageItems = formatLanguages(d.languages);

  const hasName = Boolean(String(d.fullName || "").trim());
  const hasTitle = Boolean(String(d.jobTitle || "").trim());
  const hasContact = Boolean(String(d.phone || d.email || d.location || d.linkedin || "").trim());
  const hasPhoto = Boolean(d.photo);
  const hasIdentity = hasName || hasTitle || hasContact || hasPhoto;

  const photoHtml = d.photo
    ? `<img class="cv-photo" src="${d.photo}" alt="CV photo" />`
    : (hasName ? `<div class="cv-photo-placeholder">${esc(initials(d.fullName))}</div>` : "");

  const contactHtml = hasContact ? `
    <ul class="cv-contact">
      ${d.phone ? `<li>${cvContactIcon("phone")}<span>${esc(d.phone)}</span></li>` : ""}
      ${d.email ? `<li>${cvContactIcon("email")}<span>${esc(d.email)}</span></li>` : ""}
      ${d.location ? `<li>${cvContactIcon("location")}<span>${esc(d.location)}</span></li>` : ""}
      ${d.linkedin ? `<li>${cvContactIcon("link")}<span>${esc(d.linkedin)}</span></li>` : ""}
    </ul>
  ` : "";

  const nameTitleHtml = `
    ${hasName ? `<h1 class="cv-name">${esc(d.fullName)}</h1>` : ""}
    ${hasTitle ? `<p class="cv-title">${esc(d.jobTitle)}</p>` : ""}
    ${(hasName || hasTitle) ? `<div class="cv-divider"></div>` : ""}
  `;

  const section = (title, html, icon = "profile") => html ? `
    <section class="cv-section cv-section-${icon}">
      <div class="cv-section-title">${cvSectionIcon(icon)}<h2>${esc(title)}</h2></div>
      ${html}
    </section>
  ` : "";

  const listHtml = (items) => items.length ? `<ul class="cv-list">${items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>` : "";
  const tagsHtml = (items) => items.length ? `<div class="cv-tags">${items.map(i => `<span>${esc(i)}</span>`).join("")}</div>` : "";
  const paragraphHtml = (text) => String(text || "").trim() ? `<p class="cv-text">${esc(text)}</p>` : "";

  const filledSections = [
    hasIdentity,
    Boolean(String(d.profile || "").trim()),
    expItems.length,
    machineItems.length,
    skillItems.length,
    languageItems.length,
    Boolean(String(d.education || "").trim()),
    Boolean(String(d.traits || "").trim())
  ].some(Boolean);

  const selectedTemplate = d.template || "classic";
  const sidebarTemplates = ["sidebar", "softgray", "softgreen", "softpink"];
  const useSidebarLayout = sidebarTemplates.includes(selectedTemplate);

  const templateClassName = selectedTemplate === "sidebar" ? "sidebar" : selectedTemplate;
  target.className = `cv-page ${templateClassName}${useSidebarLayout && selectedTemplate !== "sidebar" ? " sidebar" : ""}`;

  if (!filledSections) {
    target.innerHTML = `<div class="cv-empty-note">Start by entering your name, contact details and CV content.</div>`;
    return;
  }

  if (useSidebarLayout) {
    const sideContent = `
      ${photoHtml}
      ${nameTitleHtml}
      ${contactHtml}
      ${section(L.skills, tagsHtml(skillItems), "skills")}
      ${section(L.languages, listHtml(languageItems), "languages")}
      ${section(L.machines, listHtml(machineItems), "tools")}
      ${section(L.education, paragraphHtml(d.education), "education")}
    `.trim();

    target.innerHTML = `
      <div class="cv-inner">
        ${sideContent ? `<aside class="cv-side">${sideContent}</aside>` : ""}
        <main class="cv-main">
          ${section(L.profile, paragraphHtml(d.profile), "profile")}
          ${section(L.experience, listHtml(expItems), "experience")}
          ${section(L.traits, paragraphHtml(d.traits), "traits")}
        </main>
      </div>
      <footer class="cv-footer">cvfast.app</footer>
    `;
    return;
  }

  const headerHtml = hasIdentity ? `
    <header class="cv-header">
      ${photoHtml}
      <div>
        ${nameTitleHtml}
        ${contactHtml}
      </div>
    </header>
  ` : "";

  target.innerHTML = `
    <div class="cv-inner">
      ${headerHtml}

      ${section(L.profile, paragraphHtml(d.profile), "profile")}
      ${section(L.experience, listHtml(expItems), "experience")}

      ${(machineItems.length || skillItems.length) ? `
        <div class="cv-columns">
          ${section(L.machines, listHtml(machineItems), "tools")}
          ${section(L.skills, tagsHtml(skillItems), "skills")}
        </div>
      ` : ""}

      ${(languageItems.length || d.education) ? `
        <div class="cv-columns">
          ${section(L.languages, listHtml(languageItems), "languages")}
          ${section(L.education, paragraphHtml(d.education), "education")}
        </div>
      ` : ""}

      ${section(L.traits, paragraphHtml(d.traits), "traits")}
    </div>
    <footer class="cv-footer">cvfast.app</footer>
  `;
}

function hasRealCvContent(data) {
  const savedLanguages = parseLanguages(data.languages).filter((item) => String(item.name || "").trim());
  return Boolean(
    String(data.fullName || "").trim() ||
    String(data.jobTitle || "").trim() ||
    String(data.phone || "").trim() ||
    String(data.email || "").trim() ||
    String(data.location || "").trim() ||
    String(data.linkedin || "").trim() ||
    String(data.profile || "").trim() ||
    String(data.experience || "").trim() ||
    String(data.machines || "").trim() ||
    String(data.skills || "").trim() ||
    String(data.education || "").trim() ||
    String(data.traits || "").trim() ||
    savedLanguages.length ||
    String(data.languageNameDraft || "").trim() ||
    data.photo
  );
}

function templateSampleData(template, lang = "en") {
  return {
    ...emptyData(),
    appLanguage: ["en","de","sr"].includes(lang) ? lang : "en",
    cvLanguage: ["en","de","sr"].includes(lang) ? lang : "en",
    template: template || "classic",
    fullName: "Alex Miller",
    jobTitle: lang === "de" ? "Operations-Spezialist" : lang === "sr" ? "Operativni radnik" : "Operations Specialist",
    email: "alex@example.com",
    phone: "+49 151 000000",
    location: "Berlin, Germany",
    profile: lang === "de"
      ? "Sauberes CV-Beispiel. Dein eigener Text erscheint hier, sobald du mit dem Schreiben beginnst."
      : lang === "sr"
        ? "Čist primer CV-a. Tvoj tekst će se pojaviti ovde čim počneš da pišeš."
        : "Clean visual CV sample. Your own text appears here when you start typing.",
    experience: lang === "de"
      ? "Tägliche Abläufe\nKoordination vor Ort\nQualitätskontrolle"
      : lang === "sr"
        ? "Svakodnevni rad\nKoordinacija na terenu\nKontrola kvaliteta"
        : "Daily operations\nField coordination\nQuality control",
    skills: lang === "de" ? "Teamarbeit\nSicherheit\nDokumentation" : lang === "sr" ? "Timski rad\nBezbednost\nDokumentacija" : "Teamwork\nSafety\nDocumentation",
    machines: lang === "de" ? "Planungswerkzeuge\nArbeitsausrüstung" : lang === "sr" ? "Alati za planiranje\nRadna oprema" : "Planning tools\nWork equipment",
    languages: lang === "de" ? JSON.stringify([{ name: "Englisch", level: "B2" }, { name: "Deutsch", level: "A2" }]) : lang === "sr" ? JSON.stringify([{ name: "Engleski", level: "B2" }, { name: "Nemački", level: "A2" }]) : JSON.stringify([{ name: "English", level: "B2" }, { name: "German", level: "A2" }]),
    education: "Professional training",
    traits: "Reliable, precise and organized."
  };
}

function renderLiveTemplateSample(target, template, lang) {
  const sample = templateSampleData(template, lang);
  renderCv(target, sample, { placeholders: false });
  target.classList.add("cv-live-template-sample");
  const ribbonText = lang === "de" ? "Nur visuelles Beispiel — beginne zu schreiben, um es durch deinen CV zu ersetzen" : lang === "sr" ? "Samo vizuelni primer — počni da pišeš da ga zameniš svojim CV-om" : "Visual sample only — start typing to replace it with your CV";
  target.insertAdjacentHTML("afterbegin", `<div class="cv-sample-ribbon">${escHtml(ribbonText)}</div>`);
}

function refreshPreview() {
  const data = getData({ includeLanguageDraft: true });
  const preview = $("#cvPreview");
  if (!preview) return;

  const hasContent = hasRealCvContent(data);
  // V38: on mobile, once the user starts typing, hide the demo template examples
  // and show only the real live CV preview. Clear brings the samples back.
  document.body.classList.toggle("has-cv-content", hasContent);
  document.body.classList.toggle("cv-is-empty", !hasContent);

  if (!hasContent) {
    renderLiveTemplateSample(preview, data.template || "classic", data.cvLanguage || getLang());
    return;
  }
  renderCv(preview, data, { placeholders: false });
}

function openPreviewModal(title = "") {
  const data = getData({ includeLanguageDraft: true });
  const lang = cvLabels[data.cvLanguage] ? data.cvLanguage : "en";
  $("#previewModalTitle").textContent = title || cvLabels[lang].previewTitle;
  renderCv($("#modalCvPreview"), data, { placeholders: false });
  $("#previewModal").classList.remove("hidden");
}

function closePreviewModal() {
  $("#previewModal").classList.add("hidden");
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 2200);
}

async function resizeImage(file) {
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const img = await new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.src = dataUrl;
  });

  const maxSize = 700;
  let { width, height } = img;

  if (width > height && width > maxSize) {
    height = Math.round((height * maxSize) / width);
    width = maxSize;
  } else if (height >= width && height > maxSize) {
    width = Math.round((width * maxSize) / height);
    height = maxSize;
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);

  return canvas.toDataURL("image/jpeg", 0.82);
}

function isUnlocked() {
  return localStorage.getItem(UNLOCK_KEY) === "true";
}

function handleUnlockFromUrl() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("unlock") === UNLOCK_CODE) {
    localStorage.setItem(UNLOCK_KEY, "true");
    trackEvent("paypal_return_unlock");
    window.history.replaceState({}, document.title, window.location.pathname);
    showToast(ui[getLang()].pdfUnlockedBrowser);
  }
}


function loadExternalScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") resolve();
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => {
      s.dataset.loaded = "true";
      resolve();
    };
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

async function ensurePdfLibraries() {
  if (!window.html2canvas) {
    await loadExternalScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
  }

  if (!window.jspdf) {
    await loadExternalScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
  }
}


async function downloadPdf() {
  showToast(getLang() === "de" ? "PDF wird vorbereitet..." : getLang() === "en" ? "Preparing PDF..." : "Pripremam PDF...");
  await ensurePdfLibraries();
  const { canvas, data } = await renderCvToCanvas(2);
  const imgData = canvas.toDataURL("image/jpeg", 0.96);
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p", "mm", "a4");
  pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
  pdf.save(cvDownloadFileName(data, "pdf"));
}


function cvDownloadFileName(data, extension) {
  const name = (data.fullName || "cvfast-cv").trim().replace(/[^\p{L}\p{N}]+/gu, "_").replace(/^_+|_+$/g, "") || "cvfast-cv";
  return `${name}_CV.${extension}`;
}

async function renderCvToCanvas(scale = 2) {
  await ensurePdfLibraries();
  const dataForImage = getData({ includeLanguageDraft: true });
  const preview = document.createElement("article");
  preview.className = `cv-page ${dataForImage.template || "classic"}`;
  preview.style.position = "fixed";
  preview.style.left = "-10000px";
  preview.style.top = "0";
  preview.style.width = "794px";
  preview.style.minHeight = "1123px";
  preview.style.background = "#ffffff";
  preview.style.zIndex = "-1";
  document.body.appendChild(preview);
  renderCv(preview, dataForImage, { placeholders: false });
  const footer = preview.querySelector(".cv-footer");
  const oldFooterText = footer?.textContent;
  if (footer && !SHOW_CVFAST_FOOTER_IN_PDF) footer.textContent = "";
  await new Promise((r) => setTimeout(r, 80));
  const canvas = await html2canvas(preview, { scale, backgroundColor: "#ffffff", useCORS: true });
  if (footer && oldFooterText !== undefined) footer.textContent = oldFooterText;
  preview.remove();
  return { canvas, data: dataForImage };
}

async function downloadPng() {
  showToast(getLang() === "de" ? "PNG wird vorbereitet..." : getLang() === "en" ? "Preparing PNG..." : "Pripremam PNG...");
  if (!window.html2canvas) {
    await loadExternalScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
  }
  const { canvas, data } = await renderCvToCanvas(3);
  const link = document.createElement("a");
  link.download = cvDownloadFileName(data, "png");
  link.href = canvas.toDataURL("image/png");
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function openSupportModal() {
  trackEvent("support_modal_open");
  $("#paymentLink").href = PAYMENT_LINK;
  $("#supportModal").classList.remove("hidden");
}

function closeSupportModal() {
  $("#supportModal").classList.add("hidden");
}

function openTranslateHelper() {
  const data = getData();
  const target = data.cvLanguage === "de" ? "de" : "en";
  const lang = getLang();
  const sourceText = [
    data.profile,
    data.experience,
    data.machines,
    data.skills,
    data.education,
    data.traits
  ].filter(Boolean).join("\n\n");

  if (!sourceText.trim()) {
    showToast(ui[lang].enterTextFirst);
    return;
  }

  const url = "https://translate.google.com/?sl=auto&tl=" + encodeURIComponent(target) + "&text=" + encodeURIComponent(sourceText) + "&op=translate";
  window.open(url, "_blank", "noopener");
}


function isIosDevice() {
  return (
    /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

function isAndroidDevice() {
  return /android/i.test(navigator.userAgent);
}

function showInstallInstructions(mode = "auto") {
  const lang = getLang();
  const texts = installTexts[lang] || installTexts.en;
  let body = texts.desktop;

  if (mode === "ios" || (mode === "auto" && isIosDevice())) {
    body = texts.ios;
  } else if (mode === "android" || (mode === "auto" && isAndroidDevice())) {
    body = texts.android;
  }

  $("#installModalTitle").textContent = texts.title;
  $("#installModalBody").innerHTML = body;
  $("#installOkBtn").textContent = texts.ok;
  $("#installModal").classList.remove("hidden");
}

function closeInstallModal() {
  $("#installModal").classList.add("hidden");
}


let deferredPrompt = null;

function setupPwaInstall() {
  window.addEventListener("beforeinstallprompt", (e) => {
    console.log("✅ beforeinstallprompt event uhvaćen");
    e.preventDefault();
    deferredPrompt = e;

    const installBtn = $("#installBtn");
    if (installBtn) {
      installBtn.classList.add("install-ready");
    }
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    const lang = getLang();
    showToast(
      ui[lang]?.installAccepted ||
        "Aplikacija je dodata na početni ekran ✅"
    );
  });

  $("#installBtn")?.addEventListener("click", async () => {
    trackEvent("install_app_click");
    const lang = getLang();
    const installBtn = $("#installBtn");

    const originalText =
      installBtn?.textContent ||
      ui[lang]?.installApp ||
      "⬇️ Preuzmi app";

    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isStandalone) {
      showToast(
        ui[lang]?.alreadyInstalled ||
          "Aplikacija je već instalirana ✅"
      );
      return;
    }

    // Ako browser nije poslao realan install prompt, ne prikazuj ništa.
    if (!deferredPrompt) {
      console.log("PWA install prompt nije dostupan na ovom browseru/uređaju.");
      return;
    }

    try {
      if (installBtn) {
        installBtn.disabled = true;
        installBtn.textContent =
          ui[lang]?.installingApp ||
          "Pripremam instalaciju...";
      }

      await deferredPrompt.prompt();

      const choice = await deferredPrompt.userChoice;
      const outcome = choice?.outcome;

      deferredPrompt = null;

      if (outcome === "accepted") {
        showToast(
          ui[lang]?.installAccepted ||
            "Aplikacija je dodata na početni ekran ✅"
        );
      }
    } catch (error) {
      console.error("PWA install error:", error);
    } finally {
      if (installBtn) {
        installBtn.disabled = false;
        installBtn.textContent = originalText;
      }
    }
  });
}


function setupShare() {
  $("#shareBtn")?.addEventListener("click", async () => {
    trackEvent("share_app_click");
    const lang = getLang();
    const shareData = {
      title: "cvfast.app",
      text: lang === "de"
        ? "Lebenslauf schnell erstellen. Kein Konto. Kein Server-Upload."
        : lang === "en"
          ? "Create your CV fast. No account. No server upload."
          : "Create your CV fast. No account. No server upload.",
      url: window.location.origin + window.location.pathname
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        showToast(ui[lang].linkCopied);
      }
    } catch {
      // user cancelled share
    }
  });
}


function openLegalModal(type) {
  const lang = getLang();
  const content = (legalTexts[lang] && legalTexts[lang][type]) ? legalTexts[lang][type] : legalTexts.en.privacy;
  $("#legalModalTitle").textContent = content.title;
  $("#legalModalBody").innerHTML = content.body;
  $("#legalModal").classList.remove("hidden");
}

function closeLegalModal() {
  $("#legalModal").classList.add("hidden");
}


function init() {
  handleUnlockFromUrl();
  LEGACY_CV_DATA_KEYS.forEach((key) => { if (key !== STORAGE_KEY) localStorage.removeItem(key); });

  const stored = loadStored();
  setFormData(stored);
  applyLanguage(stored.appLanguage || stored.cvLanguage || "en");

  fields.forEach((field) => {
    const el = $("#" + field);
    if (!el) return;

    el.addEventListener("input", () => {
      saveData();
      refreshPreview();
    });

    el.addEventListener("change", () => {
      if (field === "cvLanguage") {
        applyLanguage(el.value);
      } else {
        saveData();
        refreshPreview();
      }
    });
  });


  document.querySelector('a[href="#builder"]')?.addEventListener("click", () => {
    trackEvent("start_cv_click");
  });

  $("#addLanguageBtn")?.addEventListener("click", addLanguageFromInputs);
  $("#languageName")?.addEventListener("input", () => { saveData(); refreshPreview(); });
  $("#languageLevel")?.addEventListener("change", () => { saveData(); refreshPreview(); });
  $("#languageName")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addLanguageFromInputs();
    }
  });
  $("#languageList")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-remove-language]");
    if (!btn) return;
    const hidden = $("#languages");
    const rows = parseLanguages(hidden.value);
    rows.splice(Number(btn.dataset.removeLanguage), 1);
    hidden.value = JSON.stringify(rows);
    renderLanguageEditor(hidden.value);
    saveData();
    refreshPreview();
  });
  $$("[data-template-pick]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const template = btn.dataset.templatePick;
      const templateEl = $("#template");
      if (templateEl) templateEl.value = template;
      saveData();
      refreshPreview();
    });
  });

  $("#photo")?.addEventListener("change", async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const photo = await resizeImage(file);
      const data = getData();
      data.photo = photo;
      saveRaw(data);
      refreshPreview();
      showToast(ui[getLang()].photoAdded);
    } catch {
      showToast("Image error");
    }
  });

  $("#fillDemoBtn")?.addEventListener("click", () => {
    trackEvent("fill_demo_click");
    const current = loadStored();
    const lang = getLang();
    const data = {
      ...current,
      ...demoDataByLang[lang],
      appLanguage: lang,
      cvLanguage: lang,
      template: current.template || "classic",
      photo: current.photo || ""
    };
    delete data.v40State;
    saveRaw(data);
    setFormData(data);
    refreshPreview();
    showToast(ui[lang].demoFilled);
  });

  $("#clearDataBtn")?.addEventListener("click", () => {
    const lang = getLang();
    if (!confirm(ui[lang].confirmClear)) return;
    const selectedTemplate = $("#template")?.value || loadStored().template || "classic";
    localStorage.removeItem(STORAGE_KEY);
    const data = emptyData();
    data.appLanguage = lang;
    data.cvLanguage = lang;
    data.template = selectedTemplate;
    setFormData(data);
    clearLanguageDraftInputs();
    saveRaw(data);
    applyLanguage(lang);
    clearLanguageDraftInputs();
    updateTemplateChoice(selectedTemplate);
    refreshPreview();
    showToast(ui[lang].dataCleared);
  });

  $("#downloadPdfBtn")?.addEventListener("click", async () => {
    trackEvent("download_pdf_click", { unlocked: isUnlocked() });
    const lang = getLang();
    if (!isUnlocked()) {
      openSupportModal();
      return;
    }

    try {
      await downloadPdf();
    } catch (err) {
      console.error(err);
      showToast(ui[lang].pdfError);
    }
  });

  $("#downloadPngBtn")?.addEventListener("click", async () => {
    trackEvent("download_png_click", { unlocked: isUnlocked() });
    const lang = getLang();
    if (!isUnlocked()) {
      openSupportModal();
      return;
    }

    try {
      await downloadPng();
    } catch (err) {
      console.error(err);
      showToast(ui[lang].pdfError);
    }
  });

  $("#paymentLink")?.addEventListener("click", () => {
    trackEvent("paypal_click", { value: 5, currency: "EUR" });
  });

$("#closeSupportModal")?.addEventListener("click", closeSupportModal);
  $("#supportModal")?.addEventListener("click", (e) => {
    if (e.target.id === "supportModal") closeSupportModal();
  });

  $("#openFullPreviewBtn")?.addEventListener("click", () => openPreviewModal());
  $$(".preview-help").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = getLang();
      const titles = {
        sr: {
          basic: "Osnovni podaci u gotovom CV-u",
          profile: "Primer profesionalnog profila",
          experience: "Primer radnog iskustva",
          skills: "Primer mašina i veština",
          education: "Primer obrazovanja i osobina",
          languages: "Primer nivoa jezika"
        },
        en: {
          basic: "Basic information in the final CV",
          profile: "Professional profile example",
          experience: "Work experience example",
          skills: "Machines and skills example",
          education: "Education and qualities example",
          languages: "Language levels example"
        },
        de: {
          basic: "Grunddaten im fertigen CV",
          profile: "Beispiel für ein berufliches Profil",
          experience: "Beispiel für Berufserfahrung",
          skills: "Beispiel für Maschinen und Fähigkeiten",
          education: "Beispiel für Ausbildung und Eigenschaften",
          languages: "Beispiel für Sprachniveaus"
        }
      };
      const currentData = getData({ includeLanguageDraft: true });
      currentData.template = $("#template")?.value || currentData.template || "classic";

      // V39: if the user has already started filling the CV, Example must show
      // the user's current live CV, not a generic demo sample.
      if (hasRealCvContent(currentData)) {
        const liveTitles = {
          sr: "Tvoj trenutni CV prikaz",
          en: "Your current CV preview",
          de: "Deine aktuelle CV-Vorschau"
        };
        $("#previewModalTitle").textContent = liveTitles[lang] || liveTitles.en;
        renderCv($("#modalCvPreview"), currentData, { placeholders: false });
      } else {
        const demo = {
          ...emptyData(),
          ...demoDataByLang[lang],
          cvLanguage: lang,
          appLanguage: lang,
          template: $("#template")?.value || "classic"
        };
        $("#previewModalTitle").textContent = titles[lang][btn.dataset.help] || "";
        renderCv($("#modalCvPreview"), demo, { placeholders: false });
      }
      $("#previewModal").classList.remove("hidden");
    });
  });

  $("#closePreviewModal")?.addEventListener("click", closePreviewModal);
  $("#previewModal")?.addEventListener("click", (e) => {
    if (e.target.id === "previewModal") closePreviewModal();
  });

  $("#menuBtn")?.addEventListener("click", () => {
    $("#mobileMenu").classList.toggle("hidden");
  });

  $$("[data-set-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      applyLanguage(btn.dataset.setLang);
      saveData();
    });
  });

  $("#translateHelperBtn")?.addEventListener("click", openTranslateHelper);


  $$("[data-legal]").forEach((btn) => {
    btn.addEventListener("click", () => openLegalModal(btn.dataset.legal));
  });

  $("#closeLegalModal")?.addEventListener("click", closeLegalModal);
  $("#legalModal")?.addEventListener("click", (e) => {
    if (e.target.id === "legalModal") closeLegalModal();
  });



  $("#closeInstallModal")?.addEventListener("click", closeInstallModal);
  $("#installOkBtn")?.addEventListener("click", closeInstallModal);
  $("#installModal")?.addEventListener("click", (e) => {
    if (e.target.id === "installModal") closeInstallModal();
  });


  setupPwaInstall();
  setupShare();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js?v=441").catch(() => {});
    });
  }

  refreshPreview();
}

document.addEventListener("DOMContentLoaded", init);


/* =========================
   V40 PHONE WIZARD INTEGRATION
   Uses legacy storage/PDF/PayPal functions.
   ========================= */
const V40_STEPS_BY_LANG = {
  en: ["Choose Template", "Personal Details", "Contact Details", "Profile Summary", "Work Experience", "Education", "Skills", "Languages", "Final Preview"],
  de: ["Vorlage wählen", "Persönliche Daten", "Kontaktdaten", "Profilzusammenfassung", "Berufserfahrung", "Ausbildung", "Fähigkeiten", "Sprachen", "Finale Vorschau"],
  sr: ["Izbor šablona", "Lični podaci", "Kontakt podaci", "Profesionalni profil", "Radno iskustvo", "Obrazovanje", "Veštine", "Jezici", "Završni pregled"]
};
const V40_STEPS = V40_STEPS_BY_LANG.en;

const V40_I18N = {
  en: {
    subtitle: "Create a clean professional CV in minutes.",
    start: "Start →",
    livePreview: "Live CV Preview",
    saved: "All changes saved locally ✓",
    stepsLeft: "steps left",
    screensLeft: "screens left",
    done: "Done!",
    firstLastError: "Please enter first name and last name before continuing.",
    installApp: "⬇️ Install app",
    shareApp: "🔗 Share app",
    noTextYet: "No text yet.",
    original: "Original:",
    suggested: "Suggested improvement:",
    keepOriginal: "Keep original",
    useImproved: "Use improved",
    home: "Home",
    fillDemo: "Fill demo",
    clearData: "Clear",
    termsUse: "Terms of Use",
    privacyPolicy: "Privacy Policy",
    contact: "Contact",
    contactSupport: "Contact support",
    responsibility: "Use CVFast.app responsibly. You are responsible for the accuracy of the information you enter in your CV.",
    fullPreviewTitle: "Live CV Preview",
    closePreview: "Close ×"
  },
  de: {
    subtitle: "Erstelle in wenigen Minuten einen sauberen professionellen CV.",
    start: "Start →",
    livePreview: "Live CV Vorschau",
    saved: "Alle Änderungen lokal gespeichert ✓",
    stepsLeft: "Schritte übrig",
    screensLeft: "Ansichten übrig",
    done: "Fertig!",
    firstLastError: "Bitte Vorname und Nachname eingeben.",
    installApp: "⬇️ App installieren",
    shareApp: "🔗 App teilen",
    noTextYet: "Noch kein Text.",
    original: "Original:",
    suggested: "Verbesserter Vorschlag:",
    keepOriginal: "Original behalten",
    useImproved: "Verbesserten Text nutzen",
    home: "Startseite",
    fillDemo: "Demo ausfüllen",
    clearData: "Löschen",
    termsUse: "Nutzungsbedingungen",
    privacyPolicy: "Datenschutz",
    contact: "Kontakt",
    contactSupport: "Support kontaktieren",
    responsibility: "Nutze CVFast.app verantwortungsvoll. Du bist für die Richtigkeit der Angaben in deinem CV verantwortlich.",
    fullPreviewTitle: "Live CV Vorschau",
    closePreview: "Schließen ×"
  },
  sr: {
    subtitle: "Napravi čist profesionalni CV za nekoliko minuta.",
    start: "Počni →",
    livePreview: "Live pregled CV-a",
    saved: "Sve izmene su sačuvane lokalno ✓",
    stepsLeft: "ekrana do kraja",
    screensLeft: "ekrana do kraja",
    done: "Gotovo!",
    firstLastError: "Unesite ime i prezime pre nastavka.",
    installApp: "⬇️ Preuzmi app",
    shareApp: "🔗 Podeli app",
    noTextYet: "Još nema teksta.",
    original: "Original:",
    suggested: "Predlog poboljšanja:",
    keepOriginal: "Zadrži original",
    useImproved: "Koristi poboljšan tekst",
    home: "Početna",
    fillDemo: "Popuni demo",
    clearData: "Obriši",
    termsUse: "Uslovi korišćenja",
    privacyPolicy: "Politika privatnosti",
    contact: "Kontakt",
    contactSupport: "Kontakt podrška",
    responsibility: "Koristi CVFast.app odgovorno. Ti si odgovoran za tačnost podataka koje unosiš u CV.",
    fullPreviewTitle: "Live pregled CV-a",
    closePreview: "Zatvori ×"
  }
};

const V40_TEXTS = {
  en: {
    continueBtn: "Continue →", nextBtn: "Next →", downloadPdf: "Download PDF",
    downloadPng: "Download PNG", unlockPdf: "Support CVfast.app — PDF + PNG 5€", part: "Part", stepLabel: "Step", backBtn: "‹ Back", edit: "Edit", delete: "Delete", entry: "Entry",
    templateIntroTitle: "Choose your CV design", templateIntroText: "Select one example below. You can change it later.", classic: "Classic", modern: "Modern", classicDesc: "Clean and simple CV for most jobs.", modernDesc: "Modern side column layout.", softgray: "Soft Gray", softgrayDesc: "Light gray elegant layout, ideal for print and email.", mono: "Mono Icons", monoDesc: "Best for black and white printers: clean, light and icon-based.", softgreen: "Excel Green", softgreenDesc: "Modern green sidebar, made for email and color printing.", softpink: "Soft Pink", softpinkDesc: "Modern pink sidebar, made for email and color printing.", softblue: "Soft Blue", softblueDesc: "Calm blue business CV.", beige: "Warm Beige", beigeDesc: "Warm elegant CV for email and print.", downloadPng: "Download PNG", unlockDownloads: "Support CVfast.app — PDF + PNG 5€",
    firstNameNote: "First add your name. The app will guide you field by field.", firstName: "First name *", lastName: "Last name *", firstNamePh: "John", lastNamePh: "Smith",
    headlineNote: "Add the CV headline shown under your name.", headline: "Target position / CV headline", headlinePh: "Senior Software Engineer",
    photoNote: "Add a clear CV photo if you want. This is optional.", photo: "Photo", addPhoto: "Add CV photo", photoHelp: "Optional. Saved only in this browser.", choosePhoto: "Choose photo", removePhoto: "Remove photo",
    contactNote: "Add the main contact details first.", email: "Email", phone: "Phone", phonePh: "+44 7000 000000",
    locationNote: "Now add location and an optional profile link.", city: "City", cityPh: "London", country: "Country", countryPh: "United Kingdom",
    summary: "Professional summary", summaryPh: "Write 2–4 sentences about your experience, strengths and career goal.", summaryHelp: "Write 2–4 sentences about your experience, strengths and career goal.", improve: "✨ Improve",
    savedJobs: "Saved jobs", jobNote1: "Add the job title and company.", jobTitle: "Job title in this job", jobTitlePh: "Software Engineer", company: "Company", companyPh: "Company",
    jobNote2: "Add where and when you worked.", location: "Location", locationPh: "London", startDate: "Start date", endPresent: "End / Present", present: "Present",
    jobNote3: "Add a short description, then save this job if needed.", description: "Description", descriptionPh: "Describe your responsibilities and achievements.", saveJob: "+ Save job",
    savedEducation: "Saved education", eduNote1: "Add school and degree first.", school: "School / University", schoolPh: "University of London", degree: "Degree", degreePh: "BSc in Computer Science",
    eduNote2: "Add location and dates.", dates: "Dates", eduNote3: "Optional: add a short note, then save education.", descriptionOptional: "Description optional", optionalDetails: "Optional details.", saveEducation: "+ Save education",
    skill: "Skill", skillPh: "Communication", add: "+ Add", suggestSkills: "✨ Suggest skills",
    language: "Language", languagePh: "English", level: "Level", native: "Native", addLanguage: "+ Add language",
    atsScore: "ATS Readiness Score", ready: "Your CV is ready for PDF and PNG.", template: "Template", pdfUnlocked: "PDF + PNG downloads are unlocked.", why5: "What do you get for 5€?", unlockedHelp: "PDF and PNG downloads are unlocked in this browser. Edit your CV and download new versions whenever you need them.", unlockHelp: "You pay once to unlock PDF and PNG downloads on this device/browser. The CV builder and preview are free. After payment, PayPal returns you here and you can download more versions until browser data is cleared. No subscription.", editPersonal: "Edit personal", editContact: "Edit contact", editWork: "Edit work", tipFullName: "Add full name", tipJobTitle: "Add job title", tipEmail: "Add email", tipPhone: "Add phone", tipSummary: "Add stronger summary", tipExperience: "Add work experience", tipSkills: "Add more skills", tipResults: "Consider adding measurable results", goodStructure: "Good structure", strongKeywords: "Strong keywords", readyPdf: "Ready for PDF"
  },
  de: {
    continueBtn: "Weiter →", nextBtn: "Weiter →", downloadPdf: "PDF herunterladen",
    downloadPng: "PNG herunterladen", unlockPdf: "CVfast.app unterstützen — PDF + PNG 5€", part: "Teil", stepLabel: "Schritt", backBtn: "‹ Zurück", edit: "Bearbeiten", delete: "Löschen", entry: "Eintrag",
    templateIntroTitle: "Wähle dein CV-Design", templateIntroText: "Wähle unten ein Beispiel. Du kannst es später ändern.", classic: "Klassisch", modern: "Modern", classicDesc: "Sauberer und einfacher CV für die meisten Jobs.", modernDesc: "Modernes Layout mit Seitenleiste.", softgray: "Soft Grau", softgrayDesc: "Hellgraues elegantes Layout, ideal für Druck und E-Mail.", mono: "Mono Icons", monoDesc: "Am besten für Schwarzweißdrucker: sauber, leicht und mit Icons.", softgreen: "Excel Green", softgreenDesc: "Moderne grüne Seitenleiste für E-Mail und Farbdruck.", softpink: "Soft Pink", softpinkDesc: "Moderne rosa Seitenleiste für E-Mail und Farbdruck.", softblue: "Soft Blue", softblueDesc: "Ruhiger blauer Business-CV.", beige: "Warm Beige", beigeDesc: "Warmer eleganter CV für E-Mail und Druck.", downloadPng: "PNG herunterladen", unlockDownloads: "CVfast.app unterstützen — PDF + PNG 5€",
    firstNameNote: "Gib zuerst deinen Namen ein. Die App führt dich Feld für Feld.", firstName: "Vorname *", lastName: "Nachname *", firstNamePh: "Max", lastNamePh: "Müller",
    headlineNote: "Füge die Überschrift hinzu, die unter deinem Namen erscheint.", headline: "Zielposition / CV-Überschrift", headlinePh: "Softwareentwickler",
    photoNote: "Füge optional ein klares CV-Foto hinzu.", photo: "Foto", addPhoto: "CV-Foto hinzufügen", photoHelp: "Optional. Nur in diesem Browser gespeichert.", choosePhoto: "Foto auswählen", removePhoto: "Foto entfernen",
    contactNote: "Füge zuerst die wichtigsten Kontaktdaten hinzu.", email: "E-Mail", phone: "Telefon", phonePh: "+49 170 0000000",
    locationNote: "Füge jetzt Ort und optional einen Profil-Link hinzu.", city: "Stadt", cityPh: "Berlin", country: "Land", countryPh: "Deutschland",
    summary: "Profilzusammenfassung", summaryPh: "Schreibe 2–4 Sätze über Erfahrung, Stärken und Karriereziel.", summaryHelp: "Schreibe 2–4 Sätze über Erfahrung, Stärken und Karriereziel.", improve: "✨ Verbessern",
    savedJobs: "Gespeicherte Jobs", jobNote1: "Füge Jobtitel und Firma hinzu.", jobTitle: "Jobtitel in dieser Stelle", jobTitlePh: "Softwareentwickler", company: "Firma", companyPh: "Firma",
    jobNote2: "Füge Ort und Zeitraum hinzu.", location: "Ort", locationPh: "Berlin", startDate: "Startdatum", endPresent: "Ende / Heute", present: "Heute",
    jobNote3: "Füge eine kurze Beschreibung hinzu und speichere die Stelle bei Bedarf.", description: "Beschreibung", descriptionPh: "Beschreibe Aufgaben und Erfolge.", saveJob: "+ Stelle speichern",
    savedEducation: "Gespeicherte Ausbildung", eduNote1: "Füge zuerst Schule/Uni und Abschluss hinzu.", school: "Schule / Universität", schoolPh: "Universität Berlin", degree: "Abschluss", degreePh: "Bachelor Informatik",
    eduNote2: "Füge Ort und Zeitraum hinzu.", dates: "Zeitraum", eduNote3: "Optional: Füge eine kurze Notiz hinzu und speichere die Ausbildung.", descriptionOptional: "Beschreibung optional", optionalDetails: "Optionale Details.", saveEducation: "+ Ausbildung speichern",
    skill: "Fähigkeit", skillPh: "Kommunikation", add: "+ Hinzufügen", suggestSkills: "✨ Fähigkeiten vorschlagen",
    language: "Sprache", languagePh: "Deutsch", level: "Niveau", native: "Muttersprache", addLanguage: "+ Sprache hinzufügen",
    atsScore: "ATS-Bereitschaft", ready: "Dein CV ist bereit für PDF und PNG.", template: "Vorlage", pdfUnlocked: "PDF + PNG sind freigeschaltet.", why5: "Was bekommst du für 5€?", unlockedHelp: "PDF- und PNG-Downloads sind in diesem Browser freigeschaltet. Du kannst den CV bearbeiten und neue Versionen herunterladen.", unlockHelp: "Du zahlst einmalig, um PDF- und PNG-Downloads auf diesem Gerät/Browser freizuschalten. Erstellung und Vorschau bleiben kostenlos. Nach PayPal kommst du zurück und kannst weitere Versionen herunterladen, bis Browserdaten gelöscht werden. Kein Abo.", editPersonal: "Persönliches bearbeiten", editContact: "Kontakt bearbeiten", editWork: "Beruf bearbeiten", tipFullName: "Vollständigen Namen hinzufügen", tipJobTitle: "Jobtitel hinzufügen", tipEmail: "E-Mail hinzufügen", tipPhone: "Telefon hinzufügen", tipSummary: "Profil stärken", tipExperience: "Berufserfahrung hinzufügen", tipSkills: "Mehr Fähigkeiten hinzufügen", tipResults: "Messbare Ergebnisse ergänzen", goodStructure: "Gute Struktur", strongKeywords: "Starke Schlüsselwörter", readyPdf: "Bereit für PDF"
  },
  sr: {
    continueBtn: "Nastavi →", nextBtn: "Dalje →", downloadPdf: "Preuzmi PDF",
    downloadPng: "Preuzmi PNG", unlockPdf: "Podrži CVfast.app — PDF + PNG 5€", part: "Deo", stepLabel: "Korak", backBtn: "‹ Nazad", edit: "Uredi", delete: "Obriši", entry: "Unos",
    templateIntroTitle: "Izaberi izgled CV-a", templateIntroText: "Izaberi jedan primer dole. Možeš ga promeniti kasnije.", classic: "Klasičan", modern: "Moderan", classicDesc: "Čist i jednostavan CV za većinu poslova.", modernDesc: "Moderan raspored sa bočnom kolonom.", softgray: "Soft Gray", softgrayDesc: "Blago sivi elegantni šablon, idealan za štampu i email.", mono: "Mono ikonice", monoDesc: "Najbolji za crno-beli štampač: čist, lagan i sa ikonicama.", softgreen: "Excel Green", softgreenDesc: "Moderni zeleni sidebar za email i štampu u boji.", softpink: "Soft Pink", softpinkDesc: "Moderni roze sidebar za email i štampu u boji.", softblue: "Soft Blue", softblueDesc: "Mirni plavi poslovni CV.", beige: "Warm Beige", beigeDesc: "Topao elegantan CV za email i štampu.", downloadPng: "Preuzmi PNG", unlockDownloads: "Podrži CVfast.app — PDF + PNG 5€",
    firstNameNote: "Prvo dodaj ime. Aplikacija te vodi polje po polje.", firstName: "Ime *", lastName: "Prezime *", firstNamePh: "Aleksandar", lastNamePh: "Petrović",
    headlineNote: "Dodaj naslov CV-a koji se prikazuje ispod imena.", headline: "Ciljana pozicija / naslov CV-a", headlinePh: "Rukovalac građevinskih mašina",
    photoNote: "Dodaj jasnu CV fotografiju ako želiš. Nije obavezno.", photo: "Fotografija", addPhoto: "Dodaj CV fotografiju", photoHelp: "Nije obavezno. Čuva se samo u ovom browseru.", choosePhoto: "Izaberi fotografiju", removePhoto: "Ukloni fotografiju",
    contactNote: "Prvo dodaj glavne kontakt podatke.", email: "Email", phone: "Telefon", phonePh: "+381 60 123 4567",
    locationNote: "Sada dodaj grad, državu i opcioni profil link.", city: "Grad", cityPh: "Beograd", country: "Država", countryPh: "Srbija",
    summary: "Profesionalni profil", summaryPh: "Napiši 2–4 rečenice o iskustvu, veštinama i cilju karijere.", summaryHelp: "Napiši 2–4 rečenice o iskustvu, veštinama i cilju karijere.", improve: "✨ Poboljšaj",
    savedJobs: "Sačuvani poslovi", jobNote1: "Dodaj naziv posla i firmu.", jobTitle: "Naziv posla", jobTitlePh: "Rukovalac građevinskih mašina", company: "Firma", companyPh: "Firma",
    jobNote2: "Dodaj gde i kada si radio.", location: "Lokacija", locationPh: "Beograd", startDate: "Početak", endPresent: "Kraj / trenutno", present: "Trenutno",
    jobNote3: "Dodaj kratak opis, zatim sačuvaj posao ako treba.", description: "Opis", descriptionPh: "Opiši zaduženja i rezultate.", saveJob: "+ Sačuvaj posao",
    savedEducation: "Sačuvano obrazovanje", eduNote1: "Prvo dodaj školu/fakultet i smer.", school: "Škola / fakultet", schoolPh: "Univerzitet u Beogradu", degree: "Smer / zvanje", degreePh: "Tehničar / diplomirani ekonomista / kurs",
    eduNote2: "Dodaj mesto i datume.", dates: "Datumi", eduNote3: "Opcionalno: dodaj kratku napomenu, zatim sačuvaj obrazovanje.", descriptionOptional: "Opis opcionalno", optionalDetails: "Opcioni detalji.", saveEducation: "+ Sačuvaj obrazovanje",
    skill: "Veština", skillPh: "Komunikacija", add: "+ Dodaj", suggestSkills: "✨ Predloži veštine",
    language: "Jezik", languagePh: "Srpski", level: "Nivo", native: "Maternji", addLanguage: "+ Dodaj jezik",
    atsScore: "ATS spremnost", ready: "Tvoj CV je spreman za PDF i PNG.", template: "Šablon", pdfUnlocked: "PDF + PNG preuzimanje je otključano.", why5: "Šta dobijaš za 5€?", unlockedHelp: "PDF i PNG preuzimanje je otključano u ovom browseru. Možeš uređivati CV i preuzimati nove verzije kad god ti treba.", unlockHelp: "Plaćaš jednom da otključaš PDF i PNG preuzimanje na ovom uređaju/browseru. Izrada i pregled CV-a su besplatni. Posle PayPal uplate vraćaš se ovde i možeš preuzeti više verzija dok ne obrišeš podatke browsera. Nema pretplate.", editPersonal: "Uredi lične podatke", editContact: "Uredi kontakt", editWork: "Uredi posao", tipFullName: "Dodaj ime i prezime", tipJobTitle: "Dodaj naziv pozicije", tipEmail: "Dodaj email", tipPhone: "Dodaj telefon", tipSummary: "Dodaj jači profil", tipExperience: "Dodaj radno iskustvo", tipSkills: "Dodaj više veština", tipResults: "Dodaj merljive rezultate", goodStructure: "Dobra struktura", strongKeywords: "Dobre ključne reči", readyPdf: "Spremno za PDF"
  }
};
function v40Text(){ return V40_TEXTS[getLang()] || V40_TEXTS.en; }


let v40Step = 1;
let v40SubStep = 0;
let v40RewriteTarget = null;
let v40State = null;

function v40DefaultState() {
  return {
    selectedTemplate: "classic",
    personal: { firstName: "", lastName: "", jobTitle: "", photo: "" },
    contact: { email: "", phone: "", city: "", country: "", linkedin: "" },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    languages: [],
    draftExperience: {},
    draftEducation: {},
    draftSkill: "",
    draftLanguage: { language: "", level: "B2" }
  };
}

function v40TemplateToLegacy(t) {
  if (t === "modern") return "sidebar";
  if (["mono", "softgray", "softgreen", "softpink", "softblue", "beige"].includes(t)) return t;
  return "classic";
}

function legacyTemplateToV40(t) {
  if (t === "sidebar") return "modern";
  if (["mono", "softgray", "softgreen", "softpink", "softblue", "beige"].includes(t)) return t;
  return "classic";
}

function v40SplitName(fullName) {
  const parts = String(fullName || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

function v40SplitLocation(location) {
  const parts = String(location || "").split(",").map(x => x.trim()).filter(Boolean);
  return { city: parts[0] || "", country: parts.slice(1).join(", ") || "" };
}

function v40TextToEntryArray(text, kind) {
  const clean = String(text || "").trim();
  if (!clean) return [];
  if (kind === "education") return [{ school: "", degree: "", location: "", dates: "", description: clean }];
  return [{ jobTitle: "", company: "", location: "", start: "", end: "", description: clean }];
}

function legacyToV40State(data) {
  const base = v40DefaultState();
  const fromSaved = data.v40State && typeof data.v40State === "object" ? data.v40State : null;
  const name = v40SplitName(data.fullName);
  const loc = v40SplitLocation(data.location);
  const langs = parseLanguages(data.languages || "[]").map(l => ({ language: l.name, level: l.level === "NATIVE" ? "Native" : l.level }));

  return {
    ...base,
    ...(fromSaved || {}),
    selectedTemplate: legacyTemplateToV40(data.template || fromSaved?.selectedTemplate || "classic"),
    personal: {
      firstName: fromSaved?.personal?.firstName ?? name.firstName,
      lastName: fromSaved?.personal?.lastName ?? name.lastName,
      jobTitle: fromSaved?.personal?.jobTitle ?? (data.jobTitle || ""),
      photo: fromSaved?.personal?.photo ?? (data.photo || "")
    },
    contact: {
      email: fromSaved?.contact?.email ?? (data.email || ""),
      phone: fromSaved?.contact?.phone ?? (data.phone || ""),
      city: fromSaved?.contact?.city ?? loc.city,
      country: fromSaved?.contact?.country ?? loc.country,
      linkedin: fromSaved?.contact?.linkedin ?? ""
    },
    summary: fromSaved?.summary ?? (data.profile || ""),
    experience: fromSaved?.experience?.length ? fromSaved.experience : v40TextToEntryArray(data.experience, "experience"),
    education: fromSaved?.education?.length ? fromSaved.education : v40TextToEntryArray(data.education, "education"),
    skills: fromSaved?.skills?.length ? fromSaved.skills : splitLines(data.skills || data.machines || ""),
    languages: fromSaved?.languages?.length ? fromSaved.languages : langs,
    draftExperience: fromSaved?.draftExperience || {},
    draftEducation: fromSaved?.draftEducation || {},
    draftSkill: fromSaved?.draftSkill || "",
    draftLanguage: fromSaved?.draftLanguage || { language: "", level: "B2" }
  };
}

function v40CleanEntry(entry) {
  const clean = {};
  Object.entries(entry || {}).forEach(([key, value]) => {
    clean[key] = String(value || "").trim();
  });
  return clean;
}

function v40EntryHasValue(entry) {
  return Object.values(entry || {}).some(value => String(value || "").trim());
}

function v40EntryKey(entry, fields) {
  const clean = v40CleanEntry(entry);
  return fields.map(field => (clean[field] || "").toLowerCase().replace(/\s+/g, " ")).join("|");
}

function v40DedupeEntries(items, fields) {
  const seen = new Set();
  const result = [];
  (items || []).forEach(item => {
    const clean = v40CleanEntry(item);
    if (!v40EntryHasValue(clean)) return;
    const key = v40EntryKey(clean, fields);
    if (seen.has(key)) return;
    seen.add(key);
    result.push(clean);
  });
  return result;
}

function v40NormalizeRepeatingEntries(items, fields) {
  // V40.33: protect the CV from duplicate blocks caused by Back/Next testing.
  // The wizard has one active draft plus saved entries. A saved entry must never be
  // duplicated when the user goes back to correct text.
  return v40DedupeEntries(items || [], fields);
}

function v40PrepareDraftForEdit(type) {
  // When a user goes BACK into Work/Education, show the last saved entry in fields
  // instead of empty placeholders. This lets them correct the same entry and avoids
  // creating a second identical block in the live CV preview.
  if (!v40State) return;
  if (type === "experience") {
    const draft = v40CleanEntry(v40State.draftExperience || {});
    if (v40EntryHasValue(draft)) return;
    const list = v40NormalizeRepeatingEntries(v40State.experience || [], ["jobTitle", "company", "location", "start", "end", "description"]);
    if (!list.length) return;
    v40State.draftExperience = { ...list[list.length - 1] };
    v40State.experience = list.slice(0, -1);
    v40CommitToLegacy();
  }
  if (type === "education") {
    const draft = v40CleanEntry(v40State.draftEducation || {});
    if (v40EntryHasValue(draft)) return;
    const list = v40NormalizeRepeatingEntries(v40State.education || [], ["school", "degree", "location", "dates", "description"]);
    if (!list.length) return;
    v40State.draftEducation = { ...list[list.length - 1] };
    v40State.education = list.slice(0, -1);
    v40CommitToLegacy();
  }
}

function v40MergeDraftEntry(items, draft, fields) {
  return v40DedupeEntries([...(items || []), draft || {}], fields);
}

function v40ExperienceItemsForOutput() {
  return v40MergeDraftEntry(v40State?.experience || [], v40State?.draftExperience || {}, ["jobTitle", "company", "location", "start", "end", "description"]);
}

function v40EducationItemsForOutput() {
  return v40MergeDraftEntry(v40State?.education || [], v40State?.draftEducation || {}, ["school", "degree", "location", "dates", "description"]);
}

function v40ExperienceToText(items) {
  return (items || []).map(e => {
    const head = [e.jobTitle, e.company, e.location].filter(Boolean).join(" — ");
    const dates = [e.start, e.end].filter(Boolean).join(" - ");
    const body = e.description || "";
    return [head, dates, body].filter(Boolean).join("\n");
  }).filter(Boolean).join("\n\n");
}

function v40EducationToText(items) {
  return (items || []).map(e => {
    const head = [e.degree, e.school, e.location].filter(Boolean).join(" — ");
    return [head, e.dates, e.description].filter(Boolean).join("\n");
  }).filter(Boolean).join("\n\n");
}

function v40SkillsForOutput() {
  const list = (v40State.skills || []).map(s => String(s || "").trim()).filter(Boolean);
  const draft = String(v40State.draftSkill || "").trim();
  if (draft && !list.some(s => s.toLowerCase() === draft.toLowerCase())) list.push(draft);
  return list;
}

function v40SaveCurrentSkill() {
  const skill = String(v40State.draftSkill || "").trim();
  if (!skill) return;
  if (!v40State.skills.some(s => String(s || "").trim().toLowerCase() === skill.toLowerCase())) {
    v40State.skills.push(skill);
  }
  v40State.draftSkill = "";
  v40CommitToLegacy();
}

function v40ToLegacyData() {
  if (v40State) {
    v40State.experience = v40NormalizeRepeatingEntries(v40State.experience || [], ["jobTitle", "company", "location", "start", "end", "description"]);
    v40State.education = v40NormalizeRepeatingEntries(v40State.education || [], ["school", "degree", "location", "dates", "description"]);
  }
  const existing = loadStored();
  const first = v40State.personal.firstName.trim();
  const last = v40State.personal.lastName.trim();
  const fullName = [first, last].filter(Boolean).join(" ");
  const location = [v40State.contact.city, v40State.contact.country].map(x => String(x || "").trim()).filter(Boolean).join(", ");
  const languageRows = (v40State.languages || []).map(l => ({
    name: String(l.language || "").trim(),
    level: String(l.level || "").trim().toUpperCase()
  })).filter(l => l.name && l.level);

  // V40.35: live preview must show every field while the user is typing.
  // Skills, work and education already include drafts; language draft now does too.
  const draftLangName = String(v40State.draftLanguage?.language || "").trim();
  const draftLangLevel = String(v40State.draftLanguage?.level || "B2").trim().toUpperCase();
  if (draftLangName && draftLangLevel && !languageRows.some(l => l.name.toLowerCase() === draftLangName.toLowerCase())) {
    languageRows.push({ name: draftLangName, level: draftLangLevel });
  }

  return {
    ...existing,
    template: v40TemplateToLegacy(v40State.selectedTemplate),
    fullName,
    jobTitle: v40State.personal.jobTitle || "",
    phone: v40State.contact.phone || "",
    email: v40State.contact.email || "",
    linkedin: v40State.contact.linkedin || "",
    location,
    photo: v40State.personal.photo || existing.photo || "",
    profile: v40State.summary || "",
    experience: v40ExperienceToText(v40ExperienceItemsForOutput()),
    education: v40EducationToText(v40EducationItemsForOutput()),
    skills: v40SkillsForOutput().join("\n"),
    languages: JSON.stringify(languageRows),
    v40State: JSON.parse(JSON.stringify(v40State))
  };
}

function v40SyncLegacyDom(data) {
  const map = {
    template: data.template,
    fullName: data.fullName,
    jobTitle: data.jobTitle,
    phone: data.phone,
    email: data.email,
    linkedin: data.linkedin,
    location: data.location,
    profile: data.profile,
    experience: data.experience,
    education: data.education,
    skills: data.skills,
    languages: data.languages
  };
  Object.entries(map).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.value = value || "";
  });
  updateTemplateChoice(data.template || "classic");
  renderLanguageEditor(data.languages || "[]");
}

function v40CommitToLegacy() {
  const data = v40ToLegacyData();
  v40SyncLegacyDom(data);
  saveRaw(data);
  return data;
}


function v40StepPagesCount(step) {
  const pages = { 2: 3, 3: 2, 5: 3, 6: 3 };
  return pages[step] || 1;
}

function v40TotalScreens() {
  let total = 0;
  for (let step = 1; step <= 9; step++) total += v40StepPagesCount(step);
  return total;
}

function v40CurrentScreenIndex() {
  let index = 0;
  for (let step = 1; step < v40Step; step++) index += v40StepPagesCount(step);
  return index + v40SubStep + 1;
}

function v40ClampProgressPercent(value) {
  return Math.max(0, Math.min(100, value));
}

function v40ClampSubStep() {
  const count = v40StepPagesCount(v40Step);
  if (v40SubStep < 0) v40SubStep = 0;
  if (v40SubStep >= count) v40SubStep = count - 1;
}

function v40StepPartLabel() {
  const count = v40StepPagesCount(v40Step);
  const txt = v40Text();
  return count > 1 ? ` · ${txt.part} ${v40SubStep + 1}/${count}` : "";
}

function v40SubNote(text) {
  return `<p class="v40-part-note">${escHtml(text)}</p>`;
}

function v40Render() {
  const lang = getLang();
  const t = V40_I18N[lang] || V40_I18N.en;
  const stepText = document.getElementById("v40StepText");
  const stepsLeft = document.getElementById("v40StepsLeft");
  const progress = document.getElementById("v40ProgressFill");
  const title = document.getElementById("v40StepTitle");
  const backBtn = document.getElementById("v40BackBtn");
  const nextBtn = document.getElementById("v40NextBtn");
  const pricePill = document.getElementById("v40PricePill");
  const saved = document.getElementById("v40SavedText");

  v40ClampSubStep();
  const totalScreens = v40TotalScreens();
  const currentScreen = v40CurrentScreenIndex();
  const screensLeft = Math.max(0, totalScreens - currentScreen);
  const screensLeftLabel = t.screensLeft || t.stepsLeft || "screens left";

  if (stepText) stepText.textContent = `${(v40Text().stepLabel || "Step")} ${v40Step}/9 · ${currentScreen}/${totalScreens}`;
  if (stepsLeft) stepsLeft.textContent = screensLeft === 0 ? t.done : `${screensLeft} ${screensLeftLabel}`;
  if (progress) progress.style.width = `${v40ClampProgressPercent((currentScreen / totalScreens) * 100)}%`;
  const stepNames = V40_STEPS_BY_LANG[lang] || V40_STEPS_BY_LANG.en;
  if (title) title.textContent = `${stepNames[v40Step - 1]}${v40StepPartLabel()}`;
  if (backBtn) { backBtn.textContent = v40Text().backBtn || "‹ Back"; backBtn.classList.toggle("hidden", v40Step === 1); }
  if (nextBtn) {
    const vt = v40Text();
    nextBtn.textContent = v40Step === 1 ? vt.continueBtn : vt.nextBtn;
    nextBtn.classList.toggle("v40-download-final-btn", false);
    nextBtn.classList.toggle("hidden", v40Step === 9);
  }
  if (pricePill) {
    pricePill.textContent = "";
    pricePill.classList.add("hidden");
  }
  document.querySelector(".v40-input-sheet")?.classList.toggle("v40-final-sheet", v40Step === 9);
  document.body.classList.toggle("v40-final-step", v40Step === 9);
  if (saved) saved.textContent = t.saved;
  v40ApplyStaticLocalizedText(lang);

  v40ClearError();
  v40RenderStepContent();
  v40CommitToLegacy();
  v40RenderPreview();
  v40AttachFieldGuide();
}


function v40ApplyStaticLocalizedText(lang = getLang()) {
  const t = V40_I18N[lang] || V40_I18N.en;
  const setText = (selector, text) => {
    const el = document.querySelector(selector);
    if (el && text) el.textContent = text;
  };
  setText("#v40HomeBtn", t.home);
  setText("#v40FillDemoBtn", t.fillDemo);
  setText(".v40-full-preview-top strong", t.fullPreviewTitle);
  setText("#v40FullPreviewClose", t.closePreview);

  const welcomeLinks = document.querySelectorAll(".v40-footer-links a");
  if (welcomeLinks[0]) welcomeLinks[0].textContent = t.termsUse;
  if (welcomeLinks[1]) welcomeLinks[1].textContent = t.privacyPolicy;
  if (welcomeLinks[2]) welcomeLinks[2].textContent = t.contact;

  const appLinks = document.querySelectorAll(".v40-legal-under-app a");
  if (appLinks[0]) appLinks[0].textContent = t.termsUse;
  if (appLinks[1]) appLinks[1].textContent = t.privacyPolicy;
  if (appLinks[2]) appLinks[2].textContent = t.contactSupport;
  const p = document.querySelector(".v40-legal-under-app p");
  if (p) p.textContent = t.responsibility;
}

function v40TranslateOldPlaceholderValues(lang) {
  if (!v40State) return;
  const map = {
    en: { headline: "Senior Software Engineer", job: "Software Engineer", city: "London", country: "United Kingdom" },
    de: { headline: "Softwareentwickler", job: "Softwareentwickler", city: "Berlin", country: "Deutschland" },
    sr: { headline: "Rukovalac građevinskih mašina", job: "Rukovalac građevinskih mašina", city: "Beograd", country: "Srbija" }
  };
  const knownHeadlines = new Set(Object.values(map).map(x => x.headline).concat(["Senior Software Engineer", "Software Engineer", "Heavy Equipment Operator", "Baumaschinenführer"]).map(x => x.toLowerCase()));
  const knownJobs = new Set(Object.values(map).map(x => x.job).concat(["Senior Software Engineer", "Software Engineer", "Heavy Equipment Operator", "Baumaschinenführer"]).map(x => x.toLowerCase()));
  const knownCities = new Set(Object.values(map).map(x => x.city).concat(["City", "Stadt"]).map(x => x.toLowerCase()));
  const knownCountries = new Set(Object.values(map).map(x => x.country).concat(["Country", "Land"]).map(x => x.toLowerCase()));
  const target = map[lang] || map.en;
  const p = v40State.personal || {};
  const c = v40State.contact || {};
  if (p.jobTitle && knownHeadlines.has(String(p.jobTitle).trim().toLowerCase())) p.jobTitle = target.headline;
  const d = v40State.draftExperience || {};
  if (d.jobTitle && knownJobs.has(String(d.jobTitle).trim().toLowerCase())) d.jobTitle = target.job;
  if (c.city && knownCities.has(String(c.city).trim().toLowerCase())) c.city = target.city;
  if (c.country && knownCountries.has(String(c.country).trim().toLowerCase())) c.country = target.country;
}

function v40SetLanguage(lang) {
  applyLanguage(lang);
  v40TranslateOldPlaceholderValues(lang);
  document.querySelectorAll(".v40-lang-btn").forEach(btn => btn.classList.toggle("active", btn.dataset.v40Lang === lang));
  document.querySelectorAll("[data-v40-i18n]").forEach(el => {
    const key = el.dataset.v40I18n;
    if (V40_I18N[lang]?.[key]) el.textContent = V40_I18N[lang][key];
  });
  const modalLabels = [
    ["v40OriginalLabel", "original"],
    ["v40SuggestedLabel", "suggested"],
    ["v40KeepOriginalBtn", "keepOriginal"],
    ["v40UseImprovedBtn", "useImproved"]
  ];
  modalLabels.forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el && V40_I18N[lang]?.[key]) el.textContent = V40_I18N[lang][key];
  });
  v40ApplyStaticLocalizedText(lang);
  v40Render();
}

function v40PreviewSampleData() {
  const lang = getLang();
  const samples = {
    en: {
      fullName: "Alex Miller",
      jobTitle: "Operations Specialist",
      location: "Berlin, Germany",
      profile: "Reliable professional with practical field experience, strong attention to detail and a clear, professional CV layout.",
      experience: "Operations Specialist — Sample Company\n2021 - Present\nDaily operations, planning and quality support.",
      education: "Technical Course — Berlin\n2020\nProfessional training and certification.",
      skills: "Planning\nTeamwork\nDocumentation",
      languages: [{ name: "English", level: "B2" }, { name: "German", level: "A2" }]
    },
    de: {
      fullName: "Alex Miller",
      jobTitle: "Operations-Spezialist",
      location: "Berlin, Deutschland",
      profile: "Zuverlässige Fachkraft mit praktischer Erfahrung, hoher Genauigkeit und einem klaren, professionellen CV-Aufbau.",
      experience: "Operations-Spezialist — Beispiel Firma\n2021 - Heute\nTägliche Abläufe, Planung und Qualitätsunterstützung.",
      education: "Technischer Kurs — Berlin\n2020\nBerufliche Weiterbildung und Zertifikat.",
      skills: "Planung\nTeamarbeit\nDokumentation",
      languages: [{ name: "Deutsch", level: "B2" }, { name: "Englisch", level: "A2" }]
    },
    sr: {
      fullName: "Aleksandar Petrović",
      jobTitle: "Operativni radnik",
      location: "Beograd, Srbija",
      profile: "Pouzdan profesionalac sa praktičnim iskustvom, pažnjom na detalje i jasnim profesionalnim CV prikazom.",
      experience: "Operativni radnik — Primer firma\n2021 - Trenutno\nSvakodnevni rad, planiranje i podrška kvalitetu.",
      education: "Stručni kurs — Beograd\n2020\nProfesionalna obuka i sertifikat.",
      skills: "Planiranje\nTimski rad\nDokumentacija",
      languages: [{ name: "Srpski", level: "Native" }, { name: "Nemački", level: "A2" }]
    }
  };
  const sample = samples[lang] || samples.en;
  return {
    ...emptyData(),
    appLanguage: lang,
    cvLanguage: lang,
    template: v40TemplateToLegacy(v40State?.selectedTemplate || "classic"),
    fullName: sample.fullName,
    jobTitle: sample.jobTitle,
    phone: lang === "sr" ? "+381 60 000000" : "+49 151 000000",
    email: "alex@example.com",
    location: sample.location,
    profile: sample.profile,
    experience: sample.experience,
    education: sample.education,
    skills: sample.skills,
    languages: JSON.stringify(sample.languages),
    photo: ""
  };
}


function v40HasUserData() {
  if (!v40State) return false;
  const expDraft = v40State.draftExperience || {};
  const eduDraft = v40State.draftEducation || {};
  const langDraft = v40State.draftLanguage || {};
  return Boolean(
    String(v40State.personal?.firstName || "").trim() ||
    String(v40State.personal?.lastName || "").trim() ||
    String(v40State.personal?.jobTitle || "").trim() ||
    String(v40State.personal?.photo || "").trim() ||
    String(v40State.contact?.email || "").trim() ||
    String(v40State.contact?.phone || "").trim() ||
    String(v40State.contact?.city || "").trim() ||
    String(v40State.contact?.country || "").trim() ||
    String(v40State.contact?.linkedin || "").trim() ||
    String(v40State.summary || "").trim() ||
    (Array.isArray(v40State.experience) && v40State.experience.length > 0) ||
    (Array.isArray(v40State.education) && v40State.education.length > 0) ||
    (Array.isArray(v40State.skills) && v40State.skills.length > 0) ||
    (Array.isArray(v40State.languages) && v40State.languages.length > 0) ||
    String(v40State.draftSkill || "").trim() ||
    Object.values(expDraft).some(v => String(v || "").trim()) ||
    Object.values(eduDraft).some(v => String(v || "").trim()) ||
    String(langDraft.language || "").trim()
  );
}

function v40PreviewPayload() {
  const hasData = v40HasUserData();
  if (!hasData) {
    return { hasData: false, data: v40PreviewSampleData() };
  }
  return { hasData: true, data: v40ToLegacyData() };
}

function v40RenderPreview() {
  const target = document.getElementById("v40CvPreview");
  if (!target) return;
  const payload = v40PreviewPayload();
  const tplTxt = v40Text();
  const selectedTpl = v40TemplateOptions().find(t => t.id === v40State.selectedTemplate) || v40TemplateOptions()[0];
  document.getElementById("v40TemplateLabel").textContent = tplTxt[selectedTpl.nameKey] || tplTxt.classic;
  renderCv(target, payload.data, { placeholders: false });
  target.classList.toggle("v40-preview-sample", !payload.hasData);
  v40FitPreview();
}

function v40RenderStepContent() {
  const el = document.getElementById("v40StepContent");
  if (!el) return;
  const txt = v40Text();

  if (v40Step === 1) {
    el.innerHTML = `<div class="v40-template-instruction">
      <strong>${escHtml(txt.templateIntroTitle)}</strong>
      <span>${escHtml(txt.templateIntroText)}</span>
    </div>
    <div class="v40-template-grid">
      ${v40TemplateOptions().map(tpl => v40TemplateCard(tpl.id, txt[tpl.nameKey], txt[tpl.descKey])).join("")}
    </div>`;
    return;
  }

  if (v40Step === 2) {
    if (v40SubStep === 0) {
      el.innerHTML = `<div class="v40-form-grid v40-no-scroll-page">
        ${v40SubNote(txt.firstNameNote)}
        <label>${escHtml(txt.firstName)}<input value="${escAttr(v40State.personal.firstName)}" oninput="v40Update('personal.firstName', this.value)" placeholder="${escAttr(txt.firstNamePh || 'John')}"></label>
        <label>${escHtml(txt.lastName)}<input value="${escAttr(v40State.personal.lastName)}" oninput="v40Update('personal.lastName', this.value)" placeholder="${escAttr(txt.lastNamePh || 'Smith')}"></label>
      </div>`;
      return;
    }
    if (v40SubStep === 1) {
      el.innerHTML = `<div class="v40-form-grid v40-no-scroll-page">
        ${v40SubNote(txt.headlineNote)}
        <label>${escHtml(txt.headline)}<input value="${escAttr(v40State.personal.jobTitle)}" oninput="v40Update('personal.jobTitle', this.value)" placeholder="${escAttr(txt.headlinePh)}"></label>
      </div>`;
      return;
    }
    el.innerHTML = `<div class="v40-form-grid v40-no-scroll-page">
      ${v40SubNote(txt.photoNote)}
      <div class="v40-photo-box v40-photo-box-compact v40-photo-only">
        <div class="v40-photo-preview">${v40State.personal.photo ? `<img src="${escAttr(v40State.personal.photo)}" alt="CV photo preview">` : `<span>${escHtml(txt.photo)}</span>`}</div>
        <div class="v40-photo-copy">
          <strong>${escHtml(txt.addPhoto)}</strong>
          <span>${escHtml(txt.photoHelp)}</span>
          <label class="v40-file-btn">${escHtml(txt.choosePhoto)}<input accept="image/*" type="file" onchange="v40HandlePhotoUpload(this)"></label>
          ${v40State.personal.photo ? `<button class="v40-remove-photo" type="button" onclick="v40RemovePhoto()">${escHtml(txt.removePhoto)}</button>` : ``}
        </div>
      </div>
    </div>`;
    return;
  }

  if (v40Step === 3) {
    if (v40SubStep === 0) {
      el.innerHTML = `<div class="v40-form-grid v40-no-scroll-page">
        ${v40SubNote(txt.contactNote)}
        <label>${escHtml(txt.email)}<input value="${escAttr(v40State.contact.email)}" oninput="v40Update('contact.email', this.value)" placeholder="ana@example.com"></label>
        <label>${escHtml(txt.phone)}<input value="${escAttr(v40State.contact.phone)}" oninput="v40Update('contact.phone', this.value)" placeholder="${escAttr(txt.phonePh)}"></label>
      </div>`;
      return;
    }
    el.innerHTML = `<div class="v40-form-grid v40-no-scroll-page">
      ${v40SubNote(txt.locationNote)}
      <div class="v40-form-grid v40-two-col"><label>${escHtml(txt.city)}<input value="${escAttr(v40State.contact.city)}" oninput="v40Update('contact.city', this.value)" placeholder="${escAttr(txt.cityPh)}"></label><label>${escHtml(txt.country)}<input value="${escAttr(v40State.contact.country)}" oninput="v40Update('contact.country', this.value)" placeholder="${escAttr(txt.countryPh)}"></label></div>
      <label>LinkedIn<input value="${escAttr(v40State.contact.linkedin)}" oninput="v40Update('contact.linkedin', this.value)" placeholder="linkedin.com/in/your-name"></label>
    </div>`;
    return;
  }

  if (v40Step === 4) {
    el.innerHTML = `<label>${escHtml(txt.summary)}<textarea maxlength="500" oninput="v40Update('summary', this.value)" placeholder="${escAttr(txt.summaryPh)}">${escHtml(v40State.summary)}</textarea></label>
      <p class="v40-helper-text">${escHtml(txt.summaryHelp)}</p>
      <button class="v40-ghost-btn" style="margin-top:10px" type="button" onclick="v40OpenRewrite('summary')">${escHtml(txt.improve)}</button>`;
    return;
  }

  if (v40Step === 5) {
    const d = v40State.draftExperience || {};
    const savedInfo = v40State.experience?.length ? `<div class="v40-mini-status">${escHtml(txt.savedJobs)}: ${v40State.experience.length}</div>${v40RenderEntries(v40State.experience, "experience")}` : ``;
    if (v40SubStep === 0) {
      el.innerHTML = `<div class="v40-form-grid v40-no-scroll-page">${savedInfo}${v40SubNote(txt.jobNote1)}
        <label>${escHtml(txt.jobTitle)}<input value="${escAttr(d.jobTitle || "")}" oninput="v40UpdateDraft('experience','jobTitle',this.value)" placeholder="${escAttr(txt.jobTitlePh)}"></label>
        <label>${escHtml(txt.company)}<input value="${escAttr(d.company || "")}" oninput="v40UpdateDraft('experience','company',this.value)" placeholder="${escAttr(txt.companyPh)}"></label>
      </div>`;
      return;
    }
    if (v40SubStep === 1) {
      el.innerHTML = `<div class="v40-form-grid v40-no-scroll-page">${savedInfo}${v40SubNote(txt.jobNote2)}
        <label>${escHtml(txt.location)}<input value="${escAttr(d.location || "")}" oninput="v40UpdateDraft('experience','location',this.value)" placeholder="${escAttr(txt.locationPh)}"></label>
        <div class="v40-form-grid v40-two-col"><label>${escHtml(txt.startDate)}<input value="${escAttr(d.start || "")}" oninput="v40UpdateDraft('experience','start',this.value)" placeholder="MM/YYYY"></label><label>${escHtml(txt.endPresent)}<input value="${escAttr(d.end || "")}" oninput="v40UpdateDraft('experience','end',this.value)" placeholder="${escAttr(txt.present)}"></label></div>
      </div>`;
      return;
    }
    el.innerHTML = `<div class="v40-form-grid v40-no-scroll-page">${savedInfo}${v40SubNote(txt.jobNote3)}
      <label>${escHtml(txt.description)}<textarea class="v40-compact-textarea" oninput="v40UpdateDraft('experience','description',this.value)" placeholder="${escAttr(txt.descriptionPh)}">${escHtml(d.description || "")}</textarea></label>
      <div class="v40-action-row"><button class="v40-ghost-btn" type="button" onclick="v40OpenRewrite('experience')">${escHtml(txt.improve)}</button><button class="v40-primary-btn" type="button" onclick="v40AddExperience()">${escHtml(txt.saveJob)}</button></div>
    </div>`;
    return;
  }

  if (v40Step === 6) {
    const d = v40State.draftEducation || {};
    const savedInfo = v40State.education?.length ? `<div class="v40-mini-status">${escHtml(txt.savedEducation)}: ${v40State.education.length}</div>${v40RenderEntries(v40State.education, "education")}` : ``;
    if (v40SubStep === 0) {
      el.innerHTML = `<div class="v40-form-grid v40-no-scroll-page">${savedInfo}${v40SubNote(txt.eduNote1)}
        <label>${escHtml(txt.school)}<input value="${escAttr(d.school || "")}" oninput="v40UpdateDraft('education','school',this.value)" placeholder="${escAttr(txt.schoolPh)}"></label>
        <label>${escHtml(txt.degree)}<input value="${escAttr(d.degree || "")}" oninput="v40UpdateDraft('education','degree',this.value)" placeholder="${escAttr(txt.degreePh)}"></label>
      </div>`;
      return;
    }
    if (v40SubStep === 1) {
      el.innerHTML = `<div class="v40-form-grid v40-no-scroll-page">${savedInfo}${v40SubNote(txt.eduNote2)}
        <label>${escHtml(txt.location)}<input value="${escAttr(d.location || "")}" oninput="v40UpdateDraft('education','location',this.value)" placeholder="${escAttr(txt.locationPh)}"></label>
        <label>${escHtml(txt.dates)}<input value="${escAttr(d.dates || "")}" oninput="v40UpdateDraft('education','dates',this.value)" placeholder="2014 - 2018"></label>
      </div>`;
      return;
    }
    el.innerHTML = `<div class="v40-form-grid v40-no-scroll-page">${savedInfo}${v40SubNote(txt.eduNote3)}
      <label>${escHtml(txt.descriptionOptional)}<textarea class="v40-compact-textarea" oninput="v40UpdateDraft('education','description',this.value)" placeholder="${escAttr(txt.optionalDetails)}">${escHtml(d.description || "")}</textarea></label>
      <button class="v40-primary-btn" type="button" onclick="v40AddEducation()">${escHtml(txt.saveEducation)}</button>
    </div>`;
    return;
  }

  if (v40Step === 7) {
    el.innerHTML = `<div class="v40-chip-list">${(v40State.skills || []).map((s,i)=>`<span class="v40-chip">${escHtml(s)} <button type="button" onclick="v40RemoveSkill(${i})">×</button></span>`).join("")}</div>
      <div class="v40-add-row"><label>${escHtml(txt.skill)}<input value="${escAttr(v40State.draftSkill || "")}" oninput="v40State.draftSkill=this.value;v40CommitAndPreview();" placeholder="${escAttr(txt.skillPh)}"></label><button class="v40-ghost-btn" type="button" onclick="v40AddSkill()">${escHtml(txt.add)}</button></div>
      <button class="v40-ghost-btn" style="margin-top:10px" type="button" onclick="v40SuggestSkills()">${escHtml(txt.suggestSkills)}</button>`;
    return;
  }

  if (v40Step === 8) {
    el.innerHTML = `<div class="v40-chip-list">${(v40State.languages || []).map((l,i)=>`<span class="v40-chip">${escHtml(l.language)} (${escHtml(l.level)}) <button type="button" onclick="v40RemoveLanguage(${i})">×</button></span>`).join("")}</div>
      <div class="v40-form-grid v40-two-col"><label>${escHtml(txt.language)}<input value="${escAttr(v40State.draftLanguage.language || "")}" oninput="v40State.draftLanguage.language=this.value;v40CommitAndPreview();" placeholder="${escAttr(txt.languagePh)}"></label><label>${escHtml(txt.level)}<select onchange="v40State.draftLanguage.level=this.value;v40CommitAndPreview();">${["A1","A2","B1","B2","C1","C2","Native"].map(level=>`<option value="${level}" ${v40State.draftLanguage.level===level?"selected":""}>${level === "Native" ? txt.native : level}</option>`).join("")}</select></label></div>
      <button class="v40-primary-btn" style="margin-top:10px" type="button" onclick="v40AddLanguage()">${escHtml(txt.addLanguage)}</button>`;
    return;
  }

  if (v40Step === 9) {
    const score = v40AtsScore();
    const unlocked = isUnlocked();
    const tips = score.tips && score.tips.length ? score.tips.slice(0, 2).join(" • ") : txt.ready;
    el.innerHTML = `<div class="v40-final-compact">
      <div class="v40-score-card v40-score-card-compact">
        <div>
          <div class="v40-helper-text">${escHtml(txt.atsScore)}</div>
          <div class="v40-score-num">${score.score}/100</div>
        </div>
        <div class="v40-helper-text">${escHtml(tips)}</div>
      </div>
      <label>${escHtml(txt.template)}<select onchange="v40SelectTemplate(this.value)">${v40TemplateOptions().map(tpl => `<option value="${tpl.id}" ${v40State.selectedTemplate===tpl.id?"selected":""}>${escHtml(txt[tpl.nameKey])}</option>`).join("")}</select></label>
      <div class="v40-unlock-info v40-unlock-info-compact">
        <strong>${escHtml(unlocked ? txt.pdfUnlocked : txt.why5)}</strong>
        <span>${escHtml(unlocked ? txt.unlockedHelp : txt.unlockHelp)}</span>
      </div>
      <div class="v40-download-options ${unlocked ? "" : "v40-download-options-locked"}">
        ${unlocked
          ? `<button type="button" class="v40-primary-btn" onclick="v40DownloadPdf()">${escHtml(txt.downloadPdf)}</button><button type="button" class="v40-ghost-btn" onclick="v40DownloadPng()">${escHtml(txt.downloadPng)}</button>`
          : `<button type="button" class="v40-primary-btn v40-one-unlock-btn" onclick="v40PayUnlock()">${escHtml(txt.unlockDownloads)}</button>`}
      </div>
      <div class="v40-jump-grid v40-jump-grid-compact"><button type="button" onclick="v40Go(2)">${escHtml(txt.editPersonal)}</button><button type="button" onclick="v40Go(3)">${escHtml(txt.editContact)}</button><button type="button" onclick="v40Go(5)">${escHtml(txt.editWork)}</button></div>
    </div>`;
  }
}

function v40TemplateOptions() {
  return [
    { id: "softgray", nameKey: "softgray", descKey: "softgrayDesc" },
    { id: "mono", nameKey: "mono", descKey: "monoDesc" },
    { id: "softgreen", nameKey: "softgreen", descKey: "softgreenDesc" },
    { id: "softpink", nameKey: "softpink", descKey: "softpinkDesc" },
    { id: "modern", nameKey: "modern", descKey: "modernDesc" },
    { id: "classic", nameKey: "classic", descKey: "classicDesc" },
    { id: "softblue", nameKey: "softblue", descKey: "softblueDesc" },
    { id: "beige", nameKey: "beige", descKey: "beigeDesc" }
  ];
}

function v40TemplateCard(id, name, desc) {
  const isModern = ["modern", "softgray", "softgreen", "softpink"].includes(id);
  const swatchClass = `v40-template-preview-${id}`;
  const lang = getLang();
  const sample = {
    en: { initials: "AM", name: "Alex Miller", title: "Operations Specialist" },
    de: { initials: "MM", name: "Max Mustermann", title: "Operations-Spezialist" },
    sr: { initials: "AP", name: "Aleksandar Petrović", title: "Operativni radnik" }
  }[lang] || { initials: "AM", name: "Alex Miller", title: "Operations Specialist" };
  const preview = isModern
    ? `<div class="v40-template-preview v40-template-preview-modern ${swatchClass}"><div class="v40-template-side"><div class="v40-template-avatar">${escHtml(sample.initials)}</div><span></span><span></span><span class="short"></span><div class="v40-template-side-title"></div><span></span><span class="short"></span></div><div class="v40-template-main"><div class="v40-template-head"><b>${escHtml(sample.name)}</b><small>${escHtml(sample.title)}</small></div><div class="v40-template-line blue long"></div><div class="v40-template-line"></div><div class="v40-template-line"></div><div class="v40-template-line short"></div><div class="v40-template-line"></div></div></div>`
    : `<div class="v40-template-preview v40-template-preview-classic ${swatchClass}"><div class="v40-template-head"><b>${escHtml(sample.name)}</b><small>${escHtml(sample.title)}</small></div><div class="v40-template-line blue long"></div><div class="v40-template-line"></div><div class="v40-template-line"></div><div class="v40-template-line short"></div><div class="v40-template-line"></div><div class="v40-template-chip-row"><i></i><i></i><i></i></div></div>`;
  return `<div class="v40-template-card ${v40State.selectedTemplate===id?"active":""}" onclick="v40SelectTemplate('${id}')">${preview}<div><div class="v40-template-name">${name}</div><div class="v40-template-desc">${desc}</div></div></div>`;
}

function v40Update(path, value) {
  const parts = path.split(".");
  if (parts.length === 1) v40State[parts[0]] = value;
  else v40State[parts[0]][parts[1]] = value;
  v40CommitAndPreview();
}

async function v40HandlePhotoUpload(input){
  const file = input?.files?.[0];
  if(!file) return;
  try{
    if(!file.type || !file.type.startsWith("image/")) throw new Error("Not an image");
    const photo = await resizeImage(file);
    v40State.personal.photo = photo;
    v40Render();
    showToast((ui[getLang()] && ui[getLang()].photoAdded) || "Photo added ✅");
  }catch(err){
    console.error(err);
    showToast("Image error");
  }
}

function v40RemovePhoto(){
  v40State.personal.photo = "";
  v40Render();
}
function v40UpdateDraft(type,key,value){ if(type==="experience") v40State.draftExperience[key]=value; if(type==="education") v40State.draftEducation[key]=value; v40CommitAndPreview(); }
function v40CommitAndPreview(){ v40CommitToLegacy(); v40RenderPreview(); }
function v40SelectTemplate(template){ v40State.selectedTemplate=template; v40Render(); }

function v40ScrollStepToTop() {
  // V40.12: the glass panel is fixed. Only the inner field area resets.
  requestAnimationFrame(() => {
    const content = document.getElementById("v40StepContent");
    if (content) {
      try { content.scrollTo({ top: 0, behavior: "smooth" }); }
      catch (err) { content.scrollTop = 0; }
    }
  });
}

function v40AttachFieldGuide() {
  // V40.11: guided form flow. After a user finishes one small field
  // and leaves it, gently move focus to the next small field.
  // Do not auto-jump from textareas, file inputs or buttons; those need manual control.
  const content = document.getElementById("v40StepContent");
  if (!content) return;

  const selector = [
    "input:not([type='file']):not([type='hidden']):not([disabled])",
    "select:not([disabled])"
  ].join(",");

  const fields = Array.from(content.querySelectorAll(selector))
    .filter((field) => field.offsetParent !== null && !field.readOnly);

  fields.forEach((field, index) => {
    field.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      const nextField = fields[index + 1];
      if (nextField) {
        try { nextField.focus({ preventScroll: true }); } catch (err) { nextField.focus(); }
      } else {
        v40Next();
      }
    });
    field.addEventListener("blur", () => {
      const value = String(field.value || "").trim();
      if (!value) return;

      window.setTimeout(() => {
        const active = document.activeElement;
        const userAlreadyMoved = active && active !== document.body && active !== document.documentElement && active !== field;
        if (userAlreadyMoved) return;

        const nextField = fields[index + 1];
        if (!nextField) return;

        try {
          nextField.focus({ preventScroll: true });
        } catch (err) {
          nextField.focus();
        }
      }, 140);
    });
  });
}

function v40Next(){
  if(v40Step===9){
    if(isUnlocked()) {
      v40DownloadPdf();
    } else {
      v40PayUnlock();
    }
    return;
  }
  if(v40Step===2 && (!v40State.personal.firstName.trim() || !v40State.personal.lastName.trim())){ v40ShowError((V40_I18N[getLang()]||V40_I18N.en).firstLastError); v40ScrollStepToTop(); return; }
  const count = v40StepPagesCount(v40Step);
  if (v40SubStep < count - 1) { v40SubStep++; v40Render(); v40ScrollStepToTop(); return; }
  if(v40Step===5) v40SaveCurrentExperience();
  if(v40Step===6) v40SaveCurrentEducation();
  if(v40Step===7) v40SaveCurrentSkill();
  if(v40Step===8) v40SaveCurrentLanguage();
  if(v40Step<9){ v40Step++; v40SubStep=0; v40Render(); v40ScrollStepToTop(); }
}
function v40Prev(){
  // V40.33: Back must be an edit/navigation action, not a hidden "save again" action.
  // Saving while going back caused empty fields and duplicate live-preview blocks.
  v40CommitToLegacy();
  if (v40SubStep > 0) {
    v40SubStep--;
    v40Render();
    v40ScrollStepToTop();
    return;
  }
  if(v40Step>1){
    v40Step--;
    v40SubStep = v40StepPagesCount(v40Step) - 1;
    if (v40Step === 5) v40PrepareDraftForEdit("experience");
    if (v40Step === 6) v40PrepareDraftForEdit("education");
    v40Render();
    v40ScrollStepToTop();
  }
}
function v40Go(step){ v40Step=step; v40SubStep=0; v40Render(); v40ScrollStepToTop(); }
function v40ShowError(msg){ const box=document.getElementById("v40ErrorBox"); if(box){ box.textContent=msg; box.classList.remove("hidden"); } }
function v40ClearError(){ const box=document.getElementById("v40ErrorBox"); if(box){ box.textContent=""; box.classList.add("hidden"); } }
function v40AddExperience(){ v40SaveCurrentExperience(); v40SubStep=0; v40Render(); }
function v40SaveCurrentExperience(){
  const d = v40CleanEntry(v40State.draftExperience || {});
  if(!v40EntryHasValue(d)) return;
  v40State.experience = v40DedupeEntries([...(v40State.experience || []), d], ["jobTitle", "company", "location", "start", "end", "description"]);
  v40State.draftExperience = {};
  v40CommitToLegacy();
}
function v40AddEducation(){ v40SaveCurrentEducation(); v40SubStep=0; v40Render(); }
function v40SaveCurrentEducation(){
  const d = v40CleanEntry(v40State.draftEducation || {});
  if(!v40EntryHasValue(d)) return;
  v40State.education = v40DedupeEntries([...(v40State.education || []), d], ["school", "degree", "location", "dates", "description"]);
  v40State.draftEducation = {};
  v40CommitToLegacy();
}
function v40RenderEntries(items,type){
  if(!items?.length) return "";
  const txt = v40Text();
  return `<div class="v40-entry-list">${items.map((item,i)=>`<div class="v40-entry-card"><div class="v40-entry-card-top"><div><strong>${escHtml(item.jobTitle||item.degree||item.school||txt.entry||"Entry")}</strong><small>${escHtml(item.company||item.school||"")}</small></div><div class="v40-entry-actions"><button class="v40-tiny-btn" type="button" onclick="v40EditEntry('${type}',${i})">${escHtml(txt.edit||"Edit")}</button><button class="v40-tiny-btn danger" type="button" onclick="v40DeleteEntry('${type}',${i})">${escHtml(txt.delete||"Delete")}</button></div></div></div>`).join("")}</div>`;
}
function v40EditEntry(type,index){
  // V40.38: saved work/education entries can be corrected safely.
  // Editing moves the chosen saved card back into the form fields and removes it
  // from saved list temporarily, so saving updates that entry instead of duplicating it.
  if(type==="experience" && v40State.experience && v40State.experience[index]){
    v40State.draftExperience={...v40State.experience[index]};
    v40State.experience.splice(index,1);
    v40Step=5; v40SubStep=0;
  }
  if(type==="education" && v40State.education && v40State.education[index]){
    v40State.draftEducation={...v40State.education[index]};
    v40State.education.splice(index,1);
    v40Step=6; v40SubStep=0;
  }
  v40CommitAndPreview();
  v40Render();
  v40ScrollStepToTop();
}
function v40DeleteEntry(type,index){
  if(type==="experience" && v40State.experience) v40State.experience.splice(index,1);
  if(type==="education" && v40State.education) v40State.education.splice(index,1);
  v40CommitAndPreview();
  v40Render();
}
function v40AddSkill(){ v40SaveCurrentSkill(); v40Render(); }
function v40RemoveSkill(i){ v40State.skills.splice(i,1); v40Render(); }
function v40SuggestedSkillSets() {
  return {
    en: {
      base: ["Communication", "Teamwork", "Time Management", "Problem Solving"],
      software: ["JavaScript", "React", "Git", "REST APIs", "Problem Solving"],
      driver: ["Route Planning", "Safe Driving", "Vehicle Inspection", "Time Management"],
      operator: ["Excavator Operation", "Site Preparation", "Safety Procedures", "Equipment Maintenance"]
    },
    de: {
      base: ["Kommunikation", "Teamarbeit", "Zeitmanagement", "Problemlösung"],
      software: ["JavaScript", "React", "Git", "REST APIs", "Problemlösung"],
      driver: ["Routenplanung", "Sicheres Fahren", "Fahrzeugkontrolle", "Zeitmanagement"],
      operator: ["Baggerbedienung", "Baustellenvorbereitung", "Sicherheitsverfahren", "Maschinenwartung"]
    },
    sr: {
      base: ["Komunikacija", "Timski rad", "Upravljanje vremenom", "Rešavanje problema"],
      software: ["JavaScript", "React", "Git", "REST API", "Rešavanje problema"],
      driver: ["Planiranje ruta", "Bezbedna vožnja", "Kontrola vozila", "Upravljanje vremenom"],
      operator: ["Rad na bageru", "Priprema gradilišta", "Bezbednosne procedure", "Održavanje opreme"]
    }
  };
}

function v40BuiltInSkillSet() {
  const sets = v40SuggestedSkillSets();
  const known = [];
  Object.values(sets).forEach(langSets => Object.values(langSets).forEach(arr => known.push(...arr)));
  // Older demo/sample words that could remain in localStorage from previous versions.
  known.push("Safety", "Documentation", "Planning", "Sicherheit", "Dokumentation", "Planung", "Bezbednost", "Dokumentacija", "Planiranje");
  return new Set(known.map(x => String(x).toLowerCase().trim()));
}

function v40SuggestSkills(){
  const lang = getLang();
  const job = String(v40State.personal.jobTitle || "").toLowerCase();
  const sets = v40SuggestedSkillSets();
  const dict = sets[lang] || sets.en;
  let suggestions = dict.base;
  if(job.includes("software") || job.includes("developer") || job.includes("program") || job.includes("entwickler")) suggestions = dict.software;
  if(job.includes("driver") || job.includes("voza") || job.includes("fahrer")) suggestions = dict.driver;
  if(job.includes("excavator") || job.includes("operator") || job.includes("bager") || job.includes("bagger")) suggestions = dict.operator;

  const builtIn = v40BuiltInSkillSet();
  const currentSuggestionSet = new Set(suggestions.map(x => String(x).toLowerCase().trim()));
  // If older English/German/Serbian app suggestions are already present, clean them first.
  // This prevents mixed tags like Communication + Komunikacija after the user changes language.
  v40State.skills = (v40State.skills || []).filter(skill => {
    const key = String(skill || "").toLowerCase().trim();
    return !builtIn.has(key) || currentSuggestionSet.has(key);
  });

  suggestions.forEach(skill => {
    const exists = v40State.skills.some(x => String(x).toLowerCase().trim() === String(skill).toLowerCase().trim());
    if(!exists) v40State.skills.push(skill);
  });
  v40Render();
}
function v40AddLanguage(){ v40SaveCurrentLanguage(); v40Render(); }
function v40SaveCurrentLanguage(){ const lang=String(v40State.draftLanguage.language||"").trim(); const level=v40State.draftLanguage.level||"B2"; if(!lang||!level) return; v40State.languages.push({language:lang,level}); v40State.draftLanguage={language:"",level:"B2"}; v40CommitToLegacy(); }
function v40RemoveLanguage(i){ v40State.languages.splice(i,1); v40Render(); }
function v40OpenRewrite(target){
  const lang=getLang();
  const t=V40_I18N[lang]||V40_I18N.en;
  v40RewriteTarget=target;
  let original="",suggested="";
  if(target==="summary"){
    original=v40State.summary||"";
    suggested=v40SummarySuggestion(lang);
  }
  if(target==="experience"){
    original=v40State.draftExperience.description||"";
    suggested=v40ExperienceSuggestion(original, lang);
  }
  document.getElementById("v40OriginalText").textContent=original||t.noTextYet||"No text yet.";
  document.getElementById("v40SuggestedText").textContent=suggested;
  document.getElementById("v40RewriteModal").classList.remove("hidden");
}
function v40CloseRewrite(){ document.getElementById("v40RewriteModal").classList.add("hidden"); v40RewriteTarget=null; }
function v40UseImproved(){ const suggestion=document.getElementById("v40SuggestedText").textContent; if(v40RewriteTarget==="summary") v40State.summary=suggestion; if(v40RewriteTarget==="experience") v40State.draftExperience.description=suggestion; v40CloseRewrite(); v40Render(); }
function v40SummarySuggestion(lang=getLang()){
  const role=String(v40State.personal.jobTitle||"").trim();
  const skills=v40State.skills.slice(0,3).filter(Boolean).join(", ");
  if(lang==="de"){
    const r=role||"Fachkraft";
    const s=skills||"Kommunikation, Teamarbeit und Problemlösung";
    return `Motivierte/r ${r} mit praktischer Erfahrung und starken Fähigkeiten in ${s}. Fokussiert auf zuverlässige Ergebnisse, schnelles Lernen und eine verantwortungsvolle Zusammenarbeit im professionellen Team.`;
  }
  if(lang==="sr"){
    const r=role||"profesionalac";
    const s=skills||"komunikaciji, timskom radu i rešavanju problema";
    return `Motivisan/a ${r} sa praktičnim iskustvom i izraženim veštinama u ${s}. Usmeren/a na pouzdane rezultate, brzo učenje i odgovoran doprinos profesionalnom timu.`;
  }
  const r=role||"professional";
  const s=skills||"communication, teamwork and problem solving";
  return `Motivated ${r} with practical experience and strong skills in ${s}. Focused on delivering reliable results, learning quickly and contributing to professional teams with responsibility and attention to detail.`;
}
function v40ExperienceSuggestion(text, lang=getLang()){
  const base=String(text||"").trim();
  if(!base){
    if(lang==="de") return "Erzielte zuverlässige Ergebnisse im täglichen Arbeitsablauf.\nArbeitete mit Teammitgliedern zusammen, um Aufgaben pünktlich abzuschließen.\nHielt Qualitäts-, Sicherheits- und professionelle Standards ein.";
    if(lang==="sr") return "Postizao/la pouzdane rezultate u svakodnevnom radu.\nSarađivao/la sa članovima tima kako bi zadaci bili završeni na vreme.\nPoštovao/la standarde kvaliteta, bezbednosti i profesionalnog rada.";
    return "Delivered reliable results in daily operations.\nCollaborated with team members to complete tasks on time.\nMaintained quality, safety and professional standards.";
  }
  return base.split("\n").filter(Boolean).map(line=>{
    const clean=line.replace(/^[-•]\s*/,"").trim();
    if(!clean) return "";
    const lower=clean.charAt(0).toLowerCase()+clean.slice(1);
    if(lang==="de") return `Verbesserte Ergebnisse durch ${lower}.`;
    if(lang==="sr") return `Unapredio/la rezultate kroz ${lower}.`;
    return `Improved results by ${lower}.`;
  }).filter(Boolean).join("\n");
}
function v40AtsScore(){
  const txt = v40Text();
  let score = 20;
  const tips = [];
  if(v40State.personal.firstName && v40State.personal.lastName) score += 10; else tips.push(txt.tipFullName);
  if(v40State.personal.jobTitle) score += 10; else tips.push(txt.tipJobTitle);
  if(v40State.contact.email) score += 8; else tips.push(txt.tipEmail);
  if(v40State.contact.phone) score += 7; else tips.push(txt.tipPhone);
  if(v40State.summary.length > 80) score += 15; else tips.push(txt.tipSummary);
  if(v40ExperienceItemsForOutput().length) score += 15; else tips.push(txt.tipExperience);
  if(v40SkillsForOutput().length >= 4) score += 10; else tips.push(txt.tipSkills);
  if(v40State.languages.length) score += 5;
  const combined = [v40State.summary, ...v40State.experience.map(e => e.description || "")].join(" ");
  if(/\d+|%/.test(combined)) score += 5; else tips.push(txt.tipResults);
  return { score: Math.min(score,100), tips: tips.length ? tips.slice(0,3) : [txt.goodStructure, txt.strongKeywords, txt.readyPdf] };
}

function v40FitPreview(){
  const wrap=document.querySelector(".v40-cv-preview-wrap");
  const stage=document.querySelector(".v40-preview-stage");
  const page=document.getElementById("v40CvPreview");
  if(!wrap||!stage||!page) return;
  requestAnimationFrame(()=>{
    const baseW=794;
    const availableW=Math.max(220, wrap.clientWidth-20);
    const scale=Math.min(1, Math.max(.34, availableW/baseW));
    stage.style.height = `${Math.max(180, wrap.clientHeight-20)}px`;
    page.style.setProperty("transform", `scale(${scale})`, "important");
    page.style.setProperty("transform-origin", "top center", "important");
    page.style.margin='0 auto';
  });
}
function v40OpenFullPreview(){
  v40CommitToLegacy();
  const modal=document.getElementById("v40FullPreviewModal");
  const target=document.getElementById("v40FullPreviewCv");
  if(!modal||!target) return;
  const payload=v40PreviewPayload();
  renderCv(target, payload.data, {placeholders:false});
  modal.classList.remove("hidden");
}
function v40CloseFullPreview(){
  document.getElementById("v40FullPreviewModal")?.classList.add("hidden");
}

function v40SetBuilderMode(isBuilder){
  // V40.40: welcome/language page can scroll; builder is fixed to the viewport.
  document.body?.classList.toggle("v40-builder-open", !!isBuilder);
  document.documentElement?.classList.toggle("v40-builder-open", !!isBuilder);
}

async function v40DownloadPdf(){ v40CommitToLegacy(); try{ await downloadPdf(); }catch(err){ console.error(err); showToast(ui[getLang()].pdfError); } }
async function v40DownloadPng(){ v40CommitToLegacy(); try{ await downloadPng(); }catch(err){ console.error(err); showToast(ui[getLang()].pdfError); } }
function v40PayUnlock(){ v40CommitToLegacy(); openSupportModal(); }
function v40GoHome(){
  // V40.36: menu Home returns to the welcome screen without deleting CV data or PDF unlock.
  // V40.40: returning home also restores normal page scrolling for the language/welcome page.
  v40CommitToLegacy();
  document.getElementById("v40Menu")?.classList.add("hidden");
  document.getElementById("v40Builder")?.classList.add("hidden");
  document.getElementById("v40Welcome")?.classList.remove("hidden");
  v40SetBuilderMode(false);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function v40FillDemo(){ const lang=getLang(); const current=loadStored(); const data={...current,...demoDataByLang[lang],appLanguage:lang,cvLanguage:lang,template:current.template||"classic",photo:current.photo||""}; delete data.v40State; saveRaw(data); setFormData(data); v40State=legacyToV40State(data); v40Render(); showToast(ui[lang].demoFilled); }
function v40Clear(){ const lang=getLang(); if(!confirm(ui[lang].confirmClear)) return; const selectedTemplate=v40TemplateToLegacy(v40State.selectedTemplate||"classic"); localStorage.removeItem(STORAGE_KEY); const data=emptyData(); data.appLanguage=lang; data.cvLanguage=lang; data.template=selectedTemplate; saveRaw(data); setFormData(data); clearLanguageDraftInputs(); applyLanguage(lang); v40State=legacyToV40State(data); v40Step=1; v40SubStep=0; v40Render(); showToast(ui[lang].dataCleared); }
function escHtml(str){ return String(str||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"); }
function escAttr(str){ return escHtml(str).replaceAll("\n"," "); }



// V40.35 FINAL FLOW GUARD
// Stronger protection for Back/Edit flow:
// - going back to Work/Education opens the last saved block for editing instead of empty fields
// - saving the same Work/Education block updates it instead of duplicating it
// - old duplicate blocks from previous tests are merged by their main identity fields
function v40PrimaryKey(entry, fields) {
  const clean = v40CleanEntry(entry || {});
  const raw = fields.map(field => clean[field] || "").join("|").toLowerCase().replace(/\s+/g, " ").trim();
  return raw;
}

function v40MergeCleanEntries(oldEntry, newEntry) {
  const out = { ...(oldEntry || {}) };
  Object.entries(newEntry || {}).forEach(([key, value]) => {
    const val = String(value || "").trim();
    if (val) out[key] = val;
  });
  return v40CleanEntry(out);
}

function v40DedupeEntriesByPrimary(items, fields, primaryFields) {
  const result = [];
  const primaryIndex = new Map();
  const fullIndex = new Map();
  (items || []).forEach(item => {
    const clean = v40CleanEntry(item || {});
    if (!v40EntryHasValue(clean)) return;
    const fullKey = v40EntryKey(clean, fields);
    const primaryKey = v40PrimaryKey(clean, primaryFields || fields);
    const usablePrimary = primaryKey && primaryKey.replace(/\|/g, "").trim().length > 0;

    if (usablePrimary && primaryIndex.has(primaryKey)) {
      const idx = primaryIndex.get(primaryKey);
      result[idx] = v40MergeCleanEntries(result[idx], clean);
      fullIndex.set(v40EntryKey(result[idx], fields), idx);
      return;
    }
    if (!usablePrimary && fullIndex.has(fullKey)) return;

    const idx = result.length;
    result.push(clean);
    if (usablePrimary) primaryIndex.set(primaryKey, idx);
    fullIndex.set(fullKey, idx);
  });
  return result;
}

function v40PrimaryFieldsFor(fields) {
  if ((fields || []).includes("jobTitle")) return ["jobTitle", "company"];
  if ((fields || []).includes("school")) return ["school", "degree"];
  return fields;
}

function v40NormalizeRepeatingEntries(items, fields) {
  return v40DedupeEntriesByPrimary(items || [], fields, v40PrimaryFieldsFor(fields));
}

function v40MergeDraftEntry(items, draft, fields) {
  return v40NormalizeRepeatingEntries([...(items || []), draft || {}], fields);
}

function v40ExperienceItemsForOutput() {
  return v40MergeDraftEntry(v40State?.experience || [], v40State?.draftExperience || {}, ["jobTitle", "company", "location", "start", "end", "description"]);
}

function v40EducationItemsForOutput() {
  return v40MergeDraftEntry(v40State?.education || [], v40State?.draftEducation || {}, ["school", "degree", "location", "dates", "description"]);
}

function v40SaveCurrentExperience(){
  const d = v40CleanEntry(v40State.draftExperience || {});
  if(!v40EntryHasValue(d)) return;
  v40State.experience = v40NormalizeRepeatingEntries([...(v40State.experience || []), d], ["jobTitle", "company", "location", "start", "end", "description"]);
  v40State.draftExperience = {};
  v40CommitToLegacy();
}

function v40SaveCurrentEducation(){
  const d = v40CleanEntry(v40State.draftEducation || {});
  if(!v40EntryHasValue(d)) return;
  v40State.education = v40NormalizeRepeatingEntries([...(v40State.education || []), d], ["school", "degree", "location", "dates", "description"]);
  v40State.draftEducation = {};
  v40CommitToLegacy();
}

function v40StateRepairRepeatingLists() {
  if (!v40State) return;
  v40State.experience = v40NormalizeRepeatingEntries(v40State.experience || [], ["jobTitle", "company", "location", "start", "end", "description"]);
  v40State.education = v40NormalizeRepeatingEntries(v40State.education || [], ["school", "degree", "location", "dates", "description"]);
  v40State.skills = Array.from(new Map((v40State.skills || [])
    .map(s => String(s || "").trim())
    .filter(Boolean)
    .map(s => [s.toLowerCase(), s])).values());
}

function v40PrepareDraftForEdit(type) {
  if (!v40State) return;
  v40StateRepairRepeatingLists();
  if (type === "experience") {
    const draft = v40CleanEntry(v40State.draftExperience || {});
    if (v40EntryHasValue(draft)) return;
    const list = v40NormalizeRepeatingEntries(v40State.experience || [], ["jobTitle", "company", "location", "start", "end", "description"]);
    if (!list.length) return;
    v40State.draftExperience = { ...list[list.length - 1] };
    v40State.experience = list.slice(0, -1);
    v40CommitToLegacy();
  }
  if (type === "education") {
    const draft = v40CleanEntry(v40State.draftEducation || {});
    if (v40EntryHasValue(draft)) return;
    const list = v40NormalizeRepeatingEntries(v40State.education || [], ["school", "degree", "location", "dates", "description"]);
    if (!list.length) return;
    v40State.draftEducation = { ...list[list.length - 1] };
    v40State.education = list.slice(0, -1);
    v40CommitToLegacy();
  }
}

function v40EnterStepForEditing(step) {
  if (step === 5) v40PrepareDraftForEdit("experience");
  if (step === 6) v40PrepareDraftForEdit("education");
}

function v40Next(){
  if(v40Step===9){
    if(isUnlocked()) v40DownloadPdf();
    else v40PayUnlock();
    return;
  }
  if(v40Step===2 && (!v40State.personal.firstName.trim() || !v40State.personal.lastName.trim())){
    v40ShowError((V40_I18N[getLang()]||V40_I18N.en).firstLastError);
    v40ScrollStepToTop();
    return;
  }
  const count = v40StepPagesCount(v40Step);
  if (v40SubStep < count - 1) {
    v40SubStep++;
    v40Render();
    v40ScrollStepToTop();
    return;
  }
  if(v40Step===5) v40SaveCurrentExperience();
  if(v40Step===6) v40SaveCurrentEducation();
  if(v40Step===7) v40SaveCurrentSkill();
  if(v40Step===8) v40SaveCurrentLanguage();
  if(v40Step<9){
    v40Step++;
    v40SubStep=0;
    v40Render();
    v40ScrollStepToTop();
  }
}

function v40Prev(){
  v40CommitToLegacy();
  if (v40SubStep > 0) {
    v40SubStep--;
    v40Render();
    v40ScrollStepToTop();
    return;
  }
  if(v40Step>1){
    v40Step--;
    v40SubStep = v40StepPagesCount(v40Step) - 1;
    v40EnterStepForEditing(v40Step);
    v40Render();
    v40ScrollStepToTop();
  }
}

function v40Go(step){
  v40Step=step;
  v40SubStep=0;
  v40EnterStepForEditing(step);
  v40Render();
  v40ScrollStepToTop();
}

function initV40() {
  const stored = loadStored();
  v40State = legacyToV40State(stored);
  v40SetBuilderMode(!document.getElementById("v40Builder")?.classList.contains("hidden"));
  document.getElementById("v40StartBtn")?.addEventListener("click", () => {
    trackEvent("start_cv_click");
    document.getElementById("v40Welcome")?.classList.add("hidden");
    document.getElementById("v40Builder")?.classList.remove("hidden");
    v40SetBuilderMode(true);
    v40Render();
  });
  document.querySelectorAll(".v40-lang-btn").forEach(btn => btn.addEventListener("click", () => v40SetLanguage(btn.dataset.v40Lang)));
  document.getElementById("v40BackBtn")?.addEventListener("click", v40Prev);
  document.getElementById("v40NextBtn")?.addEventListener("click", v40Next);
  document.getElementById("v40MenuBtn")?.addEventListener("click", () => document.getElementById("v40Menu")?.classList.toggle("hidden"));
  document.getElementById("v40HomeBtn")?.addEventListener("click", v40GoHome);
  document.getElementById("v40FillDemoBtn")?.addEventListener("click", v40FillDemo);
  document.getElementById("v40KeepOriginalBtn")?.addEventListener("click", v40CloseRewrite);
  document.getElementById("v40UseImprovedBtn")?.addEventListener("click", v40UseImproved);
  document.getElementById("v40RewriteModal")?.addEventListener("click", (e) => { if(e.target.id === "v40RewriteModal") v40CloseRewrite(); });
  document.querySelector(".v40-cv-preview-wrap")?.addEventListener("click", v40OpenFullPreview);
  document.getElementById("v40FullPreviewClose")?.addEventListener("click", v40CloseFullPreview);
  document.getElementById("v40FullPreviewModal")?.addEventListener("click", (e) => { if(e.target.id === "v40FullPreviewModal") v40CloseFullPreview(); });
  document.getElementById("v40InstallBtn")?.addEventListener("click", () => {
    const original = document.getElementById("installBtn");
    if (original) original.click();
  });
  document.getElementById("v40ShareBtn")?.addEventListener("click", () => {
    const original = document.getElementById("shareBtn");
    if (original) original.click();
  });
  document.addEventListener("keydown", (e) => { if((e.ctrlKey||e.metaKey) && e.key === "Enter" && !document.getElementById("v40Builder")?.classList.contains("hidden")) v40Next(); });
  v40SetLanguage(stored.appLanguage || stored.cvLanguage || "en");
  v40RenderPreview();
}

document.addEventListener("DOMContentLoaded", initV40);
