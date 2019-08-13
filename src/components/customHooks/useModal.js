import React, { useState, useCallback } from 'react';

const useModal = initialValue => {
  const [toggle, setToggle] = useState(initialValue);

  return [toggle, useCallback(() => setToggle(status => !status), [])];
};

export default useModal;
