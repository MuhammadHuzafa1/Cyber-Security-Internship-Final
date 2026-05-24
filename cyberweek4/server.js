const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Windows Environment ke liye IP detection trust set karna zaroori hai
app.set('trust proxy', true);
app.use(express.json());

// -------------------------------------------------------------
// 1. APPLICATION-LEVEL INTRUSION DETECTION SIMULATION (IDS)
// -------------------------------------------------------------
const failedAttemptsStore = {}; 
const BANNED_IPS = new Set();

// Intrusion Detection Middleware (Har request ko scan karega)
const intrusionDetectionMiddleware = (req, res, next) => {
    const clientIp = req.ip || req.connection.remoteAddress;

    // Agar IP banned list mein hai toh aage nahi jaane dega
    if (BANNED_IPS.has(clientIp)) {
        return res.status(403).json({
            error: "SECURITY BLOCK: Your IP has been banned due to multiple failed login attempts."
        });
    }
    next();
};
app.use(intrusionDetectionMiddleware);


// -------------------------------------------------------------
// 2. SECURITY HEADERS & CSP (Helmet Implementation)
// -------------------------------------------------------------
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
    },
}));


// -------------------------------------------------------------
// 3. API RATE LIMITING (Brute-Force Protection)
// -------------------------------------------------------------
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minutes
    max: 100, // Max 100 requests per IP
    message: { error: "Too many requests from this IP, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/', apiLimiter);


// -------------------------------------------------------------
// 4. CORS CONFIGURATION (Unauthorized Access Restriction)
// -------------------------------------------------------------
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
    methods: 'GET,POST',
    allowedHeaders: ['Content-Type', 'Authorization']
}));


// -------------------------------------------------------------
// SECURE LOGIN ROUTE WITH IDS LOGIC
// -------------------------------------------------------------
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const clientIp = req.ip || req.connection.remoteAddress;

    // Hardcoded credentials for simulation testing
    if (username === "admin" && password === "SecurePass123!") {
        failedAttemptsStore[clientIp] = 0; // Reset on success
        return res.json({ message: "Login Successful! Token Generated." });
    } else {
        // Increment failed attempts
        failedAttemptsStore[clientIp] = (failedAttemptsStore[clientIp] || 0) + 1;
        
        console.log(`[⚠️ WARNING] Failed login attempt from IP: ${clientIp}. Total Failures: ${failedAttemptsStore[clientIp]}`);

        // Trigger Ban on 3rd Failed Attempt
        if (failedAttemptsStore[clientIp] >= 3) {
            BANNED_IPS.add(clientIp);
            
            console.log(`\n🚨 **************************************************** 🚨`);
            console.log(`🚨 SECURITY ALERT: Intrusion Detected from IP: ${clientIp}`);
            console.log(`🚨 ACTION TAKEN: IP has been BANNED at the Application Level.`);
            console.log(`🚨 **************************************************** 🚨\n`);
            
            return res.status(423).json({ 
                error: "Intrusion Detected! Too many failed login attempts. Your IP is now banned." 
            });
        }

        return res.status(401).json({ 
            error: `Invalid Credentials. Remaining attempts before ban: ${3 - failedAttemptsStore[clientIp]}` 
        });
    }
});

app.get('/', (req, res) => res.send('Secure API Server Running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server securely running on port ${PORT}`));