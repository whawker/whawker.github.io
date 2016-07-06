
export const fetchPostContent = (post) => {
    return function (dispatch) {
        let { href, slug } = post;

        if (post.bodyContent || post.isFetching) return;

        dispatch({
            type: 'POST_CONTENT_FETCHING',
            slug
        });

        fetch(href)
            .then(response => {
                if (response.ok) {
                    return response.text()
                }
            })
            .then(bodyContent => {
                dispatch({
                    type: 'POST_CONTENT_FETCH_SUCCESS',
                    slug,
                    bodyContent
                })
            });
    }
};