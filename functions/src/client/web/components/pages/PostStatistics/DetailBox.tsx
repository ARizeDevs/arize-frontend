import React from 'react'

interface IProps {
    title : string
    data : {Logo? : any, label : string, arView : number, tdView : number}[]
}

const DetailBox = (props : IProps) => {
    const { title, data } = props
    
    const imgStyle = {
        width:'20px',
        height:'20px',
        borderRadius:'50%',
        marginRight:'10px'
    }

    const renderedItems = data.map((item) => {
        console.log(item.Logo);
        
        return (
            <>
                <div style={{padding:'16px',boxSizing:'border-box',borderBottom : '1px solid var(--main-lightgray2-color)',display:'flex',width:'100%',flexDirection:'row',alignItems:'flex-start',justifyContent:'space-between'}}>
                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                        <div style={imgStyle} >
                            {item.Logo?item.Logo:null}
                        </div>
                        <h5>{item.label}</h5>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',justifyContent:'space-between'}}>
                        <h5 style={{marginBottom:'3px'}}>{`Total Views: ${item.tdView + item.arView}`}</h5>
                        <small>
                            <p style={{ color:'var(--main-lightgray2-color)',marginBottom:'3px' }}>{`AR Views: ${item.arView}`}</p>
                        </small>
                        <small>
                            <p style={{ color:'var(--main-lightgray2-color)' }}>{`3D Views: ${item.tdView}`}</p>
                        </small>
                    </div>
                </div>
            </>
        )
    })

    return (
        <div style={{ 
            border : '1px solid #D3D3D3', padding : '20px', boxSizing : 'border-box',
            boxShadow : '0px 14px 30px rgba(0, 0, 0, 0.07)', borderRadius : '10px' ,
            width : '100%', height : '100%', display : 'flex', flexDirection : 'column', alignItems : 'flex-start', justifyContent : 'flex-start'
        }}>
            <h4>{title}</h4>
            <div style={{ width : '100%' , display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start',overflowY:'auto' }}>
                {renderedItems}
            </div>
        </div>
    )
}

export default DetailBox