import React from 'react';
import { RuxTableCell, RuxTableRow, RuxButton, RuxStatus, RuxCheckbox } from '@astrouxds/react';
import { useGlobalContext } from '../context';

// #51555B disabled color for row
const AlertRow = ({ satAlert }) => {
  //get context stuff as needed
  const { checkChecked, formatDate, getModal } = useGlobalContext();

  const err = satAlert.errorSeverity;
  const status = err === 'critical' || err === 'caution' || err === 'serious' || err === 'normal' || err === 'standby' || err === 'off' ? err : undefined;
  return (
    <RuxTableRow selected='false' style={satAlert.complete ? { background: '#51555B' } : {}}>
      <RuxTableCell>
        <RuxCheckbox name={'cb-' + satAlert.contactName} onClick={(e) => checkChecked(e, satAlert)} disabled={satAlert.complete ? true : false} checked={satAlert.complete ? true : false} />
      </RuxTableCell>
      <RuxTableCell>{status && <RuxStatus status={status} />}</RuxTableCell>
      <RuxTableCell>{formatDate(satAlert.errorTime, true)}</RuxTableCell>
      <RuxTableCell>{satAlert.errorMessage}</RuxTableCell>
      <RuxTableCell>{satAlert.contactName}</RuxTableCell>
      <RuxTableCell>{satAlert.errorCategory}</RuxTableCell>
      <RuxTableCell>
        {formatDate(satAlert.contactBeginTimestamp * 1000, true)} - {formatDate(satAlert.contactEndTimestamp * 1000)}
      </RuxTableCell>
      <RuxTableCell>
        <RuxButton onClick={() => getModal(satAlert)} disabled={satAlert.complete ? true : false} size='small'>
          Show Details
        </RuxButton>
      </RuxTableCell>
    </RuxTableRow>
  );
};

export default AlertRow;
