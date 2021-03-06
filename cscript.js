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

let redditsec = createSectionHead("Reddit", "", 0);

base.appendChild(mainTitle);
base.appendChild(twittersec);


const populateTwit = async() => {
    let tweets = await getTwitter(myParam);
    base.appendChild(line());
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
    base.appendChild(line());
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

populateRed();
populateTwit();



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
    
    var root  = document.getElementById('cscript').getAttribute('images');
    var imgURL = `${root}${(_plat === 0) ? 'redit.svg' : 'twit.svg'}`;
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
    const cardbody = createBlockBody(_title, _content, _thumbn, _plat); // _title, _content, _thumbn
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

function createBlockBody(_title, _content, _thumbn, _plat) {
    const body = document.createElement('div');
    const title = document.createElement('div');
    const content = document.createElement('div');
    const fader = document.createElement('fade');
    // const thumbn = document.createElement('img');

    title.textContent = _title;
    content.textContent = _content;
    // thumbn

    content.setAttribute("class", "body-content");
    fader.setAttribute("class", "fade");

    body.setAttribute("class", "cardBody");
    if (_plat === 0) {
        title.style.fontWeight = "bold";
    }


    body.appendChild(title);
    body.appendChild(content);
    // content.appendChild(fader);

    return body;
}

function createBlockFoot(_upvote, _replies, _likes, _plat) {
    const foot = document.createElement('div');

    const replies = document.createElement('div');
    const upv = document.createElement('div');
    const likes = document.createElement('div');

    const repliesT = document.createElement('div');
    const upvT = document.createElement('div');
    const likesT = document.createElement('div');

    const icon1 = document.createElement('img');
    const icon2 = document.createElement('img');
    const icon3 = document.createElement('img');

    const spacer = document.createElement('div');
    const spacerR = document.createElement('div');

    repliesT.textContent = _replies;
    upvT.textContent = _upvote;
    likesT.textContent = _likes;

  
    
    var root  = document.getElementById('cscript').getAttribute('images');
    if(_plat === 0){
        icon1.setAttribute('src', `${root}reddit_comment.svg`);
        icon2.setAttribute("src", `${root}reddit_upvote.svg`);
    }else{
        icon1.setAttribute("src", `${root}twitter_comment.svg`);
        icon2.setAttribute("src", `${root}twitter_retweet.svg`);
        icon3.setAttribute("src", `${root}twitter_like.svg`);
        likes.appendChild(icon3);
    }


    upv.setAttribute("class", "stats");
    replies.setAttribute("class", "stats");
    likes.setAttribute("class", "stats");

    replies.appendChild(icon1);
    upv.appendChild(icon2);

    replies.appendChild(repliesT);
    upv.appendChild(upvT);
    likes.appendChild(likesT);

    foot.setAttribute("class", "cardFoot");

    foot.appendChild(replies);
    foot.appendChild(upv);
    foot.appendChild((_plat === 0) ? spacerR : likes);
    foot.appendChild(spacer);

    return foot;
}