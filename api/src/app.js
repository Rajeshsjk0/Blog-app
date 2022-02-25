const express = require('express');

const userRouter = require('./routers/userRoutes');
const postRouter = require('./routers/postRoutes');
const catRouter = require('./routers/categoryRoutes');

const app = express();

app.use(express.json());

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/categories', catRouter);

module.exports = app;
