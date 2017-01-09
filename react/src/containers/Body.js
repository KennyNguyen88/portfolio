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
                            <h1 className="display-4 text-uppercase text-xs-center">CHU HAI LONG</h1>
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
                                    <p className="padleft35">I'm a software developer working at Phu My Industrial Zone, my current position is developer and maintenance Quality Controll system of Posco SS-Vina Co.,ltd.
                                        I am also care about web developer, you can see a my website project as <a href="http://vungchuatravel.com">vungchuatravel.com</a>. This project base on HTML5, CSS3, bootstrap, Jquery and Laravel Php framework. </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" className="summary">
                                    <div className="title"><span className="square">&nbsp;</span>Experiences</div>
                                    <Table striped>
                                        <tbody>
                                            <tr>
                                                <th scope="row">2012 - 2013</th>
                                                <td>Nha Vung Tau Co.,ltd.<br/><span className="font-italic job">IT Manager</span></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">2014 - Present</th>
                                                <td>Posco ICT Viet Nam Co.,ltd.<br/><span className="font-italic job">Software Engineer</span></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Freelancer</th>
                                                <td>Vung Chua Travel Co.,ltd.<br/><span className="font-italic job">Vung Chua Travel Website vungchuatravel.com</span></td>
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
                                    <p className="content">Vung Tau City<br/>Viet Nam</p>
                                </li>
                                <li>
                                    <p className="title">Contact</p>
                                    <p className="content"><span>Phone</span> +84 984 462 007</p>
                                </li>
                                <li>
                                    <p className="title">Link</p>
                                    <p className="content">Email<br/> chuhailong89@gmail.com</p>
                                    <p className="content">Website<br/> www.pnpteam.net</p>
                                    <p className="content">Facebook<br/> fb.com/ChuHaiLong</p>
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
                                                        <td>Higher Diploma in Software Engineering<br/><span>HaNoi Aptech Computer Education</span></td>
                                                        <td>2008 - 2012</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
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