# Zealthy Mini EMR

A full-stack Electronic Medical Record (EMR) application built as part of the Zealthy Full Stack Engineering Exercise.

The application provides an Admin Portal for managing patients, appointments, prescriptions, and medications, along with a Patient Portal for viewing upcoming appointments, prescription refills, and personal health information.

---

## Features

### Admin Portal

* Patient Management (Create, View, Update)
* Appointment Management
* Prescription Management
* Medication Management
* Dashboard with patient statistics
* Responsive UI
* Server-side pagination

### Patient Portal

* Secure Login
* Dashboard Summary
* Upcoming Appointments (Next 7 Days)
* Prescription Refills (Next 7 Days)
* Appointment History
* Prescription History
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

```
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

## Installation

Clone the repository

```bash
git clone https://github.com/VineethGoud712/zealthy-mini-emr.git
```

Install dependencies

```bash
npm install
```

Create an environment file

```bash
cp .env.example .env
```

Start the development server

```bash
npm run dev
```

## Database

Generate Prisma Client

```bash
npx prisma generate
```

Apply schema

```bash
npx prisma db push
```

or

```bash
npx prisma migrate deploy
```

---

## Seed Database

```bash
npm run seed
```

or

```bash
npx prisma db seed
```

---

## Demo Credentials

### Patient Login

Email : vineeth123@gmail.com
```
Password : vineeth123
```
or 

You can create new Patient 

Go to /admin 

create New Patient and login with that credentials

---

## Deployment

The application is deployed on Vercel.

Deployment URL:

```
https://zealthy-mini-emr-two.vercel.app/
```

---

## GitHub Repository

```
https://github.com/VineethGoud712/zealthy-mini-emr
```

---

## Notes

* Built using the Next.js App Router.
* Uses Prisma ORM with Neon PostgreSQL.
* Implements server-side rendering and server-side pagination.
* Responsive design for desktop and mobile.
* Input validation using Zod.
* Form handling using React Hook Form.
* Authentication using JWT stored in HTTP-only cookies.
