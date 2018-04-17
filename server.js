const express = require('express');

const app = express();

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Our app is running on http://localhost:' + port);
});

app.use(express.static(__dirname + '/dist'));

app.use('/', (req, res) => {
	res.sendFile(__dirname + '/dist/index.html');
})