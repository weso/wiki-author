import React,{useState,useContext,useEffect} from 'react';
import { Collapse } from 'reactstrap';
import {AppContext} from '../../../../../../App';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import Properties from '../../../../../../conf/properties';
import Prefix from '../../../../../../entities/shexEntities/shexUtils/prefix';
import SingleConstraint from './const/SingleConstraint';
import MultiConstraint from './const/MultiConstraint';
import $ from 'jquery';


function ConstraintCont (props) {

    const context = useContext(AppContext);
    const {triple} = props;
    const styles = Properties.getInstance().getConstraintStyle();
   
   const addConstraint = function(){

    }
 
    if(triple.constraint.getTypeName()=='valueSet'){
        return (
                <div style={styles.body}>

                {
                    triple.constraint.values.map(c=>{
                        return   <MultiConstraint valueSet={c} key={c.id}/>
                    })
                }
                    
                   
                 <button    className="xs-addConstraintButton"
                            style={styles.addTriple} 
                            onClick={addConstraint} 
                            title="Add Triple">
                            + Constraint
                </button>     
                                               
                </div>
  
    );
   
    }


     return (
                <div className="xs-gridBox" style={styles.body}>
                    <SingleConstraint triple={triple} />

                 <button    className="xs-addConstraintButton"
                            style={styles.addTriple} 
                            onClick={addConstraint} 
                            title="Add Triple">
                            + Constraint
                </button>     
                                               
                </div>
  
    );
    





    
                                   
    
}


export default ConstraintCont;

