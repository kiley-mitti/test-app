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
  const { data, checkAll } = useGlobalContext();

  return (
    <RuxTable>
      <RuxTableHeader>
        <RuxTableHeaderRow>
          <RuxTableHeaderCell>
            <RuxCheckbox onClick={checkAll} />{' '}
            <RuxIcon size='small' icon='arrow-drop-down' />
          </RuxTableHeaderCell>
          <RuxTableHeaderCell>Severity</RuxTableHeaderCell>
          <RuxTableHeaderCell>Error Time (UTC)</RuxTableHeaderCell>
          <RuxTableHeaderCell>Alert message</RuxTableHeaderCell>
          <RuxTableHeaderCell>Contact Name</RuxTableHeaderCell>
          <RuxTableHeaderCell>Category</RuxTableHeaderCell>
          <RuxTableHeaderCell>Contact Time (UTC)</RuxTableHeaderCell>
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
