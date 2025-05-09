import emailjs from 'emailjs-com';

export default async function sendEmail(templateId, templateParams) {
    try {
        await emailjs.send(
            'service_84vk66c',
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