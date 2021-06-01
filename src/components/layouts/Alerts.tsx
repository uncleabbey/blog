import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
// import { RootState } from '../../store';

const Alerts = (): React.ReactElement<HTMLDivElement> => {
  const msg = useSelector((state: RootState) => state.error.msg);
  useEffect(() => {
    if (msg.length > 3) {
      toast.error(`${msg}`, {
        position: toast.POSITION.TOP_CENTER,
        className: 'foo-bar',
      });
    }
  }, [msg]);
  return (
    <div>
      <ToastContainer autoClose={4000} />
    </div>
  );
};

export default Alerts;
