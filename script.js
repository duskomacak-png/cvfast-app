const fullNameInput = document.getElementById("fullName");
const jobTitleInput = document.getElementById("jobTitle");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const locationInput = document.getElementById("location");
const educationInput = document.getElementById("education");
const experienceInput = document.getElementById("experience");
const skillsInput = document.getElementById("skills");
const photoInput = document.getElementById("photo");
const fileNameLabel = document.getElementById("fileName");

const livePreviewName = document.getElementById("livePreviewName");
const livePreviewJob = document.getElementById("livePreviewJob");
const livePreviewEmail = document.getElementById("livePreviewEmail");
const livePreviewPhone = document.getElementById("livePreviewPhone");
const livePreviewLocation = document.getElementById("livePreviewLocation");
const livePreviewEducation = document.getElementById("livePreviewEducation");
const livePreviewExperience = document.getElementById("livePreviewExperience");
const livePreviewSkills = document.getElementById("livePreviewSkills");
const livePreviewPhoto = document.getElementById("livePreviewPhoto");

const generateBtn = document.getElementById("generateBtn");
const modalOverlay = document.getElementById("modalOverlay");
const closeModalBtn = document.getElementById("closeModalBtn");
const downloadLockedBtn = document.getElementById("downloadLockedBtn");
const shareAppBtn = document.getElementById("shareAppBtn");
const downloadAppBtn = document.getElementById("downloadAppBtn");

let deferredPrompt = null;
let uploadedPhotoData = null;

function safeValue(value, fallback) {
  return value && value.trim() ? value.trim() : fallback;
}

function updateLivePreview() {
  livePreviewName.textContent = safeValue(fullNameInput.value, "Ime i prezime");
  livePreviewJob.textContent = safeValue(jobTitleInput.value, "Pozicija");
  livePreviewEmail.textContent = safeValue(emailInput.value, "email@email.com");
  livePreviewPhone.textContent = safeValue(phoneInput.value, "+381 60 123 4567");
  livePreviewLocation.textContent = safeValue(locationInput.value, "Novi Sad, Srbija");
  livePreviewEducation.textContent = safeValue(
    educationInput.value,
    "Ovde će se prikazati tvoje obrazovanje."
  );
  livePreviewExperience.textContent = safeValue(
    experienceInput.value,
    "Ovde će se prikazati tvoj profil i radno iskustvo."
  );
  livePreviewSkills.textContent = safeValue(
    skillsInput.value,
    "Ovde će se prikazati tvoje veštine."
  );
}

function openModal(modal) {
  if (!modal) return;
  modal.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

function closeAllModals() {
  document.querySelectorAll(".modal-overlay").forEach((modal) => {
    modal.classList.add("hidden");
  });
  document.body.classList.remove("modal-open");
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
      resolve(img);
    };
    img.onerror = function () {
      reject(new Error("Slika nije učitana."));
    };
    img.src = src;
  });
}

function getImageType(src) {
  if (!src) return "PNG";
  const lower = src.toLowerCase();

  if (
    lower.includes("data:image/jpeg") ||
    lower.includes("data:image/jpg") ||
    lower.endsWith(".jpg") ||
    lower.endsWith(".jpeg")
  ) {
    return "JPEG";
  }

  return "PNG";
}

