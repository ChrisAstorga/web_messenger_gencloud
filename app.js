const heroChatButton = document.getElementById("start-chat");
const chatStatus = document.getElementById("chat-status");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

function report(message, isError = false) {
  chatStatus.textContent = message;
  chatStatus.classList.toggle("chat-error", isError);
}

function openMessenger() {
  if (typeof window.Genesys !== "function") {
    report(
      "Genesys Messenger has not loaded. Please refresh the page and try again.",
      true,
    );
    return;
  }

  heroChatButton.disabled = true;
  heroChatButton.setAttribute("aria-busy", "true");
  report("Opening the Epiroc Assistant...");

  window.Genesys(
    "command",
    "Messenger.open",
    {},
    () => {
      heroChatButton.disabled = false;
      heroChatButton.removeAttribute("aria-busy");
      report("The Epiroc Assistant is open.");
    },
    (error) => {
      heroChatButton.disabled = false;
      heroChatButton.removeAttribute("aria-busy");

      // Messenger.open is also rejected when Messenger is already open.
      const detail = error && (error.message || error.data || String(error));
      if (detail && /already.*open|opened/i.test(detail)) {
        report("The Epiroc Assistant is already open.");
        return;
      }

      console.error("Genesys Messenger.open failed:", error);
      report(
        "The assistant could not open. Please use the Genesys chat icon in the lower-right corner or refresh the page.",
        true,
      );
    },
  );
}

heroChatButton.addEventListener("click", openMessenger);

if (typeof window.Genesys === "function") {
  window.Genesys("subscribe", "Messenger.ready", () => {
    report(
      "The Epiroc Assistant is ready. Select Start a conversation or use the chat icon in the lower-right corner.",
    );
  });
}
