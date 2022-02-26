import React from 'react';
import { Link } from 'react-router-dom';
import GithubLogin from '../components/GithubLogin';


export default function Login() {

 return (
    <div>
      <h1>Login page</h1>
      <Link to="docit">
        Main Page
      </Link>
      <GithubLogin />
    </div>
  )
}