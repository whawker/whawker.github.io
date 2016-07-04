import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import DateBadge from './DateBadge';

const PostSummary = ({ title, year, month, day, slug, summary }) => (
	<Row componentClass="article" className="summary">
        <Col sm={1} xs={2}>
		    <DateBadge year={year} month={month} day={day} />
        </Col>
        <Col sm={11} xs={10}>
		    <h3><Link to={`post/${year}/${month}/${day}/${slug}`}>{title}</Link></h3>
            <p>{summary}</p>
	    </Col>
	</Row>
);

export default PostSummary;