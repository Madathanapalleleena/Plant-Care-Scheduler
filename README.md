# Plant Care Scheduler 🌱 
What is This Project About?
The Plant Care Scheduler is a simple yet useful app I created to help users keep track of their plants and ensure they’re getting the right care. I focused mainly on the backend, using SQL to store plant information and care logs, with a clean React frontend to make it easy for users to interact with the system.

# Key Features
**Plant Management**: Users can add plant details like watering schedules, sunlight requirements, and fertilizing routines.

**Care Logs**: You can log plant care actions like watering or fertilizing to keep track of your plant’s health.

**Easy Viewing**: All your plants and their care schedules are neatly displayed in a user-friendly interface.

# Technology Used
**Frontend**: React for creating the interactive interface. Also used Tailwind CSS.

**Backend**: Node.js with Express to handle API requests.

**Database**: **MySQL** to store plant details and care logs.

# How I Used SQL in This Project
I created two main tables:

**plants**: Stores details about each plant, including watering frequency, sunlight needs, etc.

**care_logs**: Keeps track of actions like watering or fertilizing plants, with timestamps.

MySQL helps with basic CRUD operations:

**GET** requests to fetch data like all plants or care logs.

**POST** requests to add new plants or care actions into the database.

# The Frontend
While I focused more on the backend, I used React and Tailwind css to build a simple but effective UI. It allows users to:

Add new plants.

View existing plants and their schedules.

Log care actions like watering.

# Challenges I Faced & What I Learned
**SQL Querying**: I faced a few challenges with setting up SQL queries, particularly with foreign keys and ensuring the data was structured correctly. But I learned a lot about managing relationships between tables and retrieving data efficiently.

**Backend-Frontend Communication**: Connecting the React frontend with the Node.js backend via API requests was a bit tricky at first, but I got the hang of it and now have a solid understanding of how to manage data flow between the two.

**State Management**: React’s useState and useEffect hooks were essential for managing the state of the app and keeping the UI updated in real-time.

# Looking Ahead
**User Authentication**: In the future, I’d like to add user authentication so each person can have their own plant care schedule.

**Notifications**: It would be great to add notifications to remind users when to water or fertilize their plants.

**Polished UI**: While it works, I’d love to give the frontend a more polished look to improve user experience.
