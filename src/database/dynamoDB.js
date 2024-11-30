import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESES_KEY, AWS_SESSION_TOKEN } from './config.js';

const client = new DynamoDBClient({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESES_KEY,
        sessionToken: AWS_SESSION_TOKEN,
    },
});

const dynamoDb = DynamoDBDocumentClient.from(client);

/**
 * Guarda una nueva sesión en la tabla sesiones-alumnos.
 * @param {Object} sessionData - Datos de la sesión.
 * @param {string} sessionData.id - ID único de la sesión.
 * @param {number} sessionData.fecha - Timestamp Unix de creación.
 * @param {number} sessionData.alumnoId - ID del alumno.
 * @param {boolean} sessionData.active - Estado de la sesión.
 * @param {string} sessionData.sessionString - Cadena aleatoria de 128 caracteres.
 */
export async function saveSession(sessionData) {
    const params = {
        TableName: 'sesiones-alumnos',
        Item: sessionData,
         ReturnValues: "ALL_OLD"
    };

    try {
        return await dynamoDb.send(new PutCommand(params));
    } catch (error) {
        console.error('Error al guardar la sesión:', error);
        throw new Error('Error al guardar la sesión en DynamoDB');
    }
}
