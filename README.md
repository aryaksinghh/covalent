# ⚡ Covalent AI

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma" />
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Groq-AI-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel" />
</p>

<p align="center">
An AI-powered revision platform for developers built around the <b>Feynman Learning Technique</b>.
</p>

<p align="center">
🌐 <a href="https://covalentai.vercel.app">Live Demo</a>
</p>

---

## 🚀 Overview

**Covalent AI** is an AI-powered revision platform designed for developers who already know programming concepts and want to revise them faster, retain them longer, and identify knowledge gaps efficiently.

Instead of passively reading documentation, Covalent AI uses the **Feynman Technique**—one of the world's most effective learning methods.

The AI asks you conceptual questions and evaluates your explanations. Whenever your explanation lacks clarity or depth, it identifies the missing pieces and helps reinforce your understanding.

The result is:

- ⚡ Faster revision
- 🧠 Better long-term retention
- 🎯 Identification of weak concepts
- ❤️ A more engaging and enjoyable revision experience

> **Note**
>
> Covalent AI is primarily built for developers who already have some programming knowledge.
> It is **not intended as a complete learning platform for absolute beginners**.

---

# ✨ Features

- 🤖 AI-powered revision sessions
- 🧠 Feynman learning methodology
- 💬 Interactive AI explanations
- 📈 Concept-based revision
- ⚡ Fast Redis caching
- 🔐 Secure authentication
- ☁️ Production-ready architecture
- 🌙 Modern UI
- 📱 Responsive design

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js | Full-stack React Framework |
| TypeScript | Type Safety |
| PostgreSQL | Database |
| Prisma ORM | Database ORM |
| Redis (Upstash) | Caching |
| Supabase | Authentication & Database |
| Groq AI | AI Inference |
| Vercel | Deployment |

---

# 📂 Project Structure

```
covalent/
│
├── prisma_setup/
│   ├── prisma/
│   ├── package.json
│   └── ...
│
├── app/
├── components/
├── lib/
├── prisma/
├── public/
├── package.json
└── ...
```

---

# ⚙️ Running Locally

## 1. Clone the repository

```bash
git clone https://github.com/aryaksinghh/covalent.git

cd covalent
```

---

## 2. Install dependencies

Inside the project root:

```bash
npm install
```

Now move into the Prisma setup directory:

```bash
cd prisma_setup
npm install
```

---

## 3. Create Environment Variables

Create a `.env` file in **both** locations:

```
/
```

and

```
/prisma_setup
```

Add the following variables in root and add database url and direct url into prisma_setup env:

```env
NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=

NEXT_PUBLIC_HOST=http://localhost:3000

DATABASE_URL=

DIRECT_URL=

GROQ_API_KEY=

UPSTASH_REDIS_REST_URL=

UPSTASH_REDIS_REST_TOKEN=
```

---

# 🔑 Getting the Environment Variables

## Supabase

1. Create a free Supabase project.
2. Enable Authentication by following the Supabase Authentication documentation.
3. Copy:

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

4. Navigate to:

```
Home → Connect → ORM
```

Copy:

- DATABASE_URL
- DIRECT_URL

---

## Groq

Create a free Groq account.

Generate a free API key.

Copy it into:

```
GROQ_API_KEY
```

---

## Upstash Redis

Create a free Redis database.

Open your Redis service dashboard and copy:

```
UPSTASH_REDIS_REST_URL

UPSTASH_REDIS_REST_TOKEN
```

All required services can be used on their **free tier**.

---

# 🗄 Database Setup

Navigate into:

```bash
cd prisma_setup
```

Run the initial migration:

```bash
npx prisma migrate dev --name first-migration
```

Generate the Prisma Client:

```bash
npx prisma generate
```

---

# ▶️ Start the Development Server

Return to the project root.

```bash
cd ..
```

Start the application:

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

🎉 Your local Covalent AI instance is now running.

---

# 🌍 Production

The application is deployed on Vercel.

**Live Website**

https://covalentai.vercel.app

---

# 💡 Why the Feynman Technique?

The Feynman Technique is based on a simple principle:

> *If you cannot explain something simply, you don't fully understand it.*

Instead of memorizing concepts, Covalent AI encourages developers to explain ideas in their own words.

The AI then:

- detects missing understanding,
- asks follow-up questions,
- reinforces weak concepts,
- and helps transform passive reading into active learning.

This makes revision significantly more effective than simply rereading documentation.

---

# 🤝 Contributing

Contributions are always welcome.

---

<p align="center">
Built with ❤️ using Next.js, Prisma, PostgreSQL, Redis, Groq AI and Supabase.
</p>