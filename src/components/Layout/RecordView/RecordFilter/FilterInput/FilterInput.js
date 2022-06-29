import React, { useCallback, useState } from 'react' 
import classes from './FilterInput.module.css'
const FilterInput = (props) => {
    const {filterId} = props 
    const [error,setError] = useState('')
    const filterByTextRef = React.createRef() 
    const filterByFromPriceRef = React.createRef()
    const filterByToPriceRef = React.createRef()
    const filterByDateRef = React.createRef()

    
    const getPlaceHolderValue =  useCallback((filterId) => {
        switch (filterId) {
            case '2':
                return "Enter ID"
            case '3':
                return "Enter SKU"
            case '4':
                return "Enter Product Name"
            case '5':
                return {start : "Enter Start Price" , end : "Enter End Price" }
            case '6':
                return "Enter Start Date"
            default:
                break;
        }
    },[])
    const getFilterType = useCallback((filterId) => {
        if(filterId === '2' ||filterId === '3' || filterId === '4'){
            return 'text'
        }else if(filterId === '5'){
            return 'number'
        }else if(filterId === '6'){
            return 'date'
        }
    },[])

    const primaryPlaceHolder = getPlaceHolderValue(filterId)
   
    const filterType = getFilterType(filterId)
    const filterDataHandler = () => {
        
        if (filterType === 'text') { 
            const selectedValue = filterByTextRef.current.value
            if(selectedValue!==''){
                props.onFilterChoice(filterByTextRef.current.value)
                setError('')
            }else{
                setError('Please put some Values')
            }
        } else if (filterType === 'number') {
            const startPrice = parseFloat(filterByFromPriceRef.current.value)
            const endPrice = parseFloat(filterByToPriceRef.current.value)
            console.log(startPrice,endPrice);
            if(startPrice>0 && endPrice>0 && !isNaN(startPrice)&& !isNaN(endPrice)){
                props.onFilterChoice({startPrice,endPrice})
                setError('')
            }else{
                setError('Please put some positive values')
            }
        } else if (filterType === 'date') {
            if(filterByDateRef.current.value!==''){
                const selectedValue = new Date(filterByDateRef.current.value) 
                props.onFilterChoice(selectedValue)
                setError('')
            }else{
                setError('Please put some values')
            }
        }
    }
    return (
        <div className={classes.filter__option_form}>
            <div className={classes.filter__option}>

                {filterType === 'text' && <input type={filterType} ref={filterByTextRef} placeholder={primaryPlaceHolder} />}
                {filterType === 'number' &&
                    <>
                        <input type={filterType} ref={filterByFromPriceRef} min='0' step='1' placeholder={primaryPlaceHolder.start} />
                        <input type={filterType} ref={filterByToPriceRef} min='0' step='1' placeholder={primaryPlaceHolder.end} />
                    </>}
                {filterType === 'date' && <input type={filterType} ref={filterByDateRef} placeholder={primaryPlaceHolder} />}
            </div>
            {error!=='' && <p style={{color:'red',fontSize:'12px'}}>{error}</p>}
            <button onClick={filterDataHandler}>View Details</button>
        </div>
    )
}
export default FilterInput