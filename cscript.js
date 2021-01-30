
const main = document.querySelector('body');
const thing = document.getElementById('rhs'); //can also do rhs
const base = document.createElement('div');
base.setAttribute("class", "baseContainer");
thing.insertBefore(base, thing.childNodes[0]);

const mainTitle = document.createElement('h2');
mainTitle.textContent = "Trending Now";

// twittersec =  createSectionHead("twitter", "", "");
dacardt0 = createBlock("Titleee","I am a popular Social Media Post! look at me!", "54", "", "");
dacardt1 = createBlock("Titleeeee","I am another popular Social Media Post! look at me!", "45", "", "");
dacardt2 = createBlock("Titleeeee","I am another popular Social Media Post! look at me!", "45", "", "");

// redditsec = createSectionHead("reddit", "", "");
dacardr = createBlock("Titleeeee","I am another popular Social Media Post! look at me!", "45", "", "", "", 0);
dacardr2 = createBlock("Titleeeee","I am another popular Social Media Post! look at me!", "45", "", "", "", 0);

var stack = [
    mainTitle,
    line(),
    createSectionHead("twitter", "", "images/twit.svg"),
    dacardt0,
    dacardt1,
    dacardt2,
    line(),
    createSectionHead("reddit", "", "images/redit.svg"),
    dacardr,
    dacardr2
]
stack.forEach((thing)=>{base.appendChild(thing);})


function line(){
    l = document.createElement('div');
    l.setAttribute("class", "line");
    return l;
}

function createSectionHead(_title, _color, _logo){
    /// Create elements
    const card = document.createElement('div');
    const logo = document.createElement('img');
    const title = document.createElement('h2');

    /// Set styles / Attributes
    card.setAttribute("class", "sectionHead");

    /// Fill in body / Content
    title.textContent = _title;
    title.setAttribute("class", "sectionTitle");
    var imgURL = chrome.runtime.getURL(_logo);
    logo.setAttribute("class", "sectionLogo");
    logo.setAttribute("src", imgURL);

    /// Build Card
    card.appendChild(logo);
    card.appendChild(title);

    return card;
}

function createBlock(_title, _deets, _popmet, _Author, _date, _url, _plat){
    /// Create elements
    const card = document.createElement('div');
    const logo = document.createElement('img');
    const content = document.createElement('div');
    const title = document.createElement('h2');
    const deets = document.createElement('p');
    const popmet = document.createElement('h2');
    
    /// Set styles / Attributes
    card.setAttribute("class", "carddd");
    card.style.borderColor = (_plat===0)? "rgba(255, 30, 0, 0.5)" : " rgba(0, 132, 255, 0.5)";

    /// Fill in body / Content
    title.textContent = _title;
    deets.textContent = _deets;
    popmet.textContent = _popmet;

    /// Build Card
    content.appendChild(title);
    content.appendChild(deets);

    card.appendChild(logo);
    card.appendChild(content);
    card.appendChild(popmet);

    return card;
}
