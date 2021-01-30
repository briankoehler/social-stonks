const fetch = require("node-fetch");
let term = 'wallstreetbets'
fetch('https://api.twitter.com/2/tweets/search/recent?&query=' + term + '  is:verified lang:en&tweet.fields=public_metrics&user.fields=username,profile_image_url&expansions=author_id', {
    method: 'GET',
    mode: 'no-cors',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAHQMMQEAAAAAkZRWsQeU4mrkPe3hmwtNqLbM0HE%3DQS6Rc6PPHJ9zyFFPSut7qLA7Be83THXVkHH5flxm0TKi8yHcjW'
    }
}).then(function (response) {
    // The API call was successful!
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}).then(function (data) {
    let return_tweets = [];
    // This is the JSON from our response
    const zip = (a, b) => a.map((k, i) => [k, b[i]]);

    let queried_tweets = data.data;
    let queried_users = data.includes.users;

    // console.log(queried_tweets);
    // console.log("breeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeek");
    // console.log(queried_users);
    // console.log("breeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeek");
    // console.log(queried_users[0])
    // console.log("breeeeeeeeeeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaeeeeeeeeeeeeeeeek");
    // console.log(queried_users[0].name)
    let zipped_tweets = (zip(queried_tweets,queried_users));
    // console.log(zipped_tweets);

    queried_tweets.forEach(tweet => {
        // console.log(tweet);
        // console.log("breeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeek");
        let author;
        
        queried_users.forEach(person =>{
            if( tweet.author_id === person.id){
                author = person;
            }
        })
        
        tweetData = {
            username: author.username,
            profile_pic: author.profile_image_url,
            text: tweet.text,
            retweet_count: tweet.public_metrics.retweet_count,
            reply_count: tweet.public_metrics.reply_count,
            like_count: tweet.public_metrics.like_count,
        }
        return_tweets.push(tweetData);
    });

    return return_tweets;

}).catch(function (err) {
    // There was an error
    console.log('Something went wrong.', err);
});