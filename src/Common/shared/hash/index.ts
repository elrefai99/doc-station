import CryptoJS from 'crypto-js'

export const hashPromoCode = (code: string): string => {
     return CryptoJS.SHA256(code.trim().toLowerCase()).toString();
};

export const encryptDataFunction = (data: any, secretKey: string): string => {
     let encrypted: string = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString()
     return encrypted;
}

export const decryptDataFunction = (encryptedData: any, secretKey: string) => {
     const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
     const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
     const data = JSON.parse(decryptedData)
     return data;
}
