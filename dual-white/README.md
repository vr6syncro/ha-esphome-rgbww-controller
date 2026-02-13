# Dual White Controller (2-Kanal)

## Ueberblick
Spezialisiert auf CCT/Tunable White LED-Strips mit Warm White und Cold White Kanaelen.

## Pin-Konfiguration
```yaml
warm_white_pin: GPIO5
cold_white_pin: GPIO4
```

## Features
- CCT/Tunable White (2700K - 6000K)
- CWWW Light Platform fuer Color Temperature
- Constant Brightness bei CT-Wechseln
- Vordefinierte Presets (Weisstoene, Szenen)
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
Ideal fuer CCT LED-Strips ohne RGB-Kanaele, perfekt fuer Buero- und Wohnraumbeleuchtung
