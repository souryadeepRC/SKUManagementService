import classes from './FileUpload.module.css'

import { useContext, useState } from "react";
import Papa from "papaparse";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import ItemContext from '../../../store/item-context';

const allowedExtensions = ["csv"];
const FileUpload = (props) => {
    const itemContext = useContext(ItemContext)

    const [isDataPresent, setIsDataPresent] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const getFileData = async (event) => {
        setIsLoading(true)
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

                itemContext.addItem(parsedData)
                setIsDataPresent(true)
                setError('')
                setIsLoading(false)
            };
            reader.readAsText(inputFile);
        }
    }
    const handleFileChange = async (event) => {

        try {
            await getFileData(event)
        } catch (error) {
            console.log(error);
            setError(error.message)
            setIsLoading(false)
        }
    };
    const viewReportHandler = () => {
        props.onFileUpload()
    }

    return (
        <div className={classes.file_upload__container}>
            <p className={classes.file_upload__text}>Upload CSV File here</p>
            <div className={classes.file_upload__box}>
                <label>
                    <input type="file" className={classes.file_input} aria-label="File browser example"
                        onChange={handleFileChange} />
                    <span className={classes.file_upload__btn}><FontAwesomeIcon icon={faFolderOpen} /></span>
                </label>
            </div>
            {isLoading && <p>Loading...</p>}
            {error !== '' && <p className={`${classes.message} ${classes.error__message}`}>{error}</p>}
            {error === '' && isDataPresent &&
                <div className={classes.valid__data_box}>
                    <p className={`${classes.message} ${classes.success__message}`}>Data uploaded successfully</p>
                    <button className={classes.view__btn} onClick={viewReportHandler}>View Report</button>
                </div>}
        </div>)
}
export default FileUpload