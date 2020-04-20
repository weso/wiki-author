import React,{useState,useContext,useEffect} from 'react';
import { Collapse } from 'reactstrap';
import {AppContext} from '../../../../../../App';
import Properties from '../../../../../../conf/properties';

const primitives = ['String','Integer','Date','Boolean'];
const iriStr ='<...>';

function ConstraintComp (props) {

    const context = useContext(AppContext);
    const {triple} = props;
    const styles = Properties.getInstance().getConstraintStyle();
   

    return (
                <div className="xs-gridBox" style={styles.body}>
                    <label className='gridLabel' style={styles.label}>Constraint</label>
                    <input  type="text" 
                    className="name"
                    placeholder="eg: name"
                    title="Constraint Value"/>
                                               
                </div>
  
    );
                                   
    
}


export default ConstraintComp;

