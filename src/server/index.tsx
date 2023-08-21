import express from "express";
import react from 'react'
import path from "path";
import childProcess from "child_process";
import { renderToString } from "react-dom/server";
import Home from "@/pages/home";

const app = express();
const content = renderToString(<Home />);
app.use(express.static(path.resolve(process.cwd(), "client_build")));

app.get("*", (req, res) => {
    res.send(`
      <html
        <body>
          <div id="root">${content}</div>
          <script src="/index.js"></script>
        </body>
      </html>
    `);
  });

app.listen(3001, () => {
  console.log("ssr-server listen on 3001");
});

childProcess.exec("start http://127.0.0.1:3001");