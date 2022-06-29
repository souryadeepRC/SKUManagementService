import { Fragment, useEffect, useState } from "react"
import Record from "./Record/Record"
import RecordFilter from './RecordFilter/RecordFilter'

const RecordView = (props) => {
    console.log('RecordView CALLED');
    const [data,setData] = useState(props.data) 
    const updateFilteredDataHandler = (responseData) =>{ 
        setData(responseData) 
    } 
    return (
        <Fragment>
            <button onClick={() => props.onGoBack()}>Back Upload Screen</button>
            <RecordFilter inputData={props.data} onFilterChoice={updateFilteredDataHandler}/>
            <Record data={data}/>
        </Fragment>
    )
}
export default RecordView