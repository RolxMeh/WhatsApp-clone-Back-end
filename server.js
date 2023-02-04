import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";

import Messages from "./model.js";

//App config
const app = express();
const port = process.env.PORT || 8000;

const pusher = new Pusher({
  appId: "1471950",
  key: "980d114eaf14bcf33409",
  secret: "82eb3c676f06098ff655",
  cluster: "mt1",
  useTLS: true,
});

//Middleware
app.use(express.json());

//DB config
const connection_url =
  "mongodb+srv://Roland90:Ogeleayo90@cluster0.oxcfphv.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//API Endpoints
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("db connected");
});

// const messageCollection = db.collection("Messages");
// const changeStream = messageCollection.watch();

// changeStream.on("change", () => {
//   console.log(change);
// });

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//Listener
app.listen(port, () => console.log(`Listening on port: ${port}`));
