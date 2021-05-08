import React from 'react';

export default function pdf(props) {
    return (
        <div style={{ position: "absolute", width: "100%", height: "100%" }}>
            <object
                data={require(`../../uploads/${props.match.params.file_name}`)}
                type="application/pdf"
                width="100%"
                height="100%"
            >
            </object>
        </div >
    )
}
