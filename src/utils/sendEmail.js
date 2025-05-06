import emailjs from 'emailjs-com';

export default async function sendEmail(templateId, templateParams) {
    try {
        await emailjs.send(
            'service_g8imi0d',
            templateId,
            templateParams,
            'NZ1X89rJNLyNly8xz'
        );
        return true; 
    } catch (error) {
        console.error('EmailJS Error:', error);
        return false;
    }
}