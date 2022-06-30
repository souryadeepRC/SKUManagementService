import { Fragment } from "react"
import ReactDOM from "react-dom"
import classes from './Modal.module.css'


const ModalBackdrop = props =>  <div className={classes.modal__backdrop} onClick={props.onClick} />

const ModalOverlay = props => <div className={classes.modal__overlay}>{props.children}</div>

const Modal = (props) => {
    
    return (
        <Fragment>
            {ReactDOM.createPortal(<ModalBackdrop onClick={props.onEditComplete}/>
                ,document.getElementById('ModalBackdrop'))}
            {ReactDOM.createPortal(
                <ModalOverlay>{props.content}</ModalOverlay>
                ,document.getElementById('ModalOverlay'))}
        </Fragment>
    )
}

export default Modal