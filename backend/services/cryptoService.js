// services/cryptoService.js
const crypto = require('crypto');
require('dotenv').config();

const algorithm = 'aes-256-cbc';
const key = process.env.APP_SECRET_KEY;
const iv = process.env.APP_SECRET_IV;

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

function decrypt(encryptedText) {
  try {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    console.error("Erro ao descriptografar:", error);
    return encryptedText; 
  }
}

module.exports = { encrypt, decrypt };