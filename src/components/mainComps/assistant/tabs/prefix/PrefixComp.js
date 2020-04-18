import React,{useContext,useState,useEffect} from 'react';
import {AppContext} from '../../../../../App';
import Properties from '../../../../../conf/properties';

function PrefixComp (props) {

        const context = useContext(AppContext);
        const {prefix} = props;
        const styles = Properties.getInstance().getPrefixStyle();
        const [name,setName] = useState(prefix.prefixName);
        const [value,setValue] = useState(prefix.prefixValue);
        const open = '<';
        const close = '>';
  
        const handleAlias  = function(e,prefix){
                prefix.prefixName = e.target.value;
                setName(e.target.value);
                context.emitPref();
        }

        const handleIri  = function(e,prefix){
                prefix.prefixValue = e.target.value;
                setValue(e.target.value);
                context.emitPref();
        }
      
        return (
                <div className='xs-prefixHeader' style={styles.header}>            
                    <input  type="text" 
                            className="prefixName prefixInput"
                            placeholder="eg: schema"
                            value={name}
                            onChange={(e)=>handleAlias(e,prefix)}
                            title="Alias"/>
                    <label  className="prefixLabel" style={styles.label}>:</label>
                    <label  className="prefixLabel" style={styles.label}>{open}</label>
                    <input  type="text" 
                            className="prefixInput"
                            value={value}
                            placeholder="eg: http://schema.org/"
                            onChange={(e)=>handleIri(e,prefix)}
                            title="IRI"/>
                    <label  className="prefixLabel" style={styles.label}>{close}</label>
                    <button className="deletePrefix mdc-icon-button material-icons" 
                            style={styles.delete}
                            onClick={()=>context.deletePrefix(prefix.id)}
                            title="Delete Prefix">
                            delete
                    </button>                              
                </div>)
     
}

export default PrefixComp;
