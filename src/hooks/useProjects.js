import { useState, useEffect } from 'react';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { setProjects } from '../ducks/projects';
import { AsyncStatus } from '../utils/constants';
import getVar from '../config/envConfig';

export default function useProjects() {
  const projects = useSelector(state => state.projects.projects);
  const userToken = useSelector(state => state.users.token);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const [error, setError] = useState('');

  useEffect(() => {
    const getAllProjects = async () => {
      try {
        const opts = {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        };
        setStatus(AsyncStatus.LOADING)
        const response = await axios.get(`${getVar('API_HOST')}/api/projects/all`, opts);
        if(response.status === 200) {
          dispatch(setProjects(response.data.projects));
          setStatus(AsyncStatus.SUCCESS);
        } else {
          setStatus(AsyncStatus.FAILURE);
          setError('Cannot retrieve project data');
        }
      } catch(error) {
        setStatus(AsyncStatus.FAILURE);
        setError(error.message);
      }
    };
    if (userToken) {
      getAllProjects();
    }
  },[userToken])

  return {
    loading: status === AsyncStatus.LOADING,
    error: status === AsyncStatus.FAILURE && error,
    projects,
  }
}