# RGBW Controller (4-Kanal)

## Überblick
Dieser Controller unterstützt 4-Kanal RGBW LED-Strips mit einem separaten White-Kanal.

## Pin-Konfiguration
```yaml
red_pin: GPIO13
green_pin: GPIO12
blue_pin: GPIO14
white_pin: GPIO5
```

## Features
- RGB + separater White-Kanal
- Color Interlock (entweder RGB oder White)
- 10 vordefinierte Presets
- Perfekte weiße Farben durch dedizierten White-Kanal
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
Ideal für RGBW LED-Strips mit einem neutralweißen Kanal