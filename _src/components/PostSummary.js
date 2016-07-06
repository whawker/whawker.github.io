import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import DateBadge from './DateBadge';

const PostSummary = ({ title, year, month, day, slug, summary, preload }) => (
    <Row componentClass="article" className="summary" onMouseOver={preload}>
        <Col sm={1} xs={3}>
            <DateBadge year={year} month={month} day={day} />
        </Col>
        <Col sm={11} xs={9}>
            <h3>
                <Link
                    to={`post/${year}/${month}/${day}/${slug}`}
                    className="brackets"
                    onTouchStart={preload}>{title}</Link>
            </h3>
            <p>{summary}</p>
        </Col>
    </Row>
);

PostSummary.propTypes = {
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    preload: PropTypes.func
};

export default PostSummary;