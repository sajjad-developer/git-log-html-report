[Zurück zur Sprachauswahl](README.md) | 🇺🇸 [English](README.en.md)

---

<p align="center">
  <img src="./assets/banner/git-log-html-report-banner.png" alt="git-log-html-report Banner mit visueller Git-Commit-Historie im HTML-Berichtsformat" width="100%" />
</p>

# git-log-html-report

## 🌐 Sprache

| 🌍 Verfügbare Übersetzungen            | 🔄 Wechsel           |
| -------------------------------------- | -------------------- |
| 🇺🇸 [Englisch (Standard)](README.en.md) | ⬅️ Zum Lesen klicken |
| 🇩🇪 Deutsch                             | ✅                   |

[![npm Version](https://img.shields.io/npm/v/git-log-html-report?label=npm%20Version "npm Version anzeigen")](https://www.npmjs.com/package/git-log-html-report)
[![npm Downloads](https://img.shields.io/npm/dt/git-log-html-report?label=Downloads "Gesamtzahl der npm-Downloads")](https://www.npmjs.com/package/git-log-html-report)
[![Lizenz](https://img.shields.io/npm/l/git-log-html-report?label=Lizenz "Lizenz anzeigen")](https://github.com/sajjad-developer/git-log-html-report/blob/main/LICENSE)
![Mit Node.js gebaut](https://img.shields.io/badge/gebaut%20mit-Node.js-brightgreen "Gebaut mit Node.js")
[![GitHub Repo Stars](https://img.shields.io/github/stars/sajjad-developer/git-log-html-report?style=social&label=GitHub%20Stars "GitHub Sterne")](https://github.com/sajjad-developer/git-log-html-report)
[![Installationsgröße](https://packagephobia.com/badge?p=git-log-html-report)](https://packagephobia.com/result?p=git-log-html-report)

> **Alle Ihre Commits – vollständig synchronisiert. Verfolgen Sie jede Änderung in lokalen und Remote-Repositories, ohne zwischen GitHub-Tabs wechseln zu müssen. `git-log-html-report` sorgt für Klarheit und Vertrauen – sowohl für Einzelentwickler als auch für Teams.**

> 🔎 **Sofortige Git-Commit-Einblicke als übersichtlicher HTML-Bericht!**
> Wandeln Sie Ihre Git-Historie in eine saubere, teilbare und anpassbare HTML-Datei mit Erkennung von lokalen und entfernten Commits um.

📄 **git-log-html-report** ist ein leistungsstarkes CLI-Tool, das Ihre Git-Commit-Historie in einen schönen, lesbaren und barrierefreien HTML-Bericht umwandelt.

---

## 📚 Inhaltsverzeichnis

- [✨ Funktionen](#-funktionen)
- [👥 Zielgruppe](#-zielgruppe)
- [🚀 Installation](#-installation)
- [📦 Nutzung](#-nutzung)
- [📋 Voraussetzungen](#-voraussetzungen)
- [📸 Schritt-für-Schritt-Screenshots & Funktionsübersicht](#-schritt-für-schritt-screenshots--funktionsübersicht)
- [📄 Lizenz](#-lizenz)
- [☕ Unterstützen Sie meine Arbeit](#-unterstützen-sie-meine-arbeit)

> ⚠️ Auf der [npm-Paketseite](https://www.npmjs.com/package/git-log-html-report) funktionieren Ankerlinks eventuell nicht korrekt.
> 👉 Nutzen Sie für die vollständige Navigation bitte das [README auf GitHub](https://github.com/sajjad-developer/git-log-html-report#readme).

---

## ✨ Funktionen

- 🔍 Anzeige von kurzen Commit-Hashes, Betreff, Beschreibung sowie ISO- und lokalen Zeitstempeln
- 🎨 Umschalten zwischen dunklem und hellem Design
- 🔗 Klickbare Commit-Links mit Kopierfunktion
- 📄 Bericht als PDF speichern oder drucken
- Anzeige des Commit-Status:

  - ✅ Im lokalen Repository vorhanden
  - 📤 Noch nicht zum Remote gepusht
  - ☁️ Im Remote vorhanden (noch nicht gepullt)
  - ☑️ Vollständig zum Remote gepusht
  - ❓ Unbekannter Status (selten)

- ♿️ Barrierefreies Design für Screenreader und Tastaturnavigation

---

## 👥 Zielgruppe

Egal ob Sie als **Einzelentwickler** Ihre Änderungen nachvollziehen oder Teil eines **Teams** sind – dieses Tool unterstützt Sie dabei, Git-Aktivitäten effizient zu verfolgen und zu verstehen.

---

## 🚀 Installation

Global über npm installieren:

```bash
npm install -g git-log-html-report
```

Oder ohne globale Installation direkt per npx ausführen:

```bash
npx git-log-html-report
```

---

## 📦 Nutzung

Führen Sie den Befehl in einem beliebigen Git-Repository aus:

```bash
git-log-html-report
```

Es werden `commit.log` und `commit.html` im Stammverzeichnis erzeugt. Die generierte HTML-Datei wird nicht im Remote-Repository gespeichert.

Um den Bericht anzuzeigen, öffnen Sie `commit.html` in einem Browser über einen lokalen Server, zum Beispiel:

Mit Vite:

```
http://localhost:5173/commit.html
```

Mit Live Server:

```
127.0.0.1:8080/commit.html
```

---

## 📋 Voraussetzungen

- Node.js Version 14 oder höher
- Ein gültiges Git-Repository

---

## 📸 Schritt-für-Schritt-Screenshots & Funktionsübersicht

Unten finden Sie 18 sorgfältig ausgewählte Screenshots (einschließlich 15.1 und 15.2), die zeigen, wie **git-log-html-report** in der Praxis funktioniert.

**Sie können:**

- 📘 Der Schritt-für-Schritt-Sequenz folgen, um den typischen Git-Workflow zu verstehen
- 🔍 Jeden Screenshot als Referenz für konkrete Anwendungsfälle nutzen
- ✨ Die Funktionen visuell nachvollziehen
- ✅ Wichtige Schritte anhand kategorisierter Abschnitte erkennen
- 🔗 Schnellnavigation über die untenstehenden Links verwenden
- 🔽 Jeden Abschnitt zum fokussierten Lesen ein- oder ausklappen

### 📑 Screenshot-Abschnitte

- [📂 Setup & Initialisierung](#-setup--initialisierung)
- [📝 Lokale Commits & Änderungen](#-lokale-commits--änderungen)
- [🚀 Remote-Synchronisation & Push](#-remote-synchronisation--push)
- [🌐 Nur Remote-Commits & Pull](#-nur-remote-commits--pull)

---

<h3 id="setup--initialisierung">📂 Setup & Initialisierung</h3>
<details><summary>Klicken zum Ein-/Ausklappen</summary>
<br/>

<figure align="center">
  <img src="./assets/screenshots/initial-state-of-project.png" alt="Anfangszustand des Git-Projektordners" width="400" />
  <br/>
  <br/>
  <figcaption><b>Abbildung 1: Anfangszustand des Projektordners mit der grundlegenden Verzeichnisstruktur vor Ausführung der Befehle.</b></figcaption>
</figure>
<br/>
<br/>
<br/>

<figure align="center">
  <img src="./assets/screenshots/run-CLI-command-in-terminal.png" alt="CLI-Befehl wird ausgeführt" width="400" />
  <br/>
  <br/>
  <figcaption><b>Abbildung 2: Ausführen des CLI-Befehls <code>git-log-html-report</code> im Terminal zur Generierung des HTML-Berichts.</b></figcaption>
</figure>
<br/>
<br/>
<br/>

<figure align="center">
  <img src="./assets/screenshots/not-git-indicator-message.png" alt="Warnung, wenn nicht in einem Git-Repository" width="400" />
  <br/>
  <br/>
  <figcaption><b>Abbildung 3: Warnmeldung, die erscheint, wenn das Tool außerhalb eines Git-Repositories ausgeführt wird.</b></figcaption>
</figure>
<br/>
<br/>
<br/>

<figure align="center">
  <img src="./assets/screenshots/not-found-remote-repo-indicator.png" alt="Nachricht bei keinem konfigurierten Remote-Repo" width="400" />
  <br/>
  <br/>
  <figcaption><b>Abbildung 4: Hinweis, dass kein Remote-Repository für das lokale Git-Repository konfiguriert ist.</b></figcaption>
</figure>
<br/>
<br/>
<br/>

<figure align="center">
  <img src="./assets/screenshots/create-remote-repo-commands.png" alt="Befehle zum Einrichten eines Remote-Repos" width="400" />
  <br/>
  <br/>
  <figcaption><b>Abbildung 5: Empfohlene Git-Befehle zum Einrichten einer Remote-Repository-Verbindung.</b></figcaption>
</figure>

</details>

---

<h3 id="lokale-commits--änderungen">📝 Lokale Commits & Änderungen</h3>
<details><summary>Klicken zum Ein-/Ausklappen</summary>
<br/>

<figure align="center">
  <img src="./assets/screenshots/git-add-command.png" alt="Datei index.html zum Staging hinzufügen" width="400" />
  <br/>
  <br/>
  <figcaption><b>Abbildung 6: Verwendung von <code>git add</code>, um die Datei index.html für den ersten Commit vorzubereiten.</b></figcaption>
</figure>
<br/>
<br/>
<br/>

<figure align="center">
  <img src="./assets/screenshots/connected-to-remote-repo-and-made-commit.png" alt="Verbunden und Commit erstellt" width="400" />
  <br/>
  <br/>
  <figcaption><b>Abbildung 7: Erfolgreicher lokaler Commit nach Verbindung des Repositories mit einem Remote-Repository.</b></figcaption>
</figure>
<br/>
<br/>
<br/>

<figure align="center">
  <img src="./assets/screenshots/commit.html-file-created-terminal-feedback.png" alt="commit.html-Datei erstellt" width="400" />
  <br/>
  <br/>
  <figcaption><b>Abbildung 8: Terminal-Rückmeldung zur Bestätigung der Erstellung der Datei <code>commit.html</code>.</b></figcaption>
</figure>
<br/>
<br/>
<br/>

<figure align="center">
  <img src="./assets/screenshots/output-of-commit.html-file.png" alt="Vorschau des HTML-Berichts" width="400" />
  <br/>
  <br/>
  <figcaption><b>Abbildung 9: Vorschau des generierten HTML-Berichts zur Visualisierung der Git-Commit-Historie.</b></figcaption>
</figure>
<br/>
<br/>
<br/>

<figure align="center">
  <img src="./assets/screenshots/local-repo-commit.png" alt="Zweiter lokaler Commit" width="400" />
  <br/>
  <br/>
  <figcaption><b>Abbildung 10: Beispiel für einen zweiten lokalen Commit-Eintrag.</b></figcaption>
</figure>
<br/>
<br/>
<br/>

<figure align="center">
  <img src="./assets/screenshots/run-git-log-html-report-command-after-made-commit-in-local-repo.png" alt="Erneutes Ausführen nach lokalem Commit" width="400" />
  <br/>
  <br/>
  <figcaption><b>Abbildung 11: Erneutes Ausführen des CLI-Befehls <code>git-log-html-report</code> nach dem zweiten Commit im lokalen Repository.</b></figcaption>
</figure>
<br/>
<br/>
<br/>

<figure align="center">
  <img src="./assets/screenshots/local-commit-done-but-not-in-remote-repo.png" alt="Commit nur lokal vorhanden" width="400" />
  <br/>
  <br/>
  <figcaption><b>Abbildung 12: Hervorhebung eines Commits, der nur lokal existiert und noch nicht zum Remote-Repository gepusht wurde.</b></figcaption>
</figure>

</details>

---

<h3 id="remote-synchronisation--push">🚀 Remote-Synchronisation & Push</h3>
<details><summary>Klicken zum Ein-/Ausklappen</summary>
<br/>

<figure align="center">
  <img src="./assets/screenshots/git-push-after-local-repo-commit.png" alt="git push Befehl" width="400" />
  <br/>
  <br/>
  <figcaption><b>Abbildung 13: Ausführen des Befehls <code>git push</code>, um lokale Commits mit dem Remote-Repository zu synchronisieren.</b></figcaption>
</figure>
<br/>
<br/>
<br/>

<figure align="center">
  <img src="./assets/screenshots/pushed-to-remote-repo.png" alt="Erfolgreich zu Remote gepusht" width="400" />
  <br/>
  <br/>
  <figcaption><b>Abbildung 14: Bestätigung, dass Commits erfolgreich zum Remote-Repository gepusht wurden.</b></figcaption>
</figure>

</details>

---

<h3 id="nur-remote-commits--pull">🌐 Nur Remote-Commits & Pull</h3>
<details><summary>Klicken zum Ein-/Ausklappen</summary>
<br/>

<figure align="center">
  <img src="./assets/screenshots/direct-commit-in-remote-repo-part-1.png" alt="Direkter Commit im Remote-Repo Teil 1" width="400" />
  <br/>
  <br/>
  <figcaption><b>Abbildung 15.1: Erster Schritt, der einen direkt im Remote-Repository per Webschnittstelle erstellten Commit zeigt.</b></figcaption>
</figure>
<br/>
<br/>
<br/>

<figure align="center">
  <img src="./assets/screenshots/direct-commit-in-remote-repo-part-2.png" alt="Direkter Commit im Remote-Repo Teil 2" width="400" />
  <br/>
  <br/>
  <figcaption><b>Abbildung 15.2: Zweiter Schritt, der die Betreffzeile der Commit-Nachricht des nur im Remote-Repository direkt erstellten Commits zeigt.</b></figcaption>
</figure>
<br/>
<br/>
<br/>

<figure align="center">
  <img src="./assets/screenshots/git-in-remote-repo-but-not-in-local-repo.png" alt="Commit nur im Remote, noch nicht lokal" width="400" />
  <br/>
  <br/>
  <figcaption><b>Abbildung 16: Hervorhebung des Commits, der im Remote-Repository vorhanden, aber noch nicht in das lokale Repository gezogen wurde.</b></figcaption>
</figure>
<br/>
<br/>
<br/>

<figure align="center">
  <img src="./assets/screenshots/git-pull-command.png" alt="git pull Befehl" width="400" />
  <br/>
  <br/>
  <figcaption><b>Abbildung 17: Ausführen des Befehls <code>git pull</code>, um entfernte Commits in das lokale Repository zu holen und zu integrieren.</b></figcaption>
</figure>
<br/>
<br/>
<br/>

<figure align="center">
  <img src="./assets/screenshots/commit-fetched-from-remote-repo-to-local-repo.png" alt="Commit erfolgreich lokal übernommen" width="400" />
  <br/>
  <br/>
  <figcaption><b>Abbildung 18: Bestätigung, dass ein entfernter Commit erfolgreich in das lokale Repository übernommen wurde.</b></figcaption>
</figure>

</details>

---

## 📄 Lizenz

MIT © [Md Sajjad Hossen](https://github.com/sajjad-developer)

---

## ☕ Unterstützen Sie meine Arbeit

✨ Dieses Projekt wird von mir in meiner Freizeit entwickelt und gepflegt.
Wenn `git-log-html-report` Ihnen Zeit spart oder Ihren Workflow verbessert hat, erwägen Sie bitte eine **freiwillige Unterstützung**, um die Weiterentwicklung zu fördern:

[![❤️ ☕ Bitte unterstützen Sie den Entwickler](https://img.shields.io/badge/Unterst%C3%BCtzen-%E2%9D%A4%EF%B8%8F-brightgreen "Ihre Unterstützung hilft, dieses Projekt weiterhin kostenlos und offen zu halten.")](https://eco-starfish-coder.com/tip)
