import React from 'react';
import { RuxDialog } from '@astrouxds/react';
import { useGlobalContext } from '../context';
import { useEffect } from 'react';

const Modal = () => {
  //get context stuff as needed
  const { modalInfo, acknowledge, setModalInfo, modalInitial } = useGlobalContext();
  console.log(modalInfo);
  const parseEvent = (e) => {
    if (e.detail) {
      acknowledge(modalInfo.contactId);
    } else {
      setModalInfo(modalInitial);
    }
  };
  useEffect(() => {
    const modal = document.querySelector('rux-dialog');
    modal.addEventListener('ruxdialogclosed', parseEvent);

    return () => {
      modal.removeEventListener('ruxdialogclosed', parseEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalInfo]);

  return (
    <>
      <RuxDialog open={modalInfo.open ? true : false} message={`Message: ` + modalInfo.satDetail} header={`Satallite: ` + modalInfo.satName} confirm-text='Acknowledge' deny-text='Cancel'></RuxDialog>
    </>
  );
};
export default Modal;
