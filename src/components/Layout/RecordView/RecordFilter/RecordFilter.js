import React, { useRef, useState } from "react"

const RecordFilter = (props) => {
    const { inputData } = props
    const [filterId,setFilterId] = useState('1')
    const filterByIDRef= React.createRef()
    const filterBySKURef= React.createRef()
    const filterByNameRef= React.createRef()
    const filterByFromPriceRef= React.createRef()
    const filterByToPriceRef= React.createRef()
    const filterByDateRef= React.createRef()

    const changeFilterHandler = (event) => {
        event.preventDefault()
        const choice = event.target.value 
        if(choice==='1'){
            props.onFilterChoice(inputData)
        }
        setFilterId(choice)
    }
    console.log(filterId); 
    const filterDataHandler = () => {
        if(filterId==='2'){ 
            const selectedValue = filterByIDRef.current.value
            const filteredData = inputData.filter(item => item.ID === selectedValue)
            props.onFilterChoice(filteredData)
        }else if(filterId==='3'){ 
            const selectedValue = filterBySKURef.current.value
            const filteredData = inputData.filter(item => item.SKU === selectedValue)
            props.onFilterChoice(filteredData)
        }else if(filterId==='4'){ 
            const selectedValue = filterByNameRef.current.value
            console.log(selectedValue);
            const filteredData = inputData.filter(item => item['Product Name'].includes(selectedValue))
            props.onFilterChoice(filteredData)
        }else if(filterId==='5'){ 
            const fromPrice = parseFloat(filterByFromPriceRef.current.value)
            const toPrice = parseFloat(filterByToPriceRef.current.value) 
            const filteredData = inputData.filter(item => parseFloat(item.Price)>=fromPrice && parseFloat(item.Price)<=toPrice)
            props.onFilterChoice(filteredData)
        }else if(filterId==='6'){ 
            const selectedValue = new Date(filterByDateRef.current.value)
            const filteredData = inputData.filter(item => {
                console.log(item.Date);
                console.log(new Date(item.Date),selectedValue);
                console.log(new Date(item.Date).getTime() === selectedValue.getTime());
                return new Date(item.Date).getTime() === selectedValue.getTime()
            })
            props.onFilterChoice(filteredData)
        }
    }
    return (
        <div>
            <div>
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
            <div>
                {filterId==='2' && <div><input type='text' ref={filterByIDRef} placeholder="Enter ID"/></div>}
                {filterId==='3' && <div><input type='text' ref={filterBySKURef} placeholder="Enter SKU"/></div>}
                {filterId==='4' && <div><input type='text' ref={filterByNameRef} placeholder="Enter Product Name"/></div>}
                {filterId==='5' && 
                    <div>Price :: From <input type='text' ref={filterByFromPriceRef} placeholder="Enter Price"/>
                        To <input type='text' ref={filterByToPriceRef} placeholder="Enter Price"/>
                    </div>}
                {filterId==='6' && <div><input type='date' ref={filterByDateRef} placeholder="Enter Start Date"/></div>}

                {filterId!=='1' && <button onClick={filterDataHandler}>View Details</button>}
            </div>
        </div>
    )
}
export default RecordFilter