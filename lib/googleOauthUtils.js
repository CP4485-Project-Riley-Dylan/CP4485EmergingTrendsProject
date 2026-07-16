import {google} from 'googleapis';
import clientPromise from './mongodb';

function getOauthUrl() {
    const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_SECRET, process.env.GOOGLE_REDIRECT_URI);

    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
    });
}

async function getGoogleUserInfo(code) {
    const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SECRET,
    process.env.GOOGLE_REDIRECT_URI
    );

    let { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    let response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    let userInfo = await response.json();

    return {id: userInfo.id, email: userInfo.email, name: userInfo.name};
}

async function updateUserInfoInDatabase(userInfo) {
    try {
        let client = await clientPromise;
        let db = client.db("budgetApp");
        
        const result = await db.collection('users').updateOne(
            { email: userInfo.email },
            {
                $set: {
                    email: userInfo.email,
                    name: userInfo.name,
                    picture: userInfo.picture,
                    googleId: userInfo.id,
                    lastLogin: new Date(),
                }
            },
            { upsert: true }
        );

        console.log('User updated:', result);
        return { ...userInfo, _id: result.upsertedId };
    } catch (e) {
        console.error('Error updating user:', e);
        throw e;
    }
}

module.exports = {
  getOauthUrl,
  getGoogleUserInfo,
  updateUserInfoInDatabase,
};
