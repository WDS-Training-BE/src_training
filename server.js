const express = require("express");
const app = express();

const path = require("path");

app.use(express.json());

app.listen("3000", () => {
	console.log("Server is running");
});

const api = require("./src/api");
const { AppError } = require("./src/common/errors/AppError");

//ROUTING
app.use("/api/v1", api);

//ERROR HANDLER
app.use((req, res) => {
	res.status(404).sendFile(path.join(__dirname, "/public/404.html"));
});

//res.status

app.use((error, req, res, next) => {
	let { statusCode, message } = error;

	statusCode = statusCode ? statusCode : 500;

	res.status(statusCode).json({
		statusCode,
		message,
	});
});

//rename destructuring

//truthy false
// null, undefined
// if(!null) {
// 	dsadsadsad
// }
