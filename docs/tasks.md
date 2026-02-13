# Tasks -- ESPHome RGBWW Controller v2.1

> Single Source of Truth fuer alle Aufgaben. Wird von Claude verwaltet.
> Status: PLANNED | IN_PROGRESS | INTERRUPTED | BLOCKED | DONE | VERIFIED

---

## Aktuelle Tasks

_Keine offenen Tasks._

---

## Abgeschlossene Tasks

### [DONE] Phase 1: ESPHome 2026.1.0 Kompatibilitaet
- **Beschreibung**: OTA-Syntax von Liste zu Map, constant_brightness: true in rgbww + dual-white
- **Ergebnis**: Alle 5 controller_*.yaml aktualisiert

### [DONE] Phase 2: Sicherheits- und Robustheits-Features
- **Beschreibung**: captive_portal, safe_mode Button, factory_reset Button in alle 5 YAMLs
- **Ergebnis**: Alle Features in allen 5 Varianten hinzugefuegt

### [DONE] Phase 3: Preset-Konsistenz
- **Beschreibung**: Night Light 5%, Relax 30%/3s, Reading 85%/4000K, Icons systematisieren
- **Ergebnis**: Alle Presets vereinheitlicht, Icons konsistent

### [DONE] Phase 4: Web-Konfigurator
- **Beschreibung**: Single-Page Web-App fuer YAML-Generierung (GitHub Pages)
- **Ergebnis**: configurator/ mit index.html, app.js, style.css erstellt

### [DONE] Phase 5: OTA-Migrator Sicherheit
- **Beschreibung**: Dynamisches Passwort, Auto-Shutdown, Versionen aktualisieren
- **Ergebnis**: Chip-ID-basiertes Passwort, 10 Min Timeout, espressif32 v6.5.0

### [DONE] Phase 6: Secrets-Konsolidierung
- **Beschreibung**: Zentrale secrets_example.yaml in Root, 5 Kopien entfernen
- **Ergebnis**: Eine zentrale Datei, 5 Duplikate entfernt

### [DONE] Phase 7: Dokumentation
- **Beschreibung**: README v2.1, DETAILED_GUIDE, CLAUDE.md, Varianten-READMEs
- **Ergebnis**: Alle Dokumentation auf v2.1 aktualisiert

### [DONE] Projekt-Initialisierung
- **Beschreibung**: CLAUDE.md, .claude/rules/, docs/tasks.md anlegen
- **Ergebnis**: Alle Dateien erstellt und konfiguriert
