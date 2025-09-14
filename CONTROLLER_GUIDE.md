# Controller Auswahl-Guide

Welche YAML-Datei ist die richtige für deine Hardware? Folge diesem einfachen Guide:

## 🔍 Schritt 1: Hardware identifizieren

### LED-Kanäle zählen
Schaue auf dein LED-Strip oder Controller-Board:

**RGBWW Strip (5-Kanal)**:
```
Anschlüsse: R | G | B | WW | CW | 12V | GND
```
→ **5 Kanäle** = `controller_rgbww.yaml` ✅

**RGBW Strip (4-Kanal)**:
```
Anschlüsse: R | G | B | W | 12V | GND
```
→ **4 Kanäle** = `controller_rgbw.yaml` ✅

**RGB Strip (3-Kanal)**:
```
Anschlüsse: R | G | B | 12V | GND
```
→ **3 Kanäle** = `controller_rgb.yaml` ✅

**CCT/Tunable White Strip (2-Kanal)**:
```
Anschlüsse: WW | CW | 12V | GND
```
→ **2 Kanäle** = `controller_dual_white.yaml` ✅

**Single White Strip (1-Kanal)**:
```
Anschlüsse: W | 12V | GND
```
→ **1 Kanal** = `controller_single_white.yaml` ✅

## 🎯 Schritt 2: Feature-Vergleich

| Feature | RGB | RGBW | RGBWW | Dual White | Single White |
|---------|-----|------|-------|------------|--------------|
| **Farben** | ✅ RGB-Mix | ✅ RGB + W | ✅ RGB + WW/CW | ❌ | ❌ |
| **Echtes Weiß** | RGB-Mix | ✅ Dedicated | ✅ WW/CW | ✅ CCT | ✅ Dimmer |
| **Color Temperature** | ❌ | ❌ | ✅ 2700K-6000K | ✅ 2700K-6000K | ❌ |
| **Presets** | 9 | 10 | 11 | 9 | 8 |
| **RAM Verbrauch** | Niedrig | Mittel | Hoch | Niedrig | Sehr niedrig |

## 🚀 Schritt 3: Anwendungsbeispiele

### RGB Controller - Für bunte Akzentbeleuchtung
```yaml
# Ideal für:
- Gaming-Setups
- Farbige Akzentbeleuchtung  
- Mood-Lighting
- Partykeller

# Limitations:
- Kein echtes Weiß (nur RGB-Mix)
- Höherer Stromverbrauch für Weiß
```

### RGBW Controller - RGB + neutrales Weiß
```yaml
# Ideal für:
- Wohnzimmer-Beleuchtung
- RGB-Farben + gutes Weiß
- Vielseitige Anwendungen

# Limitations:
- Nur eine Weißtemperatur
- color_interlock: Entweder RGB oder W
```

### RGBWW Controller - Vollausstattung
```yaml
# Ideal für:
- Premium-Installationen
- Alle Farben + variable Weißtöne
- Büro + Wohnen kombiniert
- Smart Home Integration

# Limitations:
- Höchster RAM-Verbrauch
- Komplexeste Installation
```

### Dual White Controller - CCT ohne Farben
```yaml
# Ideal für:
- Büro-Beleuchtung
- Badezimmer/Küche
- Arbeitsplatz-Beleuchtung
- Circadiane Rhythmus-Steuerung

# Advantages:  
- Sehr stabile Performance
- Geringer RAM-Verbrauch
- Professionelle Lichtsteuerung
```

### Single White Controller - Einfacher Dimmer
```yaml
# Ideal für:
- Einfache Dimmung
- Retrofit für alte Leuchten
- Minimaler Funktionsumfang
- Sehr stabile Performance

# Advantages:
- Geringster RAM-Verbrauch
- Sehr zuverlässig
- Einfachste Konfiguration
```

## ⚙️ Schritt 4: Hardware-Check

### FHEM RGBWW Controller v3.0 (Standard)
```
ESP8266-12E mit 5 MOSFET-Kanälen
GPIO-Belegung:
- GPIO13 = RED
- GPIO12 = GREEN  
- GPIO14 = BLUE
- GPIO5  = WARM WHITE
- GPIO4  = COLD WHITE
```

**Alle 5 YAMLs funktionieren!** Je nach angeschlossenem LED-Strip:
- 5-Kanal Strip → `controller_rgbww.yaml`
- 4-Kanal Strip → `controller_rgbw.yaml` (CW-Pin unbelegt)
- 3-Kanal Strip → `controller_rgb.yaml` (WW+CW unbelegt)
- 2-Kanal Strip → `controller_dual_white.yaml` (RGB unbelegt)
- 1-Kanal Strip → `controller_single_white.yaml` (RGB+CW unbelegt)

### Andere Hardware
Wenn du andere GPIO-Pins verwendest, passe die Pin-Belegung in der YAML an:
```yaml
# Beispiel für andere Pins
red_pin: GPIO15      # statt GPIO13
green_pin: GPIO2     # statt GPIO12
blue_pin: GPIO0      # statt GPIO14
warm_white_pin: GPIO16  # statt GPIO5
cold_white_pin: GPIO5   # statt GPIO4
```

## 🔧 Schritt 5: Installation

1. **YAML wählen** basierend auf obigen Kriterien
2. **ESPHome Dashboard** → New Device → Name vergeben → ESP8266 wählen → Skip
3. **YAML-Inhalt** Esphome Name kopieren → durch gewählte Datei ersetzen → Esphome Name überschrieben
4. **secrets.yaml** konfigurieren (siehe `secrets_example.yaml`)
5. **Validate** → **Install** (USB beim ersten Mal) oder OTA
6. **Home Assistant** → Device sollte automatisch erkannt werden

## ❓ Unsicher? Start hier:

**Du hast FHEM RGBWW Controller Hardware?**
→ Start mit `controller_rgbww.yaml` (funktioniert mit allen Strip-Typen)

**Du willst es einfach?**  
→ Je nach Strip: `controller_rgb.yaml` oder `controller_dual_white.yaml`

**Du brauchst maximale Stabilität?**
→ `controller_single_white.yaml` oder `controller_dual_white.yaml`