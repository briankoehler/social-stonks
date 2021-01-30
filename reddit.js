
/***
 * Retrieve reddit post data from posts relating to search term
 * Checks "best" posts first, then searches term.
 */
const getRedditPosts = async (term) => {

	let posts = [];

	/* Get best posts from Reddit  */
	const bestRes = await fetch('https://old.reddit.com/best.json');
	const bestData = await bestRes.json();
	const bestPosts = bestData['data']['children'];

	/* Get search posts from Reddit */
	const searchRes = await fetch(`https://old.reddit.com/search.json?sort=relevance&q=${term}`);
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
				commentCount: allPosts[post]['data']['num_comments'],
				upvotes: allPosts[post]['data']['ups'],
				upvoteRatio: allPosts[post]['data']['upvote_ratio'],
				subreddit: allPosts[post]['data']['subreddit'],
				url: `https://reddit.com${allPosts[post]['data']['permalink']}`,
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


/***
 * Retrieve subreddit data given name found in URL
 */
const getSubredditInfo = async (subName) => {
	/* Get all subreddit data */
	const res = await fetch(`https://old.reddit.com/r/${subName}/about.json`);
	const data = await res.json();

	/* Return relevant data as object */
	return {
		id: data['data']['id'],
		displayName: data['data']['display_name'],
		description: data['data']['public_description'],
		icon: data['data']['icon_img'],
		subscribers: data['data']['subscribers'],
		url: `https://reddit.com${data['data']['url']}`,
		matureContent: data['data']['over18'],
		primaryColor: data['data']['primary_color']
	}
}
