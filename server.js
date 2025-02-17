const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Route to set a cookie
app.get("/set-cookie", (req, res) => {
    res.cookie("user", "JohnDoe", { httpOnly: true, maxAge: 60000 }); // Cookie expires in 1 min
    res.json({ message: "Cookie has been set" });
});

// Route to retrieve the cookie
app.get("/get-cookie", (req, res) => {
    const userCookie = req.cookies.user;
    if (userCookie) {
        res.json({ message: "Cookie found", user: userCookie });
    } else {
        res.status(404).json({ message: "No cookie found" });
    }
});

// Routes for different response codes
app.get("/success", (req, res) => res.status(200).json({ message: "Success response", code: 200 }));
app.get("/created", (req, res) => res.status(201).json({ message: "Resource created", code: 201 }));
app.get("/bad-request", (req, res) => res.status(400).json({ message: "Bad request", code: 400 }));
app.get("/not-found", (req, res) => res.status(404).json({ message: "Not found", code: 404 }));
app.get("/server-error", (req, res) => res.status(500).json({ message: "Internal server error", code: 500 }));

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
