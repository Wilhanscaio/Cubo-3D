// Controle de tamanho de texto — recurso de acessibilidade.
// Aumenta/diminui o tamanho base da fonte e lembra a escolha do usuário.
(function () {
  var STEP = 0.1;
  var MIN = 0.85;
  var MAX = 1.6;
  var STORAGE_KEY = "estoicos-font-scale";

  function applyScale(scale) {
    document.documentElement.style.fontSize = (scale * 100) + "%";
  }

  function getSavedScale() {
    var saved = parseFloat(localStorage.getItem(STORAGE_KEY));
    return isNaN(saved) ? 1 : saved;
  }

  function setScale(scale) {
    scale = Math.min(MAX, Math.max(MIN, scale));
    localStorage.setItem(STORAGE_KEY, scale);
    applyScale(scale);
  }

  // Aplica a escala salva assim que possível
  applyScale(getSavedScale());

  document.addEventListener("DOMContentLoaded", function () {
    var incBtn = document.getElementById("font-increase");
    var decBtn = document.getElementById("font-decrease");
    var resetBtn = document.getElementById("font-reset");

    if (incBtn) {
      incBtn.addEventListener("click", function () {
        setScale(getSavedScale() + STEP);
      });
    }
    if (decBtn) {
      decBtn.addEventListener("click", function () {
        setScale(getSavedScale() - STEP);
      });
    }
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        setScale(1);
      });
    }
  });
})();

// Abas acessíveis (História / Pensamento / Frase)
// Segue o padrão WAI-ARIA de "tabs": navegação por setas, Home/End,
// e os painéis só ficam escondidos depois que o JavaScript roda —
// se o JavaScript falhar, o visitante ainda vê todo o conteúdo.
(function () {
  function initTabs() {
    var tablists = document.querySelectorAll('[role="tablist"]');

    tablists.forEach(function (tablist) {
      var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));

      function selectTab(tab, moveFocus) {
        tabs.forEach(function (t) {
          var isSelected = t === tab;
          t.setAttribute("aria-selected", isSelected ? "true" : "false");
          t.tabIndex = isSelected ? 0 : -1;
          var panel = document.getElementById(t.getAttribute("aria-controls"));
          if (panel) panel.hidden = !isSelected;
        });
        if (moveFocus) tab.focus();
      }

      tabs.forEach(function (tab, index) {
        tab.addEventListener("click", function () {
          selectTab(tab, false);
        });
        tab.addEventListener("keydown", function (event) {
          var newIndex = null;
          if (event.key === "ArrowRight") newIndex = (index + 1) % tabs.length;
          else if (event.key === "ArrowLeft") newIndex = (index - 1 + tabs.length) % tabs.length;
          else if (event.key === "Home") newIndex = 0;
          else if (event.key === "End") newIndex = tabs.length - 1;

          if (newIndex !== null) {
            event.preventDefault();
            selectTab(tabs[newIndex], true);
          }
        });
      });

      // Define o estado inicial (primeira aba ativa, demais escondidas)
      var startTab = tablist.querySelector('[aria-selected="true"]') || tabs[0];
      selectTab(startTab, false);
    });
  }

  document.addEventListener("DOMContentLoaded", initTabs);
})();
