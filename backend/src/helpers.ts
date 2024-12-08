import { JwtHeader, SignCallback } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
const client = jwksClient({ 
    jwksUri: 'https://login.microsoftonline.com/7025e04c-70ca-48bf-ab7b-73954cb846ad/discovery/keys?appid=242946e7-cf63-428f-856f-48c066921fbe',
});

export async function getKey(header: JwtHeader , callback: SignCallback) { 
    const key = await client.getSigningKey(header.kid); 
    callback(null, key.getPublicKey());
};