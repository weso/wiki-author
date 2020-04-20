import React,{useState,useContext} from 'react';
import { useCookies } from 'react-cookie';
import {SHAPE_COLORS,
        TRIPLE_COLORS,
        CONSTRAINT_COLORS,
        CARDINALITY_COLORS,
        PREFIX_COLORS} from './colors';

import {DEFAULTS} from './config'       ;
//Singleton Pattern
const Properties = (()=> {

    function PropertyClass(){

        const [cookies, setCookie,removeCookie] = useCookies('colors');
       
        this.getShapeStyle = function(){
            return {
                label:{color:SHAPE_COLORS.label},
                header:{background:SHAPE_COLORS.header},
                delete:{
                        color:SHAPE_COLORS.deleteFill,
                        background:SHAPE_COLORS.delete
                },
                collapse:{color:SHAPE_COLORS.collapse},
                body:{background:SHAPE_COLORS.body},
                addTriple:{
                        color:SHAPE_COLORS.addTripleFill,
                        background:SHAPE_COLORS.addTriple
                },
                addShape:{
                        color:SHAPE_COLORS.addShapeFill,
                        background:SHAPE_COLORS.addShape
                },
            };  
        }

        this.getTripleStyle = function(){
            return {      
                label:{color:TRIPLE_COLORS.label}, 
                header:{background:TRIPLE_COLORS.header},
                constraint:{
                        color:TRIPLE_COLORS.constraintFill,
                        background:TRIPLE_COLORS.constraint
                },
                cardinality:{
                        color:TRIPLE_COLORS.cardinalityFill,
                        background:TRIPLE_COLORS.cardinality
                },
                delete:{
                        color:TRIPLE_COLORS.deleteFill,
                        background:TRIPLE_COLORS.delete
                },
                collapse:{color:TRIPLE_COLORS.collapse},
                body:{background:TRIPLE_COLORS.body},
            }
        }

        this.getConstraintStyle = function(){
            return {
                label:{color:CONSTRAINT_COLORS.label}, 
                body:{background:CONSTRAINT_COLORS.body},
                add:{
                        color:CONSTRAINT_COLORS.addFill,
                        background:CONSTRAINT_COLORS.add
                },
                delete:{
                        color:CONSTRAINT_COLORS.deleteFill,
                        background:CONSTRAINT_COLORS.delete
                },
            };  
        }

        this.getCardinalityStyle = function(){
            return {
                label:{color:CARDINALITY_COLORS.label},
                body:{background:CARDINALITY_COLORS.body}
            };  
        }

        this.getCardinalityStyle = function(){
            return {
                label:{color:CARDINALITY_COLORS.label},
                body:{background:CARDINALITY_COLORS.body}
            };  
        }

        this.getPrefixStyle = function(){
            return {
                label:{color:PREFIX_COLORS.label},
                header:{background:PREFIX_COLORS.header},
                delete:{
                        color:PREFIX_COLORS.deleteFill,
                        background:PREFIX_COLORS.delete
                },
                add:{
                        color:PREFIX_COLORS.addFill,
                        background:PREFIX_COLORS.add
                },
                specialLabel:{color:PREFIX_COLORS.specialLabel},
                body:{background:PREFIX_COLORS.body}
            };  
        }




        this.loadCookies = function(){
            //Colors
            this.loadCookie('shapeColors',SHAPE_COLORS);
            this.loadCookie('tripleColors',TRIPLE_COLORS);
            this.loadCookie('constraintColors',CONSTRAINT_COLORS);
            this.loadCookie('cardinalityColors',CARDINALITY_COLORS);

            //Config
            this.loadCookie('conf',DEFAULTS);
            
         }

        this.loadCookie = function(cookie,namespace){
            let properties = cookies[cookie];
            if(!properties){
                setCookie(cookie, namespace, { path: '/' });
            }else{
                this.load(properties,namespace);
            }
        }

        this.load = function(propeties,namespace){
            //namespace = colors; It doesn't work
            Object.keys(propeties).map(c=>{
                //console.log(propeties[c])
                namespace[c]=propeties[c];
            });
        }


        this.removeCookies = function(){
            //Colors
            removeCookie('shapeColors');
            removeCookie('tripleColors');
            removeCookie('constraintColors');
            removeCookie('shapeRefColors');
            removeCookie('cardinalityColors');
            removeCookie('cardinalityColors');
            //Config
            removeCookie('conf');
        }

        this.saveDefaults = function(){
            //Colors
            this.defaultShape = Object.assign({}, SHAPE_COLORS);
            this.defaultTriple = Object.assign({}, TRIPLE_COLORS);
            this.defaultConstraint = Object.assign({}, CONSTRAINT_COLORS);
            this.defaultCardinality = Object.assign({}, CARDINALITY_COLORS);
            //Config
            this.defaultConfig = Object.assign({}, DEFAULTS);
        }

        this.restoreDefaultColors = function(){
            this.load(this.defaultShape,SHAPE_COLORS);
            this.load(this.defaultTriple,TRIPLE_COLORS);
            this.load(this.defaultConstraint,CONSTRAINT_COLORS);
            this.load(this.defaultCardinality,CARDINALITY_COLORS);
            this.removeCookies();
        }

        this.restoreDefaultConfig = function(){
            this.load(this.defaultConfig,DEFAULTS);
            this.removeCookies();
        }

        this.saveDefaults();
        this.loadCookies();                
    }

   

    let instance;

    return{
        getInstance: ()=>{
            if(!instance){
                instance = new PropertyClass();
            }
            return instance;
        }

    }

})();


export default Properties;