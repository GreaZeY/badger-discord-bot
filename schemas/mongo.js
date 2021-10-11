const mongoose = require('mongoose')


module.exports = async () => {

    await mongoose.connect(process.env.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    return mongoose
}
