import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { store } from "./store";
import { ENV } from "@config/env";
import { ToastProvider } from "@components/ui/ToastProvider";
// Importing styles
import "bootstrap/dist/css/bootstrap.min.css";
const basename = ENV.ALIAS || "";
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
                <Provider store={store}>
                        <ToastProvider>
                                <BrowserRouter basename={`/${basename}`}>
                                        <App />
                                </BrowserRouter>
                        </ToastProvider>
                </Provider>
	</React.StrictMode>
);
