# News-summarizing-app
JS application starter which reads news over API and displays news summary and thumbnails

This repository contains a starter for an application creating a focused news summary. However this repository does not include all the final functions condensing the news corpus which I finally made, it has most of initial major components of the solution. 

### Application components

I chose Node.js as a server because if I would want to expand the application to multiple users (like family and friends) - it will help me to handle multiple simultaneous requests. UI is done as a static page using Bootstrap which makes client-side very simple and lightweight. 

The application uses JWT token authentication. I prefer it as it is stateless and did not require from me managing any in-memory storage in addition to all other components I use. I store user credentials in Mongo DB which in my case launched on the same PC where I'm running the app. To run the application, ensure you installed Mongo DB on your machine, and save the path to "./config/.env" file. Also, ensure that your Mongo DB is running before launching the app.

*systemctl start mongod*

### API accounts which you need

After you have created the account in the application and logged in, you can request the news with its summary by pressing the button "Load News". For news article, I'm using the free API from GNews (you will need to get their API Key and save it in the config file). If you will chose to use a paid subscription from them, you will get the access to full article texts, so the news summaries will be more meaningful. I'm fetching business news in the current code, but it is possible to chose among variety of news topics.

I summarize the news with Llama 3.2, installed on my computer (as it does not have GPU, I introduced a timeout for a summary function not to get the LLM request dropped). However, it is possible to substitute it with any paid LLM API which you may have (fetching function has to be modified to reflect the syntax of the corresponding API). 

For some pieces of code I used chat-GPT to speed up the creation process.

