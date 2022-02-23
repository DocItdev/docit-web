import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import useAuthEffect from '../hooks/useAuthEffect';

export default function DocIt() {
  useAuthEffect();
  return (
    <div>
      <h3>DocIt main page</h3>
      <Sidebar />
    </div>
  )
}