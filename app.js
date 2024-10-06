const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const flash = require("connect-flash")
const expressSession = require("express-session")

const db = require("./config/mongoose-connection")
const ownersRouter = require("./routes/ownersRouter")
const usersRouter = require("./routes/ownersRouter")
const productsRouter = require("./routes/ownersRouter")
const homeRouter = require("./routes/index")
require("dotenv").config()

const path = require("path")
const port = 3000

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use(expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: false
    })
)
app.use(flash())

app.use("/owners", ownersRouter)
app.use("/users", usersRouter)
app.use("/products", productsRouter)
app.use("/", homeRouter)

app.listen(port)





