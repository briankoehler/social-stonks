// const fetch = require("node-fetch")
// let t = 'wallstreetbets'
async function getTwitter(term) {
    // let return_tweets = [];
    let return_tweets = [];
    // https://whispering-wildwood-21421.herokuapp.com/
    const hold = await fetch('https://whispering-wildwood-21421.herokuapp.com/https://api.twitter.com/2/tweets/search/recent?&query=' + term + '  is:verified lang:en&tweet.fields=public_metrics&user.fields=username,profile_image_url&expansions=author_id', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAHQMMQEAAAAAkZRWsQeU4mrkPe3hmwtNqLbM0HE%3DQS6Rc6PPHJ9zyFFPSut7qLA7Be83THXVkHH5flxm0TKi8yHcjW',
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
            // 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
            // 'Access-Control-Allow-Credentials': true
        }
    });
    console.log(hold);

    const data = await hold.json();

    let queried_tweets = data.data;
    let queried_users = data.includes.users;

    queried_tweets.forEach(tweet => {
        let author;

        queried_users.forEach(person => {
            if (tweet.author_id === person.id) {
                author = person;
            }
        })

        let tweetData = {
            username: author.username,
            profile_pic: author.profile_image_url,
            text: tweet.text,
            retweet_count: tweet.public_metrics.retweet_count,
            reply_count: tweet.public_metrics.reply_count,
            like_count: tweet.public_metrics.like_count,
        }
        return_tweets.push(tweetData)
    })

    console.log(return_tweets);
    console.log("-------------------------");
    console.log(return_tweets[0]);
    return return_tweets;

}
// getTwitter("wallstreetbets").then(() => { }).catch(() => { })
export { getTwitter };
