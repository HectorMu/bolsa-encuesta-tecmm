# Bolsa de Trabajo y Encuestas de Egresados para el TecMM  

This project is an application developed as part of our professional practices. It facilitates user management, surveys, and a job bank specifically designed for TecMM's graduates, companies, and administrators.  

The app was built using **Express.js** with **Node.js** for the backend and **React.js** with **React Router DOM** for the frontend.

---

## Features  

### User Types  
The application supports three user types, each with unique functionality:  
1. **Admin**  
   - Register and manage all user types (Admin, Graduate, Company).  
   - Create and manage surveys.  
   - Export survey data in **CSV format**.  

2. **Company**  
   - Add job positions to the internal job bank.  
   - Set a closing time for job positions, which automatically closes the position after the specified time.  

3. **Graduate**  
   - Answer surveys and generate a **unique QR code** (secured with JSON Web Tokens) to prove survey completion.  
   - Update their profile, upload a resume, and apply for job openings.  

---

### Additional Functionalities  

- **Dark Theme**  
  - The frontend includes a **dark theme** for improved user experience.  

- **Responsive Design**  
  - The application is fully responsive, making it accessible on smartphones and tablets.  

- **Deployment**  
  - The app is deployed on a **DigitalOcean droplet**, which also hosts the database.  

---

## Tech Stack  

### Backend  
- **Node.js** with **Express.js**: For building APIs and managing server-side logic.  
- **JSON Web Tokens (JWT)**: For secure authentication and QR code validation.  

### Frontend  
- **React.js**: For building the user interface.  
- **React Router DOM**: For managing navigation and routing.  

### Database  
- Hosted on **DigitalOcean**.  

### Deployment  
- Deployed on **DigitalOcean's droplet** for production hosting.  

---

## How It Works  

1. **Admin Role**  
   - The admin creates and manages surveys that graduates can answer.  
   - Admins can also manage all users and export survey data for reporting.  

2. **Company Role**  
   - Companies create job postings that graduates can apply for.  
   - Job postings include an automatic closing feature that closes the position after a specified time.  

3. **Graduate Role**  
   - Graduates answer surveys to receive a unique QR code as proof of participation.  
   - They can also upload their resumes and apply for job postings via the internal job bank.  

---

## Key Highlights  

- **Automated Position Closure**: Job positions automatically close after the set time expires, streamlining the recruitment process.  
- **Enhanced User Experience**: Dark theme and responsive design provide a smooth and modern experience for all users.  

---

## Deployment  

The application is hosted on **DigitalOcean**, with both the backend and database running on a droplet.  

---

## Future Improvements  

- Integration with external job platforms.  
- Enhanced reporting and analytics for admins.  
- Multilingual support to cater to a broader audience.  

---

This app represents a comprehensive solution for managing graduates' surveys and job opportunities while ensuring an intuitive experience for all user types.
