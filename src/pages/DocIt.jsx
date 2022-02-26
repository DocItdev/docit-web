import React from 'react';
import { Link } from 'react-router-dom';


export default function DocIt() {
  return (
    <div>
      <h1>DocIt main page</h1>
      <Link to="/">
        Login Page
      </Link>
    </div>
  )
}