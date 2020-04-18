import React,{useContext} from 'react';
import {AppContext} from '../../../App';

function AssistBtn () {

    const context = useContext(AppContext);

    return (
        <button className="mdc-icon-button material-icons btns" 
                title="ShEx Assistant"
                type="button"
                onClick={context.assistantToggle}>
                info
        </button>);
    
    
}


export default AssistBtn;

