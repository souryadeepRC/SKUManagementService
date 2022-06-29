import React, {  useState } from "react"
import classes from './RecordFilter.module.css'
const RecordFilter = (props) => {
    const { inputData } = props
    const [filterId, setFilterId] = useState('1')
    const filterByIDRef = React.createRef()
    const filterBySKURef = React.createRef()
    const filterByNameRef = React.createRef()
    const filterByFromPriceRef = React.createRef()
    const filterByToPriceRef = React.createRef()
    const filterByDateRef = React.createRef()

    const changeFilterHandler = (event) => {
        event.preventDefault()
        const choice = event.target.value
        if (choice === '1') {
            props.onFilterChoice(inputData)
        }
        setFilterId(choice)
    } 
    const filterDataHandler = () => {
        if (filterId === '2') {
            const selectedValue = filterByIDRef.current.value
            const filteredData = inputData.filter(item => item.ID === selectedValue)
            props.onFilterChoice(filteredData)
        } else if (filterId === '3') {
            const selectedValue = filterBySKURef.current.value
            const filteredData = inputData.filter(item => item.SKU === selectedValue)
            props.onFilterChoice(filteredData)
        } else if (filterId === '4') {
            const selectedValue = filterByNameRef.current.value 
            const filteredData = inputData.filter(item => item['Product Name'].includes(selectedValue))
            props.onFilterChoice(filteredData)
        } else if (filterId === '5') {
            const fromPrice = parseFloat(filterByFromPriceRef.current.value)
            const toPrice = parseFloat(filterByToPriceRef.current.value)
            const filteredData = inputData.filter(item => parseFloat(item.Price) >= fromPrice && parseFloat(item.Price) <= toPrice)
            props.onFilterChoice(filteredData)
        } else if (filterId === '6') {
            const selectedValue = new Date(filterByDateRef.current.value)
            const filteredData = inputData.filter(item => new Date(item.Date).getTime() === selectedValue.getTime())
            props.onFilterChoice(filteredData)
        }
    }
    return (
        <div>
            <div className={classes.filter__section}>
                <label>Filter By : </label>
                <select onChange={changeFilterHandler}>
                    <option value='1'>View all</option>
                    <option value='2'>ID</option>
                    <option value='3'>SKU</option>
                    <option value='4'>Product Name</option>
                    <option value='5'>Price</option>
                    <option value='6'>Date</option>
                </select>
            </div>
            <div className={classes.filter__option_form}>
                <div className={classes.filter__option}>

                    {filterId === '2' && <input type='text' ref={filterByIDRef} placeholder="Enter ID" />}
                    {filterId === '3' && <input type='text' ref={filterBySKURef} placeholder="Enter SKU" />}
                    {filterId === '4' && <input type='text' ref={filterByNameRef} placeholder="Enter Product Name" />}
                    {filterId === '5' &&
                        <> 
                            <input type='number' ref={filterByFromPriceRef} placeholder="Enter Start Price" />
                            <input type='number' ref={filterByToPriceRef} placeholder="Enter End Price" /> 
                        </>}
                    {filterId === '6' && <div><input type='date' ref={filterByDateRef} placeholder="Enter Start Date" /></div>}
                </div>

                {filterId !== '1' && <button onClick={filterDataHandler}>View Details</button>}
            </div>
        </div>
    )
}
export default RecordFilter