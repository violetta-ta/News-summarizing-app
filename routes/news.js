import express from 'express';
import fetch from 'node-fetch';
import { NEWS_API_KEY,LOCAL_MODEL } from '../config/config.js';
import axios from 'axios'

const  newsRoutes = express.Router();

newsRoutes.get('/today', async (req, res) => {
    console.log('[HIT] /news/today');
    try {
      const apiUrl = `https://gnews.io/api/v4/search?q=business&lang=en&country=us&max=10&apikey=${NEWS_API_KEY}`;
      console.log('[DEBUG] Requesting:', apiUrl);
  
      const response = await fetch(apiUrl);
      const text = await response.text();
  
      console.log('[DEBUG] Raw response:', text.slice(0, 200)); // log first 200 chars
  
      if (!response.ok) {
        return res.status(response.status).json({
          error: 'Failed to fetch news',
          detail: text
        });
      }
  
      const data = JSON.parse(text);
      const parsed = data.articles.slice(0, 10).map(a => ({
        title: a.title,
        description: a.description,
        image_url: a.image,
        url: a.url
      }));

      const descriptions = parsed.map(article => article.description || '');
      let summarized = await summaryText(`Summarize following mesages: ${JSON.stringify(descriptions)}`);

      res.json({
        summarized,
        articles: parsed
      });


  
    } catch (err) {
      console.error('[ERROR]', err);
      res.status(500).json({ error: 'Internal server error', detail: err.message });
    }
  });
  

export async function summaryText(question) {
  const urlModel = process.env.LOCAL_MODEL;
  console.log(`my texts are: ${question}`)
  console.log("Prompt length:", question.length);
  console.log("Prompt preview:", question.slice(0, 200));
  question = question.replace(/[\u0000-\u001F\u007F-\u009F]/g, "")

  const reqModel = {
    model: "llama3.2",
    prompt:  question,
    stream: false
  };
  
  try {
    const response = await axios.post(urlModel, reqModel, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 20000000  
    });
    if (!response.data || !response.data.response) {
      console.log("No valid response from LLaMA model.")
      return JSON.stringify({ error: "No valid response from LLaMA model." });
    } else {
      console.log(JSON.stringify({ answer: response.data.response }))
      return (response.data.response );
    }

  } catch (error) {
    console.error("Error during LLaMA API call:", error);
    return JSON.stringify({ error: "Failed to get response from LLaMA model." });
  }
    };


export default newsRoutes;

