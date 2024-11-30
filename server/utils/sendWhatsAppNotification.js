const axios = require('axios');

const sendWhatsAppNotification = async (phoneNumber, message) => {
  try {
    const options = {
        method: 'POST',
        url: 'https://apis.aisensy.com/project-apis/v1/project/{wa.aisensy.com/+919844090440}/messages',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-AiSensy-Partner-API-Key': '123'
        },
        data: {
          to: phoneNumber,
          type: 'text',
          recipient_type: 'individual',
          text: {body: message}
        }
    };    
    
    const { data } = await axios.request(options);
    console.log(data);

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