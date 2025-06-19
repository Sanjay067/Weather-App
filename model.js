const mongoose =require('mongoose');

main()
.then(()=>{
  console.log("connected to db")
})
.catch((err)=>{
  console.log('Error in db :',err);
})


let dataSchema = mongoose.Schema({
  date: String,
  time: String,
  por: String,
  clouds: String
});

let Record = mongoose.model('Record', dataSchema);

async function main() {
  mongoose.connect('mongodb://localhost:27017/WeatherApp');
}

module.exports=Record;