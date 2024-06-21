const axios = require('axios');

const ZOHO_CRM_BASE_URL = 'https://www.zohoapis.com/crm/v2/';
const ZOHO_CLIENT_ID = 'your_client_id';
const ZOHO_CLIENT_SECRET = 'your_client_secret';
const ZOHO_REDIRECT_URI = 'http://localhost:5000/auth/callback';
const ZOHO_REFRESH_TOKEN = 'your_refresh_token'; // You'll need to obtain this from the Zoho authorization process

// Function to get access token using refresh token
const getAccessToken = async () => {
  const response = await axios.post('https://accounts.zoho.com/oauth/v2/auth?response_type=code&client_id=1000.99H07MR6NOCUEX23N186J4J7F9DLTO&scope=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL,ZohoCRM.users.ALL,ZohoCRM.org.ALL&redirect_uri=http://localhost:5000/auth/callback&access_type=offline');
  return response.data.access_token;
};

const pushToCrm = async (customerData) => {
  const accessToken = await getAccessToken();

  const response = await axios.post(
    `${ZOHO_CRM_BASE_URL}Leads`,
    {
      data: [customerData],
      trigger: ['approval', 'workflow', 'blueprint']
    },
    {
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`
      }
    }
  );

  return response.data;
};

module.exports = { pushToCrm };
