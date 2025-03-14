## **📌 Project Overview**

This project is a **Gym Management System** that allows **admins, trainers, and trainees** to manage class schedules, book classes, and update profiles. It includes authentication, role-based access, class scheduling, trainer assignment, and trainee bookings.

## **🗂️ Relational Diagram**

Below is the relational diagram representing the **database relationships** between users, trainers, trainees, admins, bookings, and class schedules.

<img src="https://res.cloudinary.com/dbtpawxtd/image/upload/v1741931585/EduDiagram_zjp0yt.jpg">

## **💻 Technology Stack**

The project is built using the following technologies:

- **Backend:** Node.js, Express.js, Prisma ORM, PostgreSQL
- **Database:** PostgreSQL (Relational Database)
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Railway, Vercel

---

## **🛠 Admin Credentials**

To log in as an **Admin**, use the following credentials:

- **Email:** `ashik@gmail.com`
- **Password:** `123456`

---

## 🚀 **Live Project Links**
Your project is live! 🎉 Access it here:

- **Backend API:** [Live Backend API URL](https://gym-self-ten.vercel.app)

---

## **🚀 Setup Instructions**

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/ashik190141/class-schedule-management
cd class-schedule-management
```

### **2️⃣ Install Dependencies**

```bash
yarn install
```

### **3️⃣ Set Up Environment Variables**

Create a `.env` file in the root directory and add the following:

```
DATABASE_URL=your_postgresql_database_url
SECRET=your_secret_key
SECRET_EXPIRE=the time when secret key expires
```

### **5️⃣ Start the Development Server**

```bash
yarn dev
```

## **🗃️ Database Schema (Prisma Model)**

The following **Prisma schema** represents the database structure used in this project.

```prisma

enum Role {
  ADMIN
  TRAINER
  TRAINEE
}

enum Gender {
  MALE
  FEMALE
}

model User {
  id          String   @id @default(uuid())
  email       String   @unique
  password    String
  role        Role
  trainer     Trainer?
  trainee     Trainee?
  admin       Admin?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("users")
}

model Trainer {
  id            String   @id @default(uuid())
  name          String
  email         String   @unique
  contactNumber String
  gender        Gender
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  user          User @relation(fields: [email], references: [email])
  classSchedule ClassSchedule[]

  @@map("trainers")
}

model Trainee {
  id            String   @id @default(uuid())
  name          String
  email         String   @unique
  contactNumber String
  gender        Gender
  user          User @relation(fields: [email], references: [email])
  booking       Booking[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@map("trainees")
}

model Admin {
  id            String   @id @default(uuid())
  name          String
  email         String   @unique
  contactNumber String
  gender        Gender
  user          User @relation(fields: [email], references: [email])
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@map("admins")
}

model ClassSchedule {
  id            String   @id @default(uuid())
  date          DateTime
  startTime     String
  endTime       String
  trainerEmail  String?
  bookingNumber Int      @default(0)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  trainer       Trainer? @relation(fields: [trainerEmail], references: [email])
  booking       Booking[]

  @@map("classSchedules")
}

model Booking {
  id            String   @id @default(uuid())
  classId       String
  traineeEmail  String
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  classSchedule ClassSchedule @relation(fields: [classId], references: [id])
  trainee       Trainee @relation(fields: [traineeEmail], references: [email])

  @@map("bookings")
}
```

## **📌 API Documentation**

The system includes a robust set of **RESTful APIs** to enable smooth interaction between frontend applications and backend services.

# **Gym Management System API Documentation**

### **1️⃣ Authentication**

#### **Login**

- **Route:** `https://gym-self-ten.vercel.app/api/v1/auth/login`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "joy@gmail.com",
    "password": "123456"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Logging Successfully",
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

---

### **2️⃣ User Management**

#### **Create Admin**

- **Route:** `https://gym-self-ten.vercel.app/api/v1/user/create-admin`
- **Method:** `POST`
- **Headers:** `Authorization Admin Token`
- **Body:**
  ```json
  {
    "password": "123456",
    "admin": {
      "name": "ashik",
      "email": "ashik@gmail.com",
      "contactNumber": "01323174132",
      "gender": "MALE"
    }
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Admin Created Successfully",
    "data": {
      "id": "86428565-01dd-4678-a9c5-f5b5acd4e170",
      "name": "ashik",
      "email": "ashik@gmail.com",
      "contactNumber": "01323174132",
      "gender": "MALE",
      "createdAt": "2025-03-13T08:37:57.238Z",
      "updatedAt": "2025-03-13T08:37:57.238Z"
    }
  }
  ```

---

#### **Create Trainee**

- **Route:** `https://gym-self-ten.vercel.app/api/v1/user/create-trainee`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "password": "123456",
    "trainee": {
      "name": "joy",
      "email": "joy@gmail.com",
      "contactNumber": "01323174132",
      "gender": "MALE"
    }
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Trainee Created Successfully",
    "data": {
      "id": "86428565-01dd-4678-a9c5-f5b5acd4e170",
      "name": "joy",
      "email": "joy@gmail.com",
      "contactNumber": "01323174132",
      "gender": "MALE",
      "createdAt": "2025-03-13T08:37:57.238Z",
      "updatedAt": "2025-03-13T08:37:57.238Z"
    }
  }
  ```

---

#### **Create Trainer**

- **Route:** `https://gym-self-ten.vercel.app/api/v1/user/create-trainer`
- **Method:** `POST`
- **Headers:** `Authorization Admin Token`
- **Body:**
  ```json
  {
    "password": "123456",
    "trainer": {
      "name": "sabbir",
      "email": "sabbir@gmail.com",
      "contactNumber": "01323174132",
      "gender": "MALE"
    }
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Trainer Created Successfully",
    "data": {
      "id": "86428565-01dd-4678-a9c5-f5b5acd4e170",
      "name": "sabbir",
      "email": "sabbir@gmail.com",
      "contactNumber": "01323174132",
      "gender": "MALE",
      "createdAt": "2025-03-13T08:37:57.238Z",
      "updatedAt": "2025-03-13T08:37:57.238Z"
    }
  }
  ```

---

#### **Retrieve Trainer**

- **Route:** `https://gym-self-ten.vercel.app/api/v1/user/trainers`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Trainer Data Fetched",
    "data": [
      {
        "id": "545a4f21-38c0-4543-ace5-177679000cbc",
        "name": "sabbir",
        "email": "sabbir@gmail.com",
        "contactNumber": "01323174132",
        "gender": "MALE",
        "createdAt": "2025-03-14T09:54:10.401Z",
        "updatedAt": "2025-03-14T09:54:10.401Z"
      },
      {
        "id": "36914eba-6cb7-4c3c-8a2d-39b0accff3dc",
        "name": "sagor",
        "email": "sagor@gmail.com",
        "contactNumber": "01323174132",
        "gender": "MALE",
        "createdAt": "2025-03-14T09:54:23.559Z",
        "updatedAt": "2025-03-14T09:54:23.559Z"
      }
    ]
  }
  ```

---

#### **Retrieve Trainee**

- **Route:** `https://gym-self-ten.vercel.app/api/v1/user/trainees?limit=3&page=1`
- **Method:** `GET`
- **Headers:** `Authorization Admin Token`
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Fetch Trainee Data",
    "data": {
      "meta": {
        "page": 1,
        "limit": 3,
        "total": 3
      },
      "data": [
        {
          "id": "7515eed7-9b85-4e58-b2a6-4c5bda68ab02",
          "name": "joy",
          "email": "joy@gmail.com",
          "contactNumber": "01323174132",
          "gender": "MALE",
          "createdAt": "2025-03-14T09:54:50.152Z",
          "updatedAt": "2025-03-14T09:54:50.152Z"
        },
        {
          "id": "73a04b2a-ca2f-436d-8e20-d2ba5c0aa70d",
          "name": "sadia",
          "email": "sadia@gmail.com",
          "contactNumber": "01323174132",
          "gender": "FEMALE",
          "createdAt": "2025-03-14T09:55:10.403Z",
          "updatedAt": "2025-03-14T09:55:10.403Z"
        },
        {
          "id": "6ba22bf6-6ad2-4a8d-9050-b732aa975db1",
          "name": "samia",
          "email": "samia@gmail.com",
          "contactNumber": "01323174132",
          "gender": "FEMALE",
          "createdAt": "2025-03-14T09:55:26.381Z",
          "updatedAt": "2025-03-14T09:55:26.381Z"
        }
      ]
    }
  }
  ```

---

### **3️⃣ Class Schedule Management**

#### **Create Class Schedule**

- **Route:** `https://gym-self-ten.vercel.app/api/v1/schedule`
- **Method:** `POST`
- **Headers:** `Authorization Admin Token`
- **Body:**
  ```json
  {
    "date": "2025-03-20T00:00:00.000Z",
    "startTime": "10:00 AM"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Successfully Create Class Schedule",
    "data": {
      "id": "c38d1914-9f5d-421b-b777-6b07032c60e2",
      "date": "2025-03-20T00:00:00.000Z",
      "startTime": "10:00 AM",
      "endTime": "12:00 PM",
      "trainerEmail": null,
      "createdAt": "2025-03-13T13:04:59.264Z",
      "updatedAt": "2025-03-13T13:04:59.264Z"
    }
  }
  ```

