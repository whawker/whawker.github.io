import React, { PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import '../../_styles/main.css';

const DefaultLayout = ({ children }) => (
    <div className="vnext">
        <Grid componentClass="header" fluid>
            <Row>
                <Col componentClass="main" md={9} sm={12}>
                    {children}
                </Col>
                <Col componentClass="aside" md={3} sm={12}>
                    <h2>Will Hawker</h2>
                    <p>Senior Front End Web Developer</p>
                    <ul className="social">
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
            </Row>
        </Grid>
    </div>
);

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired
};

export default DefaultLayout;