import React,{useContext,useState} from 'react';
import Properties from '../../../../../../conf/properties';

function PrefixView (props) {

        const {colors} = props;
        const styles = Properties.getInstance().getPrefixStyle();
        const open = '<';
        const close = '>';

        return (<div className='xs-prefixHeaderColors' style={styles.header}>            
                    <input  type="text" 
                            className="prefixName prefixInput"
                            placeholder="eg: schema"
                            title="Alias"/>
                    <label  className="prefixLabel" style={styles.label}>:</label>
                    <label  className="prefixLabel" style={styles.label}>{open}</label>
                    <input  type="text" 
                            className="prefixInput"
                            placeholder="eg: http://schema.org/"
                            title="IRI"/>
                    <label  className="prefixLabel" style={styles.label}>{close}</label>
                    <button className="deletePrefix mdc-icon-button material-icons"
                            style={styles.delete}
                            title="Delete Prefix">
                            delete
                    </button>                              
                </div>);
}

export default PrefixView;
