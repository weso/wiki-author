import React,{useState,useContext} from 'react';
import { Collapse } from 'reactstrap';
import {AppContext} from '../../../../../../../App';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import Properties from '../../../../../../../conf/properties';
import Prefix from '../../../../../../../entities/shexEntities/shexUtils/prefix';
import $ from 'jquery';


var API_ENDPOINT = 'https://www.wikidata.org/w/';
var QUERY = {

  action:'wbsearchentities',
  language:(navigator.language || navigator.userLanguage).split("-")[0],
  continue:0,
  limit:10,
  format: 'json',
}

function SingleConstraint (props) {

    const context = useContext(AppContext);
    const {triple} = props;
    const styles = Properties.getInstance().getConstraintStyle();

    let init = '';
    if(triple.constraint){
        init = triple.constraint.value=='none' ?  '' : triple.constraint.value;
    }

    if(init == ''){
       if(triple.shapeRef.shape != null){
            triple.setConstraint('blankType');
        }
    }
   
    const [name,setName] = useState([{id:init,label:triple.cLabel}]);
    const [options,setOptions] = useState([]);
    const [isLoading,setLoading] = useState(false);


    const handleNameChange = function(selected){
        if(selected.length>0){
            triple.setConstraint('prefixedIri');
            triple.constraint.prefix = new Prefix('wd','http://www.wikidata.org/entity/')
            triple.constraint.setValue(selected[0].id);
            triple.cLabel = selected[0].label;
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
            <div className='xs-gridBox'>
                    <label className='gridLabel' style={styles.label}>Entity</label>
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
        </div>
    );
                                   
    
}


export default SingleConstraint;

