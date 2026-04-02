const crypto = require('crypto');

const ENCRYPTION_KEY = process.env.RECOVERY_ENCRYPTION_KEY;
if (!ENCRYPTION_KEY) {
  throw new Error('Falta RECOVERY_ENCRYPTION_KEY en .env');
}
const KEY = Buffer.from(ENCRYPTION_KEY, 'hex'); // 32 bytes en hex

const ALGORITHM = 'aes-256-gcm';

function encrypt(text) {
  const iv = crypto.randomBytes(12); // GCM recomienda 12 bytes
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'binary');
  encrypted += cipher.final('binary');
  const authTag = cipher.getAuthTag();
  // Empaquetar: iv (12 bytes) + authTag (16 bytes) + encrypted data
  return Buffer.concat([iv, authTag, Buffer.from(encrypted, 'binary')]);
}

function decrypt(encryptedBuffer) {
  const iv = encryptedBuffer.subarray(0, 12);
  const authTag = encryptedBuffer.subarray(12, 28);
  const ciphertext = encryptedBuffer.subarray(28);
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
  decipher.setAuthTag(authTag);
  let decrypted = decipher.update(ciphertext, 'binary', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = { encrypt, decrypt };