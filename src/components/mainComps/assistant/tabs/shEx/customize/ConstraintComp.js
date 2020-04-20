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
   

    const [name,setName] = useState(triple.constraint.value || '');


    const handleNameChange = function(e){
        let newName = e.target.value;
        triple.constraint.setValue(newName);
        context.emit();
        setName(newName);
    }

    const checkRefs = function(name){
        if(name =='none'){
            if(triple.shapeRef.shape != null){
                setName('');
                triple.setConstraint('blankType');
            }
        }
    }

    checkRefs(name);

    return (
                <div className="xs-gridBox" style={styles.body}>
                    <label className='gridLabel' style={styles.label}>Constraint</label>
                    <input  type="text" 
                    className="name"
                    placeholder="eg: name"
                    value={name}
                    onChange={handleNameChange}
                    title="Constraint Value"/>
                                               
                </div>
  
    );
                                   
    
}


export default ConstraintComp;

