const mongoose = require('mongoose')
mongoose.set("strictQuery", true)

async function startDB(){
    await mongoose.connect('mongodb+srv://davidlima:aaaaa12345@cluster0.zzup98n.mongodb.net/crud-employees')
}

module.exports = startDB