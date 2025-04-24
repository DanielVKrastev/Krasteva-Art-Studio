import express from 'express';
import multer from 'multer';
import axios from 'axios';
import cors from 'cors';

const IMGUR_CLIENT_ID = "70d48422a058d29";// Позволяване на CORS за всички заявки

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Настройка на multer за качване на изображения
const storage = multer.memoryStorage(); // Записване на файловете в паметта
const upload = multer({ storage: storage });

// Route за качване на изображение
app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded' });
  }

  try {
    // Изпращаме изображението към Imgur
    const response = await axios.post(
      'https://api.imgur.com/3/upload',
      new URLSearchParams({
        image: req.file.buffer.toString('base64'), // Конвертиране на изображението в base64
      }),
      {
        headers: {
          'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // Проверяваме дали е успешен отговор
    if (response.status !== 200) {
      return res.status(500).json({ error: 'Failed to upload to Imgur' });
    }

    // Връщаме линка към каченото изображение и deletehash
    const { link, deletehash } = response.data.data;
    return res.json({ link, deletehash });
  } catch (err) {
    console.error('Error uploading image to Imgur:', err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE заявка за изтриване на изображение
app.delete('/delete/:deletehash', async (req, res) => {
    const { deletehash } = req.params;
  
    try {
      const response = await axios.delete(`https://api.imgur.com/3/image/${deletehash}`, {
        headers: {
          'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
        },
      });
  
      if (response.status === 200) {
        res.json({ message: 'Image deleted successfully' });
      } else {
        res.status(500).json({ error: 'Failed to delete image' });
      }
    } catch (err) {
      console.error('Error deleting image:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Стартиране на сървъра
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
