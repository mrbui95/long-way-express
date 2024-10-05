const mongoose = require('mongoose')

const dbConnect = async () => {
    const username = encodeURIComponent("thanhbui12");
    const password = encodeURIComponent("thanhbui123");

    url = `mongodb+srv://${username}:${password}@cluster0.rrzte.mongodb.net/long_way_express?retryWrites=true&w=majority&appName=Cluster0`

    mongoose.connect(url).then(() => {
        console.log("Successfully connected to the MongoDB Atlas!")
    }).catch((e) => {
        console.error(e)
    })
}

module.exports = dbConnect

