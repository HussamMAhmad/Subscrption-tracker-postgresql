# 🚀 SubTrack - Modern Subscription Tracker

**SubTrack** is a comprehensive subscription management system designed for users who want to organize their monthly and yearly expenses. The core of the system is a "Smart Notification Engine" that monitors renewal dates and sends automated email reminders to users using modern Background Workflows.

---

## 🛠 Tech Stack

* **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
* **Database:** [PostgreSQL](https://www.postgresql.org/) (via Neon DB)
* **ORM:** [Prisma](https://www.prisma.io/)
* **Workflow & Automation:** [Upstash Workflow](https://upstash.com/)
* **Validation:** [Zod](https://zod.dev/)
* **Security:** [Arcjet](https://arcjet.com/) (Bot detection, Rate limiting, Shield)
* **Emailing:** [Nodemailer](https://nodemailer.com/)
* **Date Handling:** [Day.js](https://day.js.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)

---

## ✨ Key Features

-   ✅ **Subscription Management:** Easily add, edit, and delete subscriptions.
-   ⏳ **Smart Reminders:** Automated notification system sending emails **7, 5, 2, and 1 day(s)** before the renewal date.
-   🛡️ **Advanced Security:** Integrated **Arcjet** to protect APIs from malicious bots and ensure secure operations.
-   🔍 **Robust Validation:** Utilizing **Zod** for strict Schema Validation to prevent malformed data entry.
-   📧 **Professional Email Templates:** Beautifully formatted HTML emails to notify users about upcoming payments.
-   🔄 **Autonomous Lifecycle:** Once a subscription is created, a dedicated background workflow is triggered to manage its entire lifecycle.

---

## 🏗 System Architecture

The project follows a modern architecture designed for reliability and scalability:
1.  **Validation Layer:** Inputs are validated via **Zod Schemas** before reaching the database.
2.  **Logic Layer:** Uses **Next.js Server Actions** for efficient server-side processing.
3.  **Automation Layer:** **Upstash Workflow** handles the "Sleep/Wake-up" logic to trigger reminders at precise times without the need for traditional, complex Cron Jobs.

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally:

### 1. Clone the Repository
```bash
git clone [https://github.com/HussamMAhmad/subscription-tracker.git](https://github.com/HussamMAhmad/subscription-tracker.git)
cd subscription-tracker
