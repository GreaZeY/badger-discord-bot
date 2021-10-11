const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const sessionId = uuid.v4();
const vars = {
  "type": "service_account",
  "project_id": "greazey-xqnl",
  "private_key_id": process.env.private_key_id,
  "private_key": process.env.private_key,
  "client_email": "support@greazey-xqnl.iam.gserviceaccount.com",
  "client_id": process.env.client_id,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": process.env.client_x509_cert_url
}

console.log(vars)

///////////////////////////////////////////////////////----------------------aibot----------------------//////////////////////////////////////////////////////////////////////////////////////////////////
/** 
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
module.exports= async function(msg, projectId = 'greazey-xqnl') {
    // A unique identifier for the given session
    // Create a new session
    const sessionClient = new dialogflow.SessionsClient({
      keyFilename: vars
    });
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: msg,
          // The language used by the client (en-US)
          languageCode: 'en-US',
        },
      },
    };
    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    //console.log(`  Query: ${result.queryText}`);
    return result;
  }
  //////////////////////////////////////////////////////-----------------------end of aibot----------------------///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  






