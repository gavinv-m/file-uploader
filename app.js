import express from 'express';
import sessionConfig from './config/session.js';

const app = express();

// Set up session
sessionConfig(app);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
