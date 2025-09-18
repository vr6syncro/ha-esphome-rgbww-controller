# OTA Migrator → ESPHome (ESP8266/ESP32)

Migration-Tool für den Wechsel von alter Firmware (z.B. Original FHEM RGBWW Controller mit Sming/rBoot) zu ESPHome.

## Fertige Binaries
- **`ota_migrator_esp8266.bin`** - Vorkompilierte Binary für ESP8266 (ESP-12E/F) - 304KB
- **`ota_migrator_esp32.bin`** - Vorkompilierte Binary für ESP32 (ESP32-WROOM) - 750KB

## Anleitung
1. **Alte Firmware Web-Update nutzen**
   - Original FHEM Controller Web-Interface öffnen
   - Update/OTA Seite aufrufen
   - Entsprechende Binary hochladen:
     - ESP8266: `ota_migrator_esp8266.bin`
     - ESP32: `ota_migrator_esp32.bin`
   - Gerät startet automatisch neu

2. **Mit Migrator-AP verbinden**
   - **WLAN suchen**: `ESPHome-Migrator-<CHIPID>`
   - **Passwort eingeben**: `esphome123`
   - **Beispiel**: SSID könnte `ESPHome-Migrator-AB1234` heißen

3. **ESPHome Firmware flashen**
   - **Browser öffnen**: http://192.168.4.1
   - **Binary auswählen**: ESPHome `.bin` Datei (aus rgb/rgbw/rgbww Ordner)
   - **Upload klicken** → Gerät flasht automatisch
   - **Warten**: Nach erfolgreichem Flash startet ESPHome automatisch

### ⚙️ **Wichtige Hinweise:**
- **WLAN-Passwort**: `esphome123` (für alle Migrator-APs)
- **IP-Adresse**: `192.168.4.1` (immer gleich)
- **Zeitlimit**: Migrator läuft unbegrenzt bis zum Upload
- **LED-Status**: Überprüfe die Status-LED während des Prozesses

## Technische Details
- **ESP8266**: Nutzt Arduino OTA Updater, 4MB ESP-12E/F Module
- **ESP32**: Nutzt Arduino OTA Updater, ESP32-WROOM Module
- Benötigt keine WLAN-Zugangsdaten (eigener Access Point)
- Source Code und Build-Anleitung in `src/main.cpp` und `platformio.ini`

## Build Commands
```bash
# ESP8266 Binary bauen
pio run -e esp8266

# ESP32 Binary bauen  
pio run -e esp32
```

## Bei Problemen
- Falls alte Firmware Arduino-Images ablehnt: Seriell flashen
- Bei Boot-Problemen nach Flash: ESPHome direkt per USB flashen

