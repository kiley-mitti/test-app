import React, { useState, useContext, useEffect } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  //initial states
  const modalInitial = {
    satName: '',
    satDetail: '',
    open: false,
  };

  //states go here
  const [data, setData] = useState([]);
  const [modalInfo, setModalInfo] = useState(modalInitial);

  //functions go here

  //format time
  const formatDate = (timestamp, year) => {
    //convert from unix time to milliseconds
    let date = new Date(timestamp);
    if (year) {
      date = new Intl.DateTimeFormat('en-US', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'UTC',
      }).format(date);
    } else {
      date = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'UTC',
      }).format(date);
    }
    return date;
  };

  //pop up modal with proper info
  const getModal = (satAlert) => {
    setModalInfo({
      satName: satAlert.contactSatellite,
      satDetail: satAlert.contactDetail,
      open: true,
    });
  };

  /*----------------------Sorting Stuff-------------------*/
  //sort the table rows
  const sortData = (type) => {
    let newData = data;
    //numerical types
    if (
      type === 'contactBeginTimestamp' ||
      type === 'contactName' ||
      type === 'errorTime'
    ) {
      newData = [...data].sort((a, b) => {
        return a[type] - b[type];
      });
    }
    //alphabetical type
    if (type === 'errorCategory') {
      newData = [...data].sort((a, b) => a[type].localeCompare(b[type]));
    }
    //boolean type
    if (type === 'complete') {
      newData = [
        ...data.sort((a, b) => Number(a.complete) - Number(b.complete)),
      ];
    }
    //severity special sort
    if (type === 'errorSeverity') {
      const order = ['critical', 'serious', 'caution', 'warning'];
      newData = [...data].sort(
        (a, b) => order.indexOf(a[type]) - order.indexOf(b[type])
      );
    }
    setData(newData);
  };

  /*-------------------Checkbox Stuff ----------------------*/

  //is the row complete or not?
  const checkChecked = (e, satAlert) => {
    //let me decide when it gets checked
    e.preventDefault();
    let newData = data;
    if (!e.target.checked) {
      //if its not already checked
      newData = data.map((currentAlert) => {
        if (currentAlert === satAlert) {
          return { ...currentAlert, complete: true };
        } else {
          return currentAlert;
        }
      });
    } else {
      //once checked cannot be unchecked
      return;
    }
    setData(newData);
  };

  //check every alert
  const checkAll = (e) => {
    if (!e.target.disabled) {
      e.target.disabled = true;
      const allChecked = data.map((current) => {
        return { ...current, complete: true };
      });
      setData(allChecked);
    } else {
      return;
    }
  };

  //----------------Not Sent Out via Context------------------//

  //initial data retrieval -- get our satallite data
  function getData() {
    fetch('/data/data.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //look for satalites with alerts
        const alertsOnly = data.filter(
          (satallite) => satallite.alerts.length > 0
        );

        //create a new alerts-forward array
        let alertsArray = [];
        for (let x in alertsOnly) {
          const alerts = alertsOnly[x].alerts;
          const {
            contactName,
            contactBeginTimestamp,
            contactEndTimestamp,
            contactSatellite,
            contactDetail,
          } = alertsOnly[x];

          //need to handle each instance of an alert so break them out
          for (let y in alerts) {
            const { errorSeverity, errorMessage, errorCategory, errorTime } =
              alerts[y];
            const newEntry = {
              contactName,
              contactBeginTimestamp,
              contactEndTimestamp,
              errorSeverity,
              errorTime,
              errorMessage,
              errorCategory,
              contactSatellite,
              contactDetail,
              complete: false,
            };
            alertsArray.push(newEntry);
          }
        }

        //sort array by error time
        alertsArray = alertsArray.sort((a, b) => a.errorTime - b.errorTime);
        //set our new array
        setData(alertsArray);
      })
      .catch((response) => console.log(response));
  }

  //get data once
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        modalInfo,
        setModalInfo,
        modalInitial,
        formatDate,
        getModal,
        checkChecked,
        checkAll,
        sortData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
