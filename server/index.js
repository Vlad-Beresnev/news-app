const express = require('express');
const axios = require('axios');
const cors = require('cors');
const helmet = require('helmet');

const PORT = process.env.PORT || 3001;
//beresnev.explorer
const API_KEY_EX = '8fb05a75535a4174b04a5fab022be346'
//beresnev2003vladislav
const API_KEY_B2003 = 'e17d7e997782469d864cd7023b8ad25d'
//natalberesneva
const API_KEY_NATBER = 'ef7463e349fc41afb7cd98df8ef86898'
//evgenstarex
const API_KEY_EVREX = '95eaccec17964239ab52eb71be5aa635'
//evgenstarexfi
const API_KEY_EVREXFI = '362edcc26db942f494032cfd9d6b6a93'

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

app.get("/api", (req, res) => {
    res.json({ message: "Hello from servers!" });
});

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

