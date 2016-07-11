import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import '../../_styles/main.css';

const DefaultLayout = ({ children }) => (
    <Grid fluid>
        <Row>
            <Col componentClass="header" sm={12} lgHidden mdHidden>
                <h2 className="title">
                    <Link to="/" className="brackets">Will Hawker</Link>
                    <span>Senior Front End Web Developer</span>
                </h2>
            </Col>
        </Row>
        <Row>
            <Col componentClass="main" md={9} sm={12}>
                {children}
            </Col>
            <Col componentClass="aside" md={3} sm={12}>
                <Col smHidden xsHidden>
                    <h2 className="title"><Link to="/" className="brackets">Will Hawker</Link></h2>
                    <p>Senior Front End Web Developer</p>
                </Col>
                <Col className="social">
                    <ul>
                        <li>
                            <a href="https://github.com/whawker" title="GitHub">
                                <i className="fa fa-github" aria-hidden="true" />
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com/will_hawker" title="Twitter">
                                <i className="fa fa-twitter" aria-hidden="true" />
                            </a>
                        </li>
                        <li>
                            <a href="https://uk.linkedin.com/in/williamhawker" title="LinkedIn">
                                <i className="fa fa-linkedin-square" aria-hidden="true" />
                            </a>
                        </li>
                    </ul>
                </Col>
            </Col>
        </Row>
    </Grid>
);

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired
};

export default DefaultLayout;