import React from 'react';
import {
  RuxCheckbox,
  RuxIcon,
  RuxTable,
  RuxTableBody,
  RuxTableHeader,
  RuxTableHeaderCell,
  RuxTableHeaderRow,
} from '@astrouxds/react';
import AlertRow from './AlertRow';
import { useGlobalContext } from '../context';

const AlertTable = () => {
  //get context stuff as needed
  const { data, checkAll, sortData } = useGlobalContext();

  return (
    <RuxTable>
      <RuxTableHeader>
        <RuxTableHeaderRow>
          <RuxTableHeaderCell>
            <RuxCheckbox onClick={checkAll} />
            <RuxIcon
              size='small'
              icon='arrow-drop-down'
              onClick={() => sortData('complete')}
            />
          </RuxTableHeaderCell>
          <RuxTableHeaderCell>
            Severity
            <RuxIcon
              size='small'
              icon='arrow-drop-down'
              onClick={() => sortData('errorSeverity')}
            />
          </RuxTableHeaderCell>
          <RuxTableHeaderCell>
            Error Time (UTC)
            <RuxIcon
              size='small'
              icon='arrow-drop-down'
              onClick={() => sortData('errorTime')}
            />
          </RuxTableHeaderCell>
          <RuxTableHeaderCell>Alert message</RuxTableHeaderCell>
          <RuxTableHeaderCell>
            Contact Name
            <RuxIcon
              size='small'
              icon='arrow-drop-down'
              onClick={() => sortData('contactName')}
            />
          </RuxTableHeaderCell>
          <RuxTableHeaderCell>
            Category
            <RuxIcon
              size='small'
              icon='arrow-drop-down'
              onClick={() => sortData('errorCategory')}
            />
          </RuxTableHeaderCell>
          <RuxTableHeaderCell>
            Contact Time (UTC)
            <RuxIcon
              size='small'
              icon='arrow-drop-down'
              onClick={() => sortData('contactBeginTimestamp')}
            />
          </RuxTableHeaderCell>
          <RuxTableHeaderCell></RuxTableHeaderCell>
        </RuxTableHeaderRow>
      </RuxTableHeader>
      <RuxTableBody>
        {data.map((satAlert, index) => {
          return <AlertRow satAlert={satAlert} key={index} />;
        })}
      </RuxTableBody>
    </RuxTable>
  );
};

export default AlertTable;