async function generatePDF() {
  try {
    downloadLockedBtn.disabled = true;
    downloadLockedBtn.textContent = "Pravim PDF...";

    updateLivePreview();

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;

    let y = 20;

    pdf.setFont("times", "bold");
    pdf.setFontSize(14);
    pdf.text("CV PRO • FREE", margin, y);
    y += 10;

    const photoX = margin;
    const photoY = y;
    const photoW = 35;
    const photoH = 35;

    const textX = margin + photoW + 10;
    let textY = y + 6;

    const photoSrc = uploadedPhotoData || "cv-icon.png";

    try {
      const img = await loadImage(photoSrc);
      const imgType = getImageType(photoSrc);
      pdf.addImage(img, imgType, photoX, photoY, photoW, photoH);
    } catch (error) {
      console.log("Slika nije ubačena u PDF:", error);
    }

    pdf.setFont("times", "bold");
    pdf.setFontSize(24);
    pdf.text(safeValue(fullNameInput.value, "Ime i prezime"), textX, textY);

    textY += 10;
    pdf.setFont("times", "normal");
    pdf.setFontSize(16);
    pdf.text(safeValue(jobTitleInput.value, "Pozicija"), textX, textY);

    textY += 10;
    pdf.setFont("times", "bold");
    pdf.setFontSize(12);
    pdf.text("Email:", textX, textY);
    pdf.setFont("times", "normal");
    pdf.text(safeValue(emailInput.value, "email@email.com"), textX + 18, textY);

    textY += 7;
    pdf.setFont("times", "bold");
    pdf.text("Telefon:", textX, textY);
    pdf.setFont("times", "normal");
    pdf.text(safeValue(phoneInput.value, "+381 60 123 4567"), textX + 22, textY);

    textY += 7;
    pdf.setFont("times", "bold");
    pdf.text("Lokacija:", textX, textY);
    pdf.setFont("times", "normal");
    pdf.text(safeValue(locationInput.value, "Novi Sad, Srbija"), textX + 22, textY);

    y += 45;

    pdf.setDrawColor(199, 52, 52);
    pdf.setLineWidth(0.5);
    pdf.line(margin, y, pageWidth - margin, y);
    y += 12;

    function addSection(title, content) {
      const cleanContent = safeValue(content, "");

      if (y > pageHeight - 35) {
        pdf.addPage();
        y = 20;
      }

      pdf.setFont("times", "bold");
      pdf.setFontSize(18);
      pdf.text(title, margin, y);
      y += 8;

      pdf.setFont("times", "normal");
      pdf.setFontSize(14);

      const lines = pdf.splitTextToSize(cleanContent, contentWidth);
      const lineHeight = 7;
      const neededHeight = Math.max(lines.length * lineHeight, lineHeight);

      if (y + neededHeight > pageHeight - margin) {
        pdf.addPage();
        y = 20;

        pdf.setFont("times", "bold");
        pdf.setFontSize(18);
        pdf.text(title, margin, y);
        y += 8;

        pdf.setFont("times", "normal");
        pdf.setFontSize(14);
      }

      pdf.text(lines, margin, y);
      y += neededHeight + 10;
    }

    addSection(
      "PROFIL / ISKUSTVO",
      safeValue(
        experienceInput.value,
        "Ovde će se prikazati tvoj profil i radno iskustvo."
      )
    );

    addSection(
      "VEŠTINE",
      safeValue(
        skillsInput.value,
        "Ovde će se prikazati tvoje veštine."
      )
    );

    addSection(
      "OBRAZOVANJE",
      safeValue(
        educationInput.value,
        "Ovde će se prikazati tvoje obrazovanje."
      )
    );

    pdf.save("cv-pro.pdf");

    downloadLockedBtn.textContent = "PDF preuzet ✅";

    setTimeout(() => {
      downloadLockedBtn.textContent = "Preuzmi FREE PDF";
      downloadLockedBtn.disabled = false;
    }, 1800);
  } catch (error) {
    console.error("PDF error:", error);
    alert("Greška pri pravljenju PDF-a. Probaj ponovo.");
    downloadLockedBtn.textContent = "Preuzmi FREE PDF";
    downloadLockedBtn.disabled = false;
  }
}

[
  fullNameInput,
  jobTitleInput,
  emailInput,
  phoneInput,
  locationInput,
  educationInput,
  experienceInput,
  skillsInput
].forEach((input) => {
  if (input) {
    input.addEventListener("input", updateLivePreview);
  }
});

if (photoInput) {
  photoInput.addEventListener("change", function (event) {
    const file = event.target.files && event.target.files[0];

    if (!file) {
      fileNameLabel.textContent = "Nije odabrano";
      uploadedPhotoData = null;
      livePreviewPhoto.src = "cv-icon.png";
      return;
    }

    fileNameLabel.textContent = file.name;

    const reader = new FileReader();
    reader.onload = function (e) {
      uploadedPhotoData = e.target.result;
      livePreviewPhoto.src = uploadedPhotoData;
    };
    reader.readAsDataURL(file);
  });
}

if (generateBtn) {
  generateBtn.addEventListener("click", function () {
    updateLivePreview();
    openModal(modalOverlay);
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", function () {
    closeModal(modalOverlay);
  });
}

if (modalOverlay) {
  modalOverlay.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
      closeModal(modalOverlay);
    }
  });
}

document.querySelectorAll("[data-legal]").forEach((button) => {
  button.addEventListener("click", function () {
    const modalId = button.getAttribute("data-legal");
    const modal = document.getElementById(modalId);
    openModal(modal);
  });
});

document.querySelectorAll(".legal-close").forEach((btn) => {
  btn.addEventListener("click", function () {
    const modal = btn.closest(".modal-overlay");
    closeModal(modal);
  });
});

document.querySelectorAll(".modal-overlay").forEach((overlay) => {
  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      closeModal(overlay);
    }
  });
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeAllModals();
  }
});

if (downloadLockedBtn) {
  downloadLockedBtn.addEventListener("click", generatePDF);
}

if (shareAppBtn) {
  shareAppBtn.addEventListener("click", async function () {
    const shareData = {
      title: "CV PRO",
      text: "Napravi svoj CV brzo i jednostavno.",
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link je kopiran ✅");
      } else {
        alert(window.location.href);
      }
    } catch (error) {
      console.log("Share canceled or failed:", error);
    }
  });
}

window.addEventListener("beforeinstallprompt", function (e) {
  e.preventDefault();
  deferredPrompt = e;
});

if (downloadAppBtn) {
  downloadAppBtn.addEventListener("click", async function () {
    try {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        deferredPrompt = null;
      } else {
        alert("Ako se instalacija ne pojavi automatski, otvori sajt u Chrome browseru i klikni Add to Home screen.");
      }
    } catch (error) {
      console.log("Install prompt error:", error);
    }
  });
}

window.addEventListener("appinstalled", function () {
  deferredPrompt = null;
  alert("App je instalirana ✅");
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("./sw.js").catch(function (err) {
      console.log("SW register error:", err);
    });
  });
}

updateLivePreview();

document.addEventListener("click", function (e) {
  let btn = e.target.closest("button, div, a");

  if (btn && btn.innerText.includes("Podrži projekat")) {
    window.open("https://paypal.me/duskomacak", "_blank");
  }
});