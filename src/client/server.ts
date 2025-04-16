import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const CLIENT_PORT = process.env.CLIENT_PORT || 5001;

app.listen(CLIENT_PORT, () => {
  console.log(`Server running on http://localhost:${CLIENT_PORT}`);
});
