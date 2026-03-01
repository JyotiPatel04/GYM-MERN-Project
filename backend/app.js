import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { sendEmail } from "./utils/sendEmail.js";

config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://gym-mern-project.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("GYM Backend Running");
});

app.post("/send/mail", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please provide all details",
    });
  }

  try {
    await sendEmail({
      email: process.env.SMTP_MAIL,
      subject: "GYM WEBSITE CONTACT",
      message,
      userEmail: email,
    });

    return res.status(200).json({
      success: true,
      message: "Message Sent Successfully.",
    });
  } catch (error) {
    console.error("Email sending error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening at port ${process.env.PORT || 5000}`);
});