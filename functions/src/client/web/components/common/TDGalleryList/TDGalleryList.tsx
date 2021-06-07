import { divide } from 'lodash';
import React, {useEffect, useState} from 'react'
import LoadingInline from '../LoadingInline';
import TDGalleryItem from '../TDGallery';

import styles from './TDGalleryList.module.css';



interface IProps{

    itemList: IGalleryItem[],
    fetchingItems: boolean,

}


interface IGalleryItem { imageURL: string, glbFileURL: string, usdzFileURL: string, name: string }


const ItemsRow = (props: {itemList: IGalleryItem[], chunk: number}) => {
    const itemWidth = (2 / props.itemList.length) * 20
    const containerWidth = (props.itemList.length / props.chunk) * 100

    return(
        <div style={{marginBottom:'40px',width:`${containerWidth}%`,display:'flex',flexDirection:'row-reverse',alignItems:'center',justifyContent:'flex-start'}}>
            { props.itemList.map((item, index) =>
                <div key={item.name} style={{width:`${itemWidth}%`,margin:'auto'}} >
                    <TDGalleryItem  imageURL = {item.imageURL} glbFileURL= {item.glbFileURL} usdzFileURL= {item.usdzFileURL} name={item.name}/>
                </div>
            )}
        </div>
    )
}

const ItemColumn = (props: {list:IGalleryItem[], windowWidth: number}) => {
    const renderRows = () => {
        const {windowWidth} = props

        let results : any[] = []
        let i = 0
        let chunk = 2
        if(!windowWidth || windowWidth === 0){
            return results
        } else {
            for ( i = props.list.length; i > 0 ; i -= chunk){
                const rowList = props.list.slice(Math.max(i-chunk, 0), 1)
                let rowKey: any = rowList.map((item) => item.name)
                rowKey = rowKey.join('.')
                results.push(<ItemsRow key={rowKey} itemList={rowList} chunk={chunk}/>)
            }
        }

        return results
    }

    return(
        <div style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start'}}>
            {renderRows()}
        </div>
    )

}


const GalleryItems = (props: {itemList:IGalleryItem[], windowWidth: number}) => {
    return (
        <ItemColumn list = {props.itemList} windowWidth={props.windowWidth}/>
    )
}

const TDGalleryList = (props: IProps) => {

    const {itemList, fetchingItems} = props;

    return(
        <div className={styles.root}>
            <br></br>
            {fetchingItems ? <LoadingInline/> : null}
            <br></br>
            {
                <GalleryItems windowWidth = {null} itemList={itemList}/>
            }
        </div>
    )

}

export default TDGalleryList