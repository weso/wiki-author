import React,{useState,useContext,useEffect} from 'react';
import {AppContext} from '../../../../../../../App';
import { Collapse } from 'reactstrap';
import QNameValue from './valueSetValues/QNameValue';
import InputValue from './valueSetValues/InputValue';
import NumberValue from './valueSetValues/NumberValue';
import BooleanValue from './valueSetValues/BooleanValue';
import Properties from '../../../../../../../conf/properties';

function ValueSetComp (props) {
    
    const {valueSetValue,deleteValue} = props;
    const context = useContext(AppContext);
    const styles = Properties.getInstance().getConstraintStyle();
    const iriStr = '<...>';
    const [type,setType]=useState(valueSetValue.type.getTypeName());
    const [isIriRef,setIriRef]=useState(true);
    const [isQName,setQName]=useState(false);
    const [isString,setString]=useState(false);
    const [isNumber,setNumber]=useState(false);
    const [isBoolean,setBoolean]=useState(false);

    const handleTypeChange = function(e){
        let newType = e.target.value;
        setType(newType);
        valueSetValue.setType(newType);
        context.emit();
        checkCollapses();
    }

    const checkCollapses = function(){
        setIriRef(false);
        setQName(false);
        setString(false);
        setNumber(false);
        setBoolean(false);
        

        if(type=='iriRef'){
            setIriRef(true);
        }

        if(type=='prefixedIri'){
            setQName(true);
        }

        if(type=='stringLiteral'){
            setString(true);
        }

        if(type=='numberLiteral'){
            setNumber(true);
        }

        if(type=='booleanLiteral'){
            setBoolean(true);
        }
    }


    useEffect(() => {
        checkCollapses();
    });
    


    return (  <div className="valueSets">
                <select className="customSelector"
                        value={type}
                        onChange={handleTypeChange}>
                    <option value="iriRef">{iriStr}</option>
                    <option value="prefixedIri">QName</option>
                    <option value="stringLiteral">String</option>
                    <option value="numberLiteral">Number</option>
                    <option value="booleanLiteral">Boolean</option>
                </select>

                <div>
                    <InputValue type={valueSetValue.type} isOpen={isIriRef}/>

                    <QNameValue type={valueSetValue.type} isOpen={isQName}/>

                    <InputValue type={valueSetValue.type} isOpen={isString}/>

                    <NumberValue type={valueSetValue.type} isOpen={isNumber}/>

                    <BooleanValue type={valueSetValue.type} isOpen={isBoolean}/>
                </div>
                
                <button className="tripleBtns deleteValueSetBtn mdc-icon-button material-icons" 
                    style={styles.delete}
                    onClick={()=>deleteValue(valueSetValue.id)}
                    title="Delete Value">
                    delete
                </button>
            </div> );                          
}



export default ValueSetComp;
