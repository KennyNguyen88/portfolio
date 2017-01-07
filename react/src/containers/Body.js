/**
 * Created by Trung on 1/7/2017.
 */
import React, { Component } from 'react';
import Skillboard from './Skillboard';
import {Container, Row, Col, Table  } from 'reactstrap';

class Body extends Component {

    render() {
        var SkillBoard = this.props.data;
        return (
            <Row id="cv_body">
                <Container>
                    <Row id="cv_name">
                        <Col xs="12">
                            <h1 className="display-4 text-uppercase text-xs-center">Nguyen Duc Trung</h1>
                            <h1 className="display-4 text-uppercase text-xs-center">Developer</h1>
                        </Col>
                    </Row>
                </Container>
                <Col xs="12">
                    <Row>
                        <Col md="8">
                            <Row>
                                <Col xs="12" className="summary ">
                                    <div className="title"><span className="square">&nbsp;</span> Summary</div>
                                    <p className="padleft35">I am a Developer with over 6 years of professional experiences in senior position developer for enterpirse system. I have many experiences working with Manufacturing Execution System and Oracle ERP. A person with great passion in Designing and Developing Website. </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" className="summary">
                                    <div className="title"><span className="square">&nbsp;</span>Experiences</div>
                                    <Table striped>
                                        <tbody>
                                            <tr>
                                                <th scope="row">2010 - 2014</th>
                                                <td>POSCO ICT VN, Viet Nam<br/><span className="font-italic job">Developer - Manufacturing Execution System</span></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">2015 - Present</th>
                                                <td>POSCO ICT VN, Viet Nam<br/><span className="font-italic job">Assistant Manager - Oracle ERP WIP</span></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">2014 - Present</th>
                                                <td>Website Developer<br/><span className="font-italic job">Freelancer</span></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">2015 - Present</th>
                                                <td>Website Designer<br/><span className="font-italic job">Freelancer</span></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Col>
                        <Col id="info-box" md="4" xs="12">
                            <ul>
                                <li>
                                    <p className="title">Address</p>
                                    <p className="content">Ho Chi Minh City<br/>Viet Nam</p>
                                </li>
                                <li>
                                    <p className="title">Contact</p>
                                    <p className="content"><span>Phone</span> +84 169 8404 430</p>
                                </li>
                                <li>
                                    <p className="title">Link</p>
                                    <p className="content">Email<br/> giatrangrua@gmail.com</p>
                                    <p className="content">Website<br/> www.pnpteam.net</p>
                                    <p className="content">Facebook<br/> fb.com/kenny.nguyen.7739</p>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" className="summary">
                            <div className="title"><span className="square">&nbsp;</span>Skills & Education</div>
                            <Row>
                                <Col md="4" id="skill">
                                    <Skillboard boardTitle={SkillBoard[0].title} boardSkills={SkillBoard[0].skills}/>
                                    <Skillboard boardTitle={SkillBoard[1].title} boardSkills={SkillBoard[1].skills}/>
                                </Col>
                                <Col md="8" id="education">
                                    <Row>
                                        <Col xs="12">
                                            <p className="sub-title">Education</p>
                                            <Table striped>
                                                <tbody>
                                                    <tr>
                                                        <td>University of Natural Sciences, Ho Chi Minh City, Vietnam<br/><span>Bachelor of Information Technology</span></td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <Skillboard boardTitle={SkillBoard[2].title} boardSkills={SkillBoard[2].skills}/>
                                        </Col>
                                        <Col md="6">
                                            <Skillboard boardTitle={SkillBoard[3].title} boardSkills={SkillBoard[3].skills}/>
                                        </Col>
                                    </Row>
                                    <Row className="skill-group">
                                        <Col md="6">
                                            <Skillboard boardTitle={SkillBoard[4].title} boardSkills={SkillBoard[2].skills}/>
                                        </Col>
                                        <Col md="6">
                                            <Skillboard boardTitle={SkillBoard[5].title} boardSkills={SkillBoard[2].skills}/>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>

        );
    }
}

export default Body;