---

#### **Get Class Schedule**

- **Route:** `https://gym-self-ten.vercel.app/api/v1/schedule`
- **Method:** `GET`
- **Query Parameters:**
  - `date=2025-03-21T00:00:00.000Z`
  - `limit=2&page=2`
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Class Schedule Data Retrieved",
    "meta": {
      "page": 1,
      "limit": 2,
      "total": 3
    },
    "data": [
      {
        "id": "0e405eac-a0b9-4537-869a-de0b7ce1c048",
        "date": "2025-03-21T00:00:00.000Z",
        "startTime": "11:00 AM",
        "endTime": "1:00 PM",
        "trainerEmail": null,
        "createdAt": "2025-03-13T13:40:00.204Z",
        "updatedAt": "2025-03-13T13:40:00.204Z"
      },
      {
        "id": "53a8dbd4-c0f4-4709-abb6-be8260bf013a",
        "date": "2025-03-20T00:00:00.000Z",
        "startTime": "1:00 PM",
        "endTime": "3:00 PM",
        "trainerEmail": null,
        "createdAt": "2025-03-13T13:29:46.513Z",
        "updatedAt": "2025-03-13T13:29:46.513Z"
      }
    ]
  }
  ```

#### **Assign Trainer**

- **Route:** `https://gym-self-ten.vercel.app/api/v1/schedule/assign-trainer/:classId`
- **Example:** `https://gym-self-ten.vercel.app/api/v1/schedule/assign-trainer/c38d1914-9f5d-421b-b777`
- **Method:** `PUT`
- **Headers:** `Authorization Admin Token`
- **Body:**
  ```json
  {
    "trainerId": "f4379d6a-4bd5-4454-9cad-62a77d134d07"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Successfully Assign Trainer",
    "data": {
      "id": "c38d1914-9f5d-421b-b777-6b07032c60e2",
      "date": "2025-03-20T00:00:00.000Z",
      "startTime": "10:00 AM",
      "endTime": "12:00 PM",
      "trainerEmail": "sabbir@gmail.com",
      "createdAt": "2025-03-13T13:04:59.264Z",
      "updatedAt": "2025-03-13T14:20:47.127Z"
    }
  }
  ```

