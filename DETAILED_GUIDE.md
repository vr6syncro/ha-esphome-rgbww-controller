# Detaillierter Guide - ESPHome RGBWW Controller v2.1

## Controller-Varianten im Detail

### RGB Controller (`rgb/controller_rgb.yaml`)
**Hardware**: 3 PWM-Kanaele (R, G, B)
```yaml
# Pin-Belegung (ESP8266 FHEM v3.0)
red_pin: GPIO13
green_pin: GPIO12
blue_pin: GPIO14
```

**Features**:
- RGB Farbmischung
- Warm/Cold White durch RGB-Mix
- Presets: RGB-Grundfarben, Mischfarben, White-Simulationen
- Effects: Pulse, Random, Candle

**Ideal fuer**: RGB LED-Strips ohne White-Kanaele

### RGBW Controller (`rgbw/controller_rgbw.yaml`)
**Hardware**: 4 PWM-Kanaele (R, G, B, W)
```yaml
# Pin-Belegung (ESP8266 FHEM v3.0)
red_pin: GPIO13
green_pin: GPIO12
blue_pin: GPIO14
white_pin: GPIO5
```

**Features**:
- RGB + separater White-Kanal
- `color_interlock: true` (entweder RGB oder White)
- Presets: RGB-Farben, Pure White, Szenen
- Perfekte weisse Farben durch dedizierten White-Kanal

**Ideal fuer**: RGBW LED-Strips mit einem weissen Kanal

### RGBWW Controller (`rgbww/controller_rgbww.yaml`) **[Vollausstattung]**
**Hardware**: 5 PWM-Kanaele (R, G, B, WW, CW)
```yaml
# Pin-Belegung (ESP8266 FHEM v3.0)
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
- Presets: RGB, verschiedene Weisstoene, Szenen
- Alle ESPHome RGBWW Features

**Ideal fuer**: Premium RGBWW LED-Strips mit separaten White LEDs

### Dual White Controller (`dual-white/controller_dual_white.yaml`)
**Hardware**: 2 PWM-Kanaele (WW, CW)
```yaml
# Pin-Belegung (ESP8266 FHEM v3.0)
warm_white_pin: GPIO5
cold_white_pin: GPIO4
```

**Features**:
- **CCT/Tunable White** (2700K - 6000K)
- `cwww` Light Platform fuer Color Temperature
- `constant_brightness: true`
- Presets: verschiedene Weisstoene und Szenen
- Optimiert fuer Buero/Wohnraum-Beleuchtung

**Ideal fuer**: CCT LED-Strips (nur warme und kalte weisse LEDs)

### Single White Controller (`single-white/controller_single_white.yaml`)
**Hardware**: 1 PWM-Kanal (Dimmer)
```yaml
# Pin-Belegung (ESP8266 FHEM v3.0)
white_pin: GPIO5
```

**Features**:
- Einfacher **LED-Dimmer** (0-100%)
- `monochromatic` Light Platform
- Presets: verschiedene Helligkeitsstufen und Szenen
- Effects: Pulse, Candle
- Spezial-Preset: "Wake Up" (30s sanfter Fade auf 100%)

**Ideal fuer**: Einfache weisse LED-Strips, Arbeitsplatz-Beleuchtung

## ESP32-Unterstuetzung (Alpha)

Der [Web-Konfigurator](configurator/) unterstuetzt ESP32 als Plattform:
- `ledc`-Outputs statt `esp8266_pwm`
- Standard-Pins: GPIO16 (R), GPIO17 (G), GPIO18 (B), GPIO19 (WW), GPIO21 (CW)
- `esp32: board: esp32dev` mit Arduino Framework
- Mehr RAM fuer Web Server und komplexe Konfigurationen

**Hinweis**: ESP32-Support ist in Alpha/Testing. Die Standard-Configs sind fuer ESP8266 optimiert.

## Konfiguration anpassen

### Pin-Belegung aendern
Die Configs verwenden Standard-Pins der FHEM RGBWW Controller v3.0 Hardware:
```yaml
# Standard FHEM RGBWW Controller v3.0 Pins
red_pin: GPIO13      # Rot
green_pin: GPIO12    # Gruen
blue_pin: GPIO14     # Blau
warm_white_pin: GPIO5   # Warmweiss
cold_white_pin: GPIO4   # Kaltweiss
```

**Fuer andere Controller-Hardware**: Pin-Belegung in der Controller-YAML anpassen oder den [Web-Konfigurator](configurator/) verwenden.

### LED-Verhalten optimieren
```yaml
gamma_correct: 2.8              # Gamma-Korrektur (1.0-3.0)
default_transition_length: 800ms # Fade-Zeit
flash_write_interval: 30s       # Restore Save-Intervall
```

#### Gamma-Korrektur
- **2.2**: Standard fuer Monitore, natuerlichste Farbwiedergabe
- **2.8**: ESPHome Standard, etwas staerkere Korrektur
- **3.0**: Sehr starke Korrektur, mehr Details in dunklen Bereichen
- **1.0**: Keine Korrektur (linear), nicht empfohlen

**Wann anpassen?**
- **LEDs zu dunkel bei niedrigen %**: Gamma erhoehen (3.0)
- **LEDs zu hell bei niedrigen %**: Gamma reduzieren (2.2)
- **Farbstich/unnatuerliche Farben**: Gamma auf 2.2 setzen

### Restore-Verhalten
```yaml
restore_mode: RESTORE_DEFAULT_OFF
```
- **RESTORE_DEFAULT_OFF**: Letzten Zustand wiederherstellen, Default ist AUS
- **ALWAYS_OFF**: Startet immer AUS
- **ALWAYS_ON**: Startet immer AN

### Web Server (optional)
```yaml
web_server:
  port: 80
