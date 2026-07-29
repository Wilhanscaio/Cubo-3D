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
