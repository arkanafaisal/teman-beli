import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware parsing request body & cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware penanganan error saat gagal parsing JSON (malformed request)
app.use((err, req, res, next) => {
  // express.json() akan melemparkan SyntaxError jika JSON rusak
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.sendStatus(400)
  }
  next();
});

// Route awal (health check)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: "API backend aktif dan berjalan."
  });
});

app.listen(PORT, () => {
  console.log(`Server backend berjalan di http://localhost:${PORT}`);
});
