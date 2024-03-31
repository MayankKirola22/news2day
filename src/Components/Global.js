import { Timestamp } from "firebase/firestore";

export function time(timestamp){
    let date=new Date(timestamp.seconds*1000)
    return `${date.toDateString()} ${date.toLocaleTimeString()}`
}
export function totalCounter(array,field){
    var total=0;
    array.forEach(element => {
        total+=element[field];
    });
    return total;
}
export const sum = (array) => (array.reduce((partialSum, a) => partialSum + a, 0));

export const currentTime = () => {
    let CurrentTime=Timestamp.fromDate(new Date(Date.now()));
    return CurrentTime;
}