---

#### **Update Class Schedule**

- **Route:** `https://gym-self-ten.vercel.app/api/v1/schedule/:classId`
- **Example:** `https://gym-self-ten.vercel.app/api/v1/schedule/0e405eac-a0b9-4537-869a-de0b7ce1c048`
- **Method:** `PUT`
- **Headers:** `Authorization Admin Token`
- **Body:**
  ```json
  {
    "startTime": "10:30 AM"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Class schedule updated successfully.",
    "data": {
      "id": "0e405eac-a0b9-4537-869a-de0b7ce1c048",
      "date": "2025-03-21T00:00:00.000Z",
      "startTime": "10:30 AM",
      "endTime": "12:30 PM",
      "trainerEmail": "sabbir@gmail.com",
      "createdAt": "2025-03-13T13:40:00.204Z",
      "updatedAt": "2025-03-13T17:20:42.895Z"
    }
  }
  ```

---

#### **Delete Class Schedule**

- **Route:** `https://gym-self-ten.vercel.app/api/v1/schedule/:classId`
- **Example:** `https://gym-self-ten.vercel.app/api/v1/schedule/53a8dbd4-c0f4-4709-abb6-be8260bf013a`
- **Method:** `DELETE`
- **Headers:** `Authorization Admin Token`
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Delete the class successfully",
    "data": {
      "id": "53a8dbd4-c0f4-4709-abb6-be8260bf013a",
      "date": "2025-03-20T00:00:00.000Z",
      "startTime": "12:00 PM",
      "endTime": "2:00 PM",
      "trainerEmail": null,
      "createdAt": "2025-03-13T13:29:46.513Z",
      "updatedAt": "2025-03-13T13:29:46.513Z"
    }
  }
  ```

---

### **4️⃣ Booking System**

#### **Book a Class**

- **Route:** `https://gym-self-ten.vercel.app/api/v1/booking/`
- **Method:** `POST`
- **Headers:** `Authorization Trainee Token`
- **Body:**
  ```json
  {
    "classId": "e38cecbc-686a-48d0-9314-66b05837b87c"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Successfully booked class e38cecbc-686a-48d0-9314-66b05837b87c for trainee joy@gmail.com.",
    "data": {
      "id": "921a820e-65b8-4b48-82a4-03c11d26f5a4",
      "classId": "e38cecbc-686a-48d0-9314-66b05837b87c",
      "traineeEmail": "joy@gmail.com",
      "createdAt": "2025-03-13T20:11:42.544Z",
      "updatedAt": "2025-03-13T20:11:42.544Z"
    }
  }
  ```

