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
    heroSubtitle: "Napravi i pregledaj CV besplatno. PDF preuzimanje se otključava jednokratnom podrškom.",
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
    supportTitle: "Pregled je besplatan • PDF unlock €5",
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
    languageNamePlaceholder: "e.g. English",
    addLanguage: "Dodaj jezik",
    removeLanguage: "Ukloni",
    languageLevelNote: "Koristi CEFR nivoe: A1, A2, B1, B2, C1, C2.",
    classicTemplateHint: "Čist CV na jednoj strani",
    sidebarTemplateHint: "Moderan CV sa bočnom kolonom",
    fillDemo: "Popuni demo",
    downloadPdf: "Preuzmi PDF",
    clearData: "Obriši",
    livePreview: "Live CV Preview",
    autoSave: "Auto-save aktivan",
    translateBtn: "🌍 Prevedi preko Google Translate",
    supportModalTitle: "CV je spreman ✅",
    supportModalText: "Izrada i pregled CV-a su besplatni. Jednokratnom podrškom od 5€ otključavaš PDF preuzimanje u ovom browseru.",
    supportModalMuted: "Posle otključavanja možeš menjati CV i preuzimati više PDF verzija u ovom browseru, dok ne obrišeš podatke pregledača.",
    supportPayBtn: "☕ Podrži projekat 5€ i otključaj PDF preuzimanje",
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
    unlocked: "PDF otključan ✅",
    pdfUnlockedBrowser: "PDF je otključan u ovom browseru ✅",
    installIos: "Za iPhone: otvori cvfast.app u Safari browseru → tapni Share → Add to Home Screen.",
    installOther: "Ako se install prozor ne pojavi: u Chrome/Edge meniju izaberi Install app ili Add to Home Screen.",
    alreadyInstalled: "App je već instalirana ✅",
    installingApp: "Pripremam instalaciju...",
    installAccepted: "Aplikacija je instalirana na početni ekran ✅",
    installDismissed: "Instalacija je otkazana",
    linkCopied: "Link je kopiran ✅",
    confirmClear: "Da li sigurno želiš da obrišeš sve podatke iz browsera?",
    pdfError: "PDF greška. Proveri internet/CDN biblioteke."
  },
  en: {
    navHow: "How it works",
    navFeatures: "Features",
    navStart: "Start CV",
    privacyBadge: "🛡️ No account • No server upload",
    heroTitle: "Create your resume fast",
    heroSubtitle: "Build and preview your CV for free. PDF download unlocks with a one-time €5 support payment. No subscription.",
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
    supportTitle: "Free preview • one-time €5 PDF unlock",
    supportText: "Build first. Pay only when your PDF is ready. No subscription.",
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
    clearData: "Clear",
    livePreview: "Live CV Preview",
    autoSave: "Auto-save active",
    translateBtn: "🌍 Translate with Google Translate",
    supportModalTitle: "Your CV is ready ✅",
    supportModalText: "Creating and previewing your CV is free. A one-time €5 support payment unlocks PDF downloads in this browser.",
    supportModalMuted: "After unlocking, you can edit your CV and download more PDF versions in this browser until you clear browser data. No subscription.",
    supportPayBtn: "☕ Support 5€ & unlock PDF downloads",
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
    unlocked: "PDF unlocked ✅",
    pdfUnlockedBrowser: "PDF is unlocked in this browser ✅",
    installIos: "For iPhone: open cvfast.app in Safari → tap Share → Add to Home Screen.",
    installOther: "If the install prompt does not appear: use Chrome/Edge menu → Install app or Add to Home Screen.",
    alreadyInstalled: "App is already installed ✅",
    installingApp: "Preparing installation...",
    installAccepted: "App installed on Home Screen ✅",
    installDismissed: "Installation cancelled",
    linkCopied: "Link copied ✅",
    confirmClear: "Are you sure you want to delete all data from this browser?",
    pdfError: "PDF error. Check internet/CDN libraries."
  },
  de: {
    navHow: "So funktioniert es",
    navFeatures: "Vorteile",
    navStart: "CV starten",
    privacyBadge: "🛡️ Kein Konto • Kein Server-Upload",
    heroTitle: "Lebenslauf schnell erstellen",
    heroSubtitle: "Lebenslauf kostenlos erstellen und ansehen. PDF-Download nach einmaliger Unterstützung.",
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
    supportTitle: "Kostenlose Vorschau • einmalige PDF-Freischaltung 5€",
    supportText: "Erst erstellen. Erst zahlen, wenn dein PDF bereit ist. Kein Abo.",
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
    clearData: "Löschen",
    livePreview: "Live CV Vorschau",
    autoSave: "Auto-save aktiv",
    translateBtn: "🌍 Mit Google Translate übersetzen",
    supportModalTitle: "Dein CV ist bereit ✅",
    supportModalText: "Erstellen und Vorschau sind kostenlos. Eine einmalige Unterstützung von 5€ schaltet PDF-Downloads in diesem Browser frei.",
    supportModalMuted: "Nach der Freischaltung kannst du deinen CV bearbeiten und weitere PDF-Versionen in diesem Browser herunterladen, bis du die Browserdaten löschst. Kein Abo.",
    supportPayBtn: "☕ 5€ unterstützen & PDF-Downloads freischalten",
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
    unlocked: "PDF freigeschaltet ✅",
    pdfUnlockedBrowser: "PDF ist in diesem Browser freigeschaltet ✅",
    installIos: "Für iPhone: cvfast.app in Safari öffnen → Teilen → Zum Home-Bildschirm hinzufügen.",
    installOther: "Wenn kein Installationsfenster erscheint: Chrome/Edge-Menü → App installieren oder Zum Startbildschirm hinzufügen.",
    alreadyInstalled: "App ist bereits installiert ✅",
    installingApp: "Installation wird vorbereitet...",
    installAccepted: "App wurde zum Startbildschirm hinzugefügt ✅",
    installDismissed: "Installation abgebrochen",
    linkCopied: "Link kopiert ✅",
    confirmClear: "Möchtest du wirklich alle Daten aus diesem Browser löschen?",
    pdfError: "PDF-Fehler. Prüfe Internet/CDN-Bibliotheken."
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
    template: "classic",
    fullName: "",
    jobTitle: "",
    phone: "",
    email: "",
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
    if (stored.appLanguage === "sr") stored.appLanguage = "en";
    if (stored.cvLanguage === "sr") stored.cvLanguage = "en";
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
    en: { en: "English", de: "German" },
    de: { en: "Englisch", de: "Deutsch" }
  };

  [...cvLanguage.options].forEach((option) => {
    if (labels[lang] && labels[lang][option.value]) {
      option.textContent = labels[lang][option.value];
    }
  });
}


