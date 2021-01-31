
const script = document.createElement('script');
script.setAttribute('type', 'module');
script.setAttribute('twitlogo', chrome.runtime.getURL("images/twit.svg"));
script.setAttribute('reditlogo', chrome.runtime.getURL("images/redit.svg"));
script.setAttribute('id', "cscript");
script.setAttribute('src', chrome.runtime.getURL('cscript.js'));
const head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
head.insertBefore(script, head.lastChild);


