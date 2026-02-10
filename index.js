require("dotenv").config();
const express = require("express");
const cors = require("cors");

const bfhlRoutes = require("./routes/bfhlRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10kb" }));

// Routes
app.use("/", bfhlRoutes);

// 404
app.use((req, res) => {
    res.status(404).json({
        is_success: false,
        official_email: process.env.EMAIL,
        error: "Route not found"
    });
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
