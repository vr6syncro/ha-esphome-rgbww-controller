# HomeAssistant Dashboard Setup

Vorgefertigte Lovelace Dashboard-Konfigurationen für die RGBWW Controller v2.0.

## 📋 Verfügbare Dashboard-Varianten

### 5 spezialisierte Controller-Dashboards:

1. **`dashboard_rgb.yaml`** - RGB Controller (3 Kanäle)
   - RGB-Farben, Weiß-Simulationen via RGB-Mix
   - Keine Color Temperature Features

2. **`dashboard_rgbw.yaml`** - RGBW Controller (4 Kanäle)  
   - RGB-Farben + Pure White Kanal
   - color_interlock Verhalten (RGB oder White)

3. **`dashboard_rgbww.yaml`** - RGBWW Controller (5 Kanäle)
   - RGB-Farben + Color Temperature (2700K-6000K)
   - Vollausstattung mit allen Features

4. **`dashboard_dual_white.yaml`** - Dual White Controller (2 Kanäle)
   - Nur Color Temperature, keine RGB-Farben
   - CCT/Tunable White für Büro/Wohnraum

5. **`dashboard_single_white.yaml`** - Single White Controller (1 Kanal)
   - Einfacher Dimmer mit Helligkeits-Presets
   - Minimaler Funktionsumfang

## 🚀 Quick Setup 

### Schritt 1: Controller-Typ Dashboard wählen

1. **Bestimme deinen Controller-Typ**:
   - 3 Kanäle → `dashboard_rgb.yaml`
   - 4 Kanäle → `dashboard_rgbw.yaml`
   - 5 Kanäle → `dashboard_rgbww.yaml` 
   - 2 Kanäle → `dashboard_dual_white.yaml`
   - 1 Kanal → `dashboard_single_white.yaml`

### Schritt 2: Entity-Namen identifizieren

1. **HomeAssistant** → Einstellungen → Geräte & Services → ESPHome
2. **Dein Controller** anklicken 
3. **Entity-Namen notieren**:
   ```
   Beispiel-Controller "mein-rgbww-controller":
   - Light: light.mein_rgbww_controller_rgbww_strip
   - Presets: button.mein_rgbww_controller_preset_*
   - Sensors: sensor.mein_rgbww_controller_*
   ```

### Schritt 3: Dashboard-YAML anpassen

1. **Kopiere** die passende Dashboard-YAML 
2. **Suche & Ersetze** (Global Replace):
   ```yaml
   # Beispiel für RGB Controller:
   # Suche: "rgb-controller"
   # Ersetze: "mein-rgb-controller" 
   
   # Wird zu:
   light.rgb_controller_rgb_strip → light.mein_rgb_controller_rgb_strip
   button.rgb_controller_preset_red_100 → button.mein_rgb_controller_preset_red_100
   ```

### Schritt 4: Dashboard hinzufügen

1. **HomeAssistant** → Übersicht → ⋮ (3 Punkte) → Dashboard bearbeiten
2. **+ Tab hinzufügen** → Controller-Name
3. **⋮ → Als YAML bearbeiten** → Inhalt einfügen
4. **Speichern**

## 📱 Dashboard-Features

### 🔆 Light Control Card
- **Farbkreis** für HSV-Steuerung
- **Helligkeits-Slider**
- **Color Temperature** (bei RGBWW/Dual White)
- **Ein/Aus Toggle**

### 🎯 Preset-Buttons
Alle Controller-Varianten haben angepasste Presets:

**RGB Controller**:
- Red, Green, Blue, Yellow, Cyan, Purple
- White (RGB-Mix), Warm White, Cool White

**RGBW Controller**:  
- RGB-Farben + Pure White
- Warm/Cool Mix via RGB

**RGBWW Controller**:
- Alle RGB-Farben
- Color Temperature Presets (2700K-6000K)
- Szenen: Relax, Work, Night Light, Candle

**Dual White Controller**:
- Verschiedene Weißtöne (2700K-6000K)
- Arbeitsplatz, Entspannung, Nachtlicht

**Single White Controller**:
- Helligkeitsstufen: 25%, 50%, 75%, 100%
- Szenen: Night Light, Reading, Relax, Wake Up

### 🔧 Expert Mode (nur v1.x)
- **RAW Channel Sliders** (0-255)
- **Nur sichtbar** wenn Expert Mode aktiviert
- **Direkte PWM-Kontrolle**

⚠️ **Hinweis**: v2.0 Controller haben KEINEN Expert Mode mehr!

### 📊 System Information
- **Online Status**
- **WiFi Signal Stärke**  
- **Uptime** 
- **IP-Adresse**
- **MAC-Adresse**
- **ESPHome Version**

## 🎨 Dashboard-Anpassungen

### Preset-Button Icons ändern
```yaml
- type: button
  entity: button.dein_controller_preset_relax
  name: Entspannung
  icon: mdi:sofa  # Anderes Icon wählen
```

### Farben anpassen  
```yaml
- type: button
  entity: button.dein_controller_preset_red_100
  name: Rot
  icon: mdi:led-strip-variant
  styles:
    card:
      - background-color: rgba(255,0,0,0.1)  # Roter Hintergrund
```

### Karten-Layout ändern
```yaml
- type: grid
  title: Presets
  columns: 4  # Mehr Spalten = kleinere Buttons
  square: true  # Quadratische Buttons
```

## 🔍 Troubleshooting

### Dashboard zeigt "Entity nicht verfügbar"
1. **Prüfe Entity-Namen** in HomeAssistant → Entwicklertools → Zustände
2. **Vergleiche** mit Dashboard-YAML
3. **Korrigiere** Tippfehler in Entity-Namen

### Auto-Entities funktioniert nicht  
1. **HACS installiert?** → HACS → Frontend → auto-entities
2. **Browser-Cache leeren** → Strg+F5
3. **HomeAssistant neustarten**

### Preset-Buttons reagieren nicht
1. **Teste** Preset in HomeAssistant → Entwicklertools → Services
2. **Service**: `button.press`
3. **Entity**: `button.dein_controller_preset_name`

### Expert Mode Slider fehlen (v2.0)
**Normal!** v2.0 Controller haben keinen Expert Mode mehr.
- **v2.0**: Nur Light Entity mit allen Features
- **v1.x**: Hatte zusätzliche RAW Channel Controls


## 🎯 Dashboard pro Controller-Typ

### RGB Controller Dashboard
```yaml
# Keine Color Temperature, nur RGB
- type: light
  entity: light.rgb_controller_rgb_strip
  # Farbkreis + Helligkeit, KEIN CT-Slider
```

### RGBW Controller Dashboard  
```yaml  
# RGB + White Channel
- type: light
  entity: light.rgbw_controller_rgbw_strip
  # color_interlock: Entweder RGB ODER White
```

### RGBWW Controller Dashboard
```yaml
# Vollausstattung mit Color Temperature
- type: light
  entity: light.rgbww_controller_rgbww_strip  
  # RGB + CT-Slider (2700K-6000K)
```

### Dual White Controller Dashboard
```yaml
# Nur Color Temperature, KEINE RGB-Farben
- type: light
  entity: light.dual_white_controller_cct_strip
  # Nur Helligkeit + CT-Slider
```

### Single White Controller Dashboard
```yaml
# Einfachster Dimmer
- type: light
  entity: light.white_dimmer
  # Nur Ein/Aus + Helligkeit
```

---

**💡 Tipp**: Starte mit dem Standard-Dashboard, teste alle Features, und wechsle dann optional zu Auto-Entities für erweiterte Funktionen.