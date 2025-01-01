import { useState, useEffect } from 'react';

const Notification = ({ message, show, setShow }) => {
  useEffect(() => {
    if (show) {
      console.log('Notification shown');
      const timer = setTimeout(() => {
        setShow(false);
        console.log('Notification hidden');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, setShow]);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 animate-fade-in">
      {message}
    </div>
  );
};

export default Notification; 