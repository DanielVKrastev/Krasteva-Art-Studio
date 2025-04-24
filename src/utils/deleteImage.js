export default async function deleteImage(deletehash)  {
    try {
      const response = await fetch(`http://localhost:3000/delete/${deletehash}`, { //TODO: when deploy: https://api.imgur.com/3/image/${deletehash}
        method: 'DELETE',
        /*
            headers: {
            'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
            }, 
        */
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Image deleted successfully:', data);
      } else {
        console.error('Error deleting image:', data.error);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };