# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projekt

ESPHome RGBWW Controller v2.1 -- 5 spezialisierte ESPHome-YAML-Konfigurationen fuer FHEM RGBWW Controller Hardware (ESP8266/ESP32). Kein Build-System fuer die YAMLs selbst; die Configs werden direkt im ESPHome Dashboard verwendet.

## Architektur

Jeder Controller-Typ lebt in einem eigenen Ordner mit identischem 2-Datei-Layout:

| Ordner | Light-Platform | Kanaele | Light-ID |
|---|---|---|---|
| `rgb/` | `rgb` | R G B | `rgb_light` |
| `rgbw/` | `rgbw` | R G B W | `rgbw_light` |
| `rgbww/` | `rgbww` | R G B WW CW | `rgbww_light` |
| `dual-white/` | `cwww` | WW CW | `cct_light` |
| `single-white/` | `monochromatic` | W | `white_dimmer` |

Dateien pro Ordner:
- `controller_*.yaml` -- ESPHome Device-Config (Outputs, Light, Presets, Sensors)
- `dashboard_*.yaml` -- Home Assistant Lovelace-Card YAML

Zusaetzlich:
- `configurator/` -- Web-Konfigurator (HTML/CSS/JS) fuer YAML-Generierung, hosted via GitHub Pages
- `ota_migrator/` -- PlatformIO-Projekt (C++/Arduino) zum Migrieren von alter FHEM-Firmware auf ESPHome via OTA
- `secrets_example.yaml` -- Zentrale Vorlage fuer secrets.yaml (im Root)

## Gemeinsame Patterns in allen Controller-YAMLs

- Board: `esp12e` (ESP8266), `esp8266_pwm` Outputs bei 1200 Hz
- Flash-Restore: `restore_from_flash: true` + `flash_write_interval: 30s` + `RESTORE_DEFAULT_OFF`
- Secrets via `!secret`: `wifi_ssid`, `wifi_password`, `api_encryption_key`, `ota_password`
- Presets als `button: template` mit `light.control` Actions
  - Farb-Presets: Brightness per Lambda beibehalten
  - Szenen-Presets (Night Light, Relax, Reading): Feste Helligkeitswerte
- `color_interlock: true` bei RGBW und RGBWW (entweder RGB oder White aktiv)
- `constant_brightness: true` bei RGBWW und Dual White
- `captive_portal:` fuer WiFi-Fallback
- System-Buttons: Safe Mode, Factory Reset, Restart
- Sensors: WiFi Signal, Uptime, Online-Status, IP/SSID/MAC
- Effects: Soft Pulse, Random Colors (nur RGB-faehige), Candle (Flicker)
- Status-LED: GPIO2
- Standard-Pins (FHEM v3.0): R=GPIO13, G=GPIO12, B=GPIO14, WW=GPIO5, CW=GPIO4
- OTA-Syntax: Map-Format (nicht Liste) -- ESPHome 2026.1.0 kompatibel

## Web-Konfigurator

- Pfad: `configurator/index.html` + `app.js` + `style.css`
- Single-Page Web-App, reines HTML/CSS/JS (kein Framework)
- 7-Step Wizard: Typ -> Plattform -> Geraet -> Netzwerk -> Light -> Presets -> Effects
- Generiert Controller-YAML, Dashboard-YAML und secrets.yaml Template
- Unterstuetzt ESP8266 und ESP32 (ledc statt esp8266_pwm)

## Build Commands

```bash
# OTA Migrator bauen (PlatformIO erforderlich)
cd ota_migrator
pio run -e esp8266    # ESP8266 Binary
pio run -e esp32      # ESP32 Binary
```

ESPHome-Configs werden nicht lokal gebaut -- sie werden ins ESPHome Dashboard kopiert und dort kompiliert/geflasht.

## Validierung

```bash
# ESPHome Config validieren (ESPHome CLI erforderlich)
esphome config rgbww/controller_rgbww.yaml
esphome config rgb/controller_rgb.yaml
# etc. fuer jede Variante
```

## Konventionen

- Sprache: Deutsch fuer Doku/Kommentare, Englisch fuer YAML-Keys und Entity-Names
- Projekt-Namespace: `vr6syncro.esphome-rgbww-controller`
- Versionierung: `2.1` (Haupt), Varianten-Suffix wie `2.1-rgb`, `2.1-cct`, `2.1-dimmer`
- Farb-Presets behalten die aktuelle Brightness bei (Lambda-Pattern)
- Szenen-Presets verwenden feste Helligkeitswerte (5% Night, 30% Relax, 85% Reading)
- Neue Presets immer als `button: template` mit eindeutiger `id: preset_*`
