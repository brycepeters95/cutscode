import React from "react";
import {  Button} from 'react-bootstrap'


const Modal = ({tempData, onSubmit, hide,}) =>{
    // eslint-disable-next-line no-lone-blocks
    {console.log(tempData,'ff')}
    let modalStyle ={
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)',   
    }


    return(
  <div className="modal show fade" style ={modalStyle} >
<div className="modal-dialog">
    <div className="modal-content">
        <div className="modal-header">
            <div className="modal-body">
            {tempData.map(data =>{
                return(
                <div key = {data[0]}>
                
                <h2>{data[1]}</h2>

                </div>
                )
            })}
            <Button className="button" onClick={onSubmit}>Submit</Button>
            </div>
            <button type = "button" className="btn-close" onClick={hide}></button>
        </div>
    </div>
</div>
  </div>
  );
}


export default Modal;