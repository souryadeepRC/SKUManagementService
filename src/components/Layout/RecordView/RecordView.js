import { Fragment, useCallback, useState } from "react"
import Modal from "../../UI/Modal/Modal"
import RecordEdit from "../RecordEdit/RecordEdit"
import Record from "./Record/Record"
import RecordFilter from './RecordFilter/RecordFilter'
import classes from './RecordView.module.css'

const RecordView = (props) => {
    console.log('RecordView CALLED'); 
    const [recordEditId,setRecordEditId] = useState('')
    const showModalHandler = useCallback((itemId) => {  
        setRecordEditId(itemId);
    },[])
    const closeModalHandler = useCallback(() => {
        setRecordEditId('')
    },[])
    return (
        <Fragment>
            <button className={classes.go_back_btn} onClick={() => props.onGoBack()}>Back Upload Screen</button>
            <RecordFilter/>
            <Record onshowModal={showModalHandler}/>
            {recordEditId!=='' && <Modal content={<RecordEdit itemId={recordEditId} onEditComplete={closeModalHandler}/>} 
            onClick={closeModalHandler}/>}
        </Fragment>
    )
}
export default RecordView