import { JwtHeader, SignCallback } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import  { jwksUri } from './env'

const client = jwksClient({ 
    jwksUri: jwksUri,
});
export async function getKey(header: JwtHeader , callback: SignCallback) { 
    const key = await client.getSigningKey(header.kid); 
    callback(null, key.getPublicKey());
};