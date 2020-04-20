
import Codemirror from 'codemirror';
import Editor from '../entities/editor';
import shexUtils from './shexUtils';

import  Shape from '../entities/shexEntities/shape';
import  Triple from '../entities/shexEntities/triple';

import TypesFactory from '../entities/shexEntities/types/typesFactory';
import CardinalityFactory from '../entities/shexEntities/shexUtils/cardinality/cardinalityFactory';
import Facet from '../entities/shexEntities/shexUtils/facet';

import PrefixedIri from '../entities/shexEntities/types/concreteTypes/prefixedIri';
import IriRef from '../entities/shexEntities/types/concreteTypes/iriRef';
import BNode from '../entities/shexEntities/types/concreteTypes/bNode';
import Primitive from '../entities/shexEntities/types/concreteTypes/primitive';
import ValueSet from '../entities/shexEntities/types/concreteTypes/valueSet';

import Literal from '../entities/shexEntities/types/concreteTypes/kinds/literal';
import NonLiteral from '../entities/shexEntities/types/concreteTypes/kinds/nonLiteral';
import IriKind from '../entities/shexEntities/types/concreteTypes/kinds/iriKind';
import BNodeKind from '../entities/shexEntities/types/concreteTypes/kinds/bNodeKind';
import BlankKind from '../entities/shexEntities/types/concreteTypes/kinds/blankKind';

import NumberLiteral from '../entities/shexEntities/types/concreteTypes/literal/numberLiteral';
import StringLiteral from '../entities/shexEntities/types/concreteTypes/literal/stringLiteral';
import BooleanLiteral from '../entities/shexEntities/types/concreteTypes/literal/booleanLiteral';



import Prefix from '../entities/shexEntities/shexUtils/prefix';
import ShapeRef from '../entities/shexEntities/shexUtils/shapeRef';
import ValueSetValue from '../entities/shexEntities/shexUtils/valueSetValue';

import $ from 'jquery';

//HAY QUE METER TODOS (Update... igual no hace falta...)
const PRIMITIVES = ['string','integer','date','boolean'];


let refs;
/**
*   Obtains all the current tokens in the editor
*   @return {Array} tokens
*
 */
function getTokens(){
    let yashe = Editor.getInstance().getYashe();
    let tokens =[];
    if(yashe!=undefined){
        for (var l = 0; l < yashe.lineCount(); ++l) {
            let lineTokens = getNonWsTokens(yashe.getLineTokens(l));
            lineTokens.forEach(token =>{
                tokens.push(token);
            })

        }
    }
    return tokens;
}

/**
*   Split the tokens into Shapes
*   @param {Array} Tokens
*   @return {Array} Defined Shapes (Array of Token's arrays)
*
 */
function getDefinedShapes(tokens){
    let brackets=0
    let shape=[];
    let defShapes = [];
    let shapeCont = 0;
    let hasTripleStarted = false;
    //Separate shapes in arrays
    tokens.forEach(element =>{
        //If we find a Shape then we start a new Array of tokens
        if(element.type == 'shape'){
            shape = [];
            shape.push(element)
            defShapes[shapeCont]=shape;
            shapeCont++;
        }else{
            // IMPORTANT 
            // We could do just shape.push(element) but if there 
            // are directives between shapes we will push that directives into the shape   

            if(element.string == '{'){
                hasTripleStarted=true;
            }
             
            if(hasTripleStarted){
                //Get the tokens while it's from the inside of the shape
                if(element.string == '{')brackets++;
                if(element.string == '}')brackets--;
                if(brackets!=0)shape.push(element);
                //if(brackets==0)hasTripleStarted = false
             }else{
                 //Get the previous tokens before the triples
                 shape.push(element);
             }
       
        }
    })
    return defShapes;
}

/**
* Get the Shapes objects
* @param {Array} Shapes (Array of Token's arrays)
*
 */
async function getShapes(defShapes){
    refs = [];
    let shapes = [];
    let yashe = Editor.getInstance().getYashe();
    await Promise.all(defShapes.map(async (shape) => {
        let id  = shapes.length;
        let shapeDef = shape[0].string;
        let shapeType = getType(shapeDef);
        let qualifier = getQualifier(shape[1]);
        let triples = await getTriples(id,shape);

        shapes.push(new Shape(id,shapeType,triples,qualifier));
        
    }))

    return shapes;
}

