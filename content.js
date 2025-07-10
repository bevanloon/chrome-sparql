function createConfetti() {
  const confettiContainer = document.createElement('div');
  confettiContainer.className = 'sparql-confetti-container';
  document.body.appendChild(confettiContainer);

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'sparql-confetti';
    confetti.textContent = '✨';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.animationDelay = Math.random() * 2 + 's';
    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
    confettiContainer.appendChild(confetti);
  }

  setTimeout(() => {
    confettiContainer.remove();
  }, 7000);
}

function searchForSPARQL() {
  const textContent = document.body.innerText || document.body.textContent || '';
  const sparqlRegex = /SPARQL/gi;
  
  if (sparqlRegex.test(textContent)) {
    createConfetti();
    return true;
  }
  return false;
}

let hasTriggered = false;

function checkPage() {
  if (!hasTriggered && searchForSPARQL()) {
    hasTriggered = true;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', checkPage);
} else {
  checkPage();
}

const observer = new MutationObserver(() => {
  checkPage();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'triggerConfetti') {
    createConfetti();
    sendResponse({success: true});
  }
});
