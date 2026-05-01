const STORAGE_KEY = "cvfast_app_data_v2";
const UNLOCK_KEY = "cvfast_pdf_unlocked_v1";
const UNLOCK_CODE = "cvfast_pdf_2026_ok";

// TODO: kad napraviš PayPal link, zameni ovde.
// PayPal return URL: https://cvfast.app/?unlock=cvfast_pdf_2026_ok
const PAYMENT_LINK = "https://www.paypal.com/ncp/payment/LU67SFVC967EY";

const SHOW_CVFAST_FOOTER_IN_PDF = false;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

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
  "traits"
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
    educationExtraTitle: "5. Obrazovanje i dodatno",
    educationLabel: "Obrazovanje / licence / kurs",
    traitsLabel: "Lične osobine",
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
    alreadyPaid: "Već sam podržao — otključaj PDF",
    mvpNote: "MVP napomena: bez baze nema automatske provere plaćanja. Otključavanje se čuva u ovom browseru.",
    privacyLink: "Privatnost",
    termsLink: "Uslovi korišćenja",
    supportLink: "Podrška",
    footerNote: "Bez naloga. Bez slanja CV podataka na server.",
    fullNamePlaceholder: "Milan Petrović",
    jobTitlePlaceholder: "Rukovalac građevinskih mašina",
    locationPlaceholder: "Beograd, Srbija",
    profilePlaceholder: "Kratak profesionalni opis...",
    experiencePlaceholder: "Jedna stavka po redu. Primer:\nRukovalac mašina — 10 godina iskustva\nZemljani radovi i priprema terena",
    machinesPlaceholder: "Bager CAT 330\nBuldozer D6R",
    skillsPlaceholder: "Niskogradnja\nBezbedan rad\nPreciznost",
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
    installingApp: "Aplikacija se preuzima...",
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
    heroTitle: "Create your CV fast",
    heroSubtitle: "Build and preview your CV for free. PDF download unlocks after one-time support.",
    startCv: "📄 Start CV",
    installApp: "⬇️ Install app",
    shareApp: "🔗 Share app",
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
    supportTitle: "Preview is free • PDF unlock €5",
    supportText: "One-time support helps keep cvfast.app online.",
    browserNote: "🔒 Your data stays in your browser",
    feature1Title: "📱 Mobile first",
    feature1Text: "Works on phone, laptop and desktop. You can create your CV immediately.",
    feature2Title: "🧾 Live preview",
    feature2Text: "Every change appears instantly on your CV. No blind form filling.",
    feature3Title: "🛡️ Privacy first",
    feature3Text: "No account and no database. Data is stored only in the user’s browser.",
    builderEyebrow: "CV BUILDER",
    builderTitle: "Create your CV",
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
    educationExtraTitle: "5. Education and extra",
    educationLabel: "Education / licences / course",
    traitsLabel: "Personal qualities",
    fillDemo: "Fill demo",
    downloadPdf: "Download PDF",
    clearData: "Clear",
    livePreview: "Live CV Preview",
    autoSave: "Auto-save active",
    translateBtn: "🌍 Translate with Google Translate",
    supportModalTitle: "Your CV is ready ✅",
    supportModalText: "Creating and previewing the CV is free. PDF download unlocks after one-time support of €5.",
    supportModalMuted: "Your support helps keep cvfast.app online, fast and available without registration.",
    supportPayBtn: "☕ Support €5 and unlock PDF",
    alreadyPaid: "I already supported — unlock PDF",
    mvpNote: "MVP note: without a database there is no automatic payment verification. Unlock is stored in this browser.",
    privacyLink: "Privacy Policy",
    termsLink: "Terms of Use",
    supportLink: "Support",
    footerNote: "No account. No CV data upload to our server.",
    fullNamePlaceholder: "John Worker",
    jobTitlePlaceholder: "Heavy Equipment Operator",
    locationPlaceholder: "City, Country",
    profilePlaceholder: "Short professional profile...",
    experiencePlaceholder: "One item per line. Example:\nMachine operator — 10 years of experience\nEarthworks and site preparation",
    machinesPlaceholder: "CAT 330 excavator\nD6R bulldozer",
    skillsPlaceholder: "Earthworks\nSafe work\nPrecision",
    educationPlaceholder: "Training / course",
    traitsPlaceholder: "Responsible, reliable, precise...",
    saved: "Saved",
    dataCleared: "Data cleared",
    demoFilled: "Demo data inserted ✅",
    photoAdded: "Photo added ✅",
    chooseTarget: "Choose EN or DE as CV language",
    enterTextFirst: "First enter the text you want to translate",
    unlocked: "PDF unlocked ✅",
    pdfUnlockedBrowser: "PDF is unlocked in this browser ✅",
    installIos: "For iPhone: open cvfast.app in Safari → tap Share → Add to Home Screen.",
    installOther: "If the install prompt does not appear: use Chrome/Edge menu → Install app or Add to Home Screen.",
    alreadyInstalled: "App is already installed ✅",
    installingApp: "Installing app...",
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
    supportTitle: "Vorschau kostenlos • PDF unlock €5",
    supportText: "Einmalige Unterstützung hilft, cvfast.app online zu halten.",
    browserNote: "🔒 Deine Daten bleiben in deinem Browser",
    feature1Title: "📱 Mobile first",
    feature1Text: "Funktioniert auf Handy, Laptop und Desktop. Du kannst deinen Lebenslauf sofort erstellen.",
    feature2Title: "🧾 Live-Vorschau",
    feature2Text: "Jede Änderung erscheint sofort im Lebenslauf. Kein blindes Ausfüllen.",
    feature3Title: "🛡️ Datenschutz zuerst",
    feature3Text: "Kein Konto und keine Datenbank. Daten werden nur im Browser gespeichert.",
    builderEyebrow: "CV BUILDER",
    builderTitle: "Lebenslauf erstellen",
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
    educationExtraTitle: "5. Ausbildung und Zusatz",
    educationLabel: "Ausbildung / Lizenzen / Kurs",
    traitsLabel: "Persönliche Eigenschaften",
    fillDemo: "Demo ausfüllen",
    downloadPdf: "PDF herunterladen",
    clearData: "Löschen",
    livePreview: "Live CV Vorschau",
    autoSave: "Auto-save aktiv",
    translateBtn: "🌍 Mit Google Translate übersetzen",
    supportModalTitle: "Dein CV ist bereit ✅",
    supportModalText: "Erstellen und Vorschau sind kostenlos. PDF-Download wird nach einmaliger Unterstützung von 5€ freigeschaltet.",
    supportModalMuted: "Deine Unterstützung hilft, cvfast.app online, schnell und ohne Registrierung verfügbar zu halten.",
    supportPayBtn: "☕ 5€ unterstützen und PDF freischalten",
    alreadyPaid: "Ich habe bereits unterstützt — PDF freischalten",
    mvpNote: "MVP-Hinweis: Ohne Datenbank gibt es keine automatische Zahlungsprüfung. Die Freischaltung wird in diesem Browser gespeichert.",
    privacyLink: "Datenschutz",
    termsLink: "Nutzungsbedingungen",
    supportLink: "Support",
    footerNote: "Kein Konto. Kein Upload von CV-Daten auf unseren Server.",
    fullNamePlaceholder: "Max Mustermann",
    jobTitlePlaceholder: "Baumaschinenführer",
    locationPlaceholder: "Stadt, Land",
    profilePlaceholder: "Kurzes berufliches Profil...",
    experiencePlaceholder: "Eine Position pro Zeile. Beispiel:\nMaschinenführer — 10 Jahre Erfahrung\nErdarbeiten und Baustellenvorbereitung",
    machinesPlaceholder: "Bagger CAT 330\nBulldozer D6R",
    skillsPlaceholder: "Erdarbeiten\nSicheres Arbeiten\nPräzision",
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
    installingApp: "App wird installiert...",
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
        <p><strong>Email:</strong> support@cvfast.app</p>
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
        <p><strong>Email:</strong> support@cvfast.app</p>
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
        <p><strong>Email:</strong> support@cvfast.app</p>
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
    phone: "+381 64 000 0000",
    email: "milan.petrovic@example.com",
    location: "Beograd, Srbija",
    profile: "Iskusan i pouzdan radnik sa praktičnim iskustvom, fokusiran na bezbednost, tačnost i kvalitet rada.",
    experience: "Rukovalac mašina — 10 godina iskustva\nZemljani radovi i priprema terena\nRad u dinamičnim uslovima gradilišta",
    machines: "Bager CAT 330\nBuldozer D6R",
    skills: "Niskogradnja\nZemljani radovi\nBezbedan rad\nPreciznost\nTimski rad",
    education: "Kurs / obuka",
    traits: "Odgovoran, pouzdan, precizan i naviknut na rad u dinamičnim uslovima."
  },
  en: {
    fullName: "John Worker",
    jobTitle: "Heavy Equipment Operator",
    phone: "+381 64 000 0000",
    email: "john.worker@example.com",
    location: "City, Country",
    profile: "Experienced and reliable worker with practical field experience, focused on safety, precision and quality of work.",
    experience: "Machine operator — 10 years of experience\nEarthworks and site preparation\nWork in dynamic construction site conditions",
    machines: "CAT 330 excavator\nD6R bulldozer",
    skills: "Earthworks\nSite preparation\nSafe work\nPrecision\nTeamwork",
    education: "Training / course",
    traits: "Responsible, reliable, precise and used to working in dynamic conditions."
  },
  de: {
    fullName: "Max Mustermann",
    jobTitle: "Baumaschinenführer",
    phone: "+381 64 000 0000",
    email: "max.mustermann@example.com",
    location: "Stadt, Land",
    profile: "Erfahrener und zuverlässiger Arbeiter mit praktischer Erfahrung, Fokus auf Sicherheit, Genauigkeit und Qualität der Arbeit.",
    experience: "Maschinenführer — 10 Jahre Erfahrung\nErdarbeiten und Baustellenvorbereitung\nArbeit unter dynamischen Baustellenbedingungen",
    machines: "Bagger CAT 330\nBulldozer D6R",
    skills: "Erdarbeiten\nBaustellenvorbereitung\nSicheres Arbeiten\nPräzision\nTeamarbeit",
    education: "Ausbildung / Kurs",
    traits: "Verantwortungsbewusst, zuverlässig, präzise und an dynamische Arbeitsbedingungen gewöhnt."
  }
};

