// ./src/pages/home/index.tsx
import React from 'react'

export default function Home() {
    return (
        <div>
          <h1>hello-ssr</h1>
          <button
            onClick={(): void => {
              alert("hello-ssr");
            }}
          >
            alert
          </button>
        </div>
      );
}