/**
* Get the type of the Shape or Triple
* @param {String} Shape or Triple
*
 */
function getType(def) {
    console.log(def)
    let value;
    let yashe = Editor.getInstance().getYashe();
    if(def.startsWith('<')){
        value = def.split('<')[1].split('>')[0];
        return new IriRef(value);
    }else if(def.startsWith('_:')){
        value = def.split(':')[1];
        return new BNode(value);
    }else{
        value = def.split(':')[1];
        let prefixName = def.split(':')[0];
        let prefixValue = getPrefixValue(yashe.getDefinedPrefixes(),prefixName)
        let prefix = new Prefix(prefixName,prefixValue);
        return new PrefixedIri(prefix,value);
    }
}

async function getTypeByID(def) {
    let language = (navigator.language || navigator.userLanguage).split("-")[0];
    var API_ENDPOINT = 'https://www.wikidata.org/w/';
    var QUERY_ID = {
            action:'wbgetentities',
            ids:def.split(':')[1],
            format: 'json', 
    }

    let result = await $.get({
            url: API_ENDPOINT + 'api.php?' + $.param(QUERY_ID),
            dataType: 'jsonp',
    })

    console.log(result)
    return result;
}


/**
*   Get the Qualifier
*   @param {Token} First token next to the ShapeExprLabel
*   @return {Type}
*
*/
function getQualifier(qualifier) {
    if(qualifier){
        if(qualifier.type == 'constraintKeyword'){
            let type = qualifier.string.toLowerCase();
            return new TypesFactory().createType(type);
        }
    }
    return new BlankKind();
}


/**
*   Get an array of Triples
*   @param {Integer} shapeId
*   @param {Array} Shape (Tokens)
*
* */
async function getTriples(shapeId,shape) {
        let triples = [];
        let singleTriple = [];
        let yashe = Editor.getInstance().getYashe();
        let start = getStart(shape);
        for(let i=start;i<shape.length;i++){
            singleTriple.push(shape[i])
            if((shape[i].type == 'punc' &&  shape[i].string==';')// finish of the triple ';' 
                || i==shape.length-1){  // finish of the last triple without ';'
                if(singleTriple.length!=1){ //This line is neccesary when last triple of the shape ends with ';'
                    let t= await getTriple(triples.length,singleTriple,shapeId);
                    triples.push(t);
                    singleTriple = [];
                }
            }

        }
    return triples;
}

/**
*    Get a Triple Object from a line of tokens
*    @param {Array} Triples
*    @param {Array} LineTokens
*    @param {Integer} ShapeId
*/
async function getTriple(id,singleTriple,shapeId) {   
    let type;
    let constraint;
    let valueSet = [];
    let facets = [];
    let cardinality= new TypesFactory().createType('');
    let shapeRef = new ShapeRef();
    for(let i=0;i<singleTriple.length;i++){
        let token = singleTriple[i];
        if(token.type == 'string-2' || token.type == 'variable-3'){
            let result = await getTypeByID(token.string);
            console.log(result.entities[token.string.split(':')[1]].labels.en.value)
            let yashe = Editor.getInstance().getYashe();
            let prefixValue = getPrefixValue(yashe.getDefinedPrefixes(),token.string.split(':')[0])
            let prefix = new Prefix(token.string.split(':')[0],prefixValue);
            type =  new PrefixedIri(prefix,result.entities[token.string.split(':')[1]].labels.en.value);
        }
        if(token.type == 'constraint' || token.type == 'constraintKeyword' ){
            constraint = getConstraint(token.string);
        }
        

        if(token.type == 'valueSet'){
            if(token.string.startsWith('@')){// LANTAG NOT SUPPORTED AT THE MOMENT
                Codemirror.signal(Editor.getInstance().getYashe(),'forceError','LANTAG_ERR');
            }else{
                 valueSet.push(new ValueSetValue(valueSet.length,getValueSetValue(token.string)));
            }
        }

        if(token.type == 'shapeRef' ){
            let ref = getRefName(token.string);
            refs.push(
                    {
                        shapeId:shapeId,
                        tripleId:id,
                        shapeRef:ref
                    }
                );
        }

        if(token.type == 'facet'){
            i++;//Need the value
            let value = singleTriple[i].string;
            let id =facets.length;
            let type = token.string.toLowerCase();
            facets.push(new Facet(id,type,value));
        }


        if(token.type == 'cardinality'){
          cardinality=getCardinality(token.string);
        }
        
        if( token.type != 'string-2' && 
            token.type != 'constraint' && 
            token.type != 'constraintKeyword' && 
            token.type != 'valueSet' && 
            token.type != 'shapeRef' && 
            token.type != 'facet' && 
            token.type != 'cardinality' && 
            token.type != 'punc' &&
            token.type !='comment'){

            Codemirror.signal(Editor.getInstance().getYashe(),'forceError');
        }

       
        if(token.string == '~'){
            Codemirror.signal(Editor.getInstance().getYashe(),'forceError','EXCLUSION_ERR');
        }
            

        if(token.string == '{'){
            Codemirror.signal(Editor.getInstance().getYashe(),'forceError');
        }
  
    }
    if(valueSet.length>0)constraint=new ValueSet(valueSet);
    return new Triple(id,type,constraint,shapeRef,facets,cardinality);
}

