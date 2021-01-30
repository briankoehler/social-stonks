// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");
let searchey  = document.getElementById("searchTerm");


chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let rawu = tabs[0].url; //raw url
    let urll = new URL(rawu);
    let q =  urll.searchParams.get("q");
    console.log(q);
    console.log(urll.search);
    console.log(urll.pathname);
    console.log(urll.host)
    if(urll.host === "www.google.com" && urll.pathname==="/search"){
        searchey.innerHTML = q;
    }
    // use `url` here inside the callback because it's asynchronous!
});


chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
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
    });
  }