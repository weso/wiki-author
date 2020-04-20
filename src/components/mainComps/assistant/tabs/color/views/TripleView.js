import React,{useContext,useState} from 'react';
import Properties from '../../../../../../conf/properties';

function TripleView (props) {

        const styles = Properties.getInstance().getTripleStyle();

        return (  <div className="xs-tripleHeader" style={styles.header}>            
            <input  type="text" 
                    className="name"
                    placeholder="eg: name"
                    title="Triple Constraint Name"/>


            <button className="tripleBtns buildConstraint buildBtn buildTripleBtn mdc-icon-button material-icons"
                    style={styles.constraint}
                    title="Customize Constraint">
                    build
            </button>


           
            <button className="tripleBtns buildCardinality buildBtn buildTripleBtn mdc-icon-button material-icons" 
                    style={styles.cardinality}
                    title="Customize Cardinality">
                    build
            </button>

            <button className="tripleBtns deleteTripleBtn mdc-icon-button material-icons"
                    style={styles.delete}
                    title="Delete Triple Constraint">
                    delete
            </button>

            <button className="collapseBtn mdc-icon-button material-icons" 
                    style={styles.collapse}
                    title="Customize all">
                    menu
            </button>
        </div>);
}

export default TripleView;
