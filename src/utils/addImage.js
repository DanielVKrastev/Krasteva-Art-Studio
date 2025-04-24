export default async function addImage(image) {
    const imageData = new FormData();
    imageData.append("image", image);

    const uploadRes = await fetch('http://localhost:3000/upload', { // TODO: when deploy: https://api.imgur.com/3/upload
        method: 'POST',
        /*
        headers: {
                'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                },
        */
        body: imageData,
    });

    const data = await uploadRes.json();

    if (!uploadRes.ok) throw new Error(data?.error || 'Upload failed');

    return data;
}