import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../../App';
import NumericInput from 'react-numeric-input';
import Properties from '../../../../../../../conf/properties';

function FacetComp (props) {
    const {facet,deleteFacet} = props;
    const context = useContext(AppContext);
    const [type,setType]=useState(facet.type);
    const [value,setValue]=useState(facet.value);
    const styles = Properties.getInstance().getFacetStyle();
   
    const handleTypeChange = function(type){
        facet.setType(type);
        setType(type);
        context.emit();
    }

    const handleValueChange = function(value){
        facet.setValue(value);
        setValue(value);
        context.emit();
    }

    return ( <div className="facetInputs">
                <select className="customSelector"
                        value={type}
                        onChange={(e)=>handleTypeChange(e.target.value)}>
                        <option value="length">length</option>
                        <option value="minlength">minlength</option>
                        <option value="maxlength">maxlength</option>
                        <option value="totaldigits">totaldigits</option>
                        <option value="fractiondigits">fractiondigits</option>
                        <option value="mininclusive">mininclusive</option>
                        <option value="minexclusive">minexclusive</option>
                        <option value="maxinclusive">maxinclusive</option>
                        <option value="maxexclusive">maxexclusive</option>
                </select>
                <NumericInput   
                    className="form-control" 
                    min={0}
                    value={value}
                    onChange={(e)=>handleValueChange(e)}/>

                <button className="tripleBtns deleteFacetBtn mdc-icon-button material-icons" 
                    style={styles.delete}
                    onClick={()=>deleteFacet(facet.id)} 
                    title="Delete Facet">
                    delete
                </button>
                
        </div>);                          
}



export default FacetComp;
