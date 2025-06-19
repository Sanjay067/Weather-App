let date="2025-06-17 10:00:00";

let dateObj=new Date(date);

console.log(dateObj);

let fdate=dateObj.toLocaleDateString('en-GB',{
    day:'2-digit',
    month:'long',
    year:'numeric'
})

console.log(fdate);