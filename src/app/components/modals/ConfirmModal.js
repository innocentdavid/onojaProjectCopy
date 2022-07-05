import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';


function ConfirmModal({ isOpen }) {
   const [showConfirm, setShowConfirm] = useState(isOpen);

   const handleCloseConfirm = () => setShowConfirm(false);
   const handleShowConfirm = () => setShowConfirm(true);
   const addToMetamask = () => { }

   return (
      <>
         <Modal animation={true}>
            <Modal.Header closeButton>
               <Modal.Title>Create Company</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <div className='card'>
                  <div className='card-body'>
                     <p className='card-description'> Set your company details </p>
                     <button onClick={addToMetamask}>
                        Add to metamask
                     </button>
                  </div>
               </div>
            </Modal.Body>
            <Modal.Footer className='justify-content-around'>
               <button type='button' onClick={handleCloseConfirm} className='btn btn-inverse-info'>Close</button>
            </Modal.Footer>
         </Modal>
      </>
   );
}

export default ConfirmModal;