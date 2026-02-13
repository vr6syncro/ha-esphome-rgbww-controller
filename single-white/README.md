# Single White Controller (1-Kanal)

## Ueberblick
Einfacher LED-Dimmer fuer Single-White LED-Strips mit nur einem Kanal.

## Pin-Konfiguration
```yaml
white_pin: GPIO5
```

## Features
- Einfacher LED-Dimmer (0-100%)
- Monochromatic Light Platform
- Vordefinierte Presets (Helligkeitsstufen, Szenen)
- Effekte: Pulse, Candle
- Spezial-Preset: "Wake Up" (30s sanfter Fade auf 100%)
- Captive Portal, Safe Mode, Factory Reset
- Restore nach Power Loss

## Installation

1. **secrets.yaml** aus der Vorlage im Root erstellen:
```bash
cp ../secrets_example.yaml secrets.yaml
```

2. Secrets anpassen:
```yaml
wifi_ssid: "Dein-WLAN"
wifi_password: "Dein-Passwort"
api_encryption_key: "..."
ota_password: "..."
```

3. In ESPHome Dashboard importieren und flashen

Alternativ: [Web-Konfigurator](../configurator/) verwenden.

## Verwendung
Ideal fuer einfache weisse LED-Strips und Arbeitsplatzbeleuchtung
