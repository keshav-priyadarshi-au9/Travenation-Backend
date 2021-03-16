const express = require("express")
const router = express.Router()
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require("uuid")
const sessionId = uuid.v4();  // A unique identifier for the given session




// router.get('/',(req,res)=>{
//     res.send({message:"welcome to bot message"})
// })

router.post('/',(req,res)=>{

    console.log(req.body)

    runSample(req.body.userReply).then(data=>{

      res.send(data)

    })

})



/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(userReply ,projectId = 'travenation-chatbot-ryoc') {
 
  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
      keyFilename:"E:/Travenation-Backend/dialogflowConfig/travenation-chatbot-ryoc-230943f0e965.json"
  });
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: userReply,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  } 

  return result.fulfillmentText
}

module.exports=router