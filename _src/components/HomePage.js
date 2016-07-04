import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import PostSummary from './PostSummary';

class HomePage extends Component {
	render () {
		let { posts } = this.props;
		
        return (
			<Row>
				<Col md={12} sm={12}>
					{posts.map(post => <PostSummary key={post.slug} {...post} />)}
				</Col>
			</Row>
        );
    }
}

HomePage.propTypes = {
	posts: PropTypes.array.isRequired
};

const mapStateToProps = ({ posts }) => {
	return {
		posts
	};
};

export default connect(
	mapStateToProps,
	{}
)(HomePage);