function applyLanguage(lang) {
  if (lang === "sr" || !ui[lang]) lang = "en";

  const data = loadStored();
  data.appLanguage = lang;
  data.cvLanguage = lang;
  saveRaw(data);

  document.documentElement.lang = lang;
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
  if (data.appLanguage === "sr") data.appLanguage = "en";
  if (data.cvLanguage === "sr") data.cvLanguage = "en";
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

function renderCv(target, data, options = {}) {
  const usePlaceholders = Boolean(options.placeholders);
  const d = usePlaceholders ? withPlaceholders(data) : data;
  const lang = cvLabels[d.cvLanguage] && d.cvLanguage !== "sr" ? d.cvLanguage : "en";
  const L = cvLabels[lang];

  const machineItems = splitLines(d.machines);
  const skillItems = splitLines(d.skills);
  const expItems = splitLines(d.experience);
  const languageItems = formatLanguages(d.languages);

  const hasName = Boolean(String(d.fullName || "").trim());
  const hasTitle = Boolean(String(d.jobTitle || "").trim());
  const hasContact = Boolean(String(d.phone || d.email || d.location || "").trim());
  const hasPhoto = Boolean(d.photo);
  const hasIdentity = hasName || hasTitle || hasContact || hasPhoto;

  const photoHtml = d.photo
    ? `<img class="cv-photo" src="${d.photo}" alt="CV photo" />`
    : (hasName ? `<div class="cv-photo-placeholder">${esc(initials(d.fullName))}</div>` : "");

  const contactHtml = hasContact ? `
    <ul class="cv-contact">
      ${d.phone ? `<li>📞 ${esc(d.phone)}</li>` : ""}
      ${d.email ? `<li>✉️ ${esc(d.email)}</li>` : ""}
      ${d.location ? `<li>📍 ${esc(d.location)}</li>` : ""}
    </ul>
  ` : "";

  const nameTitleHtml = `
    ${hasName ? `<h1 class="cv-name">${esc(d.fullName)}</h1>` : ""}
    ${hasTitle ? `<p class="cv-title">${esc(d.jobTitle)}</p>` : ""}
    ${(hasName || hasTitle) ? `<div class="cv-divider"></div>` : ""}
  `;

  const section = (title, html) => html ? `
    <section class="cv-section">
      <div class="cv-section-title"><h2>${esc(title)}</h2></div>
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

  target.className = `cv-page ${d.template || "classic"}`;

  if (!filledSections) {
    target.innerHTML = `<div class="cv-empty-note">Start by entering your name, contact details and CV content.</div>`;
    return;
  }

  if (d.template === "sidebar") {
    const sideContent = `
      ${photoHtml}
      ${nameTitleHtml}
      ${contactHtml}
      ${section(L.languages, listHtml(languageItems))}
      ${section(L.machines, listHtml(machineItems))}
      ${section(L.skills, tagsHtml(skillItems))}
      ${section(L.education, paragraphHtml(d.education))}
    `.trim();

    target.innerHTML = `
      <div class="cv-inner">
        ${sideContent ? `<aside class="cv-side">${sideContent}</aside>` : ""}
        <main class="cv-main">
          ${section(L.profile, paragraphHtml(d.profile))}
          ${section(L.experience, listHtml(expItems))}
          ${section(L.traits, paragraphHtml(d.traits))}
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

      ${section(L.profile, paragraphHtml(d.profile))}
      ${section(L.experience, listHtml(expItems))}

      ${(machineItems.length || skillItems.length) ? `
        <div class="cv-columns">
          ${section(L.machines, listHtml(machineItems))}
          ${section(L.skills, tagsHtml(skillItems))}
        </div>
      ` : ""}

      ${(languageItems.length || d.education) ? `
        <div class="cv-columns">
          ${section(L.languages, listHtml(languageItems))}
          ${section(L.education, paragraphHtml(d.education))}
        </div>
      ` : ""}

      ${section(L.traits, paragraphHtml(d.traits))}
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
    appLanguage: lang === "de" ? "de" : "en",
    cvLanguage: lang === "de" ? "de" : "en",
    template: template || "classic",
    fullName: "Alex Miller",
    jobTitle: lang === "de" ? "Operations Specialist" : "Operations Specialist",
    email: "alex@example.com",
    phone: "+49 151 000000",
    location: "Berlin, Germany",
    profile: lang === "de"
      ? "Clean visual CV sample. Your own text appears here when you start typing."
      : "Clean visual CV sample. Your own text appears here when you start typing.",
    experience: lang === "de"
      ? "Daily operations\nField coordination\nQuality control"
      : "Daily operations\nField coordination\nQuality control",
    skills: "Teamwork\nSafety\nDocumentation",
    machines: "Planning tools\nWork equipment",
    languages: JSON.stringify([{ name: "English", level: "B2" }, { name: "German", level: "A2" }]),
    education: "Professional training",
    traits: "Reliable, precise and organized."
  };
}

