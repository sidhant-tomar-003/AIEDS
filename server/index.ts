// const express = require('express')
// Import Prisma client
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import express, { Express, Request, Response } from "express";
import cors from "cors";

const app: Express = express();
app.use(cors());
app.use(express.json());


const port = process.env.PORT || 8000;

app.get("/", async (req: Request, res: Response) => {
  res.send("AIDES Backend!!! \n designed by HSM \n © 2024 AIDES. All rights reserved.")
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post("/adduser", async (req: Request, res: Response) => {
  try {
    const { name, img, userid, email, joined} = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        userid: userid,
      },
    });

    if (existingUser) {
      console.log(existingUser);  
      res.json(existingUser);
    } else {
      const newUser = await prisma.user.create({
        data: {
          name,
          img,
          userid,
          email,
          joined
        },
      });
      res.json(newUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post("/save_session", async (req: Request, res: Response) => {  
  // save session can be used in 2 ways: with and without session_id. 
  // With a session ID, it updates a given record
  // without a session ID, it creates a new record. 
  try {
    const { session_id, userid, time_started, title, conversation, deleted } = req.body;
    let existingSession = null;
    if (session_id) {
      existingSession = await prisma.chat_session.findUnique({
        where: {
          session_id: session_id,
        },
      });
    }
    let updatedSession = null;
    if (!existingSession) {
      updatedSession = await prisma.chat_session.create({
        data: {
          userid,
          time_started,
          title, 
          conversation,
          deleted
        }
      });
    }
    else {
      updatedSession = await prisma.chat_session.update({
        where: {
          session_id: session_id
        },
        data: {
          session_id,
          userid,
          time_started,
          title, 
          conversation,
          deleted
        }
      });
    }

    res.status(200).json(updatedSession);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error'})
  }
});


app.post("/fetch_sessions", async (req: Request, res: Response) => {
  const { user_id } = req.body;
  try {
    const sessions = await prisma.chat_session.findMany({
      where: {
        userid: user_id
      }
    });

    res.status(200).json({
      sessions: sessions
    });
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error'})
  }
});


// ########################## DEV STUFF DELETE BEFORE PUSH
app.post("/insert_nonse", async (req: Request, res: Response) => {

  try {
      // Insert rows into the chat_session table
      await prisma.chat_session.createMany({
          data: [
              {
                  userid: 'userid_value_1',
                  title: 'title_value_1',
                  conversation: 'conversation_value_1',
                  deleted: true
              },
              {
                  userid: 'userid_value_2',
                  title: 'title_value_2',
                  conversation: 'conversation_value_2',
                  deleted: false
              }
          ]
      });
      console.log('Rows inserted successfully');
      res.status(200).json({
        success: true
      })
  } catch (error) {
      console.error('Error inserting rows:', error);
      res.status(500).json({ 
        sucess: false,
        error: 'Internal server error'
      })
  }
})


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});