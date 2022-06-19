// import env
const { APP_NAME, LISTEN_PORT, APP_HOST, PORT } = require("./src/helpers/env");
// importexpressjs
const express = require("express");
// import cors
const cors = require("cors");
// import xss-clean
const xssClean = require("xss-clean");
// import helmet
const helmet = require("helmet");
// importbody-parser
const bodyParser = require("body-parser");
// import-dotenv
require("dotenv").config();
// import-route
const authRoute = require("./src/routes/auth.route");
const workerRoute = require("./src/routes/worker.route");
const portoRoute = require("./src/routes/portofolio.route");
const workExpRoute = require("./src/routes/workExperience.route");
const recruiterRoute = require("./src/routes/recruiter.route");

const app = express();

app.use(
	helmet({
		crossOriginEmbedderPolicy: false,
		crossOriginResourcePolicy: false,
	})
);

app.use(xssClean());
app.use(cors());
app.use(bodyParser.json());

// insert here for router
app.use(authRoute);
app.use(workerRoute);
app.use(portoRoute);
app.use(workExpRoute);
app.use(recruiterRoute);

app.use(express.static("public"));
app.get("/", (req, res) => {
	res.json("HELLO WORLD");
});

const port = PORT || 4001;
const host = APP_HOST || "0.0.0.0";
app.listen(port, "0.0.0.0", () => {
	console.log(`${APP_NAME} RUN AT PORT ${port}`);
});
