import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 50;
  /* padding-top: 100px; */
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;

  background-color: transparent; /*rgba(0, 0, 0, 0.4);*/
`;

//! change x and y
const ModalBody = styled.div`
  position: absolute;
  top: ${p => p.y - 95 + 'px'};
  left: ${p => p.x - 120 + 'px'};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fefefe;
  margin: auto;
  padding: 0 10px;
  box-sizing: border-box;
  border: 1px solid #888;
  max-width: 300px;
  width: 100%;
`;

const CloseButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 30px;
`;

const CloseButton = styled.span`
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;

  &:hover,
  &:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`;

const ChildrenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100px;
`;

const Portal = ({ children }) => {
  const modalRoot = document.getElementById('modal-root');

  // will mount in modal-root
  const element = document.createElement('div');

  useEffect(() => {
    modalRoot.appendChild(element);

    //cleanup
    return () => modalRoot.removeChild(element);
  });
  return createPortal(children, element);
};

const Modal = ({ children, toggle, open, x, y }) => {
  return (
    <Portal>
      {open && (
        <ModalWrapper onClick={toggle}>
          <ModalBody x={x} y={y} onClick={event => event.stopPropagation()}>
            <CloseButtonWrapper>
              <CloseButton onClick={toggle}>&times;</CloseButton>
            </CloseButtonWrapper>
            <ChildrenWrapper>{children}</ChildrenWrapper>
          </ModalBody>
        </ModalWrapper>
      )}
    </Portal>
  );
};

export default Modal;
