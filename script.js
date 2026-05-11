const STORAGE_KEY = "cvfast_app_data_v3_en_de_clean";
const UNLOCK_KEY = "cvfast_pdf_unlocked_v1";
const UNLOCK_CODE = "cvfast_pdf_2026_ok";

// PayPal return URL: https://cvfast.app/?unlock=cvfast_pdf_2026_ok
const PAYMENT_LINK = "https://www.paypal.com/ncp/payment/LU67SFVC967EY";

const SHOW_CVFAST_FOOTER_IN_PDF = false;

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
  "traits"
];

const ui = {
  en: {
    navHow: "How it works",
    navFeatures: "Features",
    navStart: "Start CV",
    privacyBadge: "🛡️ No account • No server upload",
    heroTitle: "Create your resume for international jobs",
    heroSubtitle: "Build an English or German CV for job applications abroad. Free live preview, no account, no subscription.",
    startCv: "📄 Start CV",
    installApp: "⬇️ Install app",
    shareApp: "🔗 Share app",
    demoInitials: "AS",
    demoPhone: "📞 +44 7000 000000",
    demoEmail: "✉️ alex.student@example.com",
    cvProfile: "PROFILE",
    cvExperience: "WORK EXPERIENCE",
    cvSkills: "SKILLS",
    demoName: "Alex Student",
    demoTitle: "Junior Marketing Assistant",
    demoLocation: "📍 City, Country",
    demoProfile: "Motivated student with communication skills, attention to detail and willingness to learn quickly.",
    demoExperience1: "Student assistant — sample company",
    demoExperience2: "Customer support and basic office tasks",
    demoSkill1: "Communication",
    demoSkill2: "Organization",
    demoSkill3: "Microsoft Office",
    howTitle: "How it works",
    step1: "Fill in your data",
    step2: "Preview live",
    step3: "Download PDF",
    supportTitle: "Free preview • one-time €5 PDF unlock",
    supportText: "Build first. Pay only when your PDF is ready. No subscription.",
    browserNote: "🔒 Your data stays in your browser",
    feature1Title: "📱 Mobile first",
    feature1Text: "Works on phone, laptop and desktop. Create your CV immediately for applications abroad.",
    feature2Title: "🧾 Live preview",
    feature2Text: "Every change appears instantly on your CV. No blind form filling.",
    feature3Title: "🛡️ Privacy first",
    feature3Text: "No account and no database. Data is stored only in the user’s browser.",
    targetEyebrow: "INTERNATIONAL JOB APPLICATIONS",
    targetTitle: "One CV builder for English and German applications",
    targetText: "Use cvfast.app to prepare a clean resume or CV for applications in Germany, Austria, Switzerland, the United States, Canada, the United Kingdom and other international markets.",
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
    photoBrowserNote: "The file button text may follow your device/browser language.",
    profileTitle: "2. Profile",
    experienceTitle: "3. Work experience",
    machinesSkillsTitle: "4. Tools and skills",
    machinesLabel: "Tools / software",
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
    supportModalText: "Creating and previewing your CV is free. PDF download unlocks with a one-time €5 support payment.",
    supportModalMuted: "Your support helps keep cvfast.app online, fast and available without registration. No subscription.",
    supportPayBtn: "☕ Support €5 and unlock PDF",
    alreadyPaid: "",
    mvpNote: "After support, PayPal returns you to cvfast.app and PDF download unlocks in this browser/device. No subscription.",
    privacyLink: "Privacy Policy",
    termsLink: "Terms of Use",
    supportLink: "Support",
    footerNote: "No account. No CV data upload to our server.",
    fullNamePlaceholder: "Alex Student",
    jobTitlePlaceholder: "Junior Marketing Assistant",
    phonePlaceholder: "+1 555 123 4567",
    emailPlaceholder: "alex.student@example.com",
    locationPlaceholder: "City, Country",
    profilePlaceholder: "Short professional profile...",
    experiencePlaceholder: "One item per line. Example:\nStudent assistant — 6 months of experience\nCustomer support and office tasks",
    machinesPlaceholder: "Microsoft Word\nMicrosoft Excel\nGoogle Docs\nCanva",
    skillsPlaceholder: "Communication\nOrganization\nTeamwork",
    educationPlaceholder: "University studies / course / certificate",
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
    demoName: "Max Student",
    demoTitle: "Studentische Hilfskraft",
    demoLocation: "📍 Stadt, Land",
    demoProfile: "Motivierter Student mit guter Kommunikation, Organisation und Lernbereitschaft.",
    demoExperience1: "Studentische Aushilfe — Beispielfirma",
    demoExperience2: "Kundenkommunikation und einfache Büroaufgaben",
    demoSkill1: "Kommunikation",
    demoSkill2: "Organisation",
    demoSkill3: "Teamarbeit",
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
    targetEyebrow: "INTERNATIONALE BEWERBUNGEN",
    targetTitle: "Ein CV-Builder für englische und deutsche Bewerbungen",
    targetText: "Nutze cvfast.app, um einen sauberen Lebenslauf oder CV für Bewerbungen in Deutschland, Österreich, der Schweiz, den USA, Kanada, Großbritannien und anderen internationalen Märkten vorzubereiten.",
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
    photoBrowserNote: "Der Dateibutton kann die Sprache deines Geräts/Browsers verwenden.",
    profileTitle: "2. Profil",
    experienceTitle: "3. Berufserfahrung",
    machinesSkillsTitle: "4. Tools und Fähigkeiten",
    machinesLabel: "Tools / Software",
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
    supportModalText: "Erstellen und Vorschau sind kostenlos. PDF-Download wird durch eine einmalige Unterstützung von 5€ freigeschaltet.",
    supportModalMuted: "Deine Unterstützung hilft, cvfast.app online, schnell und ohne Registrierung verfügbar zu halten.",
    supportPayBtn: "☕ 5€ unterstützen und PDF freischalten",
    alreadyPaid: "",
    mvpNote: "Nach der Unterstützung bringt PayPal dich zurück zu cvfast.app und der PDF-Download wird in diesem Browser/Gerät freigeschaltet. Kein Abo.",
    privacyLink: "Datenschutz",
    termsLink: "Nutzungsbedingungen",
    supportLink: "Support",
    footerNote: "Kein Konto. Kein Upload von CV-Daten auf unseren Server.",
    fullNamePlaceholder: "Max Student",
    jobTitlePlaceholder: "Studentische Hilfskraft",
    phonePlaceholder: "+49 170 1234567",
    emailPlaceholder: "max.student@example.com",
    locationPlaceholder: "Stadt, Land",
    profilePlaceholder: "Kurzes berufliches Profil...",
    experiencePlaceholder: "Eine Position pro Zeile. Beispiel:\nStudentische Aushilfe — Beispielunternehmen\nUnterstützung bei Kundenkommunikation, Dokumenten und einfachen Büroaufgaben",
    machinesPlaceholder: "Microsoft Word\nMicrosoft Excel\nGoogle Docs\nCanva",
    skillsPlaceholder: "Kommunikation\nOrganisation\nTeamarbeit",
    educationPlaceholder: "Studium / Kurs / Zertifikat",
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
  en: {
    profile: "PROFILE",
    experience: "WORK EXPERIENCE",
    machines: "TOOLS / SOFTWARE",
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
    machines: "TOOLS / SOFTWARE",
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
  en: {
    fullName: "Alex Student",
    jobTitle: "Junior Marketing Assistant",
    phone: "+1 555 123 4567",
    email: "alex.student@example.com",
    location: "City, Country",
    profile: "Motivated student looking for an entry-level or part-time role, with good communication skills, attention to detail and a strong willingness to learn.",
    experience: "Student assistant — sample company\nHelped with customer communication, documents and basic office tasks\nWorked in a team and completed tasks on time",
    machines: "Microsoft Word\nMicrosoft Excel\nGoogle Docs\nCanva",
    skills: "Communication\nMicrosoft Office\nOrganization\nTeamwork\nEnglish language",
    education: "University studies / course / certificate",
    traits: "Responsible, reliable, organized and ready to learn."
  },
  de: {
    fullName: "Max Student",
    jobTitle: "Studentische Hilfskraft",
    phone: "+49 170 1234567",
    email: "max.student@example.com",
    location: "Stadt, Land",
    profile: "Motivierter Student für eine Einstiegsstelle oder Teilzeitstelle, mit guter Kommunikation, Organisation und Lernbereitschaft.",
    experience: "Studentische Aushilfe — Beispielunternehmen\nUnterstützung bei Kundenkommunikation, Dokumenten und einfachen Büroaufgaben\nTeamarbeit und pünktliche Erledigung von Aufgaben",
    machines: "Microsoft Word\nMicrosoft Excel\nGoogle Docs\nCanva",
    skills: "Kommunikation\nMicrosoft Office\nOrganisation\nTeamarbeit\nEnglischkenntnisse",
    education: "Studium / Kurs / Zertifikat",
    traits: "Verantwortungsbewusst, zuverlässig, organisiert und lernbereit."
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
    traits: ""
  };
}

function loadStored() {
  try {
    const stored = { ...emptyData(), ...(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}) };
    if (stored.appLanguage === "sr") stored.appLanguage = "en";
    if (stored.cvLanguage === "sr") stored.cvLanguage = "en";
    // Clean old demo phone data if it ever remains in a browser from an older version.
    const oldDemoPhone = String(stored.phone || "").replace(/\s+/g, "");
    const oldCountryCode = "+" + "3" + "81";
    if (oldDemoPhone === oldCountryCode + "640000000") {
      stored.phone = "";
    }
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

  refreshPreview();
}

function getData() {
  const stored = loadStored();
  const data = { ...emptyData(), ...stored };
  fields.forEach((field) => {
    const el = $("#" + field);
    if (el) data[field] = el.value || "";
  });
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
  const lang = cvLabels[data.cvLanguage] && data.cvLanguage !== "sr" ? data.cvLanguage : "en";
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
  const lang = cvLabels[d.cvLanguage] && d.cvLanguage !== "sr" ? d.cvLanguage : "en";
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
  const lang = cvLabels[data.cvLanguage] && data.cvLanguage !== "sr" ? data.cvLanguage : "en";
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
        "App installed on Home Screen ✅"
    );
  });

  $("#installBtn")?.addEventListener("click", async () => {
    trackEvent("install_app_click");
    const lang = getLang();
    const installBtn = $("#installBtn");

    const originalText =
      installBtn?.textContent ||
      ui[lang]?.installApp ||
      "⬇️ Install app";

    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isStandalone) {
      showToast(
        ui[lang]?.alreadyInstalled ||
          "App is already installed ✅"
      );
      return;
    }

    // If the browser does not provide a direct install prompt, show manual install steps.
    if (!deferredPrompt) {
      console.log("PWA install prompt is not available on this browser/device.");
      showInstallInstructions("auto");
      return;
    }

    try {
      if (installBtn) {
        installBtn.disabled = true;
        installBtn.textContent =
          ui[lang]?.installingApp ||
          "Preparing installation...";
      }

      await deferredPrompt.prompt();

      const choice = await deferredPrompt.userChoice;
      const outcome = choice?.outcome;

      deferredPrompt = null;

      if (outcome === "accepted") {
        showToast(
          ui[lang]?.installAccepted ||
            "App installed on Home Screen ✅"
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
          ? "Create your CV for international job applications. No account. No server upload."
          : "Create your CV for international job applications. No account. No server upload.",
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
        en: {
          basic: "Basic information in the final CV",
          profile: "Professional profile example",
          experience: "Work experience example",
          skills: "Tools and skills example",
          education: "Education and qualities example"
        },
        de: {
          basic: "Grunddaten im fertigen CV",
          profile: "Beispiel für ein berufliches Profil",
          experience: "Beispiel für Berufserfahrung",
          skills: "Beispiel für Tools und Fähigkeiten",
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
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    });
  }

  refreshPreview();
}

document.addEventListener("DOMContentLoaded", init);