function emptyData() {
  return {
    appLanguage: "sr",
    cvLanguage: "sr",
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
    traits: ""
  };
}

function loadStored() {
  try {
    return { ...emptyData(), ...(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}) };
  } catch {
    return emptyData();
  }
}

function saveRaw(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getLang() {
  const stored = loadStored();
  return stored.appLanguage || stored.cvLanguage || "sr";
}

function applyLanguage(lang) {
  if (!ui[lang]) lang = "sr";

  const data = loadStored();
  data.appLanguage = lang;
  data.cvLanguage = lang;
  saveRaw(data);

  document.documentElement.lang = lang;
  const cvLang = $("#cvLanguage");
  if (cvLang) cvLang.value = lang;

  $$("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (ui[lang][key]) el.textContent = ui[lang][key];
  });

  $$("[data-placeholder]").forEach((el) => {
    const key = el.dataset.placeholder;
    if (ui[lang][key]) el.placeholder = ui[lang][key];
  });

  $$(".lang-pill, .lang-mini").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.setLang === lang);
  });

  refreshPreview();
}

function getData() {
  const stored = loadStored();
  const data = { ...emptyData(), ...stored };
  fields.forEach((field) => {
    const el = $("#" + field);
    if (el) data[field] = el.value || "";
  });
  data.appLanguage = stored.appLanguage || data.cvLanguage || "sr";
  data.photo = stored.photo || "";
  return data;
}

