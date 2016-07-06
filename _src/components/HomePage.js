import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { fetchPostContent } from '../redux/actions';
import PostSummary from './PostSummary';


class HomePage extends Component {

    constructor (props) {
        super(props);

        this.renderPostSummary = this.renderPostSummary.bind(this);
    }

    preloadPostContent (post) {
        this.props.fetchPostContent(post);
    }

    renderPostSummary (post) {
        return (
            <PostSummary key={post.slug} preload={this.preloadPostContent.bind(this, post)} {...post} />
        );
    }

    render () {
        let { posts } = this.props;
        
        return (
            <Row>
                <Col md={12} sm={12}>
                    {posts.map(this.renderPostSummary)}
                </Col>
            </Row>
        );
    }
}

HomePage.propTypes = {
    posts: PropTypes.array.isRequired,
    fetchPostContent: PropTypes.func.isRequired
};

const mapStateToProps = ({ posts }) => {
    return {
        posts
    };
};

export default connect(
    mapStateToProps,
    { fetchPostContent }
)(HomePage);