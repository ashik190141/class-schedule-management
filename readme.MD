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
- **Deployment:** Railway

---

## **🛠 Admin Credentials**
To log in as an **Admin**, use the following credentials:

- **Email:** `ashik@gmail.com`
- **Password:** `123456`

---

## **🚀 Setup Instructions**

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/your-repo-url.git
cd your-project-folder
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
- **Route:** `POST http://localhost:3000/api/v1/auth/login`
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
- **Route:** `POST http://localhost:3000/api/v1/user/create-admin`
- **Headers:** `Authorization Token`
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
      "isDeleted": false,
      "createdAt": "2025-03-13T08:37:57.238Z",
      "updatedAt": "2025-03-13T08:37:57.238Z"
    }
  }
  ```

---

#### **Create Trainee**
- **Route:** `POST http://localhost:3000/api/v1/user/create-trainee`
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
      "isDeleted": false,
      "createdAt": "2025-03-13T08:37:57.238Z",
      "updatedAt": "2025-03-13T08:37:57.238Z"
    }
  }
  ```

---

#### **Create Trainer**
- **Route:** `POST http://localhost:3000/api/v1/user/create-trainer`
- **Headers:** `Authorization Token`
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
      "isDeleted": false,
      "createdAt": "2025-03-13T08:37:57.238Z",
      "updatedAt": "2025-03-13T08:37:57.238Z"
    }
  }
  ```

---

### **3️⃣ Class Schedule Management**
#### **Create Class Schedule**
- **Route:** `POST http://localhost:3000/api/v1/schedule`
- **Headers:** `Authorization Token`
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
- **Route:** `GET http://localhost:3000/api/v1/schedule`
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
- **Route:** `PUT http://localhost:3000/api/v1/schedule/assign-trainer/:classId`
- **Example:** `PUT http://localhost:3000/api/v1/schedule/assign-trainer/c38d1914-9f5d-421b-b777`
- **Headers:** `Authorization Token`
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
- **Route:** `PUT http://localhost:3000/api/v1/schedule/:classId`
- **Example:** `PUT http://localhost:3000/api/v1/schedule/0e405eac-a0b9-4537-869a-de0b7ce1c048`
- **Headers:** `Authorization Token`
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
- **Route:** `DELETE http://localhost:3000/api/v1/schedule/:classId`
- **Example:** `DELETE http://localhost:3000/api/v1/schedule/53a8dbd4-c0f4-4709-abb6-be8260bf013a`
- **Headers:** `Authorization Token`
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
- **Route:** `POST http://localhost:3000/api/v1/booking/`
- **Headers:** `Authorization Token`
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
- **Route:** `DELETE http://localhost:3000/api/v1/booking/:bookingId`
- **Example:** `DELETE http://localhost:3000/api/v1/booking/8106c0a0-c55e-4b6a-b643-cb425bc49370`
- **Headers:** `Authorization Token`
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
- **Route:** `DELETE http://localhost:3000/api/v1/user/remove-trainer/:trainerId`
- **Example:** `DELETE http://localhost:3000/api/v1/user/remove-trainer/2ab1b876-0e38-463f-9818-c4ad3a5b065c`
- **Headers:** `Authorization Token`
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
      "isDeleted": false,
      "createdAt": "2025-03-14T04:32:35.536Z",
      "updatedAt": "2025-03-14T04:32:35.536Z"
    }
  }
  ```

---

### **6️⃣ Profile Management**
#### **Get My Profile**
- **Route:** `GET http://localhost:3000/api/v1/user/me`
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
      "isDeleted": false,
      "createdAt": "2025-03-13T19:02:56.453Z",
      "updatedAt": "2025-03-13T19:02:56.453Z"
    }
  }
  ```

---

#### **Update My Profile**
- **Route:** `PUT http://localhost:3000/api/v1/user/update-my-profile`
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

  ### **7️⃣ Trainer Schedule Management**
#### **Get Schedule of a Trainer**
- **Route:** `GET http://localhost:3000/api/v1/schedule/:trainerId`
- **Example:**  
  `GET http://localhost:3000/api/v1/schedule/f4379d6a-4bd5-4454-9cad-62a77d134d07`
- **Headers:**  
  - `Authorization Token`
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