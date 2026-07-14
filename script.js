// ── THEME TOGGLE ──────────────────────────────────────────────
(function () {
  const btn = document.getElementById('theme-toggle-btn');
  const icon = document.getElementById('theme-icon');
  const label = document.getElementById('theme-label');

  function applyTheme(dark) {
    document.body.classList.toggle('dark', dark);
    icon.textContent = dark ? '☀️' : '🌙';
    label.textContent = dark ? 'Light' : 'Dark';
    localStorage.setItem('cmTheme', dark ? 'dark' : 'light');
  }

  // Restore saved preference
  const saved = localStorage.getItem('cmTheme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved ? saved === 'dark' : prefersDark);

  btn.addEventListener('click', function () {
    applyTheme(!document.body.classList.contains('dark'));
  });
})();

// ── AI AGENT SPOTLIGHT (shows once per visitor) ───────────────
(function () {
  const STORAGE_KEY = 'cmSpotlightSeen';
  if (localStorage.getItem(STORAGE_KEY)) return;

  const overlay = document.getElementById('agent-spotlight-overlay');
  const ring    = document.getElementById('chat-bubble-ring');
  const dismiss = document.getElementById('dismiss-spotlight');

  // Show after 1.8 s so the page loads first
  setTimeout(function () {
    overlay.classList.add('active');
    ring.classList.add('active');
  }, 1800);

  function hide() {
    overlay.classList.remove('active');
    ring.classList.remove('active');
    localStorage.setItem(STORAGE_KEY, '1');
  }

  dismiss.addEventListener('click', hide);
  // Also dismiss when clicking the dark backdrop (outside the tip)
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) hide();
  });
})();

<script>
  window.wxOConfiguration = {
    orchestrationID: "064bb41ccdea4231b0369e01c958805d_da192c72-75cf-4dc3-8fd7-7a2552bc61be",
    hostURL: "https://eu-gb.watson-orchestrate.cloud.ibm.com",
    rootElementID: "root",
    deploymentPlatform: "ibmcloud",
    crn: "crn:v1:bluemix:public:watsonx-orchestrate:eu-gb:a/064bb41ccdea4231b0369e01c958805d:da192c72-75cf-4dc3-8fd7-7a2552bc61be::",
    chatOptions: {
        agentId: "0c419097-8a98-4fef-b09a-a38c317f0d02", 
        agentEnvironmentId: "e3466c66-f037-4743-98d1-aa309ea8c3b6",
    }
  };
  setTimeout(function () {
    const script = document.createElement('script');
    script.src = `${window.wxOConfiguration.hostURL}/wxochat/wxoLoader.js?embed=true`;
    script.addEventListener('load', function () {
        wxoLoader.init();
    });
    document.head.appendChild(script);
  }, 0);                     
</script>

setTimeout(function () {
  var script = document.createElement('script');
  script.src = window.wxOConfiguration.hostURL + '/wxochat/wxoLoader.js?embed=true';
  script.addEventListener('load', function () {
    wxoLoader.init();
  });
  document.head.appendChild(script);
}, 0);

// ── OPEN CHAT BUTTON ──────────────────────────────────────────
document.getElementById('open-chat-btn').addEventListener('click', function () {
  var status = document.getElementById('agent-status');
  status.classList.add('visible');
  // Try to trigger the widget's own open method if available
  if (window.wxoLoader && typeof wxoLoader.open === 'function') {
    wxoLoader.open();
  }
});