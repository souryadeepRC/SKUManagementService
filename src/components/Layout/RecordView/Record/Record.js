import classes from './Record.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import ItemContext from '../../../../store/item-context' 
import React, { useContext } from 'react'
const Record = (props) => { 

    const itemCtx = useContext(ItemContext)
    const { filteredData: data } = itemCtx
    if (data.length === 0) {
        return (<p className={classes.empty__record}>No Records found!</p>)
    } 
    const editItemHandler = (event) => {
        event.preventDefault() 
        props.onshowModal(event.target.id)
    }
    return (
        <div>
            <div className={classes.item__section}>
                {data.map(item => {
                    const convertedDate = item.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                    return (
                        <div key={item.id}>
                            <p><b>ID : </b>{item.id}</p>
                            <p><b>SKU :  </b>{item.sku}</p>
                            <p><b>Name : </b> {item.productName}</p>
                            <p><b>Price : </b> Rs. {item.price}</p>
                            <p><b>Date : </b> {convertedDate}</p>
                            <div className={classes.item__edit_section} >
                                <button id={item.id} onClick={editItemHandler}>
                                    <FontAwesomeIcon icon={faEdit} />&nbsp;Edit
                                </button>
                            </div>
                        </div>)
                })}
            </div>
            
        </div>
    )
}
export default React.memo(Record)