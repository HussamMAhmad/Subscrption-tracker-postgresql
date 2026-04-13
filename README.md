# 🚀 SubTrack - Modern Subscription Tracker (Express.js Backend)

**SubTrack** is a robust backend system built with **Express.js** to manage and track subscriptions. The project features a "Smart Notification Engine" powered by **Upstash Workflow**, which handles renewal monitoring and automated email alerts to users.

---

## 🛠 Tech Stack

* **Server:** [Express.js](https://expressjs.com/) (Node.js)
* **Database:** [PostgreSQL](https://www.postgresql.org/) (via Neon DB)
* **ORM:** [Prisma](https://www.prisma.io/)
* **Workflow & Automation:** [Upstash Workflow](https://upstash.com/)
* **Validation:** [Zod](https://zod.dev/)
* **Security:** [Arcjet](https://arcjet.com/) (Bot detection, Rate limiting, Shield)
* **Emailing:** [Nodemailer](https://nodemailer.com/)
* **Date Handling:** [Day.js](https://day.js.org/)
* **Environment Management:** [Dotenv](https://www.npmjs.com/package/dotenv)

---

## ✨ Key Features

-   ✅ **Subscription Management API:** Full CRUD operations for managing user subscriptions.
-   ⏳ **Automated Workflows:** Intelligent notification system that triggers emails **7, 5, 2, and 1 day(s)** before renewal using background workflows.
-   🛡️ **Security-First Approach:** Integrated **Arcjet** middleware to protect routes from malicious bots and implement sophisticated rate limiting.
-   🔍 **Schema Validation:** Comprehensive use of **Zod** to validate request bodies and ensure data integrity across the API.
-   📧 **Professional Reminders:** Dynamically generated HTML emails via Nodemailer to notify users about upcoming charges.
-   🔄 **Event-Driven Architecture:** Leverages Upstash Workflow to manage long-running processes (waiting for dates) without blocking the main event loop.

---

## 🏗 System Architecture

The API is designed with a clear separation of concerns:
1.  **Middleware Layer:** Handles security (Arcjet), authentication, and logging.
2.  **Validation Layer:** Uses **Zod** schemas to intercept and validate payloads before they reach the controllers.
3.  **Controller Layer:** Manages business logic and interacts with the database via **Prisma**.
4.  **Workflow Layer:** Integrated **Upstash Workflow** to handle the asynchronous "wait-and-trigger" logic for notifications.

---

## 🚀 Getting Started

Follow these steps to set up and run the server locally:

### 1. Clone the Repository
```bash
git clone [https://github.com/HussamMAhmad/subscription-tracker-api.git](https://github.com/HussamMAhmad/subscription-tracker-api.git)
cd subscription-tracker-api
