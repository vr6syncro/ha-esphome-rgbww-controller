# RGBW Controller (4-Kanal)

## Ueberblick
Dieser Controller unterstuetzt 4-Kanal RGBW LED-Strips mit einem separaten White-Kanal.

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
- Vordefinierte Presets (Farben, Pure White, Szenen)
- Perfekte weisse Farben durch dedizierten White-Kanal
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
Ideal fuer RGBW LED-Strips mit einem neutralweissen Kanal
