import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { AsyncStatus } from '../utils/constants';
import getVar from '../config/envConfig';


export default function useAsyncForm(url = '', onSuccess = () => {}, onFailure = () => {} ) {
  const { register, handleSubmit, reset, ...props } = useForm();
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const [error, setError] = useState("");
  const userToken = useSelector((state) => state.users.token);

  const submitHandler = async (values) => {
    try {
      setStatus(AsyncStatus.LOADING);
      const response = await axios.post(
        `${getVar("API_HOST")}${url}`,
        {
          ...values
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (response.status === 200) {
        setStatus(AsyncStatus.SUCCESS);
        const data = await response.data;
        onSuccess(data);
        reset('', {
          keepValues: false,
      });
      } else {
        setStatus(AsyncStatus.FAILURE);
        setError("Please, try again");
      }
    } catch (error) {
      setStatus(AsyncStatus.FAILURE);
      setError(error.message);
      onFailure(error);
    }
  };

  return {
    ...props,
    loading: status === AsyncStatus.LOADING,
    asyncError: status === AsyncStatus.FAILURE && error,
    handleAsyncSubmit: handleSubmit(submitHandler),
    register,
  }
}
