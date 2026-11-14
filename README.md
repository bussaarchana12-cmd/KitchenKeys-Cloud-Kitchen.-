# KitchenKeys – Cloud Kitchen Management System

## About
KitchenKeys is a Cloud Kitchen Management System built using Node.js, Express.js, and SQLite. It provides REST APIs to manage chefs, kitchen stations, and bookings.

## Technologies Used
- Node.js
- Express.js
- SQLite
- JavaScript
- REST APIs

## Features
- Create, view, update, and delete chef records
- Manage kitchen stations
- Create and manage bookings
- Store application data using SQLite
- REST API-based architecture

## API Endpoints

### Chefs
| Method | Endpoint | Description |
|---|---|---|
| GET | `/chefs` | Get all chefs |
| GET | `/chefs/:id` | Get chef by ID |
| POST | `/chefs` | Add a chef |
| PUT | `/chefs/:id` | Update a chef |
| DELETE | `/chefs/:id` | Delete a chef |

### Kitchen Stations
| Method | Endpoint | Description |
|---|---|---|
| GET | `/stations` | Get all stations |
| GET | `/stations/:id` | Get station by ID |
| POST | `/stations` | Add a station |
| PUT | `/stations/:id` | Update a station |
| DELETE | `/stations/:id` | Delete a station |

### Bookings
| Method | Endpoint | Description |
|---|---|---|
| GET | `/bookings` | Get all bookings |
| GET | `/bookings/:id` | Get booking by ID |
| POST | `/bookings` | Create a booking |
| PUT | `/bookings/:id` | Update booking status |
| DELETE | `/bookings/:id` | Delete a booking |

## Project Structure
```text
KitchenKeys-Cloud-Kitchen/
├── database/
├── routes/
│   └── routes/
│       ├── chefs.js
│       ├── stations.js
│       └── bookings.js
├── database.js
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

## Installation and Setup

1. Clone the repository:
```bash
git clone https://github.com/bussaarchana12-cmd/KitchenKeys-Cloud-Kitchen.-.git
```

2. Open the project folder:
```bash
cd KitchenKeys-Cloud-Kitchen.-
```

3. Install dependencies:
```bash
npm install
```

4. Start the server:
```bash
node server.js
```

5. Open in your browser:
```text
http://localhost:3000
```

## Project Status
Backend API development completed. Testing and further improvements are in progress.

## Author
**Archana Bussa**