---

#### **Remove Booking Class**

- **Route:** `https://gym-self-ten.vercel.app/api/v1/booking/:bookingId`
- **Example:** `https://gym-self-ten.vercel.app/api/v1/booking/8106c0a0-c55e-4b6a-b643-cb425bc49370`
- **Method:** `DELETE`
- **Headers:** `Authorization Trainee Token`
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Successfully canceled booked class 8106c0a0-c55e-4b6a-b643-cb425bc49370 for trainee joy@gmail.com.",
    "data": {
      "count": 1
    }
  }
  ```

---

### **5️⃣ Trainer Management**

#### **Remove Trainer**

- **Route:** `https://gym-self-ten.vercel.app/api/v1/user/remove-trainer/:trainerId`
- **Example:** `https://gym-self-ten.vercel.app/api/v1/user/remove-trainer/2ab1b876-0e38-463f-9818-c4ad3a5b065c`
- **Method:** `DELETE`
- **Headers:** `Authorization Admin Token`
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Trainer removed successfully and unassigned from all classes.",
    "data": {
      "id": "2ab1b876-0e38-463f-9818-c4ad3a5b065c",
      "name": "sagor",
      "email": "sagor@gmail.com",
      "contactNumber": "01323174132",
      "gender": "MALE",
      "createdAt": "2025-03-14T04:32:35.536Z",
      "updatedAt": "2025-03-14T04:32:35.536Z"
    }
  }
  ```

---

### **6️⃣ Profile Management**

#### **Get My Profile**

- **Route:** `https://gym-self-ten.vercel.app/api/v1/user/me`
- **Method:** `GET`
- **Headers:** `Authorization Token`
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "My Profile Data Fetched",
    "data": {
      "id": "cd2b1c78-4c13-4ac5-a36a-cebc8272fbcf",
      "email": "joy@gmail.com",
      "role": "TRAINEE",
      "name": "joy",
      "contactNumber": "01323174132",
      "gender": "MALE",
      "createdAt": "2025-03-13T19:02:56.453Z",
      "updatedAt": "2025-03-13T19:02:56.453Z"
    }
  }
  ```

---

#### **Update My Profile**

- **Route:** `https://gym-self-ten.vercel.app/api/v1/user/update-my-profile`
- **Method:** `PUT`
- **Headers:** `Authorization Token`
- **Body:**
  ```json
  {
    "contactNumber": "01744136454",
    "name": "joy mondol"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Update Profile Successfully",
    "data": {
      "id": "cd2b1c78-4c13-4ac5-a36a-cebc8272fbcf",
      "email": "joy@gmail.com",
      "role": "TRAINEE",
      "name": "joy mondol",
      "contactNumber": "01744136454",
      "gender": "MALE"
    }
  }
  ```

