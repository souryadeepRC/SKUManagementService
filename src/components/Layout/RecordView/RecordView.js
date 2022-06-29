import { Fragment, useState } from "react"
import Record from "./Record/Record"
import RecordFilter from './RecordFilter/RecordFilter'
import classes from './RecordView.module.css'

const RecordView = (props) => {
    console.log('RecordView CALLED');
    const [data,setData] = useState(props.data) 
    const updateFilteredDataHandler = (responseData) =>{ 
        setData(responseData) 
    } 
    return (
        <Fragment>
            <button className={classes.go_back_btn} onClick={() => props.onGoBack()}>Back Upload Screen</button>
            <RecordFilter inputData={props.data} onFilterChoice={updateFilteredDataHandler}/>
            <Record data={data}/>
        </Fragment>
    )
}
export default RecordView