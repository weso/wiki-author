
import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { CookiesProvider } from 'react-cookie';
import Nav from './components/Nav';
import MainContainer from './components/MainContainer';
import Visualizer from './components/Visualizer';
import shexUtils from './utils/shexUtils';
import {emitPrefixes} from './utils/prefixUtils';
import {makeItResponsive,checkShapeName} from './utils/cssUtils';
import yasheUtils from './utils/yasheUtils';
import Editor from './entities/editor';
import {addPrefixComp,deletePrefixComp} from './utils/prefixUtils';
import './css/App.css';

export const AppContext = React.createContext();

function App() {

    const [shapes,setShapes] = useState([]);
    const [prefixes,setPrefixes] = useState([]);
    const [svg,setSvg] = useState('');
    const [isAssistantOpen, setAssistantOpen] = useState(true);
    const [isToolBarOpen, setToolBarOpen] = useState(true);
    const [isVisualizeOpen, setVisualizeOpen] = useState(true);
    const [width,setWidth] = useState(470);//700

    const assistantToggle = () => setAssistantOpen(!isAssistantOpen);
    const visualizeToggle = () => setVisualizeOpen(!isVisualizeOpen);
    const toolbarToggle = () => setToolBarOpen(!isToolBarOpen);
    const colapseAll = () =>{
      setAssistantOpen(!isToolBarOpen);
      setVisualizeOpen(!isToolBarOpen);
      setToolBarOpen(!isToolBarOpen);
    }

    const addShape = () =>{
      let shape = shexUtils.addShape(shapes,width);
      setShapes([...shapes,shape]);
      checkShapeName(shape)
      visualize();
    }

    const deleteShape = (shapeId) =>{
      setShapes(shexUtils.deleteShape(shapes,shapeId,false,width));
      visualize();
    }

    const addPrefix = function(){
      setPrefixes([...prefixes,addPrefixComp(prefixes,width)]);
    }
      
    const deletePrefix = function(prefixId){
      setPrefixes(deletePrefixComp(prefixes,prefixId,width));
    }

    const emit = function(){
      shexUtils.emit(shapes,width);
      visualize();
    }

    const emitPref = function(){
      emitPrefixes(prefixes,width);
      visualize();
    }

    const replaceShapes = (newShapes) =>{
      //This allows to render all the shapes when a property is updated.
      //Best Glitch Ever
      //In fact... I would like to render just the property component...
      setShapes([]); 
      
      setShapes(newShapes);
      visualize();
    }

    const replacePrefixes = (newPrefixes) =>{
      
      setPrefixes([]); 
      setPrefixes(newPrefixes);
  
    }
    

    const visualize = function(){

        let bodyFormData = new FormData();
        bodyFormData.set('schema', yasheUtils.getSchema());
        bodyFormData.set('schemaFormat', 'ShExC');
        bodyFormData.set('schemaEngine', 'SHEX');

        axios({
            method: 'post',
            url: 'http://rdfshape.weso.es:8080/api/schema/visualize',
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function(response){
            if(response.data.svg != undefined){
                if(response.data.svg.startsWith('<?xml')){
                    setSvg(response.data.svg);
                }else{
                    setSvg(null)
                }
        }
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });

    }

    const handleResize = function(e, data){
        setWidth(data.size.width)
        makeItResponsive(data.size.width); 
    }
    
    useEffect(() => {
      makeItResponsive(width);
    })


    return (
      <CookiesProvider>
          <AppContext.Provider
                value={
                  {
                  shapes:shapes,
                  addShape:addShape,
                  deleteShape:deleteShape,
                  addPrefix:addPrefix,
                  deletePrefix:deletePrefix,
                  replaceShapes:replaceShapes,
                  replacePrefixes:replacePrefixes,
                  prefixes:prefixes,
                  emit:emit,
                  emitPref:emitPref,
                  visualize:visualize,
                  isToolBarOpen:isToolBarOpen,
                  isAssistantOpen:isAssistantOpen,
                  isVisualizeOpen:isVisualizeOpen,
                  assistantToggle:assistantToggle,
                  visualizeToggle:visualizeToggle,
                  handleResize:handleResize,
                  width:width
                  }
                }>

              <Nav colapseAll={colapseAll}/>
              <MainContainer/>
              <Visualizer svg={svg} isVisualizeOpen={isVisualizeOpen}/>
                                                  
          </AppContext.Provider>
      </CookiesProvider>);

}  
           

export default App;