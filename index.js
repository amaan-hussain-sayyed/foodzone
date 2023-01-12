let express = require("express");
let {route} = require("./route");

let app = express();

app.use(route)

app.listen(3000,()=>{
    console.log("done")
})