```
Ermoeglicht Status-Abfrage und Steuerung ueber den Browser. **Achtung bei ESP8266**: Begrenzter RAM kann zu Instabilitaet fuehren.

## Sicherheits-Features (v2.1)

### Captive Portal
```yaml
captive_portal:
```
Wenn das konfigurierte WiFi nicht erreichbar ist, startet der Controller einen eigenen Access Point. Ueber `192.168.4.1` kann dann eine neue WiFi-Konfiguration vorgenommen werden.

### Safe Mode
Button in Home Assistant: Startet den Controller im abgesicherten Modus. Nur OTA-Updates und WiFi sind aktiv, keine Light-Steuerung.

### Factory Reset
Button in Home Assistant: Setzt den Controller auf Werkseinstellungen zurueck. Alle gespeicherten Zustaende und Kalibrierungen werden geloescht.

## Migration v2.0 -> v2.1

### Automatische Aenderungen
1. **OTA-Syntax**: `ota: - platform:` wird zu `ota: platform:` (ESPHome 2026.1.0)
2. **constant_brightness**: Auf `true` gesetzt in RGBWW und Dual White
3. **Neue Buttons**: Safe Mode, Factory Reset, Captive Portal
4. **Presets**: Night Light (5%), Relax (30%, 3s), Reading (85%, 4000K) vereinheitlicht

### Manuell migrieren
1. Controller-YAML aus v2.1 kopieren
2. `secrets.yaml` beibehalten (keine Aenderungen)
3. OTA-Update auf den Controller flashen

Alternativ: [Web-Konfigurator](configurator/) verwenden und neue YAML generieren.

## Technische Details

### Restore-System
```yaml
esp8266:
  restore_from_flash: true

preferences:
  flash_write_interval: 30s

light:
  restore_mode: RESTORE_DEFAULT_OFF
```

**Ablauf:**
1. Zustand-Aenderung -> ESPHome merkt sich neue Einstellung
2. 30 Sekunden spaeter -> Automatisches Speichern in Flash
3. Power Loss -> ESP startet neu
4. Boot -> ESPHome laedt letzten Zustand aus Flash

### color_interlock
```yaml
# Bei RGBW/RGBWW Controllers
color_interlock: true
```

Verhindert dass RGB und White-Kanaele gleichzeitig aktiv sind. Schuetzt schwache Netzteile und erzeugt reinere Farben.

### constant_brightness
```yaml
# Bei RGBWW/Dual White Controllers
constant_brightness: true
```

Haelt die Gesamthelligkeit konstant beim Wechsel der Farbtemperatur. Ohne dieses Flag wuerde sich die Helligkeit aendern, wenn zwischen warmem und kaltem Weiss gewechselt wird.

## Troubleshooting

### Restore funktioniert nicht
1. Warte 35+ Sekunden nach Farbwechsel (Flash-Write-Intervall)
2. Factory Reset ueber den Button in Home Assistant
3. Pruefen ob nur eine `light:` Section in der YAML vorhanden ist

### ESP crashed/instabil
1. Web Server deaktivieren (ESP8266 RAM-Limit)
2. Stromversorgung pruefen (3.3V Stabilitaet)
3. Kompletter Flash-Erase + Neuflash

### Farben stimmen nicht
1. Gamma-Korrektur anpassen (2.2-3.0)
2. Pin-Belegung pruefen (Hardware vs. YAML)
3. Richtigen Controller-Typ verwenden

### WiFi-Verbindung verloren
1. Captive Portal: Mit AP "controller-name" verbinden
2. Ueber `192.168.4.1` WiFi neu konfigurieren
3. Falls nicht erreichbar: Safe Mode per USB/Serial flashen

## Home Assistant Dashboard

### Dashboard Setup
1. Entity-Namen identifizieren: Home Assistant -> Einstellungen -> Geraete & Services -> ESPHome
2. Dashboard-YAML aus dem Controller-Ordner anpassen
3. In Home Assistant Dashboard einfuegen (Manuelle Karte)

### Automatisch generiertes Dashboard
Der [Web-Konfigurator](configurator/) generiert eine passende Dashboard-YAML mit korrekten Entity-Namen basierend auf dem eingegebenen Device-Namen.
