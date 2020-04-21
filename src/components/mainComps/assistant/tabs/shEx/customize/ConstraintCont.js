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

    let initValues = [];
    if(triple.constraint.getTypeName()=='valueSet'){
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
        const value = shexUtils.addValueSetValue(triple.constraint);
        setValues([...values,value]);
        triple.constraint.addValue(value);
        context.emit(); 
    }

    if(triple.constraint.getTypeName()=='valueSet'){
        return (
                <div style={styles.body}>

                {
                    values.map(c=>{
                        return   <MultiConstraint valueSet={c} key={c.id}/>
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
                                    style={styles.addTriple} 
                                    onClick={addValue} 
                                    title="Add Triple">
                                    + Constraint
                        </button>
                    </div>         
                                               
                </div>
  
    );
    





    
                                   
    
}


export default ConstraintCont;

