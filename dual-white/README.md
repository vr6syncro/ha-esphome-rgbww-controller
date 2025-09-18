# Dual White Controller (2-Kanal)

## Überblick
Spezialisiert auf CCT/Tunable White LED-Strips mit Warm White und Cold White Kanälen.

## Pin-Konfiguration
```yaml
warm_white_pin: GPIO5
cold_white_pin: GPIO4
```

## Features
- CCT/Tunable White (2700K - 6000K)
- CWWW Light Platform für Color Temperature
- 9 vordefinierte Presets
- Verschiedene Weißtöne und Szenen
- Optimiert für Wohn- und Arbeitsraumbeleuchtung
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
Ideal für CCT LED-Strips ohne RGB-Kanäle, perfekt für Büro- und Wohnraumbeleuchtung