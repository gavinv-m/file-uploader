import express from 'express';
import sessionConfig from './config/session.js';
import passport from './config/passport.js';
import flash from 'connect-flash';
import path from 'node:path';
import appRoutes from './routes/app-routes.js';

const app = express();
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (form submissions)
app.use('/public', express.static('public'));
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'ejs');

// Set up session
sessionConfig(app);

// Initialise passport and passport session
app.use(passport.initialize());
app.use(passport.session());

// Initialize flash middleware
app.use(flash());

// Routes
app.use('/', appRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
