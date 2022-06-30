import classes from './FileUpload.module.css'

import { useContext, useState } from "react";
import Papa from "papaparse";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import ItemContext from '../../../store/item-context';

const allowedExtensions = ["csv"];
const FileUpload = (props) => {
    const itemCtx = useContext(ItemContext)
 
    const [error, setError] = useState(''); 

    const isValidFormat = (keys) => {
        return (keys[0] === 'ID' && keys[1] === 'SKU' && keys[2] === 'Product Name'
            && keys[3] === 'Price' && keys[4] === 'Date')
    }
    
    const getFileData = async (event) => { 
        if (event.target.files.length) {
            const inputFile = event.target.files[0];
            const fileExtension = inputFile?.type.split("/")[1];
            if (!allowedExtensions.includes(fileExtension)) {
                throw new Error("Please input a csv file");
            }
            if (!inputFile) throw new Error("Enter a valid file");

            const reader = new FileReader();
            reader.onload = async ({ target }) => {
                const csv = Papa.parse(target.result, { header: true });
                const parsedData = csv?.data;
                const keys = Object.keys(parsedData[0])
  
                if (isValidFormat(keys)){
                    itemCtx.addItem(parsedData) 
                    setError('')
                }else{
                    setError('Invalid Heading Format.Please see Instructions')
                } 
            };
            reader.readAsText(inputFile);
        }
    }
    const handleFileChange = async (event) => {
        try {
            await getFileData(event)
        } catch (error) {
            setError(error.message) 
        }
    };
    const viewReportHandler = () => {
        props.onFileUpload()
    }

    return (
        <div className={classes.file_upload__container}>
            <details className={classes.instruction}>
                <summary>Instructions</summary>
                <ul>
                    <li>Please fill a heading in CSV file</li>
                    <li>keep the heading like this :: ID,SKU,Product Name,Price,Date</li>
                    <li>All headings are case sensitives. Also maintain the same order.</li>
                    <li>For Price don't put any alphabetic character values. (e.g. 105 is valid , 105A is not valid ) </li>
                    <li>For Date please maintain this format.[YYYY-MM-DD] (e.g. 2022-06-29 is valid , 2022/06/29 is not valid ) </li>
                </ul>
            </details>
            <p className={classes.file_upload__text}>Upload CSV File here</p>
            <div className={classes.file_upload__box}>
                <label>
                    <input type="file" className={classes.file_input} aria-label="File browser example"
                        onChange={handleFileChange} />
                    <span className={classes.file_upload__btn}><FontAwesomeIcon icon={faFolderOpen} /></span>
                </label>
            </div> 
            {error !== '' && <p className={`${classes.message} ${classes.error__message}`}>{error}</p>}
            {error === '' && itemCtx.itemData.length!==0 &&
                <div className={classes.valid__data_box}>
                    <p className={`${classes.message} ${classes.success__message}`}>Data uploaded successfully</p>
                    <button className={classes.view__btn} onClick={viewReportHandler}>View Report</button>
                </div>}
        </div>)
}
export default FileUpload