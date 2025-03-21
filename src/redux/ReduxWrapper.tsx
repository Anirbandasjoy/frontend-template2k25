"use client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ReactNode } from "react";

interface ReduxWrapperProps {
  children: ReactNode;
}
const ReduxWrapper: React.FC<ReduxWrapperProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxWrapper;
