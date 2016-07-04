export default function update(state = [], action) {
    switch (action.type) {
        case 'POST_CONTENT_FETCH_SUCCESS':
            return state.map(post => {
                if (post.slug !== action.slug) return post;

                return {
                    ...post,
                    bodyContent: action.bodyContent
                };
            });
        default:
            return state;
    }
}