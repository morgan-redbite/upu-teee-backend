import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';

// Generate a DID Document
// Note: This is a simple example and should be customized to your needs.
const generateDIDDocumet = async () => {
  try {
    // Example "did:uminai:<uuid4>"
    const uniqueId = uuidv4();
    // E.g. did:prism:c36cd59bbc62dee1925e1343a8fed051416e417116d6169d060746f1e6816cd4
    const didDocument = {
      "@context": [
        "https://www.w3.org/ns/did/v1",
        "https://w3id.org/security/suites/ed25519-2020/v1"
      ],
      "id": `did:uminai:${uniqueId}`,
      "verificationMethod": [
        {
          "id": `did:uminai:${uniqueId}#key-1`,
          "type": "Ed25519VerificationKey2020",
          "controller": `did:uminai:${uniqueId}`,
          "publicKeyMultibase": "z6MkkVbyHJLLjdjU5B62DaJ4mkdMdUkttf9UqySSkA9bVTeZExample",
        },
      ],
      "authentication": [
        `did:uminai:${uniqueId}#key-1`,
      ],
      "controller": [
        `did:uminai:${uniqueId}`,
      ],
      "service": [
        {
          "id": `did:uminai:${uniqueId}#service-1`,
          "type": "uminaiWeb3Service",
          "serviceEndpoint": "https://api.uminai.com/services/web3/"
        }
      ]
    };

    const cid = await uploadDIDDocument({ uDID: uniqueId, uDIDDocument: didDocument });
    return { uniqueId, cid };
  } catch (error) {
    console.error(error);
  }
}

// Upload DID Document to IPFS
const uploadDIDDocument = async ({ uDID, uDIDDocument }: { uDID: any, uDIDDocument: any }) => {
  try {
    const fileName = `did_uminai_${uDID}`;
    // check if uDIDDocument is JSON
    const isJSON = typeof uDIDDocument === 'object' && uDIDDocument !== null;
    if (!isJSON) {
      throw new Error('uDIDDocument is not a valid JSON');
    }
    const jsonString = JSON.stringify(uDIDDocument);
    // Create a temporary JSON file
    const filePath = path.join(__dirname + '/tmp', `${fileName}`);
    fs.writeFileSync(filePath, jsonString);

    // Create a FormData instance and append the file and path
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));
    formData.append('path', '/');
    // Upload DID Document to IPFS
    const response = await axios.post(`https://api.chainsafe.io/api/v1/bucket/${process.env.CHAINSAFE_BUCKET_ID}/upload`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${process.env.CHAINSAFE_API_KEY}`,
          ...formData.getHeaders(),
        },
      }
    );
    fs.unlinkSync(filePath);
    console.log('response', response.data);
    if (response.data.files_details[0].status) {
      return response.data.files_details[0].cid;
    } else {
      throw 'Error uploading JSON file';
    }
  } catch (error) {
    console.error(error);
  }
}

export {
  generateDIDDocumet,
  uploadDIDDocument,
}