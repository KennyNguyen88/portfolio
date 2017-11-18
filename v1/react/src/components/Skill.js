/**
 * Created by Trung on 1/7/2017.
 */
import React, { Component } from 'react';
import Skillscore from './Skillscore';
import {Row, Col  } from 'reactstrap';

class Skill extends Component {
    render() {
        return (
            <Row>
                <Col md="6" xs="12" className="text-xs-center">{this.props.skillTitle}</Col>
                <Skillscore score={this.props.skillScore}></Skillscore>
            </Row>

        );
    }
}

export default Skill;