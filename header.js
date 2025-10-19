document.addEventListener("DOMContentLoaded", function() {
  function loadMenu() {
    fetch("menu.html")
      .then(r => r.text())
      .then(html => {
        let container = document.getElementById("menu");
        if (!container) {
          container = document.createElement("header");
          container.id = "menu";
          document.body.insertBefore(container, document.body.firstChild);
        }
        container.innerHTML = html;
        enhanceMenu(container);  // <--- Menü erst JETZT im DOM!
        initDropdowns();         // <--- Dropdowns und Suche erst hier aktivieren
        initSearch();
      })
      .catch(e => console.error("Error loading menu.html:", e));
  }

  function enhanceMenu(container){
    try {
      var current = window.location.pathname.split("/").pop() || "index.html";
      container.querySelectorAll("a").forEach(a => {
        if (a.getAttribute("href") === current) a.classList.add("active");
      });
    } catch(e){}
  }

  function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(drop => {
      const button = drop.querySelector('.dropbtn');
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        closeAllDropdowns();
        drop.classList.toggle('active');
      });
    });
    document.addEventListener('click', closeAllDropdowns);
    function closeAllDropdowns() {
      dropdowns.forEach(drop => drop.classList.remove('active'));
    }
  }

  function initSearch() {
    const toggleSearchBtn = document.getElementById('toggle-search');
    const searchSection = document.getElementById('search-section');
    if (!toggleSearchBtn || !searchSection) return;

    toggleSearchBtn.addEventListener('click', () => {
      searchSection.classList.toggle('hidden');
    });

    // === 🔍 Globaler Suchindex (automatisch generiert) ===
const searchIndex = [
  // --- Kapitel 1 ---
  { title: "Kapitel 1 – Charaktererstellung", url: "Kapitel1.html#kapitel-1-charaktererstellung", keywords: ["kapitel", "charaktererstellung"] },
  { title: "1. Attribute festlegen", url: "Kapitel1.html#1-attribute-festlegen", keywords: ["attribute", "festlegen"] },
  { title: "Dein Charakter besitzt diese Basisattribute", url: "Kapitel1.html#dein-charakter-besitzt-diese-basisattribute", keywords: ["charakter", "basisattribute"] },
  { title: "Würfelsystem", url: "Kapitel1.html#würfelsystem", keywords: ["würfelsystem", "würfeln"] },
  { title: "2. Figur definieren", url: "Kapitel1.html#2-figur-definieren", keywords: ["figur", "definieren"] },
  { title: "3. Modifikatoren", url: "Kapitel1.html#3-modifikatoren", keywords: ["modifikatoren"] },
  { title: "4. Restliche Werte berechnen", url: "Kapitel1.html#4-restliche-werte-berechnen", keywords: ["werte", "berechnen"] },

  // --- Kapitel 2 ---
  { title: "Kapitel 2 – Klassen", url: "Kapitel2.html#kapitel-2-klassen", keywords: ["klassen", "kapitel"] },
  { title: "Weitere Informationen", url: "Kapitel2.html#weitere-inforationen", keywords: ["informationen", "klassen"] },

  // --- Kapitel 3 ---
  { title: "Kapitel 3 – Rassen", url: "Kapitel3.html#kapitel-3-rassen", keywords: ["rassen", "völker", "kapitel"] },

  // --- Kapitel 4 ---
  { title: "Kapitel 4 – Startausrüstung und Währung", url: "Kapitel4.html#kapitel-4-startausrüstung-und-währung", keywords: ["startausrüstung", "währung"] },
  { title: "Währungseinheiten", url: "Kapitel4.html#währungseinheiten", keywords: ["währungseinheiten"] },
  { title: "Startgeld", url: "Kapitel4.html#startgeld", keywords: ["startgeld"] },
  { title: "Ausrüstung", url: "Kapitel4.html#ausrüstung", keywords: ["ausrüstung"] },
  { title: "Rüstung", url: "Kapitel4.html#rüstung", keywords: ["rüstung"] },

   { title: "Kapitel 5 – Proben und Würfeln", url: "Kapitel5.html#kapitel-5-proben-und-würfeln", keywords: ["kapitel","proben","würfeln"] },
  { title: "1. Basisprobe", url: "Kapitel5.html#1-basisprobe", keywords: ["basisprobe"] },
  { title: "2. Erfolgsqualität", url: "Kapitel5.html#2-erfolgsqualität", keywords: ["erfolgsqualität"] },
  { title: "3. Multiproben", url: "Kapitel5.html#3-multiproben", keywords: ["multiproben"] },
  { title: "Multy proben qualität", url: "Kapitel5.html#multy-proben-qualität", keywords: ["multy","proben","qualität"] },
  { title: "4. Vorteil und Nachteil", url: "Kapitel5.html#4-vorteil-und-nachteil", keywords: ["vorteil","nachteil"] },

  { title: "Kapitel 6 – Kampfregeln", url: "Kapitel6.html#kapitel-6-kampfregeln", keywords: ["kapitel","kampfregeln"] },
  { title: "1. Rundenablauf", url: "Kapitel6.html#1-rundenablauf", keywords: ["rundenablauf"] },
  { title: "2. Kritische Treffer", url: "Kapitel6.html#2-kritische-treffer", keywords: ["kritische","treffer"] },
  { title: "3. Zustände und Schadensarten", url: "Kapitel6.html#3-zustände-und-schadensarten", keywords: ["zustände","schadensarten"] },
  { title: "4. Gelände- und Taktikboni", url: "Kapitel6.html#4-gelände-und-taktikboni", keywords: ["gelände","taktikboni"] },
  { title: "5. Spezialaktionen", url: "Kapitel6.html#5-spezialaktionen", keywords: ["spezialaktionen"] },
  { title: "6. Verletzungen und Tod", url: "Kapitel6.html#6-verletzungen-und-tod", keywords: ["verletzungen","tod"] },
  { title: "7. Waffenfertigkeit", url: "Kapitel6.html#7-waffenfertigkeit", keywords: ["waffenfertigkeit"] },
  { title: "8. Schildfertigkeit", url: "Kapitel6.html#8-schildfertigkeit", keywords: ["schildfertigkeit"] },
  { title: "9. Bewegung und Stealth-System", url: "Kapitel6.html#9-bewegung-und-stealth-system", keywords: ["bewegung","stealth","system"] },
  { title: "9.5 Tarnungszustände", url: "Kapitel6.html#9-5-tarnungszustände", keywords: ["tarnungszustände"] },
  { title: "9.6 AP-Übersicht (Bewegung und Stealth)", url: "Kapitel6.html#9-6-ap-übersicht-bewegung-und-stealth", keywords: ["ap","bewegung","stealth"] },
  { title: "9.7 Turn based mode außerhalb von Kämpfen", url: "Kapitel6.html#9-7-turn-based-mode-außerhalb-von-kämpfen", keywords: ["turn","based","mode","kämpfe"] },

  { title: "Kapitel 7 – Zauber & Spezialfähigkeiten", url: "Kapitel7.html#kapitel-7-zauber-spezialfähigkeiten", keywords: ["kapitel","zauber","spezialfähigkeiten"] },
  { title: "7.1 Allgemeines", url: "Kapitel7.html#7-1-allgemeines", keywords: ["allgemeines"] },
  { title: "7.2 Zauberbaukasten", url: "Kapitel7.html#7-2-zauberbaukasten", keywords: ["zauberbaukasten"] },
  { title: "7.3 Nebenwirkungen (optional)", url: "Kapitel7.html#7-3-nebenwirkungen-optional", keywords: ["nebenwirkungen","optional"] },
  { title: "7.4 Zauber erstellen", url: "Kapitel7.html#7-4-zauber-erstellen", keywords: ["zauber","erstellen"] },
  { title: "1. Effektstufe", url: "Kapitel7.html#1-effektstufe", keywords: ["effektstufe"] },
  { title: "2. Wirkungsbereich", url: "Kapitel7.html#2-wirkungsbereich", keywords: ["wirkungsbereich"] },
  { title: "3. Dauer", url: "Kapitel7.html#3-dauer", keywords: ["dauer"] },
  { title: "4. Dauer (Variation)", url: "Kapitel7.html#4-dauer-variation", keywords: ["dauer"] },
  { title: "5. Reichweite", url: "Kapitel7.html#5-reichweite", keywords: ["reichweite"] },
  { title: "5. AP-Kosten", url: "Kapitel7.html#5-ap-kosten", keywords: ["ap","kosten"] },

  { title: "Kapitel 8 – AP", url: "Kapitel8.html#kapitel-8-welt-und-regionen", keywords: ["welt","regionen","kapitel"] },
  { title: "8.1 Geographie", url: "Kapitel8.html#8-1-geographie", keywords: ["geographie"] },
  { title: "8.2 Fraktionen", url: "Kapitel8.html#8-2-fraktionen", keywords: ["fraktionen"] },
  { title: "8.3 Reiserouten", url: "Kapitel8.html#8-3-reiserouten", keywords: ["reiserouten"] },
  
  { title: "Kapitel 9 – Bekanntheit (Ruf-System)", url: "Kapitel9.html#kapitel-9-bekanntheit-ruf-system", keywords: ["kapitel", "bekanntheit", "ruf", "system"] },
  { title: "9.1 Bekanntheitswert", url: "Kapitel9.html#9-1-bekanntheitswert", keywords: ["bekanntheitswert"] },
  { title: "9.2 Auswirkungen", url: "Kapitel9.html#9-2-auswirkungen", keywords: ["auswirkungen"] },
  { title: "9.3 Veränderung der Bekanntheit", url: "Kapitel9.html#9-3-veränderung-der-bekanntheit", keywords: ["veränderung", "der", "bekanntheit"] },

  { title: "Kapitel 10 – Monster", url: "KapitelA.html#kapitel-10-monster", keywords: ["kapitel", "monster"] },
  { title: "10.1 Monster-Attribute", url: "KapitelA.html#10-1-monster-attribute", keywords: ["monster", "attribute"] },
  { title: "10.2 Gesundheit", url: "KapitelA.html#10-2-gesundheit", keywords: ["gesundheit"] },
  { title: "10.3 AP", url: "KapitelA.html#10-3-ap", keywords: [] },
  { title: "10.4 XP-Belohnung", url: "KapitelA.html#10-4-xp-belohnung", keywords: ["belohnung"] },
  { title: "10.5 Ausrüstung", url: "KapitelA.html#10-5-ausrüstung", keywords: ["ausrüstung"] },
  { title: "10.6 Monsterverhalten", url: "KapitelA.html#10-6-monsterverhalten", keywords: ["monsterverhalten"] },


  { title: "Kapitel B – Inventar und Lastsystem", url: "KapitelB.html#kapitel-b-inventar-und-lastsystem", keywords: ["inventar","lastsystem","gewicht"] },
  { title: "11.1 Traglast (nur Kraft)", url: "KapitelB.html#11-1-traglast-nur-kraft", keywords: ["traglast","kraft"] },
  { title: "11.2 Laststufen & Überlastung", url: "KapitelB.html#11-2-laststufen-überlastung", keywords: ["laststufen","überlastung"] },
  { title: "11.3 Direkte Kampfmodifikatoren durch Gewicht", url: "KapitelB.html#11-3-direkte-kampfmodifikatoren-durch-gewicht", keywords: ["kampfmodifikatoren","gewicht"] },
  { title: "11.4 Magie & besondere Effekte (optional)", url: "KapitelB.html#11-4-magie-besondere-effekte-optional", keywords: ["magie","effekte","optional"] },
  { title: "11.5 Schnellreferenz", url: "KapitelB.html#11-5-schnellreferenz", keywords: ["schnellreferenz"] },
  { title: "11.6 Integration in bestehende Regeln", url: "KapitelB.html#11-6-integration-in-bestehende-regeln", keywords: ["integration","regeln"] },

  { title: "Kapitel C – Level und XP System", url: "KapitelC.html#kapitel-c-level-und-xp-system", keywords: ["level","xp","system"] },

  { title: "Kapitel D – Alchemieregeln", url: "KapitelD.html#kapitel-d-alchemieregeln", keywords: ["alchemie","regeln"] },
  { title: "13.1 Grundlegende Alchemie Proben", url: "KapitelD.html#13-1-grundlegende-alchemie-proben", keywords: ["alchemie","proben"] },
  { title: "13.2 Trank Stufen", url: "KapitelD.html#13-2-trank-stufen", keywords: ["trank","stufen"] },
  { title: "13.3 Trank Qualität", url: "KapitelD.html#13-3-trank-qualität", keywords: ["trank","qualität"] },
  { title: "13.4 Material Einflüsse", url: "KapitelD.html#13-4-material-einflüsse", keywords: ["material","einflüsse"] },


  // --- Tools ---
  { title: "Tools Übersicht", url: "Tools.html#tools", keywords: ["tools", "hilfe", "werkzeuge"] },

  // --- Spezialisierungen ---
  { title: "Spezialisierungen Übersicht", url: "spezialisierungen.html#spezialisierungen", keywords: ["spezialisierungen", "klassen", "fähigkeiten"] },

  // --- Zauberlisten ---
  { title: "Zauberlisten", url: "Zauberlisten.html#zauberlisten", keywords: ["zauber", "listen", "magie"] }
];

// === 🧠 Autocomplete-Suche ===
const searchInput = document.getElementById("search-input");
if (searchInput) {
  const suggestionBox = document.createElement("div");
  suggestionBox.classList.add("suggestions");
  searchInput.parentNode.appendChild(suggestionBox);

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    suggestionBox.innerHTML = "";

    if (query.length < 2) return;

    const results = searchIndex.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.keywords.some(k => k.includes(query))
    );

    results.slice(0, 8).forEach(result => {
      const option = document.createElement("div");
      option.classList.add("suggestion-item");
      option.textContent = result.title;
      option.onclick = () => (window.location.href = result.url);
      suggestionBox.appendChild(option);
    });
  });

  // Enter-Taste → erstes Ergebnis öffnen
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const query = this.value.toLowerCase();
      const first = searchIndex.find(item =>
        item.title.toLowerCase().includes(query) ||
        item.keywords.some(k => k.includes(query))
      );
      if (first) window.location.href = first.url;
    }
  });
}

    const secretCodes = {
      "geheim01": "secret64zeichen01.html",
      "gmstart": "GM-Panel.html"
    };

    const ADMIN_PASSWORD = "admin-super-code";
    let isAdmin = false;
    const searchForm = document.getElementById('site-search');
    const searchInput = document.getElementById('searchInput');
    const codeList = document.getElementById('code-list');
    if (!searchForm || !searchInput || !codeList) return;

    Object.keys(publicCodes).forEach(code => {
      const div = document.createElement('div');
      div.textContent = code;
      div.classList.add('code-item');
      codeList.appendChild(div);
    });

    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const code = searchInput.value.trim().toLowerCase();
      if (code === ADMIN_PASSWORD) {
        isAdmin = true;
        alert("✅ Admin-Modus aktiviert!");
        searchInput.value = '';
        return;
      }
      if (publicCodes[code]) {
        window.location.href = publicCodes[code];
      } else if (isAdmin && secretCodes[code]) {
        window.location.href = secretCodes[code];
      } else {
        alert('❌ Ungültiger Code');
      }
      searchInput.value = '';
    });
  }

  loadMenu(); // Start loading!
});


