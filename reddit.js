
/***
 * Retrieve reddit post data from best post relating to search term
 */
const searchReddit = async (term) => {

	/* Get best posts from Reddit  */
	const res = await fetch('https://old.reddit.com/best.json');
	const data = await res.json();
	const posts = data['data']['children'];

	/* Getting best post related to search term */
	for (let post in posts) {

		// if (terms.some(substring => posts[post]['data']['title'].toLowerCase().includes(substring))) {
		if (posts[post]['data']['title'].toLowerCase().includes(term)) {

			/* Assigning relevant post data to an object to return */
			let postData = {
				title: posts[post]['data']['title'],
				author: posts[post]['data']['author'],
				content: posts[post]['data']['selftext'],
				upvotes: posts[post]['data']['ups'],
				upvoteRatio: posts[post]['data']['upvote_ratio'],
				url: 'https://reddit.com' + posts[post]['data']['permalink'],
				utc: posts[post]['data']['created_utc'],
				thumbnail: posts[post]['data']['thumbnail']
			}

			return postData;
			
		}
	}
}
