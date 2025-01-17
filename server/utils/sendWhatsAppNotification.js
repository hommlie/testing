const axios = require('axios');

const sendWhatsAppNotification = async ({
  campaignName,
  phoneNumber,
  userName,
  mediaUrl,
  mediaName,
  templateParams,

}) => {
  try {
    const options = {
        method: 'POST',
        url: 'https://backend.aisensy.com/campaign/t1/api/v2',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-AiSensy-Partner-API-Key': '123'
        },
        data: {
          "apiKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzQzZDNjODMwNzNiMGJlZWJkNmIzMyIsIm5hbWUiOiJIb21tbGllIiwiYXBwTmFtZSI6IkFpU2Vuc3kiLCJjbGllbnRJZCI6IjY3MzQzZDNhODMwNzNiMGJlZWJkNmFlZSIsImFjdGl2ZVBsYW4iOiJCQVNJQ19NT05USExZIiwiaWF0IjoxNzMxNDc2Nzk2fQ.vpMUCLf18YJu7biNHkfpKnzBDq73FFqPJPdag4JlcpQ",
          "campaignName": campaignName,
          "destination": phoneNumber,
          "userName": userName,
          // "source": string,
          // "media": {
          //    "url": mediaUrl,
          //    "filename": mediaName
          // },
          "templateParams": templateParams,
          // "tags": [
          //   string
          // ],
          // "attributes": {
          //   "attribute_name": string
          // }
        }
    }; 
    
    const { data } = await axios.request(options);

    // const response = await axios.post('https://api.aisensy.com/whatsapp/waapi/v1/message', {
    //   apiKey: process.env.AISENSY_API_KEY,
    //   destination: phoneNumber,
    //   messageText: message,
    //   messageType: 'TEXT'
    // }, {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });

    // return response.data;
  } catch (error) {
    console.error('WhatsApp Notification Error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

module.exports = { sendWhatsAppNotification };