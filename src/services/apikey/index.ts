import crypto from 'crypto';
import ApiKeyModel from '../../database/apiManagementSchema';

export interface ApiKeyRecord {
    id: string;
    manufacturerId: string;
    apiKey: string;
    active: boolean;
    createdAt: Date;
  }

export const getApiKey = async (manufacturerId: string): Promise<ApiKeyRecord | null> => {
    try {
        const found = await ApiKeyModel.findOne({ manufacturerId: manufacturerId });
        if (!found) {
            return null;
        }
        return {
            id: found.id,
            manufacturerId: found.manufacturerId,
            apiKey: found.apiKey,
            active: found.active,
            createdAt: found.createdAt,
        };
    } catch (error) {
        console.error('Failed to find API key:', error);
        throw new Error('Unable to find API key');
    }
}
export const createApiKey = async (manufacturerId: string): Promise<ApiKeyRecord> => {
    try {
        const id = crypto.randomUUID();
        const apiKey = crypto.randomBytes(32).toString('hex');
        const createdAt = new Date();

        const doc = await ApiKeyModel.updateOne({
            manufacturerId: manufacturerId,
        }, {
            id: id,
            apiKey: apiKey,
            createdAt: createdAt,
        }, {
            upsert: true,
        });
        
        return {
            id,
            manufacturerId,
            apiKey,
            active: true,
            createdAt,
        };

    } catch (error) {
        console.error('Failed to create API key:', error);
        throw new Error('Unable to generate API key');
    }
}

export const findApiKey = async (apiKey: string): Promise<ApiKeyRecord | null> => {
    try {
        const found = await ApiKeyModel.findOne({ apiKey: apiKey });
        if (!found) {
            return null;
        }
        return {
            id: found.id,
            manufacturerId: found.manufacturerId,
            apiKey: found.apiKey,
            active: found.active,
            createdAt: found.createdAt,
        };
    } catch (error) {
        console.error('Failed to find API key:', error);
        throw new Error('Unable to find API key');
    }
}