# ESP8266 OTA Migrator → ESPHome

Purpose: Migrate devices running legacy firmware (e.g., Sming/rBoot based) to ESPHome using the old web update once, then flashing the final ESPHome image via a small temporary AP.

Flow
- Build this project (PlatformIO env `esp12e`) to get `firmware.bin`.
- Use the old firmware’s web update to upload this binary. The device reboots into the Migrator.
- Connect to the Migrator AP:
  - SSID: `ESPHome-Migrator-<CHIPID>`
  - Password: `esphome123` (change via `build_flags`)
- Open http://192.168.4.1 and upload your ESPHome `.bin` (compiled for your device).
- The Migrator flashes the image and reboots → ESPHome is now running.

Notes & Caveats
- This shim uses Arduino Updater and assumes the uploaded ESPHome image matches the device’s flash size/layout sufficiently for boot. On most 4MB ESP‑12E modules this works reliably; on unusual layouts, a serial first flash is safer.
- If the old firmware’s updater rejects Arduino images, try serial flashing or a two‑step: flash smaller Migrator first, then final ESPHome.
- The Migrator does not require prior Wi‑Fi credentials; it hosts an AP.

Build
```
pio run -e esp12e
```
The output `.pio/build/esp12e/firmware.bin` is the file to upload via the old web update.

Customize
- Change AP password by editing `platformio.ini` (build flag `MIGRATOR_AP_PASSWORD`).

Rollback
- If flashing fails and the device no longer boots, use serial flashing with `esphome run` or `esptool.py`.

