/*
import { formatCurrency } from "../scripts/utils/money.js";

if(formatCurrency(2000.4) === '20.00'){
    console.log('passed');
}else{
    console.log('failed');
}

  */


let promise = new Promise((resolve, reject)=>{
    console.log('its a promise');
    
});


function getData(val) {
    return new Promise((resolve, reject) =>{
        reject("Success");
    })
}

const pomise = getData(1);
pomise.then(()=>{
    console.log('Promise fullfilled');
})
pomise.catch(()=>{
    console.log('Rejected');
    
})