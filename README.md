# Zealthy Mini EMR

A full-stack Electronic Medical Record (EMR) and Patient Portal application built as part of the **Zealthy Full Stack Engineering Exercise**.

The application consists of two primary modules:

* **Admin Portal** (`/admin`) for managing patients, appointments, prescriptions, and medications.
* **Patient Portal** (`/`) for authenticated patients to securely view their upcoming appointments, prescription refills, and personal health information.

The application is built with modern full-stack technologies using Next.js App Router, Prisma ORM, PostgreSQL, and JWT authentication.

---

## Features

### Admin Portal (`/admin`)

* Patient Management (Create, View, Update)
* Appointment Management (Create, Read, Update, Delete)
* Prescription Management (Create, Read, Update, Delete)
* Medication Management
* Patient Details View
* Dashboard with patient statistics
* Server-side pagination
* Responsive user interface
* No authentication required (per exercise requirements)

---

### Patient Portal (`/`)

* Secure patient login
* Dashboard summary
* Upcoming appointments (Next 7 Days)
* Upcoming prescription refills (Next 7 Days)
* View full upcoming appointment schedule (Next 3 Months)
* View all upcoming prescriptions (Next 3 Months)
* Patient profile information
* Logout

---

## Tech Stack

### Frontend

* Next.js 15 (App Router)
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* React Hook Form
* Zod

### Backend

* Next.js Route Handlers
* Prisma ORM
* PostgreSQL (Neon)

### Authentication

* JWT
* HTTP-only Cookies

### Deployment

* Vercel
* Neon PostgreSQL

---

## Project Structure

```text
app/
components/
lib/
prisma/
repositories/
schemas/
services/
types/
```

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/VineethGoud712/zealthy-mini-emr.git
```

```bash
cd zealthy-mini-emr
```

### Install dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

---

## Database Setup

Generate Prisma Client

```bash
npx prisma generate
```

Apply the database schema

```bash
npx prisma db push
```

or

```bash
npx prisma migrate deploy
```

---

## Seed Database

Seed the database with the provided Zealthy sample data.

```bash
npm run seed
```

or

```bash
npx prisma db seed
```

The seed populates:

* Patients
* Medications
* Prescriptions
* Appointments

---

## Run the Application

```bash
npm run dev
```

Open:

Patient Portal

```
http://localhost:3000/
```

Admin Portal

```
http://localhost:3000/admin
```

---

## Demo Credentials

### Patient Login

Email

```
vineeth123@gmail.com
```

Password

```
vineeth123
```

Alternatively, create a new patient from the Admin Portal and use those credentials to log in to the Patient Portal.

---

## Live Demo

Patient Portal

```
https://zealthy-mini-emr-two.vercel.app/
```

Admin Portal

```
https://zealthy-mini-emr-two.vercel.app/admin
```

---

## GitHub Repository

```
https://github.com/VineethGoud712/zealthy-mini-emr
```

---

## Implementation Notes

* Built using the Next.js App Router.
* Uses Prisma ORM with Neon PostgreSQL.
* Database seeded with the provided Zealthy sample data.
* Implements JWT authentication using HTTP-only cookies.
* Uses Zod for request validation.
* Uses React Hook Form for form management.
* Implements server-side rendering where appropriate.
* Implements server-side pagination for patient listings.

---

## Exercise Requirements Covered

### Mini EMR

* Patient Management (Create, Read, Update)
* Appointment CRUD
* Prescription CRUD
* Medication Management
* Admin Dashboard

### Patient Portal

* Patient Login
* Dashboard Summary
* Upcoming Appointments (Next 7 Days)
* Upcoming Prescription Refills (Next 7 Days)
* Full Upcoming Appointment Schedule (Next 3 Months)
* Full Upcoming Prescription List (Next 3 Months)


