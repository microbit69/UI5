# Sales Analytics Dashboard (UI5)

Analytisches UI5-Dashboard mit lokalen Mock-Daten. Kein Backend erforderlich.

## Features

- **KPI-Kacheln**: Gesamtumsatz, Bestellungen, Durchschnittswert, Kundenzufriedenheit
- **Liniendiagramm**: Monatlicher Umsatz- und Gewinntrend
- **Balkendiagramm**: Umsatz nach Region
- **Donut-Diagramm**: Umsatzverteilung nach Produktkategorie
- **Detailtabelle**: Bestellungen mit Suche und Status-Anzeige

## Starten

### Option 1: UI5 Tooling (empfohlen)

```bash
npm install
npm start
```

### Option 2: Beliebiger HTTP-Server

Da die App UI5 per CDN lädt, reicht ein einfacher HTTP-Server:

```bash
# Python
python3 -m http.server 8080 --directory webapp

# Node.js (npx)
npx http-server webapp -p 8080
```

Dann im Browser öffnen: http://localhost:8080

## Technologie

- SAPUI5 / OpenUI5 (sap_horizon Theme)
- sap.viz für Charts (VizFrame)
- sap.f.Card für KPI-Kacheln
- sap.m.Table für die Bestellübersicht
- JSON-Model mit lokalen Mock-Daten
