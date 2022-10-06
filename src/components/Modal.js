import React from 'react';
import { RuxDialog, RuxButton } from '@astrouxds/react';
import { useGlobalContext } from '../context';

const Modal = () => {
  //get context stuff as needed
  const { modalInfo, setModalInfo, modalInitial } = useGlobalContext();
  return (
    <RuxDialog open={modalInfo.open ? true : false} message={`Message: ` + modalInfo.satDetail} header={`Satallite: ` + modalInfo.satName}>
      <span slot='footer'>
        <RuxButton onClick={() => setModalInfo({ modalInitial })}>Ok</RuxButton>
      </span>
    </RuxDialog>
  );
};
export default Modal;
