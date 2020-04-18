import React,{useContext,useState,useEffect} from 'react';
import {AppContext} from '../../../../App';
import PrefixComp from './prefix/PrefixComp';
import Properties from '../../../../conf/properties';
import '../../../../css/shexComponents/headers/PrefixHeader.css';

function Prefixes (props) {

        const context = useContext(AppContext);
        const styles = Properties.getInstance().getPrefixStyle();
        return (
                <div>
                        {context.prefixes.map(prefix =>{
                                return(<PrefixComp key={prefix.id} prefix={prefix}/>)
                        })}
                        <div className="addCont">
                        <button className="addPrefixBtn"
                                style={styles.add}
                                onClick={context.addPrefix}
                                title="Add Prefix">
                                + Prefix
                        </button>
                        </div>   
                </div>
                );
}

export default Prefixes;
