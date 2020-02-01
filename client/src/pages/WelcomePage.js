import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ModalLogin from '../components/ModalLogin';
import ModalRegister from '../components/ModalRegister';

const WelcomePage = (props) => {
  const [show, setShow] = useState(false);

  const closeModal = () => setShow(false);
  const showModal = () => setShow(true);

  return (
    <>
      <h1>Welcome!</h1>

      <ModalLogin></ModalLogin>

      <ModalRegister></ModalRegister>
    </>
  );
};

export default WelcomePage;
