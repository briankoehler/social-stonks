
/***
 * Retrieve reddit post data from posts relating to search term.
 * Checks "best" posts first, then searches term.
 */
const getRedditPosts = async (term) => {
	let posts = [];

	/* Get best posts from Reddit  */
	const bestRes = await fetch('https://old.reddit.com/best.json');
	const bestData = await bestRes.json();
	const bestPosts = bestData['data']['children'];

	/* Get search posts from Reddit */
	const searchRes = await fetch('https://old.reddit.com/search.json?sort=relevance&q=' + term);
	const searchData = await searchRes.json();
	const searchPosts = searchData['data']['children']

	/* Concatentate all posts */
	const allPosts = bestPosts.concat(searchPosts);

	/* Getting posts related to search term */
	for (let post in allPosts) {

		// if (terms.some(substring => posts[post]['data']['title'].toLowerCase().includes(substring))) {
		if (allPosts[post]['data']['title'].toLowerCase().includes(term)) {

			/* Push object with relevant post data */
			let postData = {
				title: allPosts[post]['data']['title'],
				author: allPosts[post]['data']['author'],
				content: allPosts[post]['data']['selftext'],
				upvotes: allPosts[post]['data']['ups'],
				upvoteRatio: allPosts[post]['data']['upvote_ratio'],
				url: 'https://reddit.com' + allPosts[post]['data']['permalink'],
				utc: allPosts[post]['data']['created_utc'],
				thumbnail: allPosts[post]['data']['thumbnail']
			}
			posts.push(postData);

			/* Stopping if 5 posts found */
			if (posts.length == 5) {
				return posts;
			}
		}
	}
	return posts;
}

console.log("here");
console.log(getRedditPosts("chungus").then);

