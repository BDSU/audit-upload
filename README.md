# BDSU Hackathon 2024

> [!CAUTION]
> Bei dieser Anwendung handelt es sich um einen Prototypen, der auf wichtige Sicherheitsfeatures verzichtet und nicht produktiv eingesetzt werden sollte

## BDSU-Upload-Tool

Dieses Tool soll die auditkonforme Abgabe von Unterlagen durch QM-Verantwortliche der BDSU-Mitglied-JEs vereinfachen. Dieser **Prototyp** wurde initial auf dem Hackathon des BDSU am 8. März 2024 - 10. März 2024 in Helmarshausen entwickelt 

### Komponenten

Das *BDSU Audit Upload Tool* besteht aus einer Webanwendung mit Client-Server-Archtitektur, wobei sowohl client-, als auch serverseitige Software in einem gemeinsamen Projekt mit Next.js entwickelt wurden. Die Datenhaltung erfolgt in einer SQLite-Datenbank, deren Schema [hier](../prisma/schema.prisma) ersichtlich ist. Die Bedeutung der einzelnen Tabellen und Spalten ist [dort](../prisma/schema.prisma) ebenfalls erklärt / kommentiert. Die Schnittstelle zwischen SQLite und Next.js wird von Prisma (ORM) zur Verfügung gestellt.

### Hosting

Der Dienst soll auf einem Server des BDSU gehostet werden und zum Hochladen der Audit-Unterlagen allen JEs zur Verfügung gestellt werden. Die Pflege erfolgt durch die BDSU IT-Stabstelle.

### Authentifizierung / Anmeldung

Der Zugriff auf das Tool soll mithilfe der API der *BDSU-Connect-App* realisiert werden. Dabei werden Nutzer zuerst in der Datenbank des Upload-Tools (Tabelle *User*) hinterlegt; diese können sich dann mit ihren Anmeldedaten von BDSU-Connect beim Dienst authentifizieren.

Benutzer können die Rolle "Auditor" und / oder "QMler" innehaben. Diese Rolle entscheidet darüber, auf welche Ansichten der/die Nutzer*in zugreifen kann.

QMler können Daten für ihre jeweilige JE hochladen, bis zur Abgabedeadline bearbeiten und danach ansehen.

Auditoren können die Daten aller JEs einsehen und auditieren, diese jedoch nicht bearbeiten.
