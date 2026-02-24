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
        // "X-AiSensy-Partner-API-Key": "", // Not required for this API, remove or set if needed
      },
      data: {
        apiKey:
          "44dd2888bc5d524699f92a48208cb4f880496467e48b5d27cdda1eef5ba546",
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
