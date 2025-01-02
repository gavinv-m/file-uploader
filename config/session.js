import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import session from 'express-session';

dotenv.config();

const prisma = new PrismaClient();
const sessionStore = new PrismaSessionStore(prisma, {
  checkPeriod: 2 * 60 * 1000, // 2 minutes in ms
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: undefined,
});

// Exports to app.js
export default function sessionConfig(app) {
  app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: true,
      store: sessionStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
      },
    })
  );
}
