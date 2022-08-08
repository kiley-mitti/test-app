import React from 'react';
import './App.css';
import AlertTable from './components/AlertTable';
import Header from './components/Header';
import Modal from './components/Modal';

function App() {
  return (
    <div className='App'>
      <Header />
      <AlertTable />
      <Modal />
    </div>
  );
}

export default App;
