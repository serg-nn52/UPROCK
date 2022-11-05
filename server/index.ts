import express = require("express");
import fs = require("fs");
import cors = require("cors");
import path = require("path");

const jsonParser = express.json();
const app = express();
app.use(cors());
const filePath = "./server/data.json";
const PORT = process.env.PORT || 5000;
const corsReq = cors();

type TUserType = {
  id: string;
  email: string;
  name: string;
  photo: string;
  token: string;
  password: string;
};

app.post("/api/users", corsReq, jsonParser, (req, res) => {
  try {
    if (!req.body) {
      return res.status(401).send();
    }

    const {
      body: { email, password },
    } = req;
    const data = fs.readFileSync(filePath, "utf-8");
    const users: TUserType[] = JSON.parse(data);
    const user = users.filter(
      (el) => el.email === email && el.password === password
    )[0];
    if (user) {
      res.status(200).send(user);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

app.use(express.static(path.resolve(__dirname, "../dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Start server port ${PORT} on http://localhost:${PORT}`);
});
