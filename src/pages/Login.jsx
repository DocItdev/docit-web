import React from "react";
import GithubLogin from "../components/GithubLogin";
import GoogleLogin from "../components/GoogleLogin";
import useAuthEffect from "../hooks/useAuthEffect";

export default function Login() {
  useAuthEffect();
  return (
    <div>
      <h1>DocIt Login</h1>
      <GithubLogin />
      <GoogleLogin />
    </div>
  );
}
