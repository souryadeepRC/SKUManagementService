import React, { useContext } from "react"
import ItemContext from "../../../store/item-context"

const pad2 = (n) => {
    return (n < 10 ? '0' : '') + n;
}

const RecordEdit = (props) => {

    const itemCtx = useContext(ItemContext)
    const item = itemCtx.itemData.filter(val => val.id === props.itemId)[0]

    const filterBySkuRef = React.createRef()
    const filterByNameRef = React.createRef()
    const filterByPriceRef = React.createRef()
    const filterByDateRef = React.createRef()

    //const [formInfo,setFormInfo] = useState(initialState)

    //console.log(formInfo);
    const date = item.date;
    const month = pad2(date.getMonth() + 1);//months (0-11)
    const day = pad2(date.getDate());//day (1-31)
    const year = date.getFullYear();

    const formattedDate = `${year}-${month}-${day}`
    console.log(formattedDate);
    const submitEditFormHandler = (event) => {
        event.preventDefault()
         
        itemCtx.updateItem({
            id: props.itemId,
            sku: filterBySkuRef.current.value,
            productName: filterByNameRef.current.value,
            price: parseFloat(filterByPriceRef.current.value),
            date: new Date(filterByDateRef.current.value)
        })
        props.onEditComplete();
    }
    return (
        <form onSubmit={submitEditFormHandler}>
            <div>
                <div>
                    <label>ID : {item.id}</label>
                </div>
                <div>
                    <label>SKU : </label>
                    <input type='text' defaultValue={item.sku} ref={filterBySkuRef} />
                </div>
                <div>
                    <label>Product Name : </label>
                    <input type='text' defaultValue={item.productName} ref={filterByNameRef} />
                </div>
                <div>
                    <label>Price : </label>
                    <input type='number' defaultValue={item.price} ref={filterByPriceRef} />
                </div>
                <div>
                    <label>Date : </label>
                    <input type='date' defaultValue={formattedDate} ref={filterByDateRef} />
                </div>
            </div>

            <div>
                <button>Edit the Record</button>
            </div>
        </form>
    )
}
export default RecordEdit