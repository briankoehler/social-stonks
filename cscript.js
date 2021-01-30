// const card = document.createElement('div');
const main = document.querySelector('body');
const thing = document.getElementById('rhs');
const base = document.createElement('div');
base.setAttribute("class", "baseContainer");

dacard = createBlock("Titleee","I am a popular Social Media Post! look at me!", "54", "", "");
dacard2 = createBlock("Titleeeee","I am another popular Social Media Post! look at me!", "45", "", "");
dacard3 = createBlock("Titleeeee","I am another popular Social Media Post! look at me!", "45", "", "");

base.appendChild(dacard);
base.appendChild(dacard2);
base.appendChild(dacard3);

thing.insertBefore(base, thing.childNodes[0]);

function createBlock(_title, _deets, _popmet, _Author, _date){
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
