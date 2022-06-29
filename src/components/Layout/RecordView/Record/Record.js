import classes from './Record.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
const Record = (props) => {

    const recordHeader = (
        <thead>
            <tr>
                <th>ID</th>
                <th>SKU</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Data</th>
            </tr>
        </thead>)
    if (props.data.length === 0) {
        return (<p className={classes.empty__record}>No Records found!</p>)
    }
    console.log('Record :=',props.data);
    const editItemHandler = (event) => {
        event.preventDefault()
        console.log(event.target.id);
    }
    return (
        <div> 
                <div className={classes.item__section}>
                    {props.data.map(item => {
                        return (
                        <div key={item.ID}>
                            <p><b>ID : </b>{item.ID}</p>
                            <p><b>SKU :  </b>{item.SKU}</p>
                            <p><b>Name : </b> {item['Product Name']}</p>
                            <p><b>Price : </b> Rs. {item.Price}</p>
                            <p><b>Date : </b> {item.Date}</p>
                            <div className={classes.item__edit_section} >
                                <button id={item.ID} onClick={editItemHandler}><FontAwesomeIcon icon={faEdit} />&nbsp;Edit</button>
                                </div>
                        </div>)
                    })}
                </div> 
        </div>
    )
}
export default Record