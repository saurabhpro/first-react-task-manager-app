import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const middleware = [thunk];

let appStore;

/*
 this is simply creating the store 
 and additionally for Chrome if we have redux debug tool extension installed we use the compose methdo to expose the store data
 https://github.com/zalmoxisus/redux-devtools-extension
*/
if (window.navigator.userAgent.includes("Chrome")) {
  appStore = createStore(
    rootReducer, // our combinedReducer
    initialState,
    compose(
      applyMiddleware(...middleware),
      /* preloadedState, */ window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
} else {
  appStore = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware))
  );
}

export default appStore;
