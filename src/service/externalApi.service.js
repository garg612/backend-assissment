import axios from "axios";

const sendToExternalApi = async (data) => {

  try {

    // Transform payload for external API
    const payload = {

      title: data.serviceType,

      body: data.projectDescription,

      userId: 1

    };

    const response = await axios.post(
      process.env.EXTERNAL_API_URL,
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.EXTERNAL_API_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;

  } catch (error) {

    console.log(
      "Error sending data to external API:",
      error.response?.data || error.message
    );

    throw error;

  }

};

export default sendToExternalApi;