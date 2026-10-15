# Job Application Tracker

A full-stack web app to track job applications in one place.

## Features
- Add, view, edit and delete job applications
- Confirmation before deleting
- Search by company, role or location
- Filter applications by status
- Dashboard with application statistics
- Required-field validation, loading and error messages
- Responsive design
- Data saved in MongoDB Atlas

## Tech Stack
- **Frontend:** React.js, JavaScript, HTML5, CSS3, Vite
- **Backend:** Node.js, Express.js, Mongoose, CORS, dotenv
- **Database:** MongoDB Atlas
- **Tools:** Git, GitHub, Postman, VS Code

## Screenshots
[Add 2 screenshots here: dashboard and application form]

## Live Demo
[Add link here, or delete this section]

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /api/applications | Get all applications |
| POST | /api/applications | Add a new application |
| PUT | /api/applications/:id | Update an application |
| DELETE | /api/applications/:id | Delete an application |

## Project Structure

```
Job-Application-Tracker
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
├── backend
│   ├── models
│   ├── server.js
│   ├── .env.example
│   └── package.json
├── .gitignore
└── README.md
```

## How to Run

**Requirements:** Node.js, npm, Git, and a MongoDB Atlas account.

1. Clone the repository

```
git clone https://github.com/surabhigawali00-glitch/Job-Application-Tracker.git
cd Job-Application-Tracker
```

2. Set up the backend

```
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```
MONGO_URI=your_mongodb_connection_string
```

Start the backend:

```
npm run dev
```

It runs on http://localhost:5000

3. Set up the frontend (in a second terminal)

```
cd frontend
npm install
npm run dev
```

Open the local link shown in the terminal.

## What I Learned
- Building React components and handling forms and state
- Creating a REST API with Node.js and Express
- Connecting MongoDB Atlas with Mongoose
- Connecting the frontend with the backend and fixing CORS errors
- Using environment variables to keep passwords safe
- Testing APIs with Postman

## Future Improvements
- User login
- Follow-up reminders
- Charts and analytics

## Author
Surabhi Gavali | LinkedIn: https://www.linkedin.com/in/surabhigavali/
