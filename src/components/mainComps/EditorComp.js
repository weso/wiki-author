import React, {useState,useContext,useEffect,useRef} from 'react';
import 'yashe/dist/yashe.min.css';
import {AppContext} from '../../App';
import {DEFAULTS} from '../../conf/config';

import CodeMirror from 'codemirror';
import YASHE from 'yashe';
import Editor from '../../entities/editor';

import yasheUtils from '../../utils/yasheUtils';
import Prefix from '../../entities/shexEntities/shexUtils/prefix';

import '../../css/Yashe.css';
import '../../css/themes/author.css';
import '../../css/themes/author-dark.css';

const ERROR_EDITOR_MSG = 'Ops... There are some errors in the editor';
const COMPLEX_SHAPE_MSG = 'Sorry that Shape is too complex for me';

function EditorComp() {

    const [yashe,setYashe] = useState(null);
    const divRef = useRef(null);
    const context = useContext(AppContext);
    

    const defaultPrefixes = [
                new Prefix('wd','http://www.wikidata.org/entity/',0),
                new Prefix('wdt','http://www.wikidata.org/prop/direct/',1)
    ]

    useEffect(() => {
    
        if (!yashe) {
            const options = {
                persistent:false,
                lineNumbers: true,
                showTooltip:true,
                theme:'author-dark',
                value:yasheUtils.DEFAULT_SHAPE
            }
            
            const y = YASHE(divRef.current,options);

            
            y.on('humanEvent', function(shapes,width) {
                Editor.getInstance().draw(shapes);
                let data={size:{width:width}};
                context.handleResize(null,data);
            });

            y.on('convert',function(){
                if(!y.hasErrors(y)){
                    hideError();
                    updateAssist();
                }else{
                    hideError();
                    hideConvert();
                    loading();
                    setTimeout(function() {
                        loaded();  
                        showConvert();
                        showError(ERROR_EDITOR_MSG);
                    },500) 
                }
            })

            y.on('focus', function() {
                 showConvert();
            });  

            y.on('prefixChange', function(prefixes,width) {
                Editor.getInstance().draw(getNewShapes(),prefixes);
                let data={size:{width:width}};
                context.handleResize(null,data);
            });

            y.on('forceError', function(err) {
                if(!err)err=COMPLEX_SHAPE_MSG;
                hideError();
                loading();
                setTimeout(function() {
                    loaded(); 
                    showError(err);
                    if(!DEFAULTS.sincronize)showConvert();
                },500)
            });

            y.on('delete', function() {
                replaceShapes(getNewShapes());
                updatePrefixes(defaultPrefixes);
            });

            y.on('upload', function() {
                if(!y.hasErrors()){                   
                    updateAssist();
                    updatePrefixes(getNewPrefixes());
                }
            });

        

            //Load example from Galery
            y.on('galery', function() {
                if(!y.hasErrors()){                   
                    updateAssist();
                    updatePrefixes(getNewPrefixes());
                }
            });

        
            y.refresh();
            setYashe(y);
            
            Editor.getInstance().setYashe(y);

            updateAssist();
            updatePrefixes(defaultPrefixes)

            CodeMirror.signal(Editor.getInstance().getYashe(),'sinc',DEFAULTS.sincronize);
        }
    }, [yashe]
    );

    

    const getNewShapes = function() {
        return yasheUtils.replaceShapes();
    }

    const getNewPrefixes = function() {
        return yasheUtils.updatePrefixes();
    }

    const replaceShapes = async (newShapes)=>{
       // loading();
        let shapes = await newShapes;
        context.replaceShapes(shapes);
       // loaded();
        return shapes;
    }

    const updatePrefixes = (newPrefixes)=>{
        context.replacePrefixes(newPrefixes);
        return newPrefixes;
    }


    const updateAssist = async function(){
        hideConvert();
        loading();
        replaceShapes(await getNewShapes());                
        loaded();
    }


     const animate = function(before1,after1,before2,after2){
        let e1 = document.getElementsByClassName(before1)[0];
        if(e1) e1.className = after1;
        let e2 = document.getElementsByClassName(before2)[0];
        if(e2) e2.className = after2;
     }

    const loading = function(){
        animate('showAsist','hideAsist','hideLoader','showLoader');
    }

    const loaded = function(){
         animate('showLoader','hideLoader','hideAsist','showAsist');
    }

    const showError = function(err){
        animate('hideError','showError','showAsist','hideAsist');
        document.getElementsByClassName('errorMsg')[0].textContent = err;
    }

    const showConvert = function(err){
        animate('hideConvert','showConvert','showAsist','hideAsist');
    }

    const hideError = function(){
        animate('showError','hideError','hideAsist','showAsist');
    }

    const hideConvert = function(){
        animate('showConvert','hideConvert','hideAsist','showAsist');
    }


    return  (<div className="col edit" ref={divRef}/>);

}

   
export default EditorComp;

