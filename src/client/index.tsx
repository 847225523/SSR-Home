// src/client/index.tsx

import { hydrateRoot } from "react-dom/client";
import Home from "@/pages/home";

hydrateRoot(document.getElementById("root") as Document | Element, <Home />);
