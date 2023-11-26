const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const connectMongoDB = require('./database/connection')
const authRouter = require('./routes/authRouter');
const cartRouter = require('./routes/cartRouter');
const adminRouter = require('./routes/adminRouter');
const refreshRouter = require('./routes/refreshRouter');
const productRouter = require('./routes/productRouter');
const paymentRouter = require('./routes/paymentRouter');
const userRouter = require('./routes/userRouter');
const errorHandler = require('./middleware/errorHandler');
const store = require('./database/sessionStore');

dotenv.config()

const app = express();
const port = process.env.PORT || 4000

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store:store
}));app.use(cors({origin:true,credentials:true}))
app.use(errorHandler)
app.use(express.static('public'));

connectMongoDB()


// app.use((req,res,next) => {
//    console.log('logged as ', req.session);
//    next()
// })

app.use('/api/refresh', refreshRouter);
app.use('/api/auth', authRouter);
app.use('/api/cart', cartRouter);
app.use('/api/products', productRouter);
app.use('/api/user', userRouter);
app.use('/api/payment', paymentRouter);




app.use('/api/admin', adminRouter);

app.listen(port, () => {
   console.log('server is running on port ',port);
})


module.exports = app;