### **7️⃣ Trainer Schedule Management**

#### **Get Schedule of a Trainer**

- **Route:** `https://gym-self-ten.vercel.app/api/v1/schedule/:trainerId`
- **Method:** `GET`
- **Example:**  
  `GET https://gym-self-ten.vercel.app/api/v1/schedule/f4379d6a-4bd5-4454-9cad-62a77d134d07`
- **Headers:**
  - `Authorization Trainer Token`
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Successfully retrieve class schedule of the trainer",
    "data": [
      {
        "id": "c38d1914-9f5d-421b-b777-6b07032c60e2",
        "date": "2025-03-20T00:00:00.000Z",
        "startTime": "10:00 AM",
        "endTime": "12:00 PM",
        "trainerEmail": "sabbir@gmail.com",
        "createdAt": "2025-03-13T13:04:59.264Z",
        "updatedAt": "2025-03-13T14:20:47.127Z"
      },
      {
        "id": "0e405eac-a0b9-4537-869a-de0b7ce1c048",
        "date": "2025-03-21T00:00:00.000Z",
        "startTime": "10:30 AM",
        "endTime": "12:30 PM",
        "trainerEmail": "sabbir@gmail.com",
        "createdAt": "2025-03-13T13:40:00.204Z",
        "updatedAt": "2025-03-13T17:20:42.895Z"
      }
    ]
  }
  ```
## 🚀 **Key Features & How to Test**

### **1️⃣ Create a Trainer**
To create a trainer, send a POST request to /api/v1/user/create-trainer with trainer details and an admin's token in the Authorization header. The system checks if the email exists, hashes the password, creates a user entry, and adds the trainer. On success, it returns a confirmation message with trainer data.

### **2️⃣ Book a Class**
To book a class, send a POST request to /api/v1/booking with the class ID and trainee's email. The system checks if the class exists and if it has available slots (maximum 10 trainees per class). It also ensures that the trainee is not already booked for another class at the same date and overlapping time. If all conditions are met, the system creates a new booking and updates the class's booking count. On success, it returns a confirmation message with the booking details. The request must include an trainee's authentication token in the Authorization header

### **3️⃣ Create a Class Schedule**
To create a class schedule, send a POST request to /api/v1/schedule/create with the date and start time. The request must include an admin’s authentication token in the Authorization header since only admins can create class schedules. The system first checks if the date already has 5 scheduled classes, ensuring a limit per day. If the limit is reached, the request is rejected. If valid, the system automatically calculates the end time by adding 2 hours to the start time. Finally, the class schedule is created and saved in the database. Upon success, the system returns a confirmation message along with the class details.