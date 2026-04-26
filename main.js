const status = document.querySelector("#status");

if (status) {
  const now = new Date();
  status.textContent = `Local preview loaded on ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}.`;
}
