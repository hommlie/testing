const axios = require("axios");

const sendWhatsAppNotification = async ({
  campaignName,
  phoneNumber,
  userName,
  templateParams,
}) => {
  try {
    const options = {
      method: "POST",
      url: "https://backend.aisensy.com/campaign/t1/api/v2",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-AiSensy-Partner-API-Key": "123",
      },
      data: {
        apiKey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZjRkOGUxZmEwY2E3MGMwMzUyZGE4NiIsIm5hbWUiOiJIb21tbGllIFBlc3QgQ29udHJvbCIsImFwcE5hbWUiOiJBaVNlbnN5IiwiY2xpZW50SWQiOiI2NzM0M2QzYTgzMDczYjBiZWViZDZhZWUiLCJhY3RpdmVQbGFuIjoiRlJFRV9GT1JFVkVSIiwiaWF0IjoxNzQ0MDk5NTUzfQ.ZXeK_5N7yaFvDSfSnTyFg-fOtP6DocAtCwAddUJJhyk",
        campaignName: campaignName,
        destination: phoneNumber,
        userName: userName,
        // "source": string,
        // "media": {
        //    "url": mediaUrl,
        //    "filename": mediaName
        // },
        templateParams: templateParams,
        // "tags": [
        //   string
        // ],
        // "attributes": {
        //   "attribute_name": string
        // }
      },
    };

    const { data } = await axios.request(options);
    console.log(data);
  } catch (error) {
    console.error(
      "WhatsApp Notification Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

module.exports = { sendWhatsAppNotification };
