# NaPola 💸

A backend REST API for tracking and splitting shared expenses between two people. Built with Node.js, Express.js and PostgreSQL.

## About

NaPola allows two users to log shared expenses, track who paid what, check the current balance between them, and automatically calculate and settle debts.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Environment:** dotenv

## Project Structure

backend/
└── src/
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── balanceController.js
    │   ├── expensesController.js
    │   └── settleController.js
    └── routes/
        ├── balance.js
        ├── expenses.js
        └── settle.js


## API Endpoints

### Expenses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/expenses` | Get all expenses (filterable by month/year) |
| POST | `/expenses` | Create a new expense |
| DELETE | `/expenses/:id` | Delete an expense |

### Balance
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/balance` | Get current balance — who owes whom and how much |

### Settle
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/settle` | Settle all pending expenses and record the settlement |

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL

### Installation

```bash
git clone https://github.com/nixaonjs/NaPola.git
cd NaPola/backend
npm install

Environment Variables

Create a .env file in the backend folder:

DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=your_db_name
DB_PASSWORD=your_password
DB_PORT=5432

Run
node src/index.js
