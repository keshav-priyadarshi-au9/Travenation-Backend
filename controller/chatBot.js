const express = require("express")
const router = express.Router()
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require("uuid")

const config = require("../config/googleConfig")

const projectId = config.googleProjectID
const sessionId = config.dialogFlowSessionID
const languageCode = config.dialogFlowSessionLanguageCode



// Create a new session
const sessionClient = new dialogflow.SessionsClient({
  keyFilename:"E:/Travenation-Backend/travenation-chatbot-ryoc-230943f0e965.json"
});
const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);





//client query 

router.post('/', async (req,res)=>{
    // The text query request.
    console.log(req.body.text)
    const request = {
      session: sessionPath,
      queryInput: {
          text: {
              // The query to send server
              text: req.body.text,
              // The language used by the client (en-US)
              languageCode: languageCode,
          },
      },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);

  res.send(result.fulfillmentText)

})


//checking the health
router.get('/health',(req,res)=>{ 
    res.send({auth:true, message:"Health is Ok"})
})



module.exports=router