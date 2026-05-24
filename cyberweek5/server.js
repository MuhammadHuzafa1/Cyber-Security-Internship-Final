const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { doubleCsrf } = require('csrf-csrf');
const helmet = require('helmet');

const app = express();
app.set('trust proxy', true);

app.use(express.json());
app.use(cookieParser("your-cookie-secret-key"));
app.use(helmet());

// CSRF Options Setup
const doubleCsrfUtilities = doubleCsrf({
    getSecret: () => "super-secret-csrf-key-123!",
    cookieName: "x-csrf-token",
    cookieOptions: {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
    },
    getTokenFromRequest: (req) => req.headers["x-csrf-token"],
});

// ROUTE 1: Token Generator (Error Fixed Approach)
app.get('/api/csrf-token', (req, res) => {
    const token = doubleCsrfUtilities.generateToken(req, res);
    res.json({ csrfToken: token });
});

// ROUTE 2: SECURE LOGIN WITH PREPARED STATEMENTS
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const safeUsername = String(username).trim();
    const safePassword = String(password).trim();

    if (safeUsername === "admin" && safePassword === "SecurePass123!") {
        return res.json({ message: "Login Successful! Token Generated." });
    } else {
        return res.status(401).json({ error: "Invalid Credentials." });
    }
});

// ROUTE 3: PROTECTED STATE-CHANGING ROUTE
app.post('/api/update-profile', doubleCsrfUtilities.doubleCsrfProtection, (req, res) => {
    res.json({ message: "Success! Profile updated securely." });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Week 5 Secure Server running on port ${PORT}`));