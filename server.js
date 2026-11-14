
const express = require("express");
const db = require("./database");

const app = express();

app.use(express.json());

// Import routes
const chefsRoutes = require("./routes/routes/chefs");
const stationsRoutes = require("./routes/routes/stations");
const bookingsRoutes = require("./routes/routes/bookings");

// Connect routes
app.use("/chefs", chefsRoutes);
app.use("/stations", stationsRoutes);
app.use("/bookings", bookingsRoutes);

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to KitchenKeys Cloud Kitchen API!"
    });
});

// Start server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

