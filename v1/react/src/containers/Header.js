/**
 * Created by Trung on 1/7/2017.
 */
import React, { Component } from 'react';
import { Row, Col, Nav, NavItem } from 'reactstrap';

class Header extends Component {
    render() {
        return (
            <Row id="cv_header">
                <Col xs="12">
                    <Nav className="float-sm-right">
                        <NavItem><span>Phone:</span>{this.props.phone}</NavItem>
                        <NavItem><span>Email:</span>{this.props.email}</NavItem>
                    </Nav>
                </Col>
            </Row>
        );
    }
}

export default Header;
