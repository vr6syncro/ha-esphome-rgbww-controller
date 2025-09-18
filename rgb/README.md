# RGB Controller (3-Kanal)

## Überblick
Dieser Controller unterstützt 3-Kanal RGB LED-Strips ohne separaten White-Kanal.

## Pin-Konfiguration
```yaml
red_pin: GPIO13
green_pin: GPIO12
blue_pin: GPIO14
```

## Features
- RGB Farbmischung
- Warm/Cold White Simulation durch RGB-Mix
- 9 vordefinierte Presets
- Effekte: Pulse, Random, Candle
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
Ideal für RGB LED-Strips ohne White-Kanäle