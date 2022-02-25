const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './src/config.env' });

const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);

mongoose
	.connect(DB)
	.then((con) => {
		console.log('DB Connection sucessfull');
	})
	.catch((err) => {
		console.log(err);
	});

//console.log(process.env);
const port = process.env.port || 3000;

//listening to the port
app.listen(port, () => {
	console.log('Server is up on port ' + port + '. Backend is running');
});
