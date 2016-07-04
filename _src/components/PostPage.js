import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { getPost } from '../redux/reducers';
import { fetchPostContent } from '../redux/actions';
import '../../_styles/syntax-highlighting.css';

class PostPage extends Component {

    componentDidMount () {
        let { post, fetchPostContent } = this.props;
        fetchPostContent(post);
    }

    render () {
        let { post } = this.props;
        return (
            <Row>
                <Col md={12} sm={12}>
                    <h1>{post.title}</h1>
                    <article dangerouslySetInnerHTML={{__html: post.bodyContent}}></article>
                </Col>
            </Row>
        );
    }
}

PostPage.propTypes = {
    post: PropTypes.object.isRequired
};

const mapStateToProps = (state, { params: { slug } }) => ({
    post: getPost(state, slug)
});

export default connect(
    mapStateToProps,
    { fetchPostContent }
)(PostPage);