function renderLiveTemplateSample(target, template, lang) {
  const sample = templateSampleData(template, lang);
  renderCv(target, sample, { placeholders: false });
  target.classList.add("cv-live-template-sample");
  target.insertAdjacentHTML("afterbegin", `<div class="cv-sample-ribbon">Visual sample only — start typing to replace it with your CV</div>`);
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
  const lang = cvLabels[data.cvLanguage] && data.cvLanguage !== "sr" ? data.cvLanguage : "en";
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

  // V40-safe PDF generation: render into a temporary visible/off-screen CV page.
  // This keeps the old PDF engine intact even when the old builder UI is hidden.
  const dataForPdf = getData({ includeLanguageDraft: true });
  const preview = document.createElement("article");
  preview.className = `cv-page ${dataForPdf.template || "classic"}`;
  preview.style.position = "fixed";
  preview.style.left = "-10000px";
  preview.style.top = "0";
  preview.style.width = "794px";
  preview.style.minHeight = "1123px";
  preview.style.background = "#ffffff";
  preview.style.zIndex = "-1";
  document.body.appendChild(preview);

  renderCv(preview, dataForPdf, { placeholders: false });

  const footer = preview.querySelector(".cv-footer");
  const oldFooterText = footer?.textContent;
  if (footer && !SHOW_CVFAST_FOOTER_IN_PDF) footer.textContent = "";

  await new Promise((r) => setTimeout(r, 80));

  const canvas = await html2canvas(preview, {
    scale: 2,
    backgroundColor: "#ffffff",
    useCORS: true
  });

  if (footer && oldFooterText !== undefined) footer.textContent = oldFooterText;
  preview.remove();

  const imgData = canvas.toDataURL("image/jpeg", 0.96);
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p", "mm", "a4");

  pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
  const name = (dataForPdf.fullName || "cvfast-cv").trim().replace(/[^\p{L}\p{N}]+/gu, "_");
  pdf.save(`${name}_CV.pdf`);
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
      currentData.cvLanguage = currentData.cvLanguage === "sr" ? "en" : currentData.cvLanguage;
      currentData.appLanguage = currentData.appLanguage === "sr" ? "en" : currentData.appLanguage;
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
      navigator.serviceWorker.register("/sw.js?v=404").catch(() => {});
    });
  }

  refreshPreview();
}

document.addEventListener("DOMContentLoaded", init);


/* =========================
   V40 PHONE WIZARD INTEGRATION
   Uses legacy storage/PDF/PayPal functions.
   ========================= */
const V40_STEPS = [
  "Choose Template",
  "Personal Details",
  "Contact Details",
  "Profile Summary",
  "Work Experience",
  "Education",
  "Skills",
  "Languages",
  "Final Preview"
];

const V40_I18N = {
  en: {
    subtitle: "Create a clean professional CV in minutes.",
    start: "Start →",
    livePreview: "Live CV Preview",
    saved: "All changes saved locally ✓",
    stepsLeft: "steps left",
    done: "Done!",
    firstLastError: "Please enter first name and last name before continuing."
  },
  de: {
    subtitle: "Erstelle in wenigen Minuten einen sauberen professionellen CV.",
    start: "Start →",
    livePreview: "Live CV Vorschau",
    saved: "Alle Änderungen lokal gespeichert ✓",
    stepsLeft: "Schritte übrig",
    done: "Fertig!",
    firstLastError: "Bitte Vorname und Nachname eingeben."
  }
};

let v40Step = 1;
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
  return "classic";
}

