# 🌿 AI Plant Analysis Tool

An AI-powered web application that analyzes plant images using Google Gemini AI. Users can upload a plant image and receive detailed insights about plant species, health condition, disease detection, and care recommendations.

The application also generates downloadable PDF reports for future reference.

---

## 🚀 Features

### 🤖 AI Plant Recognition

- Identify plant species from images
- Analyze plant characteristics
- Generate AI-powered plant descriptions

### 🌱 Plant Health Analysis

- Detect visible plant diseases
- Identify signs of stress or damage
- Analyze overall plant condition

### 📋 Smart Recommendations

- Watering suggestions
- Soil recommendations
- Growth tips
- Disease prevention advice

### 📄 PDF Report Generation

- Download AI-generated plant reports
- Save plant health assessments
- Share reports for consultation

### 📷 Image Upload Support

- Upload plant images directly
- Fast image processing workflow
- Secure file handling with Multer

---

## 🛠 Tech Stack

### Backend

- Node.js
- Express.js

### AI Integration

- Google Gemini AI
- Google Generative AI SDK

### File Handling

- Multer

### Report Generation

- PDFKit

### Frontend

- HTML
- CSS
- JavaScript

---

## 📂 Project Structure

```bash
AI-Plant-Analysis-Tool/
│
├── public/
│   └── index.html
│
├── upload/
│   └── uploaded-images
│
├── package.json
├── server.js
└── .env
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Priyank910/AI-Plant-Analysis-Tool.git
```

### Navigate Into Project

```bash
cd AI-Plant-Analysis-Tool
```

### Install Dependencies

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory.

```env
PORT=3000

GEMINI_API_KEY=your_google_gemini_api_key
```

---

## ▶️ Run Application

```bash
npm start
```

Server will start on:

```text
http://localhost:3000
```

---

## 📖 How It Works

1. Upload a plant image.
2. The image is sent to the backend.
3. Google Gemini Vision analyzes the image.
4. AI identifies the plant and evaluates its condition.
5. Detailed recommendations are generated.
6. A PDF report is created for download.

---

## 🎯 Use Cases

- Home Gardening
- Agriculture Monitoring
- Plant Disease Detection
- Educational Projects
- Botanical Research
- Smart Farming Applications

---

## 📸 Screenshots

Add screenshots here:

### Home Page

[Insert Screenshot]

### Plant Analysis Result

[Insert Screenshot]

### Generated PDF Report

[Insert Screenshot]

---

## 📚 Learning Outcomes

- AI Vision Integration
- Prompt Engineering
- File Upload Management
- PDF Generation
- Express Backend Development
- AI-Powered Application Design
- Generative AI Workflows

---

## 🚀 Future Enhancements

- Plant History Tracking
- User Authentication
- Multiple Image Analysis
- Mobile Responsive UI
- Cloud Storage Integration
- Plant Care Reminder System
- AI Chat Assistant for Plant Care
- Dashboard Analytics

---

## 👨‍💻 Author

Priyank Patel

GitHub: https://github.com/Priyank910

---

## 📄 License

This project is licensed under the MIT License.
