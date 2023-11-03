import React from 'react'

export default function (props) {
    const toUpperCase = (text) => {
        let newText = text.toUpperCase();
        return newText;
    }
    return (props.alert &&
        <div style={{"height":"50px", "zIndex":"1"}}>
            <div className={`alert alert-${props.alert.type}`}role="alert" >
                {props.alert.msg}
            </div>
        </div>
    )
}