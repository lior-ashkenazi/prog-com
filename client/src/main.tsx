import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store/index.ts";
import "./index.css";
import App from "./App.tsx";
import HomePage from "./pages/home/HomePage.tsx";
import ChatsPage from "./pages/chats/ChatsPage.tsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

const NODE_ENV = import.meta.env.VITE_NODE_ENV as string;

if (NODE_ENV === "production") disableReactDevTools();

const router = createMemoryRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/chats" element={<ChatsPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
