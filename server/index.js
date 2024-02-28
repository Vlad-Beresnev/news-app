const express = require('express');
const axios = require('axios');
const cors = require('cors');
const helmet = require('helmet');

const PORT = process.env.PORT || 3001;
//beresnev.explorer
const API_KEY_EX = process.env.API_KEY_EX
//beresnev2003vladislav
const API_KEY_B2003 = process.env.API_KEY_B2003
//natalberesneva
const API_KEY_NATBER = process.env.API_KEY_NATALBER
//evgenstarex
const API_KEY_EVREX = process.env.API_KEY_EVREX
//evgenstarexfi
const API_KEY_EVREXFI = process.env.API_KEY_EVREXFI

const apiKeys = [API_KEY_EX, API_KEY_B2003, API_KEY_NATBER, API_KEY_EVREX, API_KEY_EVREXFI]
let n = 0;

const app = express();

app.use(cors());

app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        // Add other directives as needed
      },
    },
  }));

//app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/news", async (req, res) => {
    try {
        const { isSearching, category, keyword, sortBy, language, from, to } = req.query; 
        if (isSearching === 'top-headlines') {
            const newsAPIResponse = await axios.get(`https://newsapi.org/v2/${isSearching}?apiKey=${apiKeys[n]}&category=${category}&country=us`);
            res.json(newsAPIResponse.data);
        } else {
            const newsAPIResponse = await axios.get(`https://newsapi.org/v2/${isSearching}?apiKey=${apiKeys[n]}&pageSize=20&q="${keyword}"&sortBy=${sortBy}&language=${language}&from${from}&to=${to}`);
            res.json(newsAPIResponse.data);
        }
    } catch (error) {
        if (error.response && error.response.status === 429) {
            if (n === apiKeys.length - 1) {
              n = -1;
            }
            n++;
        } else {
            console.error(error);
            res.status(500).json({ message: "Server error" })
        }
    }
});

// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// })

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

