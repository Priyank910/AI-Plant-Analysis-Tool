const express = require("express");
const multer = require("multer");
const PDFDoc = require("pdfkit");
const fs = require("fs");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");
const { error } = require("console");

require("dotenv").config();

const fsPromises = fs.promises;
const app = express();
const PORT = process.env.PORT || 3000;

// Config multer
const upload = multer({ dest: "upload/" });
app.use(express.json({ limit: "10mb" }));

// initialize the Gen AI
const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);
app.use(express.static("public"));

// analyze Routes
app.post("/analyze", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image" });
    }
    const imagePath = req.file.path;
    const imageData = await fsPromises.readFile(imagePath, {
      encoding: "base64",
    });

    // Use Gemini AI to analyze the image
    const response = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: "Analyze this plant image and provide detailed analysis of its species, health, care recommendations, characteristics, and interesting facts. Respond in plain text only.",
            },
            {
              inlineData: {
                mimeType: req.file.mimetype,
                data: imageData,
              },
            },
          ],
        },
      ],
    });

    const plantInfo = response.text;
    // Remove the uploaded image
    await fsPromises.unlink(imagePath);
    // Send the response
    res.json({
      result: plantInfo,
      image: `data:${req.file.mimeType};base64, ${imageData}`,
    });
  } catch (error) {
    console.error("Error analyzing image : ", error);
    res
      .status(500)
      .json({ error: "An error occurred while analyzing the image" });
  }
});

// Download pdf
app.post("/download", express.json(), async (req, res) => {
  const { result, image } = req.body;
  try {
    // Ensure the reports directory exists
    const reportsDir = path.join(__dirname, "reports");
    await fsPromises.mkdir(reportsDir, { recursive: true });
    // Generate pdf
    const filename = `plant_analysis_report_${Date.now()}.pdf`;
    const filePath = path.join(reportsDir, filename);
    const writeStream = fs.createWriteStream(filePath);
    const doc = new PDFDoc();
    doc.pipe(writeStream);

    // Add content to the pdf
    doc.fontSize(24).text("Plant Analysis Report", {
      align: "center",
    });
    doc.moveDown();
    doc.fontSize(24).text(`Date : ${new Date().toLocaleDateString()}`);
    doc.moveDown();
    doc.fontSize(14).text(result, { align: "left" });

    // Insert image to the pdf
    if (image) {
      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      doc.moveDown();
      doc.image(buffer, {
        fit: [500, 300],
        align: "center",
        valign: "center",
      });
    }
    doc.end();

    // wait for the pdf to be created
    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });

    res.download(filePath, (err) => {
      if (err) {
        res.status(500).json({ error: "Error downloading the PDF report" });
      }
      fsPromises.unlink(filePath);
    });
  } catch (error) {
    console.error("Error downloading the PDF report : ", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the PDF report" });
  }
});

app.listen(PORT, console.log(`Server is running at http://localhost:${PORT}`));
