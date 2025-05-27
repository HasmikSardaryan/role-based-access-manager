import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import AuthRouter from './src/routers/Auth.router.js';
import PostRouter from './src/routers/Post.router.js';
import connectToDB from './db.js';


connectToDB();
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

app.use(cors({
  origin: (origin, callback) => {
    callback(null, origin); 
  },
  credentials: true
}));


app.use(AuthRouter);
app.use(PostRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
