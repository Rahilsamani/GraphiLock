import crypto from "crypto";
import config from "./config.js";

const { secret_key, secret_iv, encryption_method } = config;

if (!secret_key || !secret_iv || !encryption_method) {
  throw new Error("secretKey, secretIV, and encryptionMethod are required");
}

// Generate secret hash with crypto to use for encryption
const key = crypto
  .createHash("sha256")
  .update(secret_key)
  .digest()
  .slice(0, 32);

const encryptionIV = crypto
  .createHash("sha256")
  .update(secret_iv)
  .digest()
  .slice(0, 16);

// Encrypt data
export function encryptData(data) {
  const cipher = crypto.createCipheriv(encryption_method, key, encryptionIV);
  const encrypted = Buffer.concat([
    cipher.update(data, "utf8"),
    cipher.final(),
  ]);
  return encrypted.toString("base64"); // Encrypts data and converts to base64
}

// Decrypt data
export function decryptData(encryptedData) {
  const encryptedBuffer = Buffer.from(encryptedData, "base64");
  const decipher = crypto.createDecipheriv(
    encryption_method,
    key,
    encryptionIV
  );
  const decrypted = Buffer.concat([
    decipher.update(encryptedBuffer),
    decipher.final(),
  ]);
  return decrypted.toString("utf8"); // Decrypts data and converts to utf8
}
