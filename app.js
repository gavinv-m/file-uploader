import express from 'express';
import sessionConfig from './config/session.js';
import passport from './config/passport.js';

const app = express();

// Set up session
sessionConfig(app);

// Initialise passport and passport session
app.use(passport.initialize());
app.use(passport.session());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
