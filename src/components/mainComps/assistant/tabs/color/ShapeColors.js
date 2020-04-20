import React,{useContext,useState} from 'react';
import ShapeView from './views/ShapeView';
import TripleView from './views/TripleView';
import ColorComp from './utils/ColorComp';
import {SHAPE_PICKERS,
        TRIPLE_PICKERS,
        CONSTRAINT_PICKERS,
        CARDINALITY_PICKERS,
        BTNS_PICKERS} from '../../../../../conf/pickers';

import {SHAPE_COLORS,
        TRIPLE_COLORS,
        CONSTRAINT_COLORS,
        CARDINALITY_COLORS,
        BTNS_COLORS} from '../../../../../conf/colors';


import Properties from '../../../../../conf/properties';

function ShapeColors (props) {

        const shapeStyles = Properties.getInstance().getShapeStyle();
        const tripleStyles = Properties.getInstance().getTripleStyle();
        const constraintStyles = Properties.getInstance().getConstraintStyle();
        const cardinalityStyles = Properties.getInstance().getCardinalityStyle();

        return ( 
        <div>
                <div className="shape" style={shapeStyles.header}>
        
                        <ShapeView/>
                        <TripleView/>

                        <ColorComp      namespace={SHAPE_COLORS} 
                                        pickers={SHAPE_PICKERS} 
                                        labelType={shapeStyles.label}
                                        bodyType={shapeStyles.body}
                                        cookie='shapeColors'/>   

                        <ColorComp      namespace={TRIPLE_COLORS} 
                                        pickers={TRIPLE_PICKERS}
                                        labelType={tripleStyles.label} 
                                        bodyType={tripleStyles.body}
                                        cookie='tripleColors'/>
                                        
                        <ColorComp      namespace={CONSTRAINT_COLORS} 
                                        pickers={CONSTRAINT_PICKERS}
                                        labelType={constraintStyles.label} 
                                        bodyType={constraintStyles.body}
                                        cookie='constraintColors'/>
                                        
                        <ColorComp      namespace={CARDINALITY_COLORS} 
                                        pickers={CARDINALITY_PICKERS}
                                        labelType={cardinalityStyles.label} 
                                        bodyType={cardinalityStyles.body}
                                        cookie='cardinalityColors'/>

                        <ColorComp      namespace={SHAPE_COLORS} 
                                        pickers={BTNS_PICKERS} 
                                        labelType={shapeStyles.label}
                                        bodyType={shapeStyles.body}
                                        cookie='constraintColors'/> 


                    <div className="triples" style={shapeStyles.body}>
                        <button className="xs-addTripleButton"
                                style={shapeStyles.addTriple}
                                title="Add Triple">
                                + Triple Constraint
                        </button>
                    </div>

                </div>
                <div className="addCont">
                    <button className="xs-addShapeButton"
                            style={shapeStyles.addShape}
                            title="Add Shape">
                            + Shape
                    </button>
                </div>
        </div>);
}

export default ShapeColors;
