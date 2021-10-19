
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewURLParser: true,
    useUnifiedTopology: true
}).then(() => console.log(`Connected to Database.`)).catch((error) => console.log(error));

mongoose.connection.on(`disconnected`, () => console.log(`Connection to database closed successfully...`));

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
})