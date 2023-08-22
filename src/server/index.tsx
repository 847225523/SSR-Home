import express from "express";
import path from "path";
import childProcess from "child_process";
import router from "@/router/index";
import { Provider } from "react-redux";
import { Helmet } from "react-helmet";
import { matchRoutes, RouteObject } from "react-router-dom";
import { serverStore } from "@/store";
import { Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { renderToString } from "react-dom/server";

const app = express();
const bodyParser = require("body-parser");
app.use(express.static(path.resolve(process.cwd(), "client_build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/getDemoData", (req, res) => {
  res.send({
    data: req.body,
    status_code: 0,
  });
});
app.get("*", (req, res) => {
  const routeMap = new Map<string, () => Promise<any>>(); // path - loaddata 的map
  router.forEach((item) => {
    if (item.path && item.loadData) {
      routeMap.set(item.path, item.loadData(serverStore));
    }
  });
  // 匹配当前路由的routes
  const matchedRoutes = matchRoutes(router as RouteObject[], req.path);

  const promises: Array<() => Promise<any>> = [];
  matchedRoutes?.forEach((item) => {
    if (routeMap.has(item.pathname)) {
      promises.push(routeMap.get(item.pathname) as () => Promise<any>);
    }
  });
  Promise.all(promises).then((data) => {
    // 统一放到state里
    // 编译需要渲染的JSX, 转成对应的HTML STRING
    const content = renderToString(
      <Provider store={serverStore}>
        <StaticRouter location={req.path}>
          <Routes>
            {router?.map((item, index) => {
              return <Route {...item} key={index} />;
            })}
          </Routes>
        </StaticRouter>
      </Provider>
    );

    const helmet = Helmet.renderStatic();

    res.send(`
    <html
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.context = {
            state: ${JSON.stringify(serverStore.getState())}
          }
        </script>
        <script src="/index.js"></script>
      </body>
    </html>
  `);
  });
});

app.listen(3001, () => {
  console.log("ssr-server listen on 3001");
});

childProcess.exec("start http://127.0.0.1:3001");
