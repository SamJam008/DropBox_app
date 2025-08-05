Here’s a **clean, professional README** for your Dropbox-like Next.js app:

---

# Droply – Cloud Storage Web Application

Droply is a modern cloud storage web application inspired by Dropbox, built using **Next.js 15**, **TypeScript**, **Clerk authentication**, **ImageKit** for file storage, and **PostgreSQL (Neon)** for database management. It allows users to securely upload, manage, and access their files from anywhere.

<img width="1322" height="737" alt="Screenshot 2025-08-05 195223" src="https://github.com/user-attachments/assets/468436ea-7c18-4eae-b080-94be5e0945d6" />

###  User Interface

<img width="1851" height="834" alt="Screenshot 2025-08-05 195006" src="https://github.com/user-attachments/assets/f1db4077-0f45-4792-a76f-6f4807b220fb" />

### SignIn Profile

<img width="1870" height="849" alt="Screenshot 2025-08-05 195025" src="https://github.com/user-attachments/assets/ea702e9d-5da3-4912-b8b3-e631c1168f26" />

## Features

* **User Authentication** – Secure sign-in/sign-up using Clerk.
* **File Upload & Management** – Upload, store, and manage files in the cloud.
* **Folder Organization** – Organize files into folders for better management.
* **Responsive UI** – Fully responsive design for desktop and mobile.
* **Database Integration** – PostgreSQL for storing file metadata.
* **Secure Storage** – ImageKit for optimized, fast, and secure file delivery.

## Tech Stack

* **Frontend:** Next.js 15, TypeScript, Tailwind CSS
* **Authentication:** Clerk
* **Storage:** ImageKit
* **Database:** PostgreSQL (Neon)
* **ORM:** Drizzle ORM

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/droply.git
cd droply
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root of your project and configure the following:

```
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=your_url_endpoint
DATABASE_URL=your_neon_database_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### 4. Run the Development Server

```bash
npm run dev
```


```

### 5. Build for Production

```bash
npm run build
npm start
```

## Deployment

You can deploy Droply on **Vercel** for optimal performance and scalability. Ensure that all environment variables are set in your hosting platform before deploying.

## License

This project is licensed under the MIT License.




