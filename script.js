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
    supportModalText: "Izrada i pregled CV-a su besplatni. PDF preuzimanje se otključava jednokratnom podrškom od 5€.",
    supportModalMuted: "Podrška pomaže da cvfast.app ostane online, brz i dostupan bez registracije.",
    supportPayBtn: "☕ Podrži 5€ i otključaj PDF",
    alreadyPaid: "",
    mvpNote: "Nakon podrške PayPal će te vratiti u app i PDF preuzimanje će biti otključano u ovom browseru.",
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
    supportModalText: "Creating and previewing your CV is free. PDF download unlocks with a one-time €5 support payment.",
    supportModalMuted: "Your support helps keep cvfast.app online, fast and available without registration. No subscription.",
    supportPayBtn: "☕ Support €5 and unlock PDF",
    alreadyPaid: "",
    mvpNote: "After support, PayPal returns you to cvfast.app and PDF download unlocks in this browser/device. No subscription.",
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
    supportModalText: "Erstellen und Vorschau sind kostenlos. PDF-Download wird durch eine einmalige Unterstützung von 5€ freigeschaltet.",
    supportModalMuted: "Deine Unterstützung hilft, cvfast.app online, schnell und ohne Registrierung verfügbar zu halten.",
    supportPayBtn: "☕ 5€ unterstützen und PDF freischalten",
    alreadyPaid: "",
    mvpNote: "Nach der Unterstützung bringt PayPal dich zurück zu cvfast.app und der PDF-Download wird in diesem Browser/Gerät freigeschaltet. Kein Abo.",
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
    const allowed = ["A1", "A2", "B1", "B2", "C1", "C2"];
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
      .filter((item) => item.name && ["A1", "A2", "B1", "B2", "C1", "C2"].includes(item.level));
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
  // V30 safety rule: never inject demo data into the real CV preview or PDF.
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

function refreshPreview() {
  renderCv($("#cvPreview"), getData({ includeLanguageDraft: true }), { placeholders: false });
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

  const preview = $("#cvPreview");
  renderCv(preview, getData({ includeLanguageDraft: true }), { placeholders: false });

  const footer = preview.querySelector(".cv-footer");
  const oldFooterText = footer?.textContent;
  if (footer && !SHOW_CVFAST_FOOTER_IN_PDF) footer.textContent = "";

  const originalTransform = preview.style.transform;
  preview.style.transform = "none";

  await new Promise((r) => setTimeout(r, 80));

  const canvas = await html2canvas(preview, {
    scale: 2,
    backgroundColor: "#ffffff",
    useCORS: true
  });

  preview.style.transform = originalTransform;
  if (footer && oldFooterText !== undefined) footer.textContent = oldFooterText;

  const imgData = canvas.toDataURL("image/jpeg", 0.96);
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p", "mm", "a4");

  pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
  const name = (getData({ includeLanguageDraft: true }).fullName || "cvfast-cv").trim().replace(/[^\p{L}\p{N}]+/gu, "_");
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
    localStorage.removeItem(STORAGE_KEY);
    const data = emptyData();
    data.appLanguage = lang;
    data.cvLanguage = lang;
    setFormData(data);
    saveRaw(data);
    applyLanguage(lang);
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
      const demo = {
        ...emptyData(),
        ...demoDataByLang[lang],
        cvLanguage: lang,
        appLanguage: lang,
        template: $("#template")?.value || "classic"
      };
      $("#previewModalTitle").textContent = titles[lang][btn.dataset.help] || "";
      renderCv($("#modalCvPreview"), demo, { placeholders: false });
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
      navigator.serviceWorker.register("/sw.js?v=30").catch(() => {});
    });
  }

  refreshPreview();
}

document.addEventListener("DOMContentLoaded", init);
