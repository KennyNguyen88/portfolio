/**
 * Created by Trung on 1/7/2017.
 */
import React, { Component } from 'react';
import Skill from '../components/Skill';
import {Row, Col  } from 'reactstrap';

class Skillboard extends Component {
    render() {
        return (
            <Row>
                <Col xs="12" className="text-xs-center"><p className="sub-title">{this.props.boardTitle}</p></Col>
                <Col xs="12">
                    {this.props.boardSkills.map(function(item, id){
                        return (<Skill skillTitle={item.title} skillScore={item.score} key={id}></Skill>)
                    })}

                    {/*<Skill skillTitle="ADOBE ILLUSTRATOR" skillScore="3"></Skill>*/}
                    {/*<Skill skillTitle="ADOBE PHOTOSHOP" skillScore="2"></Skill>*/}
                    {/*<Skill skillTitle="ADOBE AFTER EFFECT" skillScore="2"></Skill>*/}
                </Col>
            </Row>

        );
    }
}

export default Skillboard;