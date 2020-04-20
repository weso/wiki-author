import React,{useState,useContext,useEffect} from 'react';
import {AppContext} from '../../../../../../App';
import {ShapeContext} from '../ShapeComponent';
import yasheUtils from '../../../../../../utils/yasheUtils';
import Properties from '../../../../../../conf/properties';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
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



        const getEntities = async function(id){
                let language = (navigator.language || navigator.userLanguage).split("-")[0];
                var API_ENDPOINT = 'https://www.wikidata.org/w/';
                var QUERY_ID = {
                        action:'wbgetentities',
                        ids:id,
                        format: 'json', 
                }
                $.get({
                        url: API_ENDPOINT + 'api.php?' + $.param(QUERY_ID),
                        dataType: 'jsonp',
                }).done((data)=>{
                        let aux = [];
                        aux.push(data.entities[id].labels[language].value)
                        setName([])
                        setName(aux)
                })
}       

    const [name,setName] = useState([triple.type.value]);
    const [options,setOptions] = useState([]);
    const [isLoading,setLoading] = useState(false);

    const handleNameChange = function(selected){
        
        if(selected.length>0){
                triple.type.setValue(selected[0].id);
                context.emit();
        }
        
    }

    const MenuItem = ({item}) => (
        <div className='hintItem'>
            <span>{item.id}</span><br/>
            <span>{item.label}</span><br/>
            <span><b>{item.descr}</b></span>
        </div>
    );


    return (
        <div className="xs-tripleHeader" style={styles.header}>

                {
                        
                }
                    
                <AsyncTypeahead
                        id="InputEntityByText"
                        isLoading={isLoading}
                        labelKey="label"
                        maxResults = {10}
                        minLength={1}
                        renderMenuItemChildren={(option, props) => (
                                <MenuItem key={option.id} item={option}/>
                        )}
                        onSearch={(query) => {
                        setLoading(true);
                        QUERY.search = query;
                        QUERY.type = 'property';
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
                                setLoading(false);
                        })
                        
                        }}
                        onChange={(selected) => {
                                handleNameChange(selected);
                        }}
                        defaultSelected={name}
                        options={options}
                />
    


            <button className="tripleBtns buildConstraint buildBtn buildTripleBtn mdc-icon-button material-icons"
                    style={styles.constraint}
                    onClick={customizeContraints}
                    disabled={disabled} 
                    title="Customize Constraint">
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

