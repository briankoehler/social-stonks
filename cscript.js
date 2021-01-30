
const main = document.querySelector('body');
const thing = document.getElementById('rhs'); //can also do rhs
const base = document.createElement('div');
base.setAttribute("class", "baseContainer");
thing.insertBefore(base, thing.childNodes[0]);

const mainTitle = document.createElement('h2');
mainTitle.textContent = "Trending Now";

// twittersec =  createSectionHead("twitter", "", "");
dacardt0 = createBlock("user1", "", "r/stonks", "Example post", "stonk stonks stonks stonks", "", "5", "6", "7", 1);
dacardt1 = createBlock("user1", "", "r/stonks", "Example post", "stonk stonks stonks stonks", "", "5", "6", "7", 1);
dacardt2 = createBlock("user1", "", "r/stonks", "Example post", "stonk stonks stonks stonks", "", "5", "6", "7", 1);

// redditsec = createSectionHead("reddit", "", "");
dacardr = createBlock("user1", "", "r/stonks", "Example post", "stonk stonks stonks stonks", "", "5", "6", "7", 0);
dacardr2 = createBlock("user1", "", "r/stonks", "Example post", "stonk stonks stonks stonks", "", "5", "6", "7", 0);

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
    var imgURL = chrome.runtime.getURL(_logo);
    logo.setAttribute("class", "sectionLogo");
    logo.setAttribute("src", imgURL);
    

    /// Build Card
    card.appendChild(logo);
    card.appendChild(title);
    return card;
}

function createBlock(_username, _img, _subreddit, _title, _content, _thumbn, _upvote, _replies, _like, _plat){
    /// Plat 0 = reddit, 1 = twitter
    /// Create elements
    const card = document.createElement('div');
    const cardtop = createBlockHead(_username, _img, _subreddit, _plat); // _username, _img, _subreddit
    const cardbody = createBlockBody(_title, _content, _thumbn); // _title, _content, _thumbn
    const cardfoot = createBlockFoot( _upvote, _replies, _like, _plat); // _upvote, _replies, _like, _plat

    /// Set styles / Attributes
    card.setAttribute("class", "carddd");
    card.style.borderColor = (_plat===0)? "rgba(255, 30, 0, 0.5)" : " rgba(0, 132, 255, 0.5)";

    /// Build Card
    card.appendChild(cardtop);
    card.appendChild(cardbody);
    card.appendChild(cardfoot);

    return card;
}

function createBlockHead(_username, _img, _subreddit, _plat){
    const cardtop = document.createElement('div');
    const subr = document.createElement('div');
    const username = document.createElement('div');
    const img = document.createElement('div');

    username.textContent = _username;
    subr.textContent = _subreddit;

    cardtop.setAttribute("class", "cardTop");

    cardtop.appendChild(img);
    if(_plat === 0){
        cardtop.appendChild(subr);
    }
    cardtop.appendChild(username);

    return cardtop;
}

function createBlockBody(_title, _content, _thumbn){
    const body = document.createElement('div');
    const title = document.createElement('div');
    const content = document.createElement('div');
    // const thumbn = document.createElement('img');

    title.textContent = _title;
    content.textContent  = _content;
    // thumbn

    body.setAttribute("class", "cardBody");

    body.appendChild(title);
    body.appendChild(content);

    return body;
}

function createBlockFoot(_upvote, _replies, _likes, _plat){
    const foot = document.createElement('div');
    const upv = document.createElement('div');
    const replies = document.createElement('div');
    const likes = document.createElement('div');

    const spacer = document.createElement('div');
    const spacerR = document.createElement('div');

    upv.textContent = _upvote;
    replies.textContent = _replies;
    likes.textContent = _likes;

    foot.setAttribute("class", "cardFoot");

    foot.appendChild(upv);
    foot.appendChild(replies);
    foot.appendChild((_plat===0)? spacerR:likes);
    foot.appendChild(spacer);

    return foot;
}