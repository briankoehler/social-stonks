import { getRedditPosts } from './reddit.js';
import { getTwitter } from './twitter.js';

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('q');

const main = document.querySelector('body');
const thing = document.getElementById('rhs'); //can also do rhs
const base = document.createElement('div');
base.setAttribute("class", "baseContainer");
thing.insertBefore(base, thing.childNodes[0]);

const mainTitle = document.createElement('h2');
mainTitle.setAttribute("class", "main-title")
mainTitle.textContent = "Trending Now";

let twittersec = createSectionHead("Twitter", "", 1);
// dacardt0 = createBlock("user1", "", "r/stonks", "Example post", "stonk stonks stonks stonks", "", "5", "6", "7", 1);
// dacardt1 = createBlock("user1", "", "r/stonks", "Example post", "stonk stonks stonks stonks", "", "5", "6", "7", 1);
// dacardt2 = createBlock("user1", "", "r/stonks", "Example post", "stonk stonks stonks stonks", "", "5", "6", "7", 1);

let redditsec = createSectionHead("Reddit", "", 0);
// dacardr = createBlock("user1", "", "r/stonks", "Example post", "stonk stonks stonks stonks", "", "5", "6", "7", 0);
// dacardr2 = createBlock("user1", "", "r/stonks", "Example post", "stonk stonks stonks stonks", "", "5", "6", "7", 0);

base.appendChild(mainTitle);
base.appendChild(line());
base.appendChild(twittersec);


const populateTwit = async() => {
    let tweets = await getTwitter(myParam);
    base.appendChild(twittersec);
    tweets.forEach((tweet) => {
        base.appendChild(
            createBlock(
                tweet.username,
                tweet.profile_pic,
                "",
                tweet.text,
                "",
                "",
                tweet.retweet_count,
                tweet.reply_count,
                tweet.like_count,
                tweet.url,
                1
            )
        )
    })
}

const populateRed = async() => {
    let posts = await getRedditPosts(myParam);
    // console.log(posts);
    base.appendChild(redditsec);
    posts.forEach((post) => {
        console.log("ppred");
        console.log(post);
        base.appendChild(
            createBlock(
                post.author,
                post.subredditIcon,
                post.subreddit,
                post.title,
                post.content,
                post.thumbnail,
                post.upvotes,
                post.commentCount,
                "",
                post.url,
                0
            )
        )
    })
}

populateTwit();
populateRed();


function line() {
    l = document.createElement('div');
    l.setAttribute("class", "line");
    return l;
}

function createSectionHead(_title, _color, _plat) {
    /// Create elements
    const card = document.createElement('div');
    const logo = document.createElement('img');
    const title = document.createElement('h2');

    /// Set styles / Attributes
    card.setAttribute("class", "sectionHead");

    /// Fill in body / Content
    title.textContent = _title;
    title.setAttribute("class", "sectionTitle");

    var imgURL = document.getElementById('cscript').getAttribute((_plat === 0) ? 'reditlogo' : 'twitlogo');

    logo.setAttribute("class", "sectionLogo");
    logo.setAttribute("src", imgURL);

    /// Build Card
    card.appendChild(logo);
    card.appendChild(title);

    return card;
}

function createBlock(_username, _img, _subreddit, _title, _content, _thumbn, _upvote, _replies, _like, _url, _plat) {
    /// Plat 0 = reddit, 1 = twitter
    /// Create elements
    const card = document.createElement('div');
    const cardtop = createBlockHead(_username, _img, _subreddit, _plat); // _username, _img, _subreddit
    const cardbody = createBlockBody(_title, _content, _thumbn); // _title, _content, _thumbn
    const cardfoot = createBlockFoot(_upvote, _replies, _like, _plat); // _upvote, _replies, _like, _plat

    /// Set styles / Attributes
    card.setAttribute("class", "carddd");
    card.setAttribute("onclick", `location.href = '${_url}'`);
    card.style.borderColor = (_plat === 0) ? "rgba(255, 30, 0, 0.5)" : " rgba(0, 132, 255, 0.5)";

    /// Build Card
    card.appendChild(cardtop);
    card.appendChild(cardbody);
    card.appendChild(cardfoot);

    return card;
}

function createBlockHead(_username, _img, _subreddit, _plat) {
    const cardtop = document.createElement('div');
    const subr = document.createElement('div');
    const username = document.createElement('div');
    const img_container = document.createElement('div');
    const img = document.createElement('img');
    

    username.textContent = _username;
    subr.textContent = _subreddit;

    img.setAttribute('src', `${_img}`)
    img.setAttribute('class', 'header-img')

    img_container.appendChild(img);
    img_container.setAttribute('class', 'img-container')

    cardtop.setAttribute("class", "cardTop");
    username.style.fontWeight = "bold";

    cardtop.appendChild(img_container);
    if (_plat === 0) {
        cardtop.appendChild(subr);
        subr.style.fontWeight = "bold";
        username.style.fontWeight = "normal";
        username.style.color = "gray";
        // cardtop.appendChild(document.createElement('dive')); //Spacer
    }
    cardtop.appendChild(username);

    return cardtop;
}

function createBlockBody(_title, _content, _thumbn) {
    const body = document.createElement('div');
    const title = document.createElement('div');
    const content = document.createElement('div');
    // const thumbn = document.createElement('img');

    title.textContent = _title;
    content.textContent = _content;
    // thumbn

    body.setAttribute("class", "cardBody");

    body.appendChild(title);
    body.appendChild(content);

    return body;
}

function createBlockFoot(_upvote, _replies, _likes, _plat) {
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
    foot.appendChild((_plat === 0) ? spacerR : likes);
    foot.appendChild(spacer);

    return foot;
}