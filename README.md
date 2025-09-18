# ESPHome RGBWW Controller

[![ESPHome](https://img.shields.io/badge/ESPHome-latest-blue)](https://esphome.io)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Compatible-brightgreen)](https://www.home-assistant.io)
[![Platform](https://img.shields.io/badge/Platform-ESP8266%20%7C%20ESP32-orange)](https://www.espressif.com)

**5 spezialisierte ESPHome-Konfigurationen** für FHEM RGBWW Controller Hardware sowie kompatible LED-Controller – von einfachem Dimmer bis zur 5-Kanal RGBWW Vollausstattung.

## 🎯 Features

### ✅ **Stabile Konfiguration**
- **Funktionierendes Restore** nach Power Loss
- **Optimierte Light-Component** pro Controller-Typ
- **Vereinfachte Konfiguration** ohne komplexe Modi
- **Smooth Fading** zwischen Farben und Helligkeitsstufen

### ✅ **5 spezialisierte Varianten**
Jede Variante ist optimal für ihren spezifischen Hardware-Typ konfiguriert:

1. **RGB** (3 Kanäle) - Für reine Farb-LEDs
2. **RGBW** (4 Kanäle) - RGB + White Kanal
3. **RGBWW** (5 Kanäle) - RGB + Warm/Cold White (Vollausstattung)
4. **Dual White** (2 Kanäle) - CCT/Tunable White Strips
5. **Single White** (1 Kanal) - Einfacher Dimmer

## 🎯 Quick Start

### 1. Hardware-Typ bestimmen
**Zähle deine LED-Kanäle:**
- **3 Kanäle** (RGB) → [RGB Controller](rgb/)
- **4 Kanäle** (RGBW) → [RGBW Controller](rgbw/)
- **5 Kanäle** (RGBWW) → [RGBWW Controller](rgbww/) - Vollausstattung
- **2 Kanäle** (WW/CW) → [Dual White Controller](dual-white/)
- **1 Kanal** (White) → [Single White Controller](single-white/)

### 2. Installation
1. **ESPHome Dashboard** → New Device → Controller-YAML aus entsprechendem Ordner verwenden
2. **Secrets konfigurieren**: WiFi, API-Key, OTA-Passwort
3. **Flashen**:
   - **Neue/leere Hardware**: USB/Serial
   - **ESPHome bereits installiert**: Wireless/OTA  
   - **Alte FHEM Firmware**: [**OTA Migrator verwenden**](ota_migrator/) 📡

### 3. Dashboard einrichten
**Home Assistant Dashboard**: Verwende die passende `dashboard_*.yaml` aus deinem Controller-Ordner

➡️ **[Detaillierte Anleitung & Troubleshooting](DETAILED_GUIDE.md)**

## 📋 Controller-Übersicht

| Controller | Kanäle | Features | Ideal für |
|------------|--------|----------|-----------|
| **[RGB](rgb/)** | 3 (R,G,B) | RGB-Mix, 9 Presets | RGB LED-Strips |
| **[RGBW](rgbw/)** | 4 (R,G,B,W) | RGB + White, 10 Presets | RGBW LED-Strips |
| **[RGBWW](rgbww/)** | 5 (R,G,B,WW,CW) | RGB + CCT, 11 Presets | Premium RGBWW LEDs |
| **[Dual White](dual-white/)** | 2 (WW,CW) | CCT Control, 9 Presets | Büro/Wohnraum |
| **[Single White](single-white/)** | 1 (W) | Dimmer, 8 Presets | Einfache LEDs |

➡️ **[Pin-Konfiguration, Features & Troubleshooting](DETAILED_GUIDE.md)**

## 🔄 Migration von Original FHEM Firmware

Für Controller mit der originalen FHEM RGBWW Firmware (Sming/rBoot) gibt es einen **OTA Migrator**:

1. **[OTA Migrator](ota_migrator/)** nutzen
   - Entsprechende Binary über altes Web-Interface flashen:
     - ESP8266: `ota_migrator_esp8266.bin` (304KB)
     - ESP32: `ota_migrator_esp32.bin` (750KB)
   - Mit temporärem AP verbinden
   - ESPHome Firmware hochladen
   
2. **Direkte Migration ohne Zwischenschritte**
   - Kein serieller Anschluss nötig
   - Erhält alle Hardware-Einstellungen

➡️ **[Detaillierte OTA Migrator Anleitung](ota_migrator/README.md)** (SSID, Passwort, etc.)

## 📁 Ordnerstruktur

```
esphome-rgbww-controller/
├── rgb/                    # 3-Kanal RGB Controller
│   ├── controller_rgb.yaml
│   ├── dashboard_rgb.yaml
│   └── secrets_example.yaml
├── rgbw/                   # 4-Kanal RGBW Controller
│   ├── controller_rgbw.yaml
│   ├── dashboard_rgbw.yaml
│   └── secrets_example.yaml
├── rgbww/                  # 5-Kanal RGBWW Controller (Vollausstattung)
│   ├── controller_rgbww.yaml
│   ├── dashboard_rgbww.yaml
│   └── secrets_example.yaml
├── dual-white/             # 2-Kanal CCT/Tunable White
│   ├── controller_dual_white.yaml
│   ├── dashboard_dual_white.yaml
│   └── secrets_example.yaml
└── single-white/           # 1-Kanal Dimmer
    ├── controller_single_white.yaml
    ├── dashboard_single_white.yaml
    └── secrets_example.yaml
```

## 🤝 Contributing

Verbesserungen und Bug-Reports sind willkommen!

- **Issues**: Bug-Reports, Feature-Requests
- **Pull Requests**: Verbesserungen, neue Presets
- **Dokumentation**: Ergänzungen, Korrekturen

## 📜 Lizenz

MIT License - siehe [LICENSE](LICENSE)

## 🙏 Credits

- **Original Hardware**: [patrickjahns/esp_rgbww_controller](https://github.com/patrickjahns/esp_rgbww_controller)
- **ESPHome Community**: Für die exzellente Plattform  
- **FHEM Community**: Für die Hardware-Entwicklung

---

**Version**: 2.0.0 | **Platform**: ESP8266/ESP32 | **Protocol**: ESPHome Native API

## 📖 Weitere Informationen

Detaillierte Informationen zu jedem Controller-Typ findest du in den jeweiligen Ordnern:
- [RGB Controller Dokumentation](rgb/README.md)
- [RGBW Controller Dokumentation](rgbw/README.md)
- [RGBWW Controller Dokumentation](rgbww/README.md)
- [Dual White Controller Dokumentation](dual-white/README.md)
- [Single White Controller Dokumentation](single-white/README.md)