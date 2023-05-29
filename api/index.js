const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();

// En el ejemplo se conecta usando un callback lo que provoca un error ya que no acepta callbacks anymore se tiene que hacer con un async await.
// mongoose.connect(
//     process.env.MONGO_URL, 
//     {userNewUrlParser: true, useUnifiedTopology:true},
//     () => {
//     console.log("Connected to MONGODB");
// });
async function connectToDatabase() {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Conexión exitosa a la base de datos');
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
    }
  }
  
connectToDatabase();

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(8800, ()=>{
    console.log("Backend server is running! go to home page http://localhost:8800/");
});