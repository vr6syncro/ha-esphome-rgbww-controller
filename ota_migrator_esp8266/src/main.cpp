#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <Updater.h>

// Simple OTA migrator for ESP8266
// 1) Flash this binary via the old firmware's web update
// 2) Connect to AP "ESPHome-Migrator-<CHIPID>" (password: MIGRATOR_AP_PASSWORD)
// 3) Open http://192.168.4.1 and upload your ESPHome .bin
// 4) Device flashes and reboots into ESPHome

#ifndef MIGRATOR_AP_PASSWORD
#define MIGRATOR_AP_PASSWORD "esphome123"
#endif

ESP8266WebServer server(80);

String chipIdStr() {
  uint32_t chipId = ESP.getChipId();
  char buf[9];
  snprintf(buf, sizeof(buf), "%06X", chipId);
  return String(buf);
}

const char INDEX_HTML[] PROGMEM = R"HTML(
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>ESPHome Migrator</title>
  <style>
    body{font-family:system-ui,Arial;margin:2rem;}
    .box{max-width:640px;margin:auto;padding:1rem;border:1px solid #ddd;border-radius:8px}
    h1{font-size:1.2rem;margin:0 0 .5rem}
    input[type=file]{margin:.5rem 0}
    .btn{padding:.5rem 1rem;border:1px solid #333;border-radius:4px;background:#333;color:#fff;cursor:pointer}
    .muted{color:#666;font-size:.9rem}
    .ok{color:#0a0}
    .err{color:#a00}
  </style>
</head>
<body>
  <div class="box">
    <h1>ESPHome Migrator</h1>
    <p>Upload the ESPHome firmware (.bin) built for your device.</p>
    <form method="POST" action="/update" enctype="multipart/form-data">
      <input type="file" name="firmware" accept=".bin" required>
      <br>
      <button class="btn" type="submit">Flash</button>
    </form>
    <p class="muted">After a successful flash, the device reboots automatically.</p>
  </div>
</body>
</html>
)HTML";

void handleRoot() { server.send_P(200, "text/html", INDEX_HTML); }

void handleNotFound() {
  String msg = "Not Found\n\n";
  msg += server.uri();
  server.send(404, "text/plain", msg);
}

void handleUpdate() {
  HTTPUpload& upload = server.upload();
  if (upload.status == UPLOAD_FILE_START) {
    // Begin update with unknown size
    if (!Update.begin(UPDATE_SIZE_UNKNOWN)) {
      Update.printError(Serial);
    }
  } else if (upload.status == UPLOAD_FILE_WRITE) {
    // Write received chunk
    if (Update.write(upload.buf, upload.currentSize) != upload.currentSize) {
      Update.printError(Serial);
    }
  } else if (upload.status == UPLOAD_FILE_END) {
    if (Update.end(true)) { // true to set the new sketch as boot
      Serial.printf("Update Success: %u bytes\n", upload.totalSize);
      server.send(200, "text/plain", "OK - Rebooting...");
      delay(500);
      ESP.restart();
      return;
    } else {
      Update.printError(Serial);
      server.send(500, "text/plain", "Flash failed");
    }
  }
}

void setup() {
  Serial.begin(115200);
  delay(200);
  Serial.println();
  Serial.println("=== ESPHome Migrator (ESP8266) ===");
  Serial.printf("Chip ID: %s\n", chipIdStr().c_str());

  // Start AP for local upload
  String ssid = String("ESPHome-Migrator-") + chipIdStr();
  WiFi.mode(WIFI_AP);
  WiFi.softAP(ssid.c_str(), MIGRATOR_AP_PASSWORD);
  IPAddress ip = WiFi.softAPIP();
  Serial.printf("AP SSID: %s  PASS: %s\n", ssid.c_str(), MIGRATOR_AP_PASSWORD);
  Serial.printf("Open http://%s in your browser\n", ip.toString().c_str());

  server.on("/", HTTP_GET, handleRoot);
  server.on("/update", HTTP_POST, [](){}, handleUpdate);
  server.onNotFound(handleNotFound);
  server.begin();
}

void loop() {
  server.handleClient();
}

