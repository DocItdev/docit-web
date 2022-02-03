import React from 'react';
import { Link } from 'react-router-dom';
import GithubLogin from '../components/GithubLogin';
import GoogleLogin from '../components/GoogleLogin';

export default function Login() {

 return (
    <div>
      <h1>DocIt Login</h1>
      <GithubLogin />
      <GoogleLogin/>
    </div>
  )
}