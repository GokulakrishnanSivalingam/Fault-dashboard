---
description: Connect ESP32 to backend API
---

This workflow guides you through connecting an ESP32 microcontroller to your local Node.js backend.

## Prerequisites
- Arduino IDE installed.
- ESP32 board support installed in Arduino IDE.
- Your backend server running locally.

## Steps

1. **Verify Backend Endpoint**
   Ensure your backend has an endpoint returning JSON data. We've added a test endpoint at `/api/data`.
   Run this command to test it (ensure server is running):
   ```powershell
   curl http://localhost:5000/api/data
   ```

2. **Open the ESP32 Sketch**
   Open the file `e:\projects\APP\embedded\esp32_fetch_data\esp32_fetch_data.ino` in Arduino IDE.

3. **Configure Wi-Fi**
   in the sketch, replace `YOUR_SSID` and `YOUR_PASSWORD` with your actual Wi-Fi credentials.
   ```cpp
   const char* ssid = "YOUR_SSID";
   const char* password = "YOUR_PASSWORD";
   ```

4. **Configure Backend URL**
   Update the `serverUrl` variable. If testing locally, use your computer's IP address instead of `localhost` because the ESP32 is on a different device on the network.
   ```cpp
   // Find your IP using ipconfig command in terminal
   const char* serverUrl = "http://192.168.1.X:5000/api/data"; 
   ```

5. **Upload and Monitor**
   - Connect ESP32 via USB.
   - Select your Board and COM Port in Arduino IDE.
   - Click Upload.
   - Open Serial Monitor (115200 baud) to see the response.
