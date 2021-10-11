const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const msglogSchema = mongoose.Schema({
    _id: reqString,
    channelId: reqString
})

module.exports = mongoose.model('msglog-channels', msglogSchema)