import Editor from '../entities/editor';
import tokenUtils from './tokenUtils';
import Prefix from '../entities/shexEntities/shexUtils/prefix';

const DEFAULT_SHAPE = 'PREFIX wd: <http://www.wikidata.org/entity/>\n'+
'PREFIX wdt: <http://www.wikidata.org/prop/direct/>\n\n'+
'<human>{\n'+
'  wdt:P31   wd:Q5   ;\n'+
'  wdt:P19  .     ? ;\n'+
'  wdt:P569 .    ? ;\n'+
'  wdt:P735 .    * ;\n'+
'  wdt:P734 .    * ;\n'+
'  wdt:P106 .    * ;\n'+
'}';
  
const VALUESET_SHAPE = 'PREFIX wd: <http://www.wikidata.org/entity/>\n'+
'PREFIX wdt: <http://www.wikidata.org/prop/direct/>\n\n'+
'<human>{\n'+
'  wdt:P31   [wd:Q5 wd:Q42]   ;\n'+
'}';

  let prefixCount = 0;
  
  async function replaceShapes(){
    let tokens = tokenUtils.getTokens();
    let defShapes = tokenUtils.getDefinedShapes(tokens);
    let newShapes = await tokenUtils.getShapes(defShapes);

 
    tokenUtils.updateShapeRefs(newShapes);

    return newShapes;
  }

 function updatePrefixes(prefix){
    let defined = Editor.getInstance().getYashe().getDefinedPrefixes();
    let prefixes = [];
    Object.keys(defined).map(p =>{
      let id = prefixes.length + prefixCount++;
      prefixes.push(new Prefix(p,defined[p],id));
    })
    return prefixes;
}

function getSchema(){
    let yashe = Editor.getInstance().getYashe();
    if(yashe){
        return yashe.getValue();
    }
    return '';
  }


//Get this out
function debounce(func, wait, immediate) {
    let timeout; let result;
    return function() {
        const context = this; 
        const args = arguments;
        const later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(context, args);
        return result;
    };
};

 const yasheUtils = {
      DEFAULT_SHAPE:DEFAULT_SHAPE,
      VALUESET_SHAPE:VALUESET_SHAPE,
      replaceShapes:replaceShapes,
      updatePrefixes:updatePrefixes,
      getSchema:getSchema,
      debounce:debounce
  }

  export default yasheUtils;
