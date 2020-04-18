import React,{useContext,useState} from 'react';
import { Collapse } from 'reactstrap';
import {AppContext} from '../../../../../App';
import ShapeHeader from  './headers/ShapeHeader';
import TripleComponent from './TripleComponent';
import Triple from '../../../../../entities/shexEntities/triple';
import Properties from '../../../../../conf/properties';

export const ShapeContext = React.createContext();

function ShapeComponent (props) {

    const context = useContext(AppContext);
    const {shape} = props;
    const styles = Properties.getInstance().getShapeStyle();

    const [triples,setTriples] = useState(shape.triples);
    const [isTriplesOpen,setTriplesOpen] = useState(true);
    const [colapseBtn,setColapseBtn] = useState('menu_open');

    let initialDisabled = false;
    if(shape.type.value == '')initialDisabled = true;
    const [disabled,setDisabled] = useState(initialDisabled);


    const addTriple = function(){
        const id = shape.getTriplesCount();
        const triple = new Triple(id);

        setTriples([...triples,triple]);
        
        shape.addTriple(triple);
        context.emit();       
    }

    const deleteTriple = function(tripleId){
        const newTriples = shape.triples.filter( triple => triple.id != tripleId);
        setTriples(newTriples)
        shape.setTriples(newTriples);
        context.emit();
        
    }



    const collapseTriples = function(){
        setTriplesOpen(!isTriplesOpen);
        
        if(colapseBtn=='menu'){
            setColapseBtn('menu_open');
        }else{
            setColapseBtn('menu');
        }
    }

    return (

        <ShapeContext.Provider value={{disabled:disabled,setDisabled:setDisabled}}>
            <div className="shape" style={styles.header}>
                <ShapeHeader shape={shape} 
                            collapseTriples={collapseTriples} 
                            colapseBtn={colapseBtn}/>

                    
                <Collapse  isOpen={isTriplesOpen}>
                     <div className="triples" style={styles.body}>
                        {triples.map(triple =>
                            <TripleComponent key={triple.id}
                                            shape={shape} 
                                            triple={triple}
                                            deleteTriple={deleteTriple}/> 
                        )}
                    
                        <button className="xs-addTripleButton"
                                style={styles.addTriple} 
                                onClick={addTriple} 
                                disabled={disabled}
                                title="Add Triple">
                                + Triple Constraint
                        </button>        
                    
                        </div>
                </Collapse> 
            </div>
        </ShapeContext.Provider>
    );
                                   
    
}


export default ShapeComponent;

/*


                     <div className="triples">
                        <div className="tripleSlot">
                        <label>TripleSlot</label>
                        {triples.map(triple =>
                            <TripleComponent key={triple.id}
                                            shape={shape} 
                                            triple={triple}
                                            deleteTriple={deleteTriple}/> 
                        )}
                    
                        <button className="xs-addTripleButton" 
                                onClick={addTriple} 
                                disabled={disabled}
                                title="Add Triple">
                                + Triple Constraint
                        </button>        
                    
                        </div>
                    </div> <div className="triples">
                        <div className="tripleSlot">
                        <label>TripleSlot</label>
                        {triples.map(triple =>
                            <TripleComponent key={triple.id}
                                            shape={shape} 
                                            triple={triple}
                                            deleteTriple={deleteTriple}/> 
                        )}
                    
                        <button className="xs-addTripleButton" 
                                onClick={addTriple} 
                                disabled={disabled}
                                title="Add Triple">
                                + Triple Constraint
                        </button>        
                    
                        </div>
                    </div>

                    */