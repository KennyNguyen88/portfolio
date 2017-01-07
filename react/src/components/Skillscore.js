/**
 * Created by Trung on 1/7/2017.
 */
import React, { Component } from 'react';
import {Col  } from 'reactstrap';

class Skillscore extends Component {
    render(){
        return(
            <Col md="6" xs="12" className="text-xs-center">
                {this.props.score >= 1 ? <i className="fa fa-circle" aria-hidden="true"/> : <i className="fa fa-circle-thin" aria-hidden="true"/> }
                {this.props.score >= 2 ? <i className="fa fa-circle" aria-hidden="true"/> : <i className="fa fa-circle-thin" aria-hidden="true"/> }
                {this.props.score >= 3 ? <i className="fa fa-circle" aria-hidden="true"/> : <i className="fa fa-circle-thin" aria-hidden="true"/> }
                {this.props.score >= 4 ? <i className="fa fa-circle" aria-hidden="true"/> : <i className="fa fa-circle-thin" aria-hidden="true"/> }
                {this.props.score >= 5 ? <i className="fa fa-circle" aria-hidden="true"/> : <i className="fa fa-circle-thin" aria-hidden="true"/> }
            </Col>
        )
    }
}

export default Skillscore;
