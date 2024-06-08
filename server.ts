require('dotenv').config()
import app from "./app";


// create server
app.listen(process.env.PORT, () => {
    console.log("server is connected");
});
