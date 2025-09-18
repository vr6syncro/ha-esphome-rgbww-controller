# Detaillierter Guide - ESPHome RGBWW Controller

## 📋 Controller-Varianten im Detail

### 🔴 RGB Controller (`rgb/controller_rgb.yaml`)
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

### 🟡 RGBW Controller (`rgbw/controller_rgbw.yaml`)
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

**Ideal für**: RGBW LED-Strips mit einem weißen Kanal

### 🌈 RGBWW Controller (`rgbww/controller_rgbww.yaml`) **[Vollausstattung]**
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

**Ideal für**: Premium RGBWW LED-Strips mit separaten White LEDs

### ⚪ Dual White Controller (`dual-white/controller_dual_white.yaml`)
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

### ⚫ Single White Controller (`single-white/controller_single_white.yaml`)
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
Die Configs verwenden Standard-Pins der FHEM RGBWW Controller v3.0 Hardware:
```yaml
# Standard FHEM RGBWW Controller v3.0 Pins
red_pin: GPIO13      # Rot
green_pin: GPIO12    # Grün  
blue_pin: GPIO14     # Blau
warm_white_pin: GPIO5   # Warmweiß
cold_white_pin: GPIO4   # Kaltweiß
```

**Für andere Controller-Hardware**: Die Pin-Belegung muss in der jeweiligen Controller-YAML im entsprechenden Ordner angepasst werden. Die meisten ESP8266/ESP32 basierten LED-Controller verwenden andere Pin-Zuordnungen.

### LED-Verhalten optimieren
```yaml
# Verfügbare Parameter in allen Configs
gamma_correct: 2.8              # Gamma-Korrektur (2.2-3.0)
default_transition_length: 800ms # Fade-Zeit  
flash_write_interval: 30s       # Restore Save-Intervall
```

#### Gamma-Korrektur erklärt
**Was ist Gamma-Korrektur?**
- Korrigiert die **nichtlineare Helligkeitswahrnehmung** des menschlichen Auges
- **Niedrige Werte** (0-50%) erscheinen ohne Korrektur viel zu dunkel
- **Hohe Werte** (50-100%) erscheinen ohne Korrektur zu hell

**Gamma-Werte:**
- **2.2**: Standard für Monitore, natürlichste Farbwiedergabe
- **2.8**: ESPHome Standard, etwas stärkere Korrektur
- **3.0**: Sehr starke Korrektur, mehr Details in dunklen Bereichen
- **1.0**: Keine Korrektur (linear), nicht empfohlen

**Beispiel-Effekt:**
```
Ohne Gamma (1.0):    ■■■□□□□□□□ (50% = sehr dunkel)
Mit Gamma (2.8):      ■■■■■□□□□□ (50% = mittlere Helligkeit)
```

**Wann anpassen?**
- **LEDs zu dunkel bei niedrigen %**: Gamma erhöhen (3.0)
- **LEDs zu hell bei niedrigen %**: Gamma reduzieren (2.2)
- **Farbstich/unnatürliche Farben**: Gamma auf 2.2 setzen

### Restore-Verhalten
```yaml
restore_mode: RESTORE_DEFAULT_OFF
```
- **RESTORE_DEFAULT_OFF**: War AN → startet AN, war AUS → startet AUS ✅
- **ALWAYS_OFF**: Startet immer AUS 
- **ALWAYS_ON**: Startet immer AN

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

## 🏠 Home Assistant Dashboard

### Dashboard-Varianten
Jeder Controller-Typ hat eine vorgefertigte Lovelace Dashboard-Konfiguration:

- **`rgb/dashboard_rgb.yaml`** - RGB Controller (3 Kanäle)
- **`rgbw/dashboard_rgbw.yaml`** - RGBW Controller (4 Kanäle)  
- **`rgbww/dashboard_rgbww.yaml`** - RGBWW Controller (5 Kanäle)
- **`dual-white/dashboard_dual_white.yaml`** - Dual White Controller (2 Kanäle)
- **`single-white/dashboard_single_white.yaml`** - Single White Controller (1 Kanal)

### Dashboard Setup

1. **Entity-Namen identifizieren**
   - HomeAssistant → Einstellungen → Geräte & Services → ESPHome
   - Dein Controller anklicken 
   - Entity-Namen notieren:
   ```
   Beispiel-Controller "mein-rgbww-controller":
   - Light: light.mein_rgbww_controller_rgbww_strip
   - Presets: button.mein_rgbww_controller_preset_*
   - Sensors: sensor.mein_rgbww_controller_*
   ```

2. **Dashboard YAML anpassen**
   - Passende Dashboard-YAML öffnen
   - Entity-Namen durch deine ersetzen
   - In Home Assistant Dashboard einfügen

3. **Dashboard importieren**
   - Home Assistant → Dashboard → ... → Dashboard bearbeiten
   - Neue Karte hinzufügen → Manuell
   - YAML-Inhalt einfügen

### Dashboard Features
- **Licht-Steuerung**: An/Aus, Helligkeit, Farbe
- **Preset-Buttons**: Schnellzugriff auf vordefinierte Szenen
- **Color Temperature**: Bei RGBWW und Dual White
- **Sensor-Informationen**: RSSI, Uptime, etc.
- **Responsive Design**: Funktioniert auf Desktop und Mobil