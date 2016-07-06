import posts from './posts';

const reducers = {
    posts
};

export default reducers;

export const getPost = (state, slug) => {
    return state.posts.find(post => {
        return post.slug === slug;
    })
};