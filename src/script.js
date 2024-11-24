const btnConfig = document.getElementById('btnConfig');
if (btnConfig) {
  btnConfig.addEventListener('click', () => {
    window.api.openConfigWindow(); // Usa a função exposta pelo preload script
  });
}
