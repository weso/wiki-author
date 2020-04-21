import React,{useState} from 'react';
import { Collapse } from 'reactstrap';
import TripleHeader from './headers/TripleHeader';
import ConstraintCont from './customize/ConstraintCont';
import CardinalityComp from './customize/CardinalityComp';


function TripleComponent (props) {
    
    const {shape,triple,deleteTriple} = props;
    const [isConstraintsOpen,setConstraintsOpen] = useState(false);
    const [isCardinalityOpen,setCardinalityOpen] = useState(false);
    const [allCollased,setAllCollapsed] = useState(false);
    const [colapseBtn,setColapseBtn] = useState('menu');


    const customizeContraints = function(){
        collapseAll(false);
        setConstraintsOpen(!isConstraintsOpen);
        setAllCollapsed(false);

        if(allCollased){
            setConstraintsOpen(true);
            changeCollapseBtn();
        }
    }



    const customizeCardinality = function(){
        collapseAll(false);
        setCardinalityOpen(!isCardinalityOpen);
        setAllCollapsed(false);

        if(allCollased){
            setCardinalityOpen(true);
            changeCollapseBtn();
        } 
        
    }


    const collapseAll = function(collapse){
        setConstraintsOpen(collapse);
        setCardinalityOpen(collapse);
    }

    const collapseToggle = function(){
        collapseAll(!allCollased);
        setAllCollapsed(!allCollased);
        changeCollapseBtn();
    }

    const changeCollapseBtn = function(){
        if(colapseBtn=='menu'){
            setColapseBtn('menu_open');
        }else{
            setColapseBtn('menu');
        }
    }

    

    return ( 
        <div>
            <TripleHeader triple={triple} 
                          deleteTriple={deleteTriple} 
                          customizeContraints={customizeContraints}
                          customizeCardinality={customizeCardinality}
                          collapseToggle={collapseToggle}
                          colapseBtn={colapseBtn}/>

            <Collapse   isOpen={isConstraintsOpen}>
                <ConstraintCont  triple={triple} />           
            </Collapse> 

            <Collapse  isOpen={isCardinalityOpen}>
                <CardinalityComp triple={triple}/>      
            </Collapse> 
           
        </div>);                          
}


export default TripleComponent;

