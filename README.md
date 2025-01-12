# Mini X

Mini X is a miniature Twitter application where users can:
- Sign up and sign in
- Create tweets
- Follow other users
- Comment on tweets

## Tech Stack

### Backend
- **Laravel**
- **MySQL**
- **Laravel API**

### Frontend
- **React.js**
- **TailwindCSS**
- **React Router**
- **DaisyUI** (component library)

---

## Features
- User authentication (Sign up/Sign in)
- Posting and managing tweets
- Following and interacting with other users
- Commenting on tweets

---

## Installation and Usage

### Frontend
1. Clone the repository.
2. Navigate to the frontend directory.
3. Install dependencies:
   ```bash
   npm install
   ```

### Backend
1. Install **XAMPP**.
2. Start the Apache and phpMyAdmin servers in XAMPP.
3. Create a new database:
   - Database name: `laravel_db`
4. Import the provided database file:
   - Locate the database file in the `resources` folder of the repository.
5. Start the backend server:
   ```bash
   php artisan serve
   ```

---

## Screenshots

### Database Schema
![Database Schema Screenshot](./resources/images/dbschema.jpg)

### API Endpoint List
![API Endpoint List Screenshot](./resources/images/apiendpointlist.jpg)

### Home Page
![Home Page Screenshot](./resources/images/homepage.jpg)

### Login Page
![Login Page Screenshot](./resources/images/loginpage.jpg)

### Registration Page
![Registration Page Screenshot](./resources/images/registerpage.jpg)

### My posts Page
![My posts Page Screenshot](./resources/images/mypostpage.jpg)

### Tweet Detail Modal
![Tweet Detail Modal Screenshot](./resources/images/postdetailmodal.jpg)

### Create Tweet Modal
![Create Tweet Modal Screenshot](./resources/images/createtweetmodal.jpg)

### Tweet Edit Modal
![Tweet Edit Modal Screenshot](./resources/images/edittweetmodal.jpg)

---

## Acknowledgments

Special thanks to the creators and contributors of the following technologies:
- Laravel
- React.js
- TailwindCSS
- DaisyUI
