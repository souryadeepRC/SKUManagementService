import { Fragment } from "react"
import Record from "./Record/Record"
import RecordFilter from './RecordFilter/RecordFilter'
import classes from './RecordView.module.css'

const RecordView = (props) => {
    console.log('RecordView CALLED'); 
  
    return (
        <Fragment>
            <button className={classes.go_back_btn} onClick={() => props.onGoBack()}>Back Upload Screen</button>
            <RecordFilter/>
            <Record/>
        </Fragment>
    )
}
export default RecordView