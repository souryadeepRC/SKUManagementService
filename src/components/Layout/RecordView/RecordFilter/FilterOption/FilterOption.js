import classes from './FilterOption.module.css'
const FilterOption = (props) => {
    const changeFilterHandler = (event) => {
        event.preventDefault()
        const choice = event.target.value
       /*  if (choice === '1') {
            props.onFilterChoice(inputData)
        } */
        props.onChangeFilter(choice)
    } 
    return (
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
    )
}
export default FilterOption