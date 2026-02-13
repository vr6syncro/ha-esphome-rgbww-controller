# RGB Controller (3-Kanal)

## Ueberblick
Dieser Controller unterstuetzt 3-Kanal RGB LED-Strips ohne separaten White-Kanal.

## Pin-Konfiguration
```yaml
red_pin: GPIO13
green_pin: GPIO12
blue_pin: GPIO14
```

## Features
- RGB Farbmischung
- Warm/Cold White Simulation durch RGB-Mix
- Vordefinierte Presets (Farben, White-Simulationen, Szenen)
- Effekte: Pulse, Random, Candle
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
Ideal fuer RGB LED-Strips ohne White-Kanaele
