import React from 'react'

interface IProps {
    text : string,
    value : number,
    color : string,
    width : string
}

const TotalBox = (props : IProps) => {
    const { text, color, value, width } = props

    return (
        <div style={{
            display:'flex',
            flexDirection:'column',
            boxShadow : '0px 14px 30px rgba(0, 0, 0, 0.07)',
            alignItems:'flex-start',
            justifyContent:'flex-start',
            border : '1px solid',
            borderColor : color,
            margin : '15px',
            width ,
            borderRadius : '10px',
            padding : '20px',
            color 
        }}>
            <p>{text}</p>
            <h1>{value}</h1>
        </div>
    )
}

export default TotalBox