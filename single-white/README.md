# Single White Controller (1-Kanal)

## Überblick
Einfacher LED-Dimmer für Single-White LED-Strips mit nur einem Kanal.

## Pin-Konfiguration
```yaml
white_pin: GPIO5
```

## Features
- Einfacher LED-Dimmer (0-100%)
- Monochromatic Light Platform
- 8 vordefinierte Presets
- Verschiedene Helligkeitsstufen
- Effekte: Pulse, Candle
- Spezial-Preset: "Wake Up" (30s sanfter Fade auf 100%)
- Restore nach Power Loss

## Installation

1. **secrets.yaml** aus `secrets_example.yaml` erstellen:
```bash
cp secrets_example.yaml secrets.yaml
```

2. Secrets anpassen:
```yaml
wifi_ssid: "Dein-WLAN"
wifi_password: "Dein-Passwort"
api_encryption_key: "..."
ota_password: "..."
```

3. In ESPHome Dashboard importieren und flashen

## Verwendung
Ideal für einfache weiße LED-Strips und Arbeitsplatzbeleuchtung