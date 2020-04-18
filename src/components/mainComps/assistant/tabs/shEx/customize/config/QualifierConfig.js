import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../../App';
import Properties from '../../../../../../../conf/properties';

function QualifierConfig (props) {

    const context = useContext(AppContext);
    const styles = Properties.getInstance().getShapeStyle();
    const {shape} = props;
    const [qualifier,setQualifier] = useState(shape.qualifier.getTypeName())

    const handleQualifierChange = function(e){
        let newType = e.target.value;
        shape.setQualifier(newType);
        context.emit();
        setQualifier(newType);
    }

    return (
         <div className="xs-gridBox">
            <label className="customLabel" style={styles.label}>Qualifier </label>
            <select className="customSelector" value={qualifier} onChange={handleQualifierChange}>
                <option value="">None</option>
                <option value="iri">Iri</option>
                <option value="literal">Literal</option>
                <option value="nonliteral">NonLiteral</option>
                <option value="bnode">Bnode</option>
            </select>
        </div>
    );
                                   
    
}

export default QualifierConfig;

