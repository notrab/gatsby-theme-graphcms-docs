import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { globalHistory } from "@reach/router";

const NavigationStateContext = createContext();
const NavigationDispatchContext = createContext();

const OPEN_NAV = "OPEN_NAV";
const CLOSE_NAV = "CLOSE_NAV";

const reducer = (state, { type }) => {
  switch (type) {
    case OPEN_NAV:
      return { ...state, isOpen: true };
    case CLOSE_NAV:
      return { ...state, isOpen: false };
    default:
      throw new Error(`Invalid action: ${type}`);
  }
};

const NavigationProvider = ({ children, currentPath }) => {
  const [state, dispatch] = useReducer(reducer, {
    isOpen: false,
  });

  const closeNav = useCallback(() => {
    dispatch({ type: CLOSE_NAV });
  }, []);

  const toggleNav = () =>
    state.isOpen ? dispatch({ type: CLOSE_NAV }) : dispatch({ type: OPEN_NAV });

  useEffect(
    () =>
      globalHistory.listen(({ action }) => {
        if (action === "PUSH") closeNav();
      }),
    [closeNav]
  );

  return (
    <NavigationStateContext.Provider value={{ ...state, currentPath }}>
      <NavigationDispatchContext.Provider value={{ closeNav, toggleNav }}>
        {children}
      </NavigationDispatchContext.Provider>
    </NavigationStateContext.Provider>
  );
};

const useNavigationState = () => {
  const context = useContext(NavigationStateContext);

  if (!context)
    throw new Error(
      "useNavigationState must be used within a NavigationProvider"
    );

  return context;
};

const useNavigationDispatch = () => {
  const context = useContext(NavigationDispatchContext);

  if (!context)
    throw new Error(
      "useNavigationDispatch must be used within a NavigationProvider"
    );

  return context;
};

export { NavigationProvider, useNavigationState, useNavigationDispatch };
