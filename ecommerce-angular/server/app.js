const express=require('express');
const cors = require('cors');
const db=require('./shared/pool');
const app= express();
const PORT=5001;
app.use(express.json());
app.use(cors());
const userRoutes = require('./routes/user');

app.use('/users', userRoutes);
const server=app.listen(PORT,()=>{
       console.log(`Server is running on port ${PORT}`);
})
