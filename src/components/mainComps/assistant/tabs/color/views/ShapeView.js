import React,{useContext,useState} from 'react';
import { Textbox } from 'react-inputs-validation';
import Properties from '../../../../../../conf/properties';

function ShapeView (props) {

        const {colors} = props;
        const styles = Properties.getInstance().getShapeStyle();

        return ( <div className='xs-header' style={styles.header}>            
                        <label style={styles.label}>Shape</label>
                        <Textbox/>
                        <button style={styles.delete} 
                        className="deleteShapeBtn mdc-icon-button material-icons" >delete</button>
                        <button style={styles.collapse} 
                        className="collapseBtn mdc-icon-button material-icons">menu</button>
                    </div>);
}

export default ShapeView;
