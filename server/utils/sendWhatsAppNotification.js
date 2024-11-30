const axios = require('axios');

const sendWhatsAppNotification = async (phoneNumber, message) => {
  try {
    const response = await axios.post('https://api.aisensy.com/whatsapp/waapi/v1/message', {
      apiKey: process.env.AISENSY_API_KEY,
      destination: phoneNumber,
      messageText: message,
      messageType: 'TEXT'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('WhatsApp Notification Error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

module.exports = { sendWhatsAppNotification };