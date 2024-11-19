# Video to PDF Conversion Project

## Overview
This project converts video files into PDF documents. It extracts frames from a video, generates images, and compiles them into a PDF file. The project leverages **Node.js** and **Express** for the backend API and uses **Python** scripts for intensive tasks like frame extraction and PDF creation, demonstrating a seamless integration between Node.js and Python.

## Features
- Accepts a video file upload.
- Extracts frames from the video at a specified frame rate.
- Generates images from the extracted frames.
- Compiles the generated images into a PDF file.
- Automatically cleans up temporary files and folders after processing.

## Prerequisites
- **Node.js** (v14 or higher)
- **Python** (v3.7 or higher)
- Required Python packages:
  - `opencv-python`
  - `Pillow`
- **npm** (Node Package Manager)

---

### **Integration of Node.js and Python**
The project combines the strengths of **Node.js** for handling web requests and server operations with **Python** for computational and file-processing tasks. Using Node's `child_process.spawn` API, the project executes Python scripts as subprocesses, enabling a powerful and efficient pipeline for video-to-PDF conversion.
