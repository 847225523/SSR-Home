// ./src/router.tsx
import Home from "@/pages/home";
import Demo from "@/pages/demo";


interface IRouter {
    path: string;
    element: JSX.Element;
    loadData?: (store: any) => any;
}

const router: Array<IRouter> = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/demo",
      element: <Demo />,
      loadData: Demo.getInitProps,
    },
  ];
  
  export default router;