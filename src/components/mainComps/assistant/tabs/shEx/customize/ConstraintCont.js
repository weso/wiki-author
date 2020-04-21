import React,{useState,useContext,useEffect} from 'react';
import { Collapse } from 'reactstrap';
import {AppContext} from '../../../../../../App';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import Properties from '../../../../../../conf/properties';
import Prefix from '../../../../../../entities/shexEntities/shexUtils/prefix';
import shexUtils from '../../../../../../utils/shexUtils';
import SingleConstraint from './const/SingleConstraint';
import MultiConstraint from './const/MultiConstraint';
import $ from 'jquery';


function ConstraintCont (props) {

    const context = useContext(AppContext);
    const {triple} = props;
    const styles = Properties.getInstance().getConstraintStyle();
    const [type,setType] = useState(triple.constraint.getTypeName());

    let initValues = [];
    if(type =='valueSet'){
        initValues = triple.constraint.values;
    }
    const [values,setValues] = useState(initValues);
   
    const deleteValue= function(id){
        const newValues = values.filter(v => v.id != id);
        setValues(newValues);
        triple.constraint.setValues(newValues);
        context.emit(); 
    }

    const addValue = function(){
        const value = shexUtils.addValueSetValue(triple.constraint.values);
        setValues([...values,value]);
        triple.constraint.addValue(value);
        context.emit(); 
    }

    const addValueSet = function(){
        const prevValue = triple.constraint.value;
        const prevLabel = triple.cLabel;
        triple.setConstraint('valueSet');
        setType('valueSet');
        let value = shexUtils.addValueSetValue(triple.constraint.values);
        value.type.value = prevValue;
        value.label = prevLabel;
        triple.constraint.addValue(value);
        
        value = shexUtils.addValueSetValue(triple.constraint.values);
        triple.constraint.addValue(value);

        setValues(triple.constraint.values);
        context.emit(); 
    }


    

    if(type =='valueSet'){
        return (
                <div style={styles.body}>

                {
                    values.map(c=>{
                        return   <MultiConstraint valueSet={c} key={c.id} deleteValue={deleteValue}/>
                    })
                }
                        
                    <div className='xs-gridBox'> 
                        <button    className="xs-addConstraintButton"
                                    style={styles.add} 
                                    onClick={addValue} 
                                    title="Add Triple">
                                    + Constraint
                        </button>     
                    </div>                               
                </div>
  
    );
   
    }


     return (
                <div style={styles.body}>
                    <SingleConstraint triple={triple} />
                    <div className='xs-gridBox'> 
                        <button    className="xs-addConstraintButton"
                                    style={styles.add} 
                                    onClick={addValueSet} 
                                    title="Add Triple">
                                    + Constraint
                        </button>
                    </div>         
                                               
                </div>
  
    );
    





    
                                   
    
}


export default ConstraintCont;

