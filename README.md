# 🛡️ Advanced Cyber Security Development Portfolio (Weeks 4–6)

This repository demonstrates production-grade security engineering, compliance auditing, and threat mitigation for a Node.js enterprise application infrastructure.

---

## 📂 Repository Structure
* 📁 `cyberweek4/` - Real-time Threat Detection, API Hardening, Rate-Limiting & Security Headers
* 📁 `cyberweek5/` - Penetration Testing Remediation (Parameterized SQLi Defense & Double Submit Cookie CSRF Shield)
* 📁 `cyberweek6/` - Automated Compliance Auditing (OWASP Top 10), Hardened Docker Blueprints & Enterprise Bonus Modules

---

## 🚀 Project Evolution

### Week 4: Advanced Threat Detection & Web Security Enhancements
* **Objective:** Establish active perimeter defenses and secure public endpoint gateways.
* **Implementation:** Integrated `express-rate-limit` to neutralize brute-force vector streams, configured strict explicit CORS whitelists, injected Layer-7 Content Security Policy (CSP) rules, and enforced transport-layer security via HSTS headers.

### Week 5: Ethical Hacking & Exploiting Vulnerabilities
* **Objective:** Conduct targeted exploitation drills and rebuild weak architectural entry points.
* **Implementation:** Eliminated raw query context discovered via SQLMap by migrating to fully Parameterized Prepared Statements. Neutralized cross-session hijacking (vulnerable to Burp Suite interceptors) by deploying a state-independent Double Submit Cookie Pattern (`csrf-csrf`).

### Week 6: Advanced Security Audits & Final Deployment
* **Objective:** Validate system readiness against global standards and prepare secure deployment layers.
* **Implementation:** Programmed an automated auditing suite (`audit-config.js`) verifying OWASP Top 10 adherence, established automated dependency scanning pipelines (`npm audit`), and structured a rootless, minimal base-image environment configuration leveraging Docker security best practices.

### 👑 Bonus Challenge: Enterprise Security Operations
* **Objective:** Implement advanced proactive defense mechanisms for network and corporate security.
* **Implementation:** Engineered a multi-faceted testing engine (`bonus-security.js`) verifying Zero Trust access control logic, a Layer-7 Web Application Firewall (WAF) proxy rule blocking live XSS scripts with HTTP 403 blocks, and generated analytical reporting metrics for organizational Phishing Awareness Simulations.

---

## ⚙️ How to Run & Verify

1. Navigate to the targeted week's workspace folder:
   ```bash
   cd cyberweek6
