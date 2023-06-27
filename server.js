import "dotenv/config";
import app from "./src/app";
import connectDB from "./config/database";

connectDB();

const PORT = 3000;

const handleListening = () => {
  console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);
};

app.listen(PORT, handleListening);
