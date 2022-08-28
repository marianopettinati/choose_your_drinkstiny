import './App.css';
import React from 'react';
import Modal from './components/modal/Modal';
import { useModal } from './components/modal/useModal';


function App() {
  const [modalIsOpen, openModal, closeModal] = useModal(false);

  return (
    <div className="App">
      <body className="App-body">
        <div className='wraper'>
          <h2 className='app-h2'>choose your DRINKstiny</h2>
            <button className="hit-me" onClick={openModal}/> 
          <h2 className='app-hidden-h2'>FIGHT! </h2>
          <Modal isOpen= {modalIsOpen} close= {closeModal}/> 
        </div>

        


      </body>
    </div>
  );
}

export default App;
