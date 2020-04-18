import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../App';
import {ShapeContext} from '../ShapeComponent';
import yasheUtils from '../../../../../../utils/yasheUtils';
import Properties from '../../../../../../conf/properties';
import '../../../../../../css/shexComponents/headers/TripleHeader.css';

import $ from 'jquery';

const primitives = ['String','Integer','Date','Boolean','Custom'];


var API_ENDPOINT = 'https://www.wikidata.org/w/';
var QUERY = {

  action:'wbsearchentities',
  language:(navigator.language || navigator.userLanguage).split("-")[0],
  continue:0,
  limit:10,
  format: 'json',
}

function TripleHeader (props) {

    const context = useContext(AppContext);
    const shapeContext = useContext(ShapeContext);
    const styles = Properties.getInstance().getTripleStyle();
    const disabled = shapeContext.disabled;

    const { triple,
            deleteTriple,
            customizeRef,
            customizeContraints,
            customizeCardinality,
            collapseToggle,
            colapseBtn
            } = props;

    const [name,setName] = useState(triple.type.value);
    const [options,setOptions] = useState([]);

    const handleNameChange = function(e){
        const name = e.target.value;
        triple.type.setValue(name);
        context.emit();
        setName(name);
    }

 const MenuItem = ({item}) => (
        <div>
            <span>{item.id}</span><br/>
            <span>{item.label}</span><br/>
            <span><b>{item.descr}</b></span>
        </div>
    );


const handleChange = function(e){
        console.log(e.target.value)
        QUERY.search = e.target.value;
   $.get({
        url: API_ENDPOINT + 'api.php?' + $.param(QUERY),
        dataType: 'jsonp',
   }).done((data)=>{
           let hints=[];
           let results = data.search;
           if(results){
                 Object.keys(results).map(d=>{
                        hints.push({id:results[d].id,label:results[d].label,descr:results[d].description})
                })
           }

        setOptions(hints);

   })

}

   
    return (
        <div className="xs-tripleHeader" style={styles.header}>
                    
           <div className="autocomplete">
                <input id="myInput" type="text" name="myCountry" placeholder="Country" onChange={handleChange}/>
                {
                        Object.keys(options).map(o=>{
                                return <MenuItem item={options[o]}/>
                        })
                }
           </div>


            <button className="tripleBtns buildConstraint buildBtn buildTripleBtn mdc-icon-button material-icons"
                    style={styles.constraint}
                    onClick={customizeContraints}
                    disabled={disabled} 
                    title="Customize Constraint">
                    build
            </button>

            <button className="tripleBtns buildInlineRef buildBtn buildTripleBtn mdc-icon-button material-icons"  
                    style={styles.shapeRef}
                    onClick={customizeRef}
                    disabled={disabled} 
                    title="Customize Shape Reference">
                    build
            </button>

           
            <button className="tripleBtns buildCardinality buildBtn buildTripleBtn mdc-icon-button material-icons" 
                    style={styles.cardinality}
                    onClick={customizeCardinality}
                    disabled={disabled} 
                    title="Customize Cardinality">
                    build
            </button>

            <button className="tripleBtns deleteTripleBtn mdc-icon-button material-icons"
                    style={styles.delete}
                    onClick={()=>deleteTriple(triple.id)}
                    disabled={disabled} 
                    title="Delete Triple Constraint">
                    delete
            </button>

            <button className="collapseBtn mdc-icon-button material-icons" 
                    style={styles.collapse}
                    onClick={collapseToggle}
                    disabled={disabled} 
                    title="Customize all">
                    {colapseBtn}
            </button>
        </div>
    );
                                   
    
}


export default TripleHeader;

