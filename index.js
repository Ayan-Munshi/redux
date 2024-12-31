import {createStore} from "redux"
import { applyMiddleware } from "redux";
import logger from "redux-logger";
import { thunk } from "redux-thunk";
import axios from "axios";

const inc = "increment"
const dec = "decrement"
const incByVal = "incrementByValue"
const initAmount = "initialAmount"



const reducer = (state = {amount:0}, action) => {
    if(action.type === inc){
        console.log("type 1", state.amount);       
        return {amount : state.amount + 1}
    }
    if(action.type === dec){
        return {amount : state.amount - 1}
    }
    if(action.type === incByVal){
        return {amount : state.amount + action.payload}
    }
    if(action.type === initAmount){   
        console.log("Dispatched amount:", action.payload);  
        return {amount : action.payload}        
    }
    return state;
    
}

const store = createStore(reducer , applyMiddleware(logger.default , thunk)) 
// logger middleware shows initial amount(0) , action , action type , nextstep 
// thunk middleware is here for async function(fetching data) 
// because we want to wait before dispatching paload for the get aync function 
const history = []


// store.subscribe(() => {
//     history.push(store.getState())
//     console.log(history,"this is state history");
    
// })

function increment () {  // we can create a function for dispatching type increment
    return {type : "increment"}
}

function incrementByValue (value) {
    return {type : "incrementByValue" , payload : value}
}

// async function initialAmount (dispatch,getState) {
//    const {data} = await axios.get("http://localhost:3000/accounts/1")
//    dispatch({type:initAmount, payload: data.amount})
   
// }

function initialAmount (id) {
    return async (dispatch,getState) => {
        const {data} = await axios.get(`http://localhost:3000/accounts/${id}`)
        dispatch({type:initAmount, payload: data.amount})
    }
    
 }


// setInterval(() => {
//     // these 2 dispatches will run simultaniously
//     // store.dispatch(increment())
//     // store.dispatch(incrementByValue(5))
//     store.dispatch(initialAmount)
// },1000)

// store.dispatch(initialAmount)

store.dispatch(increment())
store.dispatch(initialAmount(3)) // sending the id number


