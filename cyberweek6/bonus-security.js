console.log("====================================================");
console.log("🚀 WEEK 6: ENTERPRISE EXCELLENCE BONUS CHALLENGE");
console.log("====================================================\n");

// 1. Zero Trust Security Architecture Simulation
function verifyZeroTrustAccess(user) {
    console.log("[🔒 Zero Trust Mode] Principle: 'Never Trust, Always Verify'");
    console.log(`[-] Context Check for User: ${user.username}`);
    
    // Explicit verification of identity, device health, and context every single time
    if (user.isAuthenticated && user.deviceSecure && user.mfaVerified) {
        console.log("✅ Identity Verified | Device Compliant | MFA Token valid.");
        console.log(`🔓 Access GRANTED to sensitive resource for: ${user.username}\n`);
    } else {
        console.log("❌ Context Validation FAILED. Access Denied automatically.\n");
    }
}

// 2. Web Application Firewall (WAF) Rule Simulator
function inspectTrafficViaWAF(requestPayload) {
    console.log("[🛡️  WAF Active] Inspecting incoming layer-7 application traffic...");
    
    // Core signatures for common XSS and Malicious payloads
    const badSignatures = [/<script>/i, /union select/i, /exec\(/i];
    let isMalicious = false;

    badSignatures.forEach(signature => {
        if (signature.test(requestPayload)) {
            isMalicious = true;
        }
    });

    if (isMalicious) {
        console.log("🚨 ALERT: WAF Blocked a malicious payload signature!");
        console.log("🚫 HTTP Status 403 Forbidden issued to the origin IP.\n");
    } else {
        console.log("✅ WAF Status: Traffic clean. Request forwarded to backend.\n");
    }
}

// 3. Social Engineering & Phishing Awareness Training Simulation
function logPhishingSimulationMetrics() {
    console.log("[🎣 Phishing Simulation Dashboard] Campaign Name: 'Internal IT Audit 2026'");
    
    const campaignResults = {
        TotalEmailsDispatched: 150,
        UsersWhoOpenedLink: 18,    // 12% click rate
        UsersWhoSubmittedData: 4,  // Failed the training drill
        ReportedToSecurityTeam: 45 // Active defense responders
    };

    console.table(campaignResults);
    console.log("📌 Action Item: Mandating immediate Phishing Awareness Training for 4 users.\n");
    console.log("====================================================");
    console.log("👑 BONUS CHALLENGE CRITERIA: ALL SYSTEMS OPERATIONAL");
    console.log("====================================================");
}

// --- Triggering the Enterprise Simulations ---
const standardUser = { username: "m_huzafa", isAuthenticated: true, deviceSecure: true, mfaVerified: true };
verifyZeroTrustAccess(standardUser);

const attackRequest = "POST /api/data?comment=<script>alert('hacked')</script>";
inspectTrafficViaWAF(attackRequest);

logPhishingSimulationMetrics();