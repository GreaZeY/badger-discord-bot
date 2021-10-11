const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const aibotchanSchema = mongoose.Schema({
    _id: reqString,
    channelId: reqString
})

module.exports = mongoose.model('aibotchan-channels', aibotchanSchema)