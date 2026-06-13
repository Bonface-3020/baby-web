# 🌟 Sunshine Tots Daycare — Bamburi, Mombasa, Kenya

A modern, fully responsive website for **Sunshine Tots Daycare**, a premier childcare centre located in Bamburi, Mombasa, Kenya. Built with Django and vanilla HTML/CSS/JavaScript.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Pages & Routes](#pages--routes)
- [Configuration](#configuration)
- [Deployment Notes](#deployment-notes)
- [Contact](#contact)

---

## 🏫 About the Project

Sunshine Tots Daycare is a childcare website designed to:

- Showcase the daycare's programs, values, and team
- Allow parents to read blog articles about child development
- Provide a contact/enquiry form for enrollment
- Reflect the warm, colourful, and joyful atmosphere of the daycare

---

## ✨ Features

- **Animated preloader** — logo spinner that fades away once the page loads
- **Sticky navbar** with active-link highlighting and mobile hamburger menu
- **Hero section** with animated stats, typing effect, and floating info bubbles
- **Services/Programs cards** with hover animations
- **Photo gallery** with a lightbox viewer (click any image to expand)
- **Testimonials carousel** with touch/drag support
- **Blog listing** with category badges and read-time estimates
- **Contact form** with client-side validation and Django flash messages
- **WhatsApp floating button** with a pulsing animation
- **Back-to-top button**
- **Animated emoji ticker strip**
- **Fully responsive** — mobile, tablet, and desktop
- **Smooth scroll** and scroll-triggered animations (AOS-style, vanilla JS)
- **SEO meta tags** — title, description, Open Graph

---

## 🛠 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Backend    | Python 3 · Django 4+                |
| Database   | SQLite (dev) — swap to PostgreSQL for production |
| Frontend   | HTML5 · Vanilla CSS · Vanilla JS    |
| CSS Fonts  | Google Fonts (Nunito, Quicksand, Pacifico) |
| Icons      | Bootstrap Icons · Font Awesome 6    |
| UI Kit     | Bootstrap 5.3 (grid & components)   |
| Timezone   | Africa/Nairobi (EAT, UTC+3)         |

---

## 📁 Project Structure

```
baby web/
├── babycare_mombasa/          # Django project config
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── main/                      # Main Django app
│   ├── migrations/
│   ├── static/
│   │   └── main/
│   │       ├── css/
│   │       │   └── style.css  # All custom styles
│   │       ├── js/
│   │       │   └── main.js    # All custom scripts
│   │       └── images/        # Logos, hero images, blog images, gallery
│   ├── templates/
│   │   └── main/
│   │       ├── base.html      # Shared layout (navbar, footer, preloader)
│   │       ├── home.html
│   │       ├── about.html
│   │       ├── blog.html
│   │       ├── contact.html
│   │       └── contact_success.html
│   ├── views.py               # All view functions
│   ├── urls.py                # App URL patterns
│   ├── models.py
│   └── admin.py
├── db.sqlite3
├── manage.py
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.9 or higher
- pip

### 1. Clone or download the project

```bash
git clone <your-repo-url>
cd "baby web"
```

### 2. Create and activate a virtual environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS / Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install django
```

> No third-party Django packages are required beyond the standard library.

### 4. Apply migrations

```bash
python manage.py migrate
```

### 5. Run the development server

```bash
python manage.py runserver
```

Open your browser at **http://127.0.0.1:8000/**

---

## 🗺 Pages & Routes

| URL                   | View              | Description                        |
|-----------------------|-------------------|------------------------------------|
| `/`                   | `home`            | Homepage — hero, services, gallery, testimonials, blog preview |
| `/about/`             | `about`           | About page — story, team, mission/vision, testimonials |
| `/blog/`              | `blog`            | Blog listing — 6 articles          |
| `/contact/`           | `contact`         | Contact & enrollment enquiry form  |
| `/contact/success/`   | `contact_success` | Thank-you page after form submit   |

---

## ⚙️ Configuration

Key settings in [`babycare_mombasa/settings.py`](babycare_mombasa/settings.py):

| Setting           | Value / Note                                              |
|-------------------|-----------------------------------------------------------|
| `DEBUG`           | `True` — set to `False` in production                    |
| `ALLOWED_HOSTS`   | `['*']` — restrict to your domain in production          |
| `TIME_ZONE`       | `Africa/Nairobi`                                          |
| `STATIC_URL`      | `/static/`                                                |
| `STATICFILES_DIRS`| `main/static`                                             |
| `STATIC_ROOT`     | `staticfiles/` — used when running `collectstatic`        |
| `MEDIA_ROOT`      | `media/` — for future user-uploaded files                 |
| `EMAIL_BACKEND`   | Console backend (prints emails to terminal in dev)        |

> ⚠️ **Before deploying to production**, replace the `SECRET_KEY` with a secure value and store it in an environment variable.

---

## 🌍 Deployment Notes

1. **Set a real `SECRET_KEY`** — never commit it to version control.
2. Set `DEBUG = False` and add your domain to `ALLOWED_HOSTS`.
3. Run `python manage.py collectstatic` to gather static files into `staticfiles/`.
4. Use **WhiteNoise** or serve static files via Nginx/Caddy.
5. Switch the database to **PostgreSQL** for production.
6. Consider **Gunicorn** + **Nginx** or a PaaS like Railway, Render, or Heroku.

---

## 📞 Contact

**Sunshine Tots Daycare**  
📍 Bamburi Beach Road, Bamburi, Mombasa, Kenya  
📞 +254 712 345 678 · +254 798 765 432  
📧 hello@sunshinetots.co.ke  
⏰ Mon–Fri: 6:30 AM – 6:30 PM · Sat: 7:00 AM – 2:00 PM  

---

*Made with 💖 for the little ones.*
