Disaster Relief Coordination System
The Disaster Relief Coordination System is designed to streamline emergency response efforts by enabling real-time communication between victims, first responders, and relief teams. This system facilitates prompt incident reporting, live status updates, and resource coordination during disaster events, ensuring that help reaches those in need as quickly as possible.

Table of Contents
Features

Technologies Used

Installation

Usage

API Endpoints

Contributing

License

Contact

Features
Real-Time Alerts: Receive and manage emergency alerts as they are reported.

Interactive Map: View incident locations on Google Maps for quick geographical context.

Status Updates: Track alerts with statuses such as "In Progress" and "Completed."

Resource Coordination: Assign teams and manage resources effectively during disasters.

User-Friendly Dashboard: A responsive interface for efficient management of incidents and communications.

Technologies Used
Frontend:

React

JavaScript

HTML & CSS

Tailwind CSS (for styling)

Backend:

Node.js

Express.js

MongoDB (or your preferred database)

APIs & Tools:

Google Maps API for location services

Fetch API for asynchronous data fetching

Installation
Prerequisites
Node.js and npm installed.

MongoDB or another database running (if used).

API key for Google Maps (if map functionality is required).

Steps
Clone the Repository:

bash
Copy
Edit
git clone https://github.com/reetannit/disaster-relief-coordination-system


Create a .env file in your server directory and add your configuration details. For example:

env
Copy
Edit
PORT=5001
MONGO_URI=your_mongo_connection_string
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
Run the Application:

Backend:
From the server directory, start the backend server:

bash
Copy
Edit
node server.js
Frontend:
From the client directory, start the React development server:

bash
Copy
Edit
npm start
The frontend will be available at http://localhost:3000 and the backend at http://localhost:5001.

Usage
Emergency Alerts:
View and manage active alerts in real time. The system displays alerts with details like location, safety status, message, and phone number.

Accepting Alerts:
Alerts can be marked as "In Progress" or "Completed" to track their resolution. When an alert is accepted, its status updates and the alert list refreshes automatically.

Viewing Incident Locations:
Click the "View Map" button on any alert to open the incident location on Google Maps in a new browser tab.

API Endpoints
GET /api/emergency/emergencies:
Retrieves a list of current emergency alerts.

PATCH /api/emergency/updateStatus:
Updates the safety status of an alert. The request body should include:

json
Copy
Edit
{
  "id": "alert_id",
  "safetyStatus": "In Progress" // or "Completed"
}
Additional endpoints can be added as needed for resource assignment, incident reporting, etc.

Contributing
Contributions are welcome! To contribute to the Disaster Relief Coordination System:

Fork the repository.

Create a new branch for your feature or bug fix.

Commit your changes with clear, descriptive messages.

Submit a pull request with details about your changes.

Please adhere to the project's coding standards and include tests where applicable.


Output 

![Landing](/assets/Landing.png)
![Victim](/assets/Victim.png)
![NGO](/assets/NGO.png)
![Admin](/assets/Admin.png)

