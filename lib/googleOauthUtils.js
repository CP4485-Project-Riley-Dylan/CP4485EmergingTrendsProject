import {google} from 'googleapis';
import clientPromise from './mongodb';

function getOauthUrl() {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;
    const scope = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
    const responseType = 'code';
    const accessType = 'offline';

    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scope)}&response_type=${responseType}&access_type=${accessType}`;
    return oauthUrl;
}


function getGoogleUserInfo(accessToken) {
  return fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => response.json());
}

function updateUserInfoInDatabase(userInfo) {
  // TODO: Implement the logic to update user information in database
  console.log('Updating user info in database:', userInfo);
}

module.exports = {
  getOauthUrl,
  getGoogleUserInfo,
};