/**
*   Get the start of the triple tokens
*   @param {Array} Shape (Tokens)
*   @return {Integer} Position
*
 */
function getStart(shape){
    for(let i=0;i<shape.length;i++){
        if(shape[i].string=='{'){
            return i+1;
        }
    }
}


/**
*   Get the constraint of the Triple
*   @param {String} Token
*   @return {Type}
*/
function getConstraint(def) {
    let factory = new TypesFactory();
    let type = factory.createType(def.toLowerCase());
    //Isn't it a Prefixed/Iri/Primitive?
    if(type!=undefined){
        return type;
    }
    type = getType(def);
    //Is it a Primitive?
    if(type.getTypeName() == 'prefixedIri' && isPrimitive(type.value)){
        let kind = def.split(':')[1];
        return new Primitive(kind);
    }
    return type;
}


/**
*   Get the Cardinality Object
*   @param {String} Cardinality
*   @return {Cardinality|String} Cardinality
* */
function getCardinality(card){
    let factory = new CardinalityFactory();
    if(card.length==1)return factory.createCardinality(card);//Is it a simple card?
    let range = card.split('{')[1].split('}')[0].split(','); //I know...
    let min = range[0];
    let max;
    if(range.length>1){
        max = range[1];
    }

    let context = 'range';
    if(max == undefined){
        context = 'exactly';
    }
    if(max == '' || max == '*'){
        context = 'minLimit';
    }

    return factory.createCardinality(context,min,max);
}


/**
* Get the type of a valueSetValue
* @param {String} Token
* @return {Type} ValueSetValue
*
 */
function getValueSetValue(def) {

    if(!isNaN(def)){
        return new NumberLiteral(def);
    }

    if(def.startsWith('"')){
        return new StringLiteral(def.substring(1,def.length-1));//remove the ""
    }

    let minus = def.toLowerCase();
    if(minus == 'true' || minus == 'false'){
        return new BooleanLiteral(minus);
    }

    return getType(def);
}





function updateShapeRefs(shapes) {
    for(let r in refs){
        let shapeId = refs[r].shapeId;
        let tripleId = refs[r].tripleId;
        let ref = refs[r].shapeRef;

        let shape = shexUtils.getShapeById(shapes,shapeId);
        let triple = shexUtils.getTripleById(shape,tripleId);
        let shapeRef = shexUtils.getShapeByName(shapes,ref);

        triple.shapeRef.setShape(shapeRef);
    }
}





function getPrefixValue(defPrefixes,prefixName){
    let prefixValue;
    for(let pre in defPrefixes){
        if(pre==prefixName){
            prefixValue = defPrefixes[pre]
        }
    }
    return prefixValue;
}


function isPrimitive(value) {
    for(let prim in PRIMITIVES){
        if(PRIMITIVES[prim] == value){
            return true;
        }
    }
    return false;
}


function getRefName(token) {
    return token.split('@')[1];
}


function getNonWsTokens(tokens){
    return tokens.filter(function(obj){
        return obj.type != 'ws';
    })
}

const tokenUtils = {
    getTokens:getTokens,
    getDefinedShapes:getDefinedShapes,
    getShapes:getShapes,
    updateShapeRefs:updateShapeRefs
}

export default tokenUtils;