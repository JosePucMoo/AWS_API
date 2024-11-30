import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
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

export async function getSessionBySessionString(sessionString) {
    const params = {
      TableName: 'sesiones-alumnos',
      IndexName: 'sessionString-index', // Asegúrate de tener un índice global secundario (GSI) para `sessionString`
      KeyConditionExpression: 'sessionString = :sessionString',
      ExpressionAttributeValues: {
        ':sessionString': {S: sessionString},
        },
    };

    try {
        const data = await dynamoDb.send(new QueryCommand(params));
        return data.Items && data.Items.length > 0 ? data.Items[0] : null; // Devuelve la primera sesión encontrada
    } catch (error) {
        console.error('Error fetching session by sessionString:', error);
        throw new Error('Error fetching session');
    }
}

export async function updateActiveStatusBySessionString(session) {
    // Definimos los parámetros para actualizar el valor de 'active'
    const updateParams = {
        TableName: 'sesiones-alumnos',
        Key: {
            id: session.id, // Usamos el id del item encontrado para la actualización
        },
        UpdateExpression: 'SET active = :newActive', // Expresión para actualizar 'active'
        ExpressionAttributeValues: {
            ':newActive': session.active, // El nuevo valor para 'active'
        },
        ReturnValues: 'ALL_NEW', // Devuelve los valores después de la actualización
    };

    try {
        const updateData = await dynamoDb.send(new UpdateCommand(updateParams));
        console.log('Session updated:', updateData.Attributes);
        return updateData.Attributes; // Devuelve los atributos actualizados de la sesión
    } catch (error) {
        console.error('Error updating session:', error);
        throw new Error('Error updating session in DynamoDB');
    }
}


