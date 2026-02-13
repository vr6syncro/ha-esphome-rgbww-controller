# RGBWW Controller (5-Kanal) - Vollausstattung

## Ueberblick
Die Premium-Variante mit voller 5-Kanal RGBWW Unterstuetzung fuer RGB + Warm White + Cold White.

## Pin-Konfiguration
```yaml
red_pin: GPIO13
green_pin: GPIO12
blue_pin: GPIO14
warm_white_pin: GPIO5
cold_white_pin: GPIO4
```

## Features
- RGB + Warm White + Cold White
- Color Temperature Control (2700K - 6000K)
- Constant Brightness bei CT-Wechseln
- Color Interlock Option
- Vordefinierte Presets (Farben, Weisstoene, Szenen)
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
Ideal fuer Premium RGBWW LED-Strips mit separaten Warm/Cold White LEDs
