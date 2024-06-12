import { legacy_createStore } from "redux";
import { reducer } from "./reducer";




export const ReduxStore=legacy_createStore(reducer)