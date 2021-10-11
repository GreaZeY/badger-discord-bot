const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const modmailRoleSchema = mongoose.Schema({
    _id: reqString,
    channelId: reqString
})

module.exports = mongoose.model('modmailRole-channels', modmailRoleSchema)