function legacyTemplateToV40(t) {
  if (t === "sidebar") return "modern";
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

function v40ToLegacyData() {
  const existing = loadStored();
  const first = v40State.personal.firstName.trim();
  const last = v40State.personal.lastName.trim();
  const fullName = [first, last].filter(Boolean).join(" ");
  const location = [v40State.contact.city, v40State.contact.country].map(x => String(x || "").trim()).filter(Boolean).join(", ");
  const languageRows = (v40State.languages || []).map(l => ({
    name: String(l.language || "").trim(),
    level: String(l.level || "").trim().toUpperCase()
  })).filter(l => l.name && l.level);

  return {
    ...existing,
    template: v40TemplateToLegacy(v40State.selectedTemplate),
    fullName,
    jobTitle: v40State.personal.jobTitle || "",
    phone: v40State.contact.phone || "",
    email: v40State.contact.email || "",
    location,
    photo: v40State.personal.photo || existing.photo || "",
    profile: v40State.summary || "",
    experience: v40ExperienceToText(v40State.experience),
    education: v40EducationToText(v40State.education),
    skills: (v40State.skills || []).join("\n"),
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

  if (stepText) stepText.textContent = `Step ${v40Step} of 9`;
  if (stepsLeft) stepsLeft.textContent = v40Step === 9 ? t.done : `${9 - v40Step} ${t.stepsLeft}`;
  if (progress) progress.style.width = `${(v40Step / 9) * 100}%`;
  if (title) title.textContent = V40_STEPS[v40Step - 1];
  if (backBtn) backBtn.classList.toggle("hidden", v40Step === 1);
  if (nextBtn) nextBtn.textContent = v40Step === 1 ? "Continue →" : v40Step === 9 ? "Done" : "Next →";
  if (pricePill) pricePill.textContent = isUnlocked() ? "Unlocked" : "5€";
  if (saved) saved.textContent = t.saved;

  v40ClearError();
  v40RenderStepContent();
  v40CommitToLegacy();
  v40RenderPreview();
}

function v40SetLanguage(lang) {
  applyLanguage(lang);
  document.querySelectorAll(".v40-lang-btn").forEach(btn => btn.classList.toggle("active", btn.dataset.v40Lang === lang));
  document.querySelectorAll("[data-v40-i18n]").forEach(el => {
    const key = el.dataset.v40I18n;
    if (V40_I18N[lang]?.[key]) el.textContent = V40_I18N[lang][key];
  });
  v40Render();
}

function v40PreviewSampleData() {
  return {
    ...emptyData(),
    appLanguage: getLang(),
    cvLanguage: getLang(),
    template: v40TemplateToLegacy(v40State?.selectedTemplate || "classic"),
    fullName: "Alex Miller",
    jobTitle: "Operations Specialist",
    phone: "+49 151 000000",
    email: "alex@example.com",
    location: "Berlin, Germany",
    profile: "Reliable professional with practical field experience, strong attention to detail and a clear, professional CV layout.",
    experience: "Operations Specialist — Sample Company\n2021 - Present\nDaily operations, planning and quality support.",
    education: "Technical Course — Berlin\n2020\nProfessional training and certification.",
    skills: "Planning\nTeamwork\nDocumentation",
    languages: JSON.stringify([{ name: "English", level: "B2" }, { name: "German", level: "A2" }]),
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
  document.getElementById("v40TemplateLabel").textContent = v40State.selectedTemplate === "modern" ? "Modern" : "Classic";
  renderCv(target, payload.data, { placeholders: false });
  target.classList.toggle("v40-preview-sample", !payload.hasData);
  v40FitPreview();
}

function v40RenderStepContent() {
  const el = document.getElementById("v40StepContent");
  if (!el) return;

  if (v40Step === 1) {
    el.innerHTML = `<div class="v40-template-instruction">
      <strong>Choose your CV design</strong>
      <span>Select one example below. You can change it later.</span>
    </div>
    <div class="v40-template-grid">
      ${v40TemplateCard("classic", "Classic", "Clean and simple CV for most jobs.")}
      ${v40TemplateCard("modern", "Modern", "Modern side column layout.")}
    </div>`;
    return;
  }

  if (v40Step === 2) {
    el.innerHTML = `<div class="v40-form-grid">
      <label>First name *<input value="${escAttr(v40State.personal.firstName)}" oninput="v40Update('personal.firstName', this.value)" placeholder="Ana"></label>
      <label>Last name *<input value="${escAttr(v40State.personal.lastName)}" oninput="v40Update('personal.lastName', this.value)" placeholder="Petrović"></label>
      <label>Job title<input value="${escAttr(v40State.personal.jobTitle)}" oninput="v40Update('personal.jobTitle', this.value)" placeholder="Senior Software Engineer"></label>
      <div class="v40-photo-box">
        <div class="v40-photo-preview">${v40State.personal.photo ? `<img src="${escAttr(v40State.personal.photo)}" alt="CV photo preview">` : `<span>Photo</span>`}</div>
        <div class="v40-photo-copy">
          <strong>Add CV photo</strong>
          <span>Optional. Choose a clear headshot. It is saved only in this browser.</span>
          <label class="v40-file-btn">Choose photo<input accept="image/*" type="file" onchange="v40HandlePhotoUpload(this)"></label>
          ${v40State.personal.photo ? `<button class="v40-remove-photo" type="button" onclick="v40RemovePhoto()">Remove photo</button>` : ``}
        </div>
      </div>
    </div>`;
    return;
  }

  if (v40Step === 3) {
    el.innerHTML = `<div class="v40-form-grid">
      <label>Email<input value="${escAttr(v40State.contact.email)}" oninput="v40Update('contact.email', this.value)" placeholder="ana@example.com"></label>
      <label>Phone<input value="${escAttr(v40State.contact.phone)}" oninput="v40Update('contact.phone', this.value)" placeholder="+381 60 123 4567"></label>
      <div class="v40-form-grid v40-two-col"><label>City<input value="${escAttr(v40State.contact.city)}" oninput="v40Update('contact.city', this.value)" placeholder="Belgrade"></label><label>Country<input value="${escAttr(v40State.contact.country)}" oninput="v40Update('contact.country', this.value)" placeholder="Serbia"></label></div>
      <label>LinkedIn<input value="${escAttr(v40State.contact.linkedin)}" oninput="v40Update('contact.linkedin', this.value)" placeholder="linkedin.com/in/your-name"></label>
    </div>`;
    return;
  }

  if (v40Step === 4) {
    el.innerHTML = `<label>Professional summary<textarea maxlength="500" oninput="v40Update('summary', this.value)" placeholder="Write 2–4 sentences about your experience, strengths and career goal.">${escHtml(v40State.summary)}</textarea></label>
      <p class="v40-helper-text">Write 2–4 sentences about your experience, strengths and career goal.</p>
      <button class="v40-ghost-btn" style="margin-top:10px" type="button" onclick="v40OpenRewrite('summary')">✨ Improve</button>`;
    return;
  }

  if (v40Step === 5) {
    const d = v40State.draftExperience || {};
    el.innerHTML = `${v40RenderEntries(v40State.experience, "experience")}
      <div class="v40-form-grid"><label>Job title<input value="${escAttr(d.jobTitle || "")}" oninput="v40UpdateDraft('experience','jobTitle',this.value)" placeholder="Software Engineer"></label>
      <div class="v40-form-grid v40-two-col"><label>Company<input value="${escAttr(d.company || "")}" oninput="v40UpdateDraft('experience','company',this.value)" placeholder="Company"></label><label>Location<input value="${escAttr(d.location || "")}" oninput="v40UpdateDraft('experience','location',this.value)" placeholder="Berlin"></label></div>
      <div class="v40-form-grid v40-two-col"><label>Start date<input value="${escAttr(d.start || "")}" oninput="v40UpdateDraft('experience','start',this.value)" placeholder="MM/YYYY"></label><label>End date / Present<input value="${escAttr(d.end || "")}" oninput="v40UpdateDraft('experience','end',this.value)" placeholder="Present"></label></div>
      <label>Description<textarea oninput="v40UpdateDraft('experience','description',this.value)" placeholder="Describe your responsibilities and achievements.">${escHtml(d.description || "")}</textarea></label>
      <button class="v40-ghost-btn" type="button" onclick="v40OpenRewrite('experience')">✨ Improve description</button><button class="v40-primary-btn" type="button" onclick="v40AddExperience()">+ Add another job</button></div>`;
    return;
  }

  if (v40Step === 6) {
    const d = v40State.draftEducation || {};
    el.innerHTML = `${v40RenderEntries(v40State.education, "education")}
      <div class="v40-form-grid"><label>School / University<input value="${escAttr(d.school || "")}" oninput="v40UpdateDraft('education','school',this.value)" placeholder="University of Belgrade"></label>
      <label>Degree<input value="${escAttr(d.degree || "")}" oninput="v40UpdateDraft('education','degree',this.value)" placeholder="BSc in Computer Science"></label>
      <div class="v40-form-grid v40-two-col"><label>Location<input value="${escAttr(d.location || "")}" oninput="v40UpdateDraft('education','location',this.value)" placeholder="Belgrade"></label><label>Dates<input value="${escAttr(d.dates || "")}" oninput="v40UpdateDraft('education','dates',this.value)" placeholder="2014 - 2018"></label></div>
      <label>Description optional<textarea oninput="v40UpdateDraft('education','description',this.value)" placeholder="Optional details.">${escHtml(d.description || "")}</textarea></label>
      <button class="v40-primary-btn" type="button" onclick="v40AddEducation()">+ Add education</button></div>`;
    return;
  }

  if (v40Step === 7) {
    el.innerHTML = `<div class="v40-chip-list">${(v40State.skills || []).map((s,i)=>`<span class="v40-chip">${escHtml(s)} <button type="button" onclick="v40RemoveSkill(${i})">×</button></span>`).join("")}</div>
      <div class="v40-add-row"><label>Skill<input value="${escAttr(v40State.draftSkill || "")}" oninput="v40State.draftSkill=this.value;v40CommitAndPreview();" placeholder="Communication"></label><button class="v40-ghost-btn" type="button" onclick="v40AddSkill()">+ Add</button></div>
      <button class="v40-ghost-btn" style="margin-top:10px" type="button" onclick="v40SuggestSkills()">✨ Suggest skills</button>`;
    return;
  }

  if (v40Step === 8) {
    el.innerHTML = `<div class="v40-chip-list">${(v40State.languages || []).map((l,i)=>`<span class="v40-chip">${escHtml(l.language)} (${escHtml(l.level)}) <button type="button" onclick="v40RemoveLanguage(${i})">×</button></span>`).join("")}</div>
      <div class="v40-form-grid v40-two-col"><label>Language<input value="${escAttr(v40State.draftLanguage.language || "")}" oninput="v40State.draftLanguage.language=this.value;v40CommitAndPreview();" placeholder="English"></label><label>Level<select onchange="v40State.draftLanguage.level=this.value;v40CommitAndPreview();">${["A1","A2","B1","B2","C1","C2","Native"].map(level=>`<option ${v40State.draftLanguage.level===level?"selected":""}>${level}</option>`).join("")}</select></label></div>
      <button class="v40-primary-btn" style="margin-top:10px" type="button" onclick="v40AddLanguage()">+ Add language</button>`;
    return;
  }

  if (v40Step === 9) {
    const score = v40AtsScore();
    el.innerHTML = `<div class="v40-score-card"><div class="v40-helper-text">ATS Readiness Score</div><div class="v40-score-num">${score.score}/100</div><div class="v40-helper-text">${score.tips.join(" • ")}</div></div>
      <div class="v40-jump-grid"><button type="button" onclick="v40Go(2)">Personal</button><button type="button" onclick="v40Go(3)">Contact</button><button type="button" onclick="v40Go(4)">Summary</button><button type="button" onclick="v40Go(5)">Experience</button><button type="button" onclick="v40Go(6)">Education</button><button type="button" onclick="v40Go(7)">Skills</button><button type="button" onclick="v40Go(8)">Languages</button></div>
      <label>Template<select onchange="v40SelectTemplate(this.value)"><option value="classic" ${v40State.selectedTemplate==="classic"?"selected":""}>Classic</option><option value="modern" ${v40State.selectedTemplate==="modern"?"selected":""}>Modern</option></select></label>
      <div class="v40-unlock-info">
        <strong>${isUnlocked() ? "PDF download is unlocked in this browser." : "Support CVFast.app with 5€ and unlock PDF downloads."}</strong>
        <span>${isUnlocked() ? "You can edit your CV and download updated PDF versions." : "After unlocking, you can edit your CV and download more PDF versions in this browser until you clear browser data."}</span>
      </div>
      <div class="v40-final-action">${isUnlocked()?`<button class="v40-download-btn" type="button" onclick="v40DownloadPdf()">Download PDF</button>`:`<button class="v40-paypal-btn" type="button" onclick="v40PayUnlock()">Support 5€ & Unlock PDF Downloads</button>`}</div><p class="v40-helper-text">100% private – stored only on your device.</p>`;
  }
}

function v40TemplateCard(id, name, desc) {
  const isModern = id === "modern";
  const preview = isModern
    ? `<div class="v40-template-preview v40-template-preview-modern"><div class="v40-template-side"><div class="v40-template-avatar">AM</div><span></span><span></span><span class="short"></span><div class="v40-template-side-title"></div><span></span><span class="short"></span></div><div class="v40-template-main"><div class="v40-template-head"><b>Alex Miller</b><small>Operations Specialist</small></div><div class="v40-template-line blue long"></div><div class="v40-template-line"></div><div class="v40-template-line"></div><div class="v40-template-line short"></div><div class="v40-template-line"></div></div></div>`
    : `<div class="v40-template-preview v40-template-preview-classic"><div class="v40-template-head"><b>Alex Miller</b><small>Operations Specialist</small></div><div class="v40-template-line blue long"></div><div class="v40-template-line"></div><div class="v40-template-line"></div><div class="v40-template-line short"></div><div class="v40-template-line"></div><div class="v40-template-chip-row"><i></i><i></i><i></i></div></div>`;
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
  // V40.9: Back/Next buttons are at the bottom, so after changing step
  // the scrollable glass card must return to the top of the new form.
  requestAnimationFrame(() => {
    const sheet = document.querySelector(".v40-input-sheet");
    const content = document.getElementById("v40StepContent");
    if (sheet) {
      try { sheet.scrollTo({ top: 0, behavior: "smooth" }); }
      catch (err) { sheet.scrollTop = 0; }
    }
    if (content && typeof content.scrollIntoView === "function") {
      try { content.scrollIntoView({ block: "start", inline: "nearest", behavior: "smooth" }); }
      catch (err) {}
    }
  });
}

function v40Next(){ if(v40Step===2 && (!v40State.personal.firstName.trim() || !v40State.personal.lastName.trim())){ v40ShowError((V40_I18N[getLang()]||V40_I18N.en).firstLastError); v40ScrollStepToTop(); return; } if(v40Step===5) v40SaveCurrentExperience(); if(v40Step===6) v40SaveCurrentEducation(); if(v40Step===8) v40SaveCurrentLanguage(); if(v40Step<9){ v40Step++; v40Render(); v40ScrollStepToTop(); } }
function v40Prev(){ if(v40Step>1){ if(v40Step===5) v40SaveCurrentExperience(); if(v40Step===6) v40SaveCurrentEducation(); if(v40Step===8) v40SaveCurrentLanguage(); v40Step--; v40Render(); v40ScrollStepToTop(); } }
function v40Go(step){ v40Step=step; v40Render(); v40ScrollStepToTop(); }
function v40ShowError(msg){ const box=document.getElementById("v40ErrorBox"); if(box){ box.textContent=msg; box.classList.remove("hidden"); } }
function v40ClearError(){ const box=document.getElementById("v40ErrorBox"); if(box){ box.textContent=""; box.classList.add("hidden"); } }
function v40AddExperience(){ v40SaveCurrentExperience(); v40Render(); }
function v40SaveCurrentExperience(){ const d=v40State.draftExperience||{}; if(!Object.values(d).some(v=>String(v||"").trim())) return; v40State.experience.push({...d}); v40State.draftExperience={}; v40CommitToLegacy(); }
function v40AddEducation(){ v40SaveCurrentEducation(); v40Render(); }
function v40SaveCurrentEducation(){ const d=v40State.draftEducation||{}; if(!Object.values(d).some(v=>String(v||"").trim())) return; v40State.education.push({...d}); v40State.draftEducation={}; v40CommitToLegacy(); }
function v40RenderEntries(items,type){ if(!items?.length) return ""; return `<div class="v40-entry-list">${items.map((item,i)=>`<div class="v40-entry-card"><div class="v40-entry-card-top"><div><strong>${escHtml(item.jobTitle||item.degree||item.school||"Entry")}</strong><small>${escHtml(item.company||item.school||"")}</small></div><div class="v40-entry-actions"><button class="v40-tiny-btn" type="button" onclick="v40EditEntry('${type}',${i})">Edit</button><button class="v40-tiny-btn danger" type="button" onclick="v40DeleteEntry('${type}',${i})">Delete</button></div></div></div>`).join("")}</div>`; }
function v40EditEntry(type,index){ if(type==="experience"){ v40State.draftExperience={...v40State.experience[index]}; v40State.experience.splice(index,1); } if(type==="education"){ v40State.draftEducation={...v40State.education[index]}; v40State.education.splice(index,1); } v40Render(); }
function v40DeleteEntry(type,index){ if(type==="experience") v40State.experience.splice(index,1); if(type==="education") v40State.education.splice(index,1); v40Render(); }
function v40AddSkill(){ const skill=String(v40State.draftSkill||"").trim(); if(!skill) return; if(!v40State.skills.includes(skill)) v40State.skills.push(skill); v40State.draftSkill=""; v40Render(); }
function v40RemoveSkill(i){ v40State.skills.splice(i,1); v40Render(); }
function v40SuggestSkills(){ const job=String(v40State.personal.jobTitle||"").toLowerCase(); let suggestions=["Communication","Teamwork","Time Management","Problem Solving"]; if(job.includes("software")||job.includes("developer")) suggestions=["JavaScript","React","Git","REST APIs","Problem Solving"]; if(job.includes("driver")) suggestions=["Route Planning","Safe Driving","Vehicle Inspection","Time Management"]; if(job.includes("excavator")||job.includes("operator")) suggestions=["Excavator Operation","Site Preparation","Safety Procedures","Equipment Maintenance"]; suggestions.forEach(s=>{ if(!v40State.skills.includes(s)) v40State.skills.push(s); }); v40Render(); }
function v40AddLanguage(){ v40SaveCurrentLanguage(); v40Render(); }
function v40SaveCurrentLanguage(){ const lang=String(v40State.draftLanguage.language||"").trim(); const level=v40State.draftLanguage.level||"B2"; if(!lang||!level) return; v40State.languages.push({language:lang,level}); v40State.draftLanguage={language:"",level:"B2"}; v40CommitToLegacy(); }
function v40RemoveLanguage(i){ v40State.languages.splice(i,1); v40Render(); }
function v40OpenRewrite(target){ v40RewriteTarget=target; let original="",suggested=""; if(target==="summary"){ original=v40State.summary||""; suggested=v40SummarySuggestion(); } if(target==="experience"){ original=v40State.draftExperience.description||""; suggested=v40ExperienceSuggestion(original); } document.getElementById("v40OriginalText").textContent=original||"No text yet."; document.getElementById("v40SuggestedText").textContent=suggested; document.getElementById("v40RewriteModal").classList.remove("hidden"); }
function v40CloseRewrite(){ document.getElementById("v40RewriteModal").classList.add("hidden"); v40RewriteTarget=null; }
function v40UseImproved(){ const suggestion=document.getElementById("v40SuggestedText").textContent; if(v40RewriteTarget==="summary") v40State.summary=suggestion; if(v40RewriteTarget==="experience") v40State.draftExperience.description=suggestion; v40CloseRewrite(); v40Render(); }
function v40SummarySuggestion(){ const role=v40State.personal.jobTitle||"professional"; const skills=v40State.skills.slice(0,3).join(", ")||"communication, teamwork and problem solving"; return `Motivated ${role} with practical experience and strong skills in ${skills}. Focused on delivering reliable results, learning quickly and contributing to professional teams with responsibility and attention to detail.`; }
function v40ExperienceSuggestion(text){ const base=String(text||"").trim(); if(!base) return "Delivered reliable results in daily operations.\nCollaborated with team members to complete tasks on time.\nMaintained quality, safety and professional standards."; return base.split("\n").filter(Boolean).map(line=>{ const clean=line.replace(/^[-•]\s*/,"").trim(); return `Improved results by ${clean.charAt(0).toLowerCase()}${clean.slice(1)}.`; }).join("\n"); }
function v40AtsScore(){ let score=20; const tips=[]; if(v40State.personal.firstName&&v40State.personal.lastName) score+=10; else tips.push("Add full name"); if(v40State.personal.jobTitle) score+=10; else tips.push("Add job title"); if(v40State.contact.email) score+=8; else tips.push("Add email"); if(v40State.contact.phone) score+=7; else tips.push("Add phone"); if(v40State.summary.length>80) score+=15; else tips.push("Add stronger summary"); if(v40State.experience.length) score+=15; else tips.push("Add work experience"); if(v40State.skills.length>=4) score+=10; else tips.push("Add more skills"); if(v40State.languages.length) score+=5; const combined=[v40State.summary,...v40State.experience.map(e=>e.description||"")].join(" "); if(/\d+|%/.test(combined)) score+=5; else tips.push("Consider adding measurable results"); return {score:Math.min(score,100),tips:tips.length?tips.slice(0,3):["Good structure","Strong keywords","Ready for PDF"]}; }

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

async function v40DownloadPdf(){ v40CommitToLegacy(); try{ await downloadPdf(); }catch(err){ console.error(err); showToast(ui[getLang()].pdfError); } }
function v40PayUnlock(){ v40CommitToLegacy(); openSupportModal(); }
function v40FillDemo(){ const lang=getLang(); const current=loadStored(); const data={...current,...demoDataByLang[lang],appLanguage:lang,cvLanguage:lang,template:current.template||"classic",photo:current.photo||""}; saveRaw(data); setFormData(data); v40State=legacyToV40State(data); v40Render(); showToast(ui[lang].demoFilled); }
function v40Clear(){ const lang=getLang(); if(!confirm(ui[lang].confirmClear)) return; const selectedTemplate=v40TemplateToLegacy(v40State.selectedTemplate||"classic"); localStorage.removeItem(STORAGE_KEY); const data=emptyData(); data.appLanguage=lang; data.cvLanguage=lang; data.template=selectedTemplate; saveRaw(data); setFormData(data); clearLanguageDraftInputs(); applyLanguage(lang); v40State=legacyToV40State(data); v40Step=1; v40Render(); showToast(ui[lang].dataCleared); }
function escHtml(str){ return String(str||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"); }
function escAttr(str){ return escHtml(str).replaceAll("\n"," "); }

function initV40() {
  const stored = loadStored();
  v40State = legacyToV40State(stored);
  document.getElementById("v40StartBtn")?.addEventListener("click", () => {
    trackEvent("start_cv_click");
    document.getElementById("v40Welcome")?.classList.add("hidden");
    document.getElementById("v40Builder")?.classList.remove("hidden");
    v40Render();
  });
  document.querySelectorAll(".v40-lang-btn").forEach(btn => btn.addEventListener("click", () => v40SetLanguage(btn.dataset.v40Lang)));
  document.getElementById("v40BackBtn")?.addEventListener("click", v40Prev);
  document.getElementById("v40NextBtn")?.addEventListener("click", v40Next);
  document.getElementById("v40MenuBtn")?.addEventListener("click", () => document.getElementById("v40Menu")?.classList.toggle("hidden"));
  document.getElementById("v40FillDemoBtn")?.addEventListener("click", v40FillDemo);
  document.getElementById("v40ClearBtn")?.addEventListener("click", v40Clear);
  document.getElementById("v40KeepOriginalBtn")?.addEventListener("click", v40CloseRewrite);
  document.getElementById("v40UseImprovedBtn")?.addEventListener("click", v40UseImproved);
  document.getElementById("v40RewriteModal")?.addEventListener("click", (e) => { if(e.target.id === "v40RewriteModal") v40CloseRewrite(); });
  document.querySelector(".v40-cv-preview-wrap")?.addEventListener("click", v40OpenFullPreview);
  document.getElementById("v40FullPreviewClose")?.addEventListener("click", v40CloseFullPreview);
  document.getElementById("v40FullPreviewModal")?.addEventListener("click", (e) => { if(e.target.id === "v40FullPreviewModal") v40CloseFullPreview(); });
  document.addEventListener("keydown", (e) => { if((e.ctrlKey||e.metaKey) && e.key === "Enter" && !document.getElementById("v40Builder")?.classList.contains("hidden")) v40Next(); });
  v40SetLanguage(stored.appLanguage || stored.cvLanguage || "en");
  v40RenderPreview();
}

document.addEventListener("DOMContentLoaded", initV40);
