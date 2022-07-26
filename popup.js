let changeColor = document.getElementById("changeColor");
// let cookie = document.getElementById("cookieBtn");

$('nav nav-tabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
    });
  });
  
  // The body of this function will be executed as a content script inside the
  // current page
  function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
      document.body.style.backgroundColor = color;
      console.log("color is changed now");
    });
  }

function autoLogin() {
  // clear the temporarily saved LinkedIn profile
  chrome.storage.sync.remove(["selectedSkills", "selectedExperience", "selectedFullName"], function(){} );  

  chrome.storage.sync.get(["authToken"], function(items) {
    if (typeof items.authToken !== 'undefined') {
      location.replace("account.html");
    }
  });  
}

autoLogin();