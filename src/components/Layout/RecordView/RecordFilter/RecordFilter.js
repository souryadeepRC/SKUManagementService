import React, {  useContext, useState } from "react"
import ItemContext from "../../../../store/item-context"
import FilterInput from "./FilterInput/FilterInput"
import FilterOption from "./FilterOption/FilterOption" 
const RecordFilter = () => { 
    
    const itemCtx = useContext(ItemContext)
    const [filterId, setFilterId] = useState('1') 
    const onChangeFilterHandler = (selectedFilterId) => { 

        if (selectedFilterId === '1') {
            itemCtx.filterByAll()
        }
        setFilterId(selectedFilterId)
    }
    const filteredDataHandler = (selectedValue) => {
        if (filterId === '2') {
            itemCtx.filterById(selectedValue) 
        } else if (filterId === '3') {
            itemCtx.filterBySku(selectedValue)
        } else if (filterId === '4') {
            itemCtx.filterByName(selectedValue)
        } else if (filterId === '5') {
            itemCtx.filterByPrice(selectedValue)
        } else if (filterId === '6') {
            itemCtx.filterByDate(selectedValue)
        }
    }
    return (
        <div>
            <FilterOption onChangeFilter={onChangeFilterHandler}/> 
            {filterId!=='1' && <FilterInput filterId={filterId} onFilterChoice={filteredDataHandler} /> }
        </div>
    )
}
export default RecordFilter