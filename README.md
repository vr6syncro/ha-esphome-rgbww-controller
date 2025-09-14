# ESPHome RGBWW Controller v2.0

[![ESPHome](https://img.shields.io/badge/ESPHome-2.0.0-blue)](https://esphome.io)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Compatible-brightgreen)](https://www.home-assistant.io)
[![Platform](https://img.shields.io/badge/Platform-ESP8266%20%7C%20ESP32-orange)](https://www.espressif.com)

**5 spezialisierte ESPHome-Konfigurationen** für FHEM RGBWW Controller Hardware – von einfachem Dimmer bis zur 5-Kanal RGBWW Vollausstattung.

## 🚀 Was ist neu in v2.0?

### ✅ **Gelöste Restore-Probleme**
- **Funktionierendes Restore** nach Power Loss (das Hauptproblem von v1.x)
- **Root Cause behoben**: Nur noch eine Light-Component pro Config (verhindert gegenseitiges Überschreiben)
- **Vereinfachte Konfiguration**: Kein Expert Mode mehr, fokussiert auf Stabilität

### ✅ **5 spezialisierte Varianten**
Statt einer komplexen All-in-One Config gibt es jetzt optimierte Versionen:

1. **RGB** (3 Kanäle) - Für reine Farb-LEDs
2. **RGBW** (4 Kanäle) - RGB + White Kanal
3. **RGBWW** (5 Kanäle) - RGB + Warm/Cold White (Vollausstattung)
4. **Dual White** (2 Kanäle) - CCT/Tunable White Strips
5. **Single White** (1 Kanal) - Einfacher Dimmer

## 🎯 Quick Start

### 1. Hardware-Typ bestimmen

**Zähle deine LED-Kanäle:**
- **3 Kanäle** (R, G, B) → `controller_rgb.yaml`
- **4 Kanäle** (R, G, B, W) → `controller_rgbw.yaml`  
- **5 Kanäle** (R, G, B, WW, CW) → `controller_rgbww.yaml`
- **2 Kanäle** (WW, CW) → `controller_dual_white.yaml`
- **1 Kanal** (White) → `controller_single_white.yaml`

### 2. ESPHome konfigurieren

1. **ESPHome Dashboard** → New Device → `mein-controller-name` → Board wählen (EPS8266) → Skip
2. **YAML-Inhalt** Esphome Name kopieren → durch gewählte Datei ersetzen → Esphome Name überschrieben
3. **Secrets konfigurieren**:
   ```yaml
   # secrets.yaml
   wifi_ssid: "Dein-WLAN"
   wifi_password: "Dein-Passwort" 
   api_encryption_key: "aus-ESPHome-generiert"
   ota_password: "sicheres-passwort"
   ```
4. **Flashen**

### 3. Testen
- Öffne Home Assistant
- Device sollte automatisch erkannt werden
- Teste Presets und Restore (Licht an → Power Cycle → sollte wieder angehen)

## 📋 Controller-Varianten im Detail

### 🔴 RGB Controller (`controller_rgb.yaml`)
**Hardware**: 3 PWM-Kanäle (R, G, B)
```yaml
# Pin-Belegung
red_pin: GPIO13
green_pin: GPIO12  
blue_pin: GPIO14
```

**Features**:
- RGB Farbmischung
- Warm/Cold White durch RGB-Mix
- 9 Presets: RGB-Grundfarben, Mischfarben, White-Simulationen
- Effects: Pulse, Random, Candle

**Ideal für**: RGB LED-Strips ohne White-Kanäle

### 🟡 RGBW Controller (`controller_rgbw.yaml`)
**Hardware**: 4 PWM-Kanäle (R, G, B, W)
```yaml
# Pin-Belegung  
red_pin: GPIO13
green_pin: GPIO12
blue_pin: GPIO14
white_pin: GPIO5
```

**Features**:
- RGB + separater White-Kanal
- `color_interlock: true` (entweder RGB oder White)
- 10 Presets: RGB-Farben, Pure White, Warm/Cool Mix
- Perfekte weiße Farben durch dedizierten White-Kanal

**Ideal für**: RGBW LED-Strips mit einem neutralweißen Kanal

### 🌈 RGBWW Controller (`controller_rgbww.yaml`) **[Vollausstattung]**
**Hardware**: 5 PWM-Kanäle (R, G, B, WW, CW)  
```yaml
# Pin-Belegung
red_pin: GPIO13
green_pin: GPIO12
blue_pin: GPIO14
warm_white_pin: GPIO5
cold_white_pin: GPIO4
```

**Features**:
- RGB + Warm White + Cold White
- **Color Temperature Control** (2700K - 6000K)
- `constant_brightness: true` (stabile Helligkeit bei CT-Wechseln)
- 11 Presets: RGB, verschiedene Weißtöne, Szenen
- Alle ESPHome RGBWW Features

**Ideal für**: Premium RGBWW LED-Strips mit separaten Warm/Cold White LEDs

### ⚪ Dual White Controller (`controller_dual_white.yaml`)
**Hardware**: 2 PWM-Kanäle (WW, CW)
```yaml  
# Pin-Belegung
warm_white_pin: GPIO5
cold_white_pin: GPIO4
```

**Features**:
- **CCT/Tunable White** (2700K - 6000K)
- `cwww` Light Platform für Color Temperature
- 9 Presets: verschiedene Weißtöne und Szenen
- Optimiert für Büro/Wohnraum-Beleuchtung

**Ideal für**: CCT LED-Strips (nur warme und kalte weiße LEDs)

### ⚫ Single White Controller (`controller_single_white.yaml`)
**Hardware**: 1 PWM-Kanal (Dimmer)
```yaml
# Pin-Belegung  
white_pin: GPIO5
```

**Features**:
- Einfacher **LED-Dimmer** (0-100%)
- `monochromatic` Light Platform
- 8 Presets: verschiedene Helligkeitsstufen und Szenen
- Effects: Pulse, Candle
- Spezial-Preset: "Wake Up" (30s sanfter Fade auf 100%)

**Ideal für**: Einfache weiße LED-Strips, Arbeitsplatz-Beleuchtung

## ⚙️ Konfiguration anpassen

### Pin-Belegung ändern
Alle Configs verwenden die Standard-Pins der FHEM Hardware:
```yaml
# Standard FHEM RGBWW Controller v3.0
red_pin: GPIO13      # Rot
green_pin: GPIO12    # Grün  
blue_pin: GPIO14     # Blau
warm_white_pin: GPIO5   # Warmweiß
cold_white_pin: GPIO4   # Kaltweiß
```

Für andere Hardware: Pins in der jeweiligen YAML anpassen.

### LED-Verhalten optimieren
```yaml
# Verfügbare Parameter in allen Configs
gamma_correct: 2.8              # Gamma-Korrektur (2.2-3.0)
default_transition_length: 800ms # Fade-Zeit  
flash_write_interval: 30s       # Restore Save-Intervall
```

### Restore-Verhalten
```yaml
restore_mode: RESTORE_DEFAULT_OFF
```
- **RESTORE_DEFAULT_OFF**: War AN → startet AN, war AUS → startet AUS ✅
- **ALWAYS_OFF**: Startet immer AUS 
- **ALWAYS_ON**: Startet immer AN

## 🔧 Migration von v1.x

### Hauptprobleme in v1.x:
- ❌ **Restore funktioniert nicht**: Mehrere Light-Components überschreiben sich
- ❌ **RAM-Probleme**: Expert Mode und komplexe Logic verbrauchen zu viel Speicher  
- ❌ **Instabilität**: Crashes bei bestimmten Farbkombinationen

### v2.0 Lösungen:
- ✅ **Eine Light-Component**: Kein gegenseitiges Überschreiben mehr
- ✅ **Vereinfacht**: Kein Expert Mode, weniger RAM-Verbrauch
- ✅ **Spezialisiert**: Optimierte Config pro Hardware-Typ
- ✅ **Getestet**: Funktionierendes Restore nach Power Loss

### Upgrade-Pfad:
1. **Backup** deiner aktuellen Config
2. **Hardware-Typ** bestimmen (Kanal-Anzahl zählen)
3. **Passende v2.0 Config** wählen und flashen
4. **Testen**: Restore sollte sofort funktionieren

## 📚 Technische Details

### Restore-System
```yaml
# In allen v2.0 Configs
esp8266:
  restore_from_flash: true

preferences:
  flash_write_interval: 30s

light:
  restore_mode: RESTORE_DEFAULT_OFF
```

**So funktioniert es:**
1. **Zustand-Änderung** → ESPHome merkt sich neue Einstellung
2. **30 Sekunden später** → Automatisches Speichern in Flash
3. **Power Loss** → ESP startet neu
4. **Boot** → ESPHome lädt letzten Zustand aus Flash
5. **Restore** → Licht geht in der gleichen Farbe/Helligkeit an

### color_interlock erklärt
```yaml
# Bei RGBW/RGBWW Controllers
color_interlock: true
```

**Was es macht:**
- Verhindert dass RGB und White-Kanäle gleichzeitig aktiv sind
- **Vorteil**: Schützt schwache Netzteile, reinere Farben
- **Nachten**: Keine RGB+White Mischungen möglich

**Wann aktiviert:**
- ✅ RGBW Controller (RGB vs. W)
- ✅ RGBWW Controller (RGB vs. WW/CW)  
- ❌ RGB Controller (nur RGB-Kanäle)
- ❌ Dual/Single White (nur White-Kanäle)

## 🛠️ Troubleshooting

### Restore funktioniert nicht
1. **Flash-Speicher voll**: Factory Reset über ESPHome
2. **Zu kurze Test-Zeit**: Warte 35+ Sekunden nach Farbwechsel  
3. **Mehrere Light-Components**: Prüfe dass nur eine `light:` Section in YAML

### ESP crashed/instabil
1. **RAM-Problem**: Nutze einfachere Config-Variante
2. **Stromversorgung**: Prüfe 3.3V Stabilität
3. **Flash-Probleme**: Kompletter Flash-Erase + Neuflash

### Farben stimmen nicht
1. **Gamma-Korrektur**: Ändere `gamma_correct: 2.8` zu 2.2-3.0
2. **Pin-Belegung**: Prüfe Hardware vs. YAML Pin-Zuordnung
3. **Hardware-Typ**: Falsche Config für deine LED-Hardware?

## 🤝 Contributing

Verbesserungen und Bug-Reports sind willkommen!

- **Issues**: Bug-Reports, Feature-Requests
- **Pull Requests**: Verbesserungen, neue Presets
- **Dokumentation**: Ergänzungen, Korrekturen

## 📜 Lizenz

MIT License - siehe [LICENSE](../LICENSE)

## 🙏 Credits

- **Original Hardware**: [patrickjahns/esp_rgbww_controller](https://github.com/patrickjahns/esp_rgbww_controller)
- **ESPHome Community**: Für die exzellente Plattform  
- **FHEM Community**: Für die Hardware-Entwicklung
- **ESPHome Portierung**: vr6syncro (2025)

---

**Version**: 2.0.0 | **Platform**: ESP8266/ESP32 | **Protocol**: ESPHome Native API