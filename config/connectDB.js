const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

async function connectToDB(urls) {
    try {
        // Using environment variable for MongoDB connection URL
        const url = urls;
        if (!url) {
            throw new Error("MongoDB connection URL is not defined in the environment variables.");
        }

        // Connection options for better security and reliability
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 10000, // 10 seconds timeout
        };

        await mongoose.connect(url, options);
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); // Exit the process with failure
    }
}

module.exports = { connectToDB };
