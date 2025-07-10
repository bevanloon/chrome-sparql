document.addEventListener('DOMContentLoaded', function() {
    const triggerBtn = document.getElementById('triggerBtn');
    const status = document.getElementById('status');
    
    triggerBtn.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: 'triggerConfetti'}, function(response) {
            });
        });
    });
});
