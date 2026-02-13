# ESPHome RGBWW Controller

[![ESPHome](https://img.shields.io/badge/ESPHome-2026.1+-blue)](https://esphome.io)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Compatible-brightgreen)](https://www.home-assistant.io)
[![Platform](https://img.shields.io/badge/Platform-ESP8266%20%7C%20ESP32-orange)](https://www.espressif.com)

**5 spezialisierte ESPHome-Konfigurationen** fuer FHEM RGBWW Controller Hardware sowie kompatible LED-Controller -- von einfachem Dimmer bis zur 5-Kanal RGBWW Vollausstattung.

## Features

- **Funktionierendes Restore** nach Power Loss
- **Optimierte Light-Component** pro Controller-Typ
- **Captive Portal** fuer WiFi-Fallback
- **Safe Mode & Factory Reset** Buttons
- **Einheitliche Presets** mit konsistenten Helligkeitswerten
- **Smooth Fading** zwischen Farben und Helligkeitsstufen

## Web-Konfigurator

**[Konfigurator oeffnen](https://vr6syncro.github.io/ha-esphome-rgbww-controller/configurator/)** -- Konfiguration zusammenklicken, YAML generieren, fertig.

Der Konfigurator unterstuetzt alle 5 Controller-Typen, ESP8266 und ESP32, konfigurierbare Pins, Presets und Effekte.

## 5 spezialisierte Varianten

| Controller | Kanaele | Features | Ideal fuer |
|------------|---------|----------|-----------|
| **[RGB](rgb/)** | 3 (R,G,B) | RGB-Mix, Farbpresets | RGB LED-Strips |
| **[RGBW](rgbw/)** | 4 (R,G,B,W) | RGB + White, Color Interlock | RGBW LED-Strips |
| **[RGBWW](rgbww/)** | 5 (R,G,B,WW,CW) | RGB + CCT, Constant Brightness | Premium RGBWW LEDs |
| **[Dual White](dual-white/)** | 2 (WW,CW) | CCT Control, Constant Brightness | Buero/Wohnraum |
| **[Single White](single-white/)** | 1 (W) | Dimmer, Wake Up Preset | Einfache LEDs |

## Quick Start

### 1. Hardware-Typ bestimmen
**Zaehle deine LED-Kanaele:**
- **3 Kanaele** (RGB) -> [RGB Controller](rgb/)
- **4 Kanaele** (RGBW) -> [RGBW Controller](rgbw/)
- **5 Kanaele** (RGBWW) -> [RGBWW Controller](rgbww/) - Vollausstattung
- **2 Kanaele** (WW/CW) -> [Dual White Controller](dual-white/)
- **1 Kanal** (White) -> [Single White Controller](single-white/)

### 2. Konfiguration erstellen
**Option A**: [Web-Konfigurator](https://vr6syncro.github.io/ha-esphome-rgbww-controller/configurator/) verwenden (empfohlen)
**Option B**: Controller-YAML aus dem entsprechenden Ordner kopieren

### 3. Installation
1. **ESPHome Dashboard** -> New Device -> YAML einfuegen
2. **Secrets konfigurieren**: `secrets.yaml` nach [Vorlage](secrets_example.yaml) erstellen
3. **Flashen**:
   - **Neue Hardware**: USB/Serial
   - **ESPHome installiert**: Wireless/OTA
   - **Alte FHEM Firmware**: [OTA Migrator](ota_migrator/) verwenden

### 4. Dashboard einrichten
Dashboard-YAML aus dem Controller-Ordner in Home Assistant importieren.

## Migration von FHEM Firmware

Der [OTA Migrator](ota_migrator/) ermoeglicht die drahtlose Migration von alter FHEM-Firmware zu ESPHome:
1. Migrator-Binary ueber das alte Web-Interface flashen
2. Mit temporaerem AP verbinden (Passwort auf Serial-Konsole)
3. ESPHome-Firmware hochladen

## Ordnerstruktur

```
esphome-rgbww-controller/
├── configurator/           # Web-Konfigurator (GitHub Pages)
│   ├── index.html
│   ├── app.js
│   └── style.css
├── rgb/                    # 3-Kanal RGB Controller
│   ├── controller_rgb.yaml
│   └── dashboard_rgb.yaml
├── rgbw/                   # 4-Kanal RGBW Controller
│   ├── controller_rgbw.yaml
│   └── dashboard_rgbw.yaml
├── rgbww/                  # 5-Kanal RGBWW Controller
│   ├── controller_rgbww.yaml
│   └── dashboard_rgbww.yaml
├── dual-white/             # 2-Kanal CCT Controller
│   ├── controller_dual_white.yaml
│   └── dashboard_dual_white.yaml
├── single-white/           # 1-Kanal Dimmer
│   ├── controller_single_white.yaml
│   └── dashboard_single_white.yaml
├── ota_migrator/           # FHEM -> ESPHome Migration
├── secrets_example.yaml    # Secrets-Vorlage
└── DETAILED_GUIDE.md       # Ausfuehrliche Dokumentation
```

## Contributing

Verbesserungen und Bug-Reports sind willkommen!

- **Issues**: Bug-Reports, Feature-Requests
- **Pull Requests**: Verbesserungen, neue Presets
- **Dokumentation**: Ergaenzungen, Korrekturen

## Lizenz

MIT License - siehe [LICENSE](LICENSE)

## Credits

- **Original Hardware**: [patrickjahns/esp_rgbww_controller](https://github.com/patrickjahns/esp_rgbww_controller)
- **ESPHome Community**: Fuer die exzellente Plattform
- **FHEM Community**: Fuer die Hardware-Entwicklung

---

**Version**: 2.1 | **Platform**: ESP8266/ESP32 | **Protocol**: ESPHome Native API

## Weitere Informationen

- [Detaillierter Guide & Troubleshooting](DETAILED_GUIDE.md)
- [RGB Controller](rgb/README.md)
- [RGBW Controller](rgbw/README.md)
- [RGBWW Controller](rgbww/README.md)
- [Dual White Controller](dual-white/README.md)
- [Single White Controller](single-white/README.md)
