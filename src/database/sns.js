import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { AWS_BUCKET_REGION, AWS_ACCESS_KEY_ID,AWS_SESSION_TOKEN,AWS_SECRET_ACCESS_KEY, AWS_TOPIC_ARN} from "./config.js";


export const client = new SNSClient({ 
    region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        sessionToken: AWS_SESSION_TOKEN,
    },

});

export async function sendEmailSNS(alumno) {
    const status = alumno.promedio >= 7.0 ? 'Aprobado' : 'Reprobado';

    const params = {
        Message: `Alumno: ${alumno.nombres} ${alumno.apellidos}, su promedio es de : ${alumno.promedio}.
        Usted ha sido ${status}`,
        TopicArn: AWS_TOPIC_ARN,
        protocol: "email",
    };

    try {
        return await client.send(new PublishCommand(params));
    } catch (error) {
        throw new Error('Error al enviar email SNS');
    }
}