function setFormData(data) {
  fields.forEach((field) => {
    const el = $("#" + field);
    if (el && data[field] !== undefined) el.value = data[field];
  });
}

function saveData() {
  const data = getData();
  data.appLanguage = data.cvLanguage;
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
  const lang = cvLabels[data.cvLanguage] ? data.cvLanguage : "sr";
  const demo = demoDataByLang[lang];
  return {
    ...data,
    fullName: data.fullName || demo.fullName,
    jobTitle: data.jobTitle || demo.jobTitle,
    phone: data.phone || demo.phone,
    email: data.email || demo.email,
    location: data.location || demo.location,
    profile: data.profile || demo.profile,
    experience: data.experience || demo.experience,
    machines: data.machines || demo.machines,
    skills: data.skills || demo.skills,
    education: data.education || demo.education,
    traits: data.traits || demo.traits
  };
}

function renderCv(target, data, options = {}) {
  const usePlaceholders = Boolean(options.placeholders);
  const d = usePlaceholders ? withPlaceholders(data) : data;
  const lang = cvLabels[d.cvLanguage] ? d.cvLanguage : "sr";
  const L = cvLabels[lang];

  const machineItems = splitLines(d.machines);
  const skillItems = splitLines(d.skills);
  const expItems = splitLines(d.experience);

  const photoHtml = d.photo
    ? `<img class="cv-photo" src="${d.photo}" alt="CV photo" />`
    : `<div class="cv-photo-placeholder">${esc(initials(d.fullName))}</div>`;

  const contactHtml = `
    <ul class="cv-contact">
      ${d.phone ? `<li>📞 ${esc(d.phone)}</li>` : ""}
      ${d.email ? `<li>✉️ ${esc(d.email)}</li>` : ""}
      ${d.location ? `<li>📍 ${esc(d.location)}</li>` : ""}
    </ul>
  `;

  const section = (title, html) => html ? `
    <section class="cv-section">
      <div class="cv-section-title"><h2>${esc(title)}</h2></div>
      ${html}
    </section>
  ` : "";

  const listHtml = (items) => items.length ? `<ul class="cv-list">${items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>` : "";
  const tagsHtml = (items) => items.length ? `<div class="cv-tags">${items.map(i => `<span>${esc(i)}</span>`).join("")}</div>` : "";
  const paragraphHtml = (text) => text ? `<p class="cv-text">${esc(text)}</p>` : "";

  target.className = `cv-page ${d.template || "classic"}`;

  if (d.template === "sidebar") {
    target.innerHTML = `
      <div class="cv-inner">
        <aside class="cv-side">
          ${photoHtml}
          <h1 class="cv-name">${esc(d.fullName || L.placeholderName)}</h1>
          <p class="cv-title">${esc(d.jobTitle || L.placeholderTitle)}</p>
          <div class="cv-divider"></div>
          ${contactHtml}
          ${section(L.machines, listHtml(machineItems))}
          ${section(L.skills, tagsHtml(skillItems))}
          ${section(L.education, paragraphHtml(d.education))}
        </aside>
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

  target.innerHTML = `
    <div class="cv-inner">
      <header class="cv-header">
        ${photoHtml}
        <div>
          <h1 class="cv-name">${esc(d.fullName || L.placeholderName)}</h1>
          <p class="cv-title">${esc(d.jobTitle || L.placeholderTitle)}</p>
          <div class="cv-divider"></div>
          ${contactHtml}
        </div>
      </header>

      ${section(L.profile, paragraphHtml(d.profile))}
      ${section(L.experience, listHtml(expItems))}

      <div class="cv-columns">
        ${section(L.machines, listHtml(machineItems))}
        ${section(L.skills, tagsHtml(skillItems))}
      </div>

      <div class="cv-columns">
        ${section(L.education, paragraphHtml(d.education))}
        ${section(L.traits, paragraphHtml(d.traits))}
      </div>
    </div>
    <footer class="cv-footer">cvfast.app</footer>
  `;
}

function refreshPreview() {
  renderCv($("#cvPreview"), getData(), { placeholders: false });
}

function openPreviewModal(title = "") {
  const data = getData();
  const lang = cvLabels[data.cvLanguage] ? data.cvLanguage : "sr";
  $("#previewModalTitle").textContent = title || cvLabels[lang].previewTitle;
  renderCv($("#modalCvPreview"), data, { placeholders: true });
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
  renderCv(preview, getData(), { placeholders: false });

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
  const name = (getData().fullName || "cvfast-cv").trim().replace(/[^\p{L}\p{N}]+/gu, "_");
  pdf.save(`${name}_CV.pdf`);
}

function openSupportModal() {
  $("#paymentLink").href = PAYMENT_LINK;
  $("#supportModal").classList.remove("hidden");
}

function closeSupportModal() {
  $("#supportModal").classList.add("hidden");
}

function openTranslateHelper() {
  const data = getData();
  const target = data.cvLanguage === "de" ? "de" : data.cvLanguage === "en" ? "en" : "sr";
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

  if (target === "sr") {
    showToast(ui[lang].chooseTarget);
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
  const texts = installTexts[lang] || installTexts.sr;
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
    e.preventDefault();
    deferredPrompt = e;
  });

  $("#installBtn")?.addEventListener("click", async () => {
    const lang = getLang();
    const installBtn = $("#installBtn");
    const originalText = installBtn?.textContent || ui[lang].installApp;
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;

    if (isStandalone) {
      showToast(ui[lang].alreadyInstalled);
      return;
    }

    // iPhone/iPad cannot be installed automatically from a web button.
    if (isIosDevice()) {
      showInstallInstructions("ios");
      return;
    }

    // Direct install flow for Android Chrome / desktop Chrome / Edge.
    if (deferredPrompt) {
      try {
        if (installBtn) {
          installBtn.disabled = true;
          installBtn.textContent = ui[lang].installingApp || "Aplikacija se preuzima...";
        }

        showToast(ui[lang].installingApp || "Aplikacija se preuzima...");

        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        deferredPrompt = null;

        if (choice && choice.outcome === "accepted") {
          showToast(ui[lang].installAccepted || "Aplikacija je instalirana na početni ekran ✅");
        } else {
          showToast(ui[lang].installDismissed || "Instalacija je otkazana");
        }

        if (installBtn) {
          installBtn.disabled = false;
          installBtn.textContent = originalText;
        }

        return;
      } catch (error) {
        if (installBtn) {
          installBtn.disabled = false;
          installBtn.textContent = originalText;
        }
        showInstallInstructions("auto");
        return;
      }
    }

    // If the browser did not provide install prompt, show a short fake-start message,
    // then open instructions. This feels less dead than doing nothing.
    if (installBtn) {
      installBtn.disabled = true;
      installBtn.textContent = ui[lang].installingApp || "Aplikacija se preuzima...";
    }

    showToast(ui[lang].installingApp || "Aplikacija se preuzima...");

    setTimeout(() => {
      if (installBtn) {
        installBtn.disabled = false;
        installBtn.textContent = originalText;
      }
      showInstallInstructions("auto");
    }, 900);
  });
}


function setupShare() {
  $("#shareBtn")?.addEventListener("click", async () => {
    const lang = getLang();
    const shareData = {
      title: "cvfast.app",
      text: lang === "de"
        ? "Lebenslauf schnell erstellen. Kein Konto. Kein Server-Upload."
        : lang === "en"
          ? "Create your CV fast. No account. No server upload."
          : "Napravi CV brzo. Bez naloga. Bez slanja na server.",
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
  const content = (legalTexts[lang] && legalTexts[lang][type]) ? legalTexts[lang][type] : legalTexts.sr.privacy;
  $("#legalModalTitle").textContent = content.title;
  $("#legalModalBody").innerHTML = content.body;
  $("#legalModal").classList.remove("hidden");
}

function closeLegalModal() {
  $("#legalModal").classList.add("hidden");
}


function init() {
  handleUnlockFromUrl();

  const stored = loadStored();
  setFormData(stored);
  applyLanguage(stored.appLanguage || stored.cvLanguage || "sr");

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

  $("#alreadyPaidBtn")?.addEventListener("click", () => {
    localStorage.setItem(UNLOCK_KEY, "true");
    closeSupportModal();
    showToast(ui[getLang()].unlocked);
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
          education: "Primer obrazovanja i osobina"
        },
        en: {
          basic: "Basic information in the final CV",
          profile: "Professional profile example",
          experience: "Work experience example",
          skills: "Machines and skills example",
          education: "Education and qualities example"
        },
        de: {
          basic: "Grunddaten im fertigen CV",
          profile: "Beispiel für ein berufliches Profil",
          experience: "Beispiel für Berufserfahrung",
          skills: "Beispiel für Maschinen und Fähigkeiten",
          education: "Beispiel für Ausbildung und Eigenschaften"
        }
      };
      openPreviewModal(titles[lang][btn.dataset.help] || "");
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
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }

  refreshPreview();
}

document.addEventListener("DOMContentLoaded", init);
