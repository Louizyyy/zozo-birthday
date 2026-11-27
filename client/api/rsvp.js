import { sign } from 'node:crypto';

const tokenUrl = 'https://oauth2.googleapis.com/token';
const manilaDate = new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'Asia/Manila',
  dateStyle: 'short',
  timeStyle: 'medium',
});

async function getAccessToken({ client_email, private_key }) {
  const now = Math.floor(Date.now() / 1000);
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');
  const claims = [
    encode({ alg: 'RS256', typ: 'JWT' }),
    encode({
      iss: client_email,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: tokenUrl,
      iat: now,
      exp: now + 3600,
    }),
  ].join('.');
  const signature = sign('RSA-SHA256', Buffer.from(claims), private_key).toString('base64url');
  const response = await fetch(tokenUrl, {
    method: 'POST',
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: claims + '.' + signature,
    }),
  });
  if (!response.ok) throw new Error('Google token request failed: ' + response.status);
  const { access_token } = await response.json();
  if (!access_token) throw new Error('Google token missing');
  return access_token;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { name, contact = '', attending, message = '', invitationLink } = req.body ?? {};
  if (
    typeof name !== 'string' || !name.trim() || name.trim().length > 120 ||
    typeof contact !== 'string' || (contact !== '' && !/^[0-9]{11}$/.test(contact)) ||
    (attending !== 'yes' && attending !== 'no') ||
    typeof message !== 'string' || message.length > 1000 ||
    (invitationLink !== 'Regular' && invitationLink !== 'Godparents')
  ) {
    return res.status(400).json({ error: 'Check your name, attendance, and contact number.' });
  }

  try {
    const { GOOGLE_SERVICE_ACCOUNT_JSON, GOOGLE_SHEET_ID } = process.env;
    if (!GOOGLE_SERVICE_ACCOUNT_JSON || !GOOGLE_SHEET_ID) {
      throw new Error('Google Sheets environment variables are missing');
    }
    const token = await getAccessToken(JSON.parse(GOOGLE_SERVICE_ACCOUNT_JSON));
    const sheetId = encodeURIComponent(GOOGLE_SHEET_ID.trim());
    const range = encodeURIComponent('RSVP!A:F');
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          values: [[
            manilaDate.format(new Date()), name.trim(), contact,
            attending === 'yes' ? 'Attending' : 'Declined', message.trim(), invitationLink,
          ]],
        }),
      },
    );
    if (!response.ok) throw new Error('Google Sheets append failed: ' + response.status);
    const result = await response.json();
    if (result.updates?.updatedRows !== 1) throw new Error('Google Sheets did not confirm the new row');
    return res.status(201).json({ saved: true });
  } catch (error) {
    console.error('RSVP save failed:', error.message);
    return res.status(502).json({ error: 'We couldn’t save your RSVP. Please try again.' });
  }
}
