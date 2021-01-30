// const card = document.createElement('div');
const main = document.querySelector('body');
const thing = document.getElementById('rhs'); //can also do rhs
const base = document.createElement('div');
base.setAttribute("class", "baseContainer");

const mainTitle = document.createElement('h2');
mainTitle.textContent = "Trending Now";

dacard = createBlock("Titleee","I am a popular Social Media Post! look at me!", "54", "", "");
dacard2 = createBlock("Titleeeee","I am another popular Social Media Post! look at me!", "45", "", "");
dacard3 = createBlock("Titleeeee","I am another popular Social Media Post! look at me!", "45", "", "");
twittersec = createSectionHead("twitter", "", "");
line = document.createElement('div');
line.setAttribute("class", "line");

var stack = [
    mainTitle,
    line,
    twittersec,
    dacard,
    dacard2,
    dacard3
]

stack.forEach((thing)=>{base.appendChild(thing);})



thing.insertBefore(base, thing.childNodes[0]);

function createSectionHead(_title, _color, _logo){
    /// Create elements
    const card = document.createElement('div');
    const logo = document.createElement('picture');
    const title = document.createElement('h2');

    /// Set styles / Attributes
    card.setAttribute("class", "sectionHead");

    /// Fill in body / Content
    title.textContent = _title;

    /// Build Card
    card.appendChild(logo);
    card.appendChild(title);
    return card;
}

function createBlock(_title, _deets, _popmet, _Author, _date, _url){
    /// Create elements
    const card = document.createElement('div');
    const logo = document.createElement('picture');
    const content = document.createElement('div');
    const title = document.createElement('h2');
    const deets = document.createElement('p');
    const popmet = document.createElement('h2');
    
    /// Set styles / Attributes
    card.setAttribute("class", "carddd");

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
