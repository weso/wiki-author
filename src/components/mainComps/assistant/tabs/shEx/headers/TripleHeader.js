import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../App';
import {ShapeContext} from '../ShapeComponent';
import yasheUtils from '../../../../../../utils/yasheUtils';
import Properties from '../../../../../../conf/properties';
import {Typeahead} from 'react-bootstrap-typeahead';
import '../../../../../../css/shexComponents/headers/TripleHeader.css';


const primitives = ['String','Integer','Date','Boolean','Custom'];


function TripleHeader (props) {

    const context = useContext(AppContext);
    const shapeContext = useContext(ShapeContext);
    const styles = Properties.getInstance().getTripleStyle();
    const disabled = shapeContext.disabled;
    const top100Films =[{id:'1',label:'Human',descr:'asdas'},{id:'2',label:'Human',descr:'asdas'}]

    const { triple,
            deleteTriple,
            customizeRef,
            customizeContraints,
            customizeCardinality,
            collapseToggle,
            colapseBtn
            } = props;

    const [name,setName] = useState(triple.type.value);

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


   
    return (
        <div className="xs-tripleHeader" style={styles.header}>
                    
           <Typeahead
           id='properties'
                className='autoInput'
                filterBy={['id','label','descr']}
                labelKey="label"
                options={top100Films}
                maxResults = {10}
                minLength={1}
                placeholder="E.. or label"
                renderMenuItemChildren={(option, props) => (
                    <MenuItem key={option.id} item={option}/>
                )}
                useCache={false}
                onChange={(selected) => {
                   
                }}
            />


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

