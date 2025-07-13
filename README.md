
## 📰 JS News Summarization App Starter

This repository provides a starter template for a JavaScript-based application that retrieves news articles from an external API and displays their summaries and thumbnails.

**Note:** This repository includes the major components of the application but does not contain the final full functionality for condensing the entire news corpus. It is intended as a base to build upon.

---

## 🔧 Application Architecture

### Backend

* **Server**: Built with **Node.js**, chosen for its ability to handle multiple simultaneous requests efficiently—making it a suitable choice for multi-user extensions (e.g., for family or small teams).
* **Authentication**: Uses **JWT (JSON Web Tokens)** for stateless authentication, avoiding the need for server-side session storage.
* **Database**: User credentials are stored in **MongoDB**, which by default runs locally on the same machine as the application.

To start MongoDB, run:

```bash
systemctl start mongod
```

Ensure MongoDB is installed and running before launching the app. You’ll also need to configure your MongoDB connection string in `./config/.env`.

---

## 🌐 Frontend

* The user interface is implemented as a **static HTML page** styled with **Bootstrap** for a lightweight and responsive design.
* Once logged in, users can click **"Load News"** to retrieve and summarize news articles.

---

## 🔑 API Access

* The application fetches news from the free [GNews API](https://gnews.io). You'll need to obtain an API key and add it to your `.env` config file.
* The free tier provides only previews of articles. For access to full article text (and thus more meaningful summaries), a paid subscription required.
* Currently, the app fetches **business news**, but you can easily switch to other categories by modifying the request parameters.

---

## 🧠 News Summarization

* News summarization is performed using **Llama 3.2**, running locally on a CPU-based machine. To handle delays during request processing I introduced a **timeout** in the fetching function.
* You can replace the local model with any commercial LLM API (e.g., OpenAI, Anthropic, Mistral, etc.) by adjusting the summarization function’s API call syntax.

---

## 💬 Notes

* Portions of the code were generated or assisted using **ChatGPT** to accelerate development.
* This project is a work in progress and serves as a base for experimenting and building more advanced apps.

---

