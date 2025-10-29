const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/image-proxy', async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).send('URL parameter is required');
    }

    // Fetch the image from the external URL with browser-like headers
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://fakestoreapi.com/',
        'Origin': 'https://fakestoreapi.com',
        'Sec-Fetch-Dest': 'image',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'same-origin',
      },
      timeout: 10000,
      maxRedirects: 5,
    });

    // Set appropriate content type
    const contentType = response.headers['content-type'] || 'image/jpeg';
    res.set('Content-Type', contentType);
    res.set('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    res.set('Access-Control-Allow-Origin', '*');
    
    res.send(response.data);
  } catch (error) {
    console.error('Error proxying image:', error.message);
    
    // Send a placeholder SVG instead of error
    const placeholderSvg = `
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="#f0f0f0"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="60">📦</text>
      </svg>
    `;
    
    res.set('Content-Type', 'image/svg+xml');
    res.send(placeholderSvg);
  }
});

module.exports = router;
