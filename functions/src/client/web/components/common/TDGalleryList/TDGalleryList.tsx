import React from 'react'
import LoadingInline from '../LoadingInline';
import TDGalleryItem from '../TDGallery';

import styles from './TDGalleryList.module.css';



interface IProps{
  selected : IGalleryItem
  onChange: (item : IGalleryItem) => void
    itemList: IGalleryItem[],
    fetchingItems: boolean,
    onScroll : (e : any) => void
    scrollRef : any
}


interface IGalleryItem { imageURL: string, glbFileURL: string, usdzFileURL: string, name: string }


// const ItemsRow = (props: {itemList: IGalleryItem[], chunk: number}) => {
//     const itemWidth = (2 / props.itemList.length) * 20
//     const containerWidth = (props.itemList.length / props.chunk) * 100

//     return(
//         <div style={{marginBottom:'40px',width:`${containerWidth}%`,display:'flex',flexDirection:'row-reverse',alignItems:'center',justifyContent:'flex-start'}}>
//             { props.itemList.map((item, index) =>
//                 <div key={item.name} style={{width:`${itemWidth}%`,margin:'auto'}} >
//                     <TDGalleryItem  imageURL = {item.imageURL} glbFileURL= {item.glbFileURL} usdzFileURL= {item.usdzFileURL} name={item.name}/>
//                 </div>
//             )}
//         </div>
//     )
// }

// const ItemColumn = (props: {list:IGalleryItem[], windowWidth: number}) => {
//     const renderRows = () => {
//         const {windowWidth} = props

//         let results : any[] = []
//         let i = 0
//         let chunk = 2
//         if(!windowWidth || windowWidth === 0){
//             return results
//         } else {
//             for ( i = props.list.length; i > 0 ; i -= chunk){
//                 const rowList = props.list.slice(Math.max(i-chunk, 0), 1)
//                 let rowKey: any = rowList.map((item) => item.name)
//                 rowKey = rowKey.join('.')
//                 results.push(<ItemsRow key={rowKey} itemList={rowList} chunk={chunk}/>)
//             }
//         }

//         return results
//     }

//     return(
//         <div style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start'}}>
//             {renderRows()}
//         </div>
//     )

// }




const GalleryItems = (props: {selected : IGalleryItem, itemList:IGalleryItem[], onClick : (item : IGalleryItem) => void}) => {
  const { itemList, onClick, selected } = props
  
  const renderedList = itemList.map((item) => {
    return (
      <div style={{ margin:'8px',position:'relative'}}>
        <TDGalleryItem selected={selected && selected.name === item.name?true:false} onClick={() => onClick(item)} glbFileURL={item.glbFileURL} usdzFileURL={item.usdzFileURL} name={item.name} imageURL={item.imageURL} />
      </div>
    )
  })

  return (<>
      {renderedList}
    </>)

  // return (
    //     <ItemColumn list = {props.itemList} windowWidth={props.windowWidth}/>
    // )
}

const TDGalleryList = (props: IProps) => {

    const {itemList, fetchingItems, scrollRef, onScroll, onChange, selected} = props;

    return(
        <div ref={scrollRef} onScroll={onScroll} className={styles.root}>
            {
              <GalleryItems selected={selected} itemList={itemList} onClick={onChange}/>
            }
            <br></br>
            {fetchingItems ? <LoadingInline/> : null}
            <br></br>
        </div>
    )

}

export default TDGalleryList