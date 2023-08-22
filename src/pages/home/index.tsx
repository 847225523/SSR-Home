// ./src/pages/home/index.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>hello-ssr</h1>
      <Helmet>
        <title>简易的服务器端渲染 - HOME</title>
        <meta name="description" content="服务器端渲染"></meta>
      </Helmet>
      <button
        onClick={(): void => {
          alert("hello-ssr");
        }}
      >
        alert
      </button>
      <div>
        <a href="http://127.0.0.1:3001/demo">链接跳转</a>
      </div>
      <div>
        <span
          onClick={(): void => {
            navigate("/demo");
          }}
        >
          路由跳转
        </span>
      </div>
    </div>
  );
}
