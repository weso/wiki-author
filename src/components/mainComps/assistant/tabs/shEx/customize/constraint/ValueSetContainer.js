import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../../App';
import shexUtils from '../../../../../../../utils/shexUtils';
import ValueSetComp from './ValueSetComp';
import Properties from '../../../../../../../conf/properties';

function ValueSetContainer (props) {
    const {triple,valueSet} = props;
    const context = useContext(AppContext);
    const [values,setValues]=useState(valueSet);
    const styles = Properties.getInstance().getConstraintStyle();

    const deleteValue= function(id){
        const newValues = values.filter(v => v.id != id);
        setValues(newValues);
        triple.constraint.setValues(newValues);
        context.emit(); 
    }

    const addValue = function(){
        const value = shexUtils.addValueSetValue(valueSet);
        setValues([...values,value]);
        triple.constraint.addValue(value);
        context.emit(); 
    }

    return (<div className='xs-customConstraint'>
                <label style={styles.label}>ValueSet</label>
                <div className="valueSetsCont">
                    {values.map(v =>{                                        
                            return (<ValueSetComp 
                                    key={v.id}
                                    valueSetValue={v}
                                    deleteValue={deleteValue} 
                                    />)
                    })}
                    
                    <button className="addFacet" style={styles.add}  title="Add Value" onClick={addValue}>+ Value</button>      
                </div>
            </div>);                          
}



export default ValueSetContainer;
