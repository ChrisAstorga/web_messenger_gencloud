const heroChatButton = document.getElementById("start-chat");
const floatingChatButton = document.getElementById("floating-chat");
const chatStatus = document.getElementById("chat-status");
const year = document.getElementById("year");
let messengerReady = false;
let messengerOpen = false;
let openRequested = false;
year.textContent = new Date().getFullYear();
floatingChatButton.disabled = false;
floatingChatButton.removeAttribute("disabled");
function report(message, isError = false) {
  chatStatus.textContent = message;
  chatStatus.classList.toggle("chat-error", isError);
}
function openMessenger() {
  if (typeof window.Genesys !== "function") {
    report(
      "Genesys did not load. Check the deployment URL, browser console, and network access.",
      true,
    );
    return;
  }
  if (!messengerReady) {
    openRequested = true;
    report("Connecting to the Epiroc Assistant...");
    return;
  }
  window.Genesys(
    "command",
    "Messenger.open",
    {},
    () => {
      messengerOpen = true;
      openRequested = false;
      floatingChatButton.setAttribute("aria-label", "Close Epiroc Assistant");
      report("The Epiroc Assistant is open.");
    },
    (error) => {
      openRequested = false;
      console.error("Genesys Messenger.open failed:", error);
      const detail = error && (error.message || error.data || error.toString());
      report(
        "Messenger could not open" +
          (detail
            ? ": " + detail
            : ". Check Allowed Domains, deployment status, Conversation app, and headless mode."),
        true,
      );
    },
  );
}
function closeMessenger() {
  if (typeof window.Genesys !== "function") return;
  window.Genesys("command", "Messenger.close", {}, () => {
    messengerOpen = false;
    floatingChatButton.setAttribute("aria-label", "Open Epiroc Assistant");
    report("The Epiroc Assistant is ready.");
  });
}
function toggleMessenger() {
  messengerOpen ? closeMessenger() : openMessenger();
}
heroChatButton.addEventListener("click", toggleMessenger);
floatingChatButton.addEventListener("click", toggleMessenger);
if (typeof window.Genesys === "function") {
  window.Genesys("subscribe", "Messenger.ready", () => {
    messengerReady = true;
    report("The Epiroc Assistant is ready. Select a chat button to begin.");
    if (openRequested) openMessenger();
  });
  window.Genesys("subscribe", "Messenger.opened", () => {
    messengerOpen = true;
    floatingChatButton.setAttribute("aria-label", "Close Epiroc Assistant");
  });
  window.Genesys("subscribe", "Messenger.closed", () => {
    messengerOpen = false;
    floatingChatButton.setAttribute("aria-label", "Open Epiroc Assistant");
  });
}
window.setTimeout(() => {
  if (!messengerReady)
    report(
      "Genesys Messenger has not initialized. Add this website origin to Allowed Domains. For local testing, use http://localhost instead of opening index.html directly.",
      true,
    );
}, 10000);
