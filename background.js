chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action !== "fetchData") return;

  (async () => {
    try {
      const res = await fetch(message.url, {
        method: message.method || "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: message.body ? JSON.stringify(message.body) : undefined,
      });

      const data = await res.json();
      sendResponse({ success: true, data });
    } catch (err) {
      sendResponse({ success: false, error: err.message });
    }
  })();

  return true; // keep channel open
});
