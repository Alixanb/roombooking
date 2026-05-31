# RoomBooking — Notes pour l'article

## Contexte du projet

Projet réalisé en M1 à **Ynov** par **Alixan Balu** et **Aurélie Runser**.  
Application web de réservation de salles : les utilisateurs peuvent parcourir un catalogue de salles, faire des réservations, inviter des participants et gérer leurs réservations passées ou à venir. Les admins gèrent les salles, les équipements et les utilisateurs.

---

## Stack technique

| Couche      | Technologie                                      |
|-------------|--------------------------------------------------|
| Frontend    | Vue 3.5 + TypeScript, Vite 6, TailwindCSS 3, Radix Vue |
| Backend     | .NET 8 / ASP.NET Core, Entity Framework Core 8  |
| Base de données | SQLite (fichier `.db`, persisté via volume Docker) |
| Auth        | JWT (HMAC-SHA256), BCrypt (hachage des mots de passe) |
| Logging     | Serilog (structured logging)                    |
| Exports     | CsvHelper, Ical.Net, EPPlus (Excel)             |
| DevOps      | Docker + Docker Compose, Nginx (front prod)     |
| Doc API     | Swagger / OpenAPI (mode développement)          |

---

## Sujets intéressants pour l'article

### 1. Architecture frontend en couches (Domain / Application / Infrastructure)
Le frontend suit une séparation stricte en trois couches :
- `domain/models/` — types TypeScript (Room, Booking, User, Equipment)
- `domain/services/` — appels API métier (bookingService, roomService…)
- `infrastructure/` — apiClient Axios, authService
- `application/vue/` — composants, vues, composables, router

**Pourquoi c'est intéressant :** appliqué côté Vue dans un projet étudiant, c'est rare. Cela montre comment structurer un SPA au-delà du simple `components/`.

---

### 2. Authentification JWT sans middleware ASP.NET Identity
Le backend implémente un `JwtTokenService` **from scratch** :
- Génération d'un token signé HMAC-SHA256 avec `userId` et `email` en claims
- Validation manuelle du token (signature, expiration, algorithme)
- Le token est passé **dans le body** des requêtes sensibles (pas uniquement en header `Authorization`)

**Pourquoi c'est intéressant :** choix délibéré de ne pas utiliser ASP.NET Identity (trop lourd pour le scope). Bonne illustration de ce que JWT fait réellement sous le capot.

---

### 3. Gestion des statuts de réservation en temps réel côté serveur
À chaque requête `GET /booking/user/{token}`, le backend vérifie si chaque réservation est passée et met à jour automatiquement le statut vers `"Terminée"` si la date/heure de fin est dépassée.

**Pourquoi c'est intéressant :** alternative simple à un job CRON ou un scheduler. Montre comment gérer la "cohérence temporelle" sans infrastructure supplémentaire — et les compromis de cette approche (statut mis à jour seulement à la prochaine consultation).

---

### 4. Export multi-format : CSV, iCal (.ics / .cal), Excel (.xlsx)
Le `BookingExporter` produit trois formats depuis les mêmes données :
- **CSV** via CsvHelper
- **iCalendar** via Ical.Net (compatible Google Calendar, Outlook…) — construit un `VCALENDAR` avec `VEVENT`, `ORGANIZER`, `ATTENDEE`
- **Excel** via EPPlus — mise en forme automatique (colonnes ajustées, en-têtes gras, fond gris)

**Pourquoi c'est intéressant :** le format iCal est souvent méconnu des étudiants. Expliquer la structure `BEGIN:VCALENDAR / BEGIN:VEVENT` et son universalité est un bon angle pédagogique.

---

### 5. Transactions EF Core pour la création de réservation
La création d'une réservation utilise une **transaction explicite** :
1. Insertion de la réservation
2. Ajout des invités (`Guests`)
3. Ajout des équipements
4. Commit — ou Rollback en cas d'erreur

**Pourquoi c'est intéressant :** illustre pourquoi les transactions existent (pas de réservation sans invités), et comment EF Core les expose avec `BeginTransaction()`.

---

### 6. Validation par attributs personnalisés
Plutôt que des validations inline, le backend utilise des **Data Annotations custom** :
- `[HoursFromValidation]` / `[HoursToValidation]` — créneaux horaires autorisés
- `[StatusValidation]` — statuts valides (`Prévus`, `Terminée`, `Annulée`)
- `[GroupeValidation]` — groupes de salles autorisés
- `[MaxFileSize(20)]` — taille max d'image en Mo
- `[RoleValidation]` — rôles valides (`user`, `admin`)

**Pourquoi c'est intéressant :** séparation claire de la logique de validation. Les attributs sont réutilisables et déclaratifs — bonne pratique .NET à mettre en valeur.

---

### 7. Réflexion pour la mise à jour dynamique des propriétés
Dans `UpdateBooking`, la copie des propriétés modifiées utilise la **réflexion** (`typeof(Booking).GetProperties()`) pour itérer sur les champs et ne mettre à jour que ceux qui ont changé.

**Pourquoi c'est intéressant :** approche générique vs. copie champ-par-champ manuelle. Ouvre la discussion sur les compromis (performance, lisibilité, maintenabilité).

---

### 8. Calcul des créneaux disponibles côté API
`GET /booking/available-start-hours?roomId=X&date=Y` retourne la liste des heures de début disponibles en filtrant :
- les heures passées (si la date est aujourd'hui)
- les créneaux déjà réservés pour cette salle ce jour-là

**Pourquoi c'est intéressant :** logique métier non triviale exposée proprement en REST. Montre comment éviter les conflits de réservation sans base de données complexe.

---

### 9. Infrastructure Docker : SPA servie par Nginx
En production, le frontend Vue est **compilé puis servi par Nginx** (pas de Node.js en prod). Le `Dockerfile` front fait un build multi-stage :
1. Image Node pour `npm run build`
2. Image Nginx légère pour servir les fichiers statiques

La variable d'env `VITE_ROOM_BOOKING_API` est injectée **au moment du build** (pas au runtime) — contrainte propre à Vite.

**Pourquoi c'est intéressant :** pattern classique mais souvent mal compris. Les variables Vite sont "baked in" au build, pas dynamiques comme les env Node classiques.

---

### 10. Garde de route côté client (Vue Router)
Le router vérifie `localStorage.getItem('jwtToken')` et `localStorage.getItem('isAdmin')` avant chaque navigation. Les routes sensibles ont des meta `requiresAuth` et `requiresAdmin`.

**Pourquoi c'est intéressant :** sécurité côté client = UX uniquement. Le vrai contrôle d'accès reste côté serveur. Bon point de discussion sur la séparation des responsabilités front/back.

---

## Points de discussion supplémentaires

- **SQLite en production** : choix pragmatique pour un projet M1. Quand passer à PostgreSQL ? (concurrence d'écriture, taille des données, déploiement multi-instance)
- **Token dans le body vs. header `Authorization`** : la convention REST recommande `Authorization: Bearer <token>`. Le projet le passe parfois en body ou query param — compromis de simplicité vs. bonnes pratiques.
- **CORS `AllowAll`** : un `TODO` est présent dans le code pour restreindre les origines en production. Bonne illustration du principe de moindre privilège.
- **Statuts en constantes string** : `Status.AllowedStatus[0]` = `"Prévus"`, etc. Alternative discutable à un `enum` — ouvre la discussion sur la robustesse des types.
- **Pas de couche Repository** : le contexte EF est utilisé directement dans les controllers. Choix pragmatique pour un projet de cette taille, mais crée un couplage fort.

---

## Fonctionnalités implémentées vs. prévues

| Fonctionnalité                   | État        |
|----------------------------------|-------------|
| Catalogue de salles (CRUD admin) | Fait        |
| Réservations (+ modification)    | Fait        |
| Profils client & admin           | Fait        |
| Créneaux disponibles/indisponibles | Fait      |
| Annulation de réservation        | Fait        |
| Historique des réservations      | Fait        |
| Recherche & filtres              | Fait        |
| Export `.cal` / `.csv` / `.xlsx` | Fait        |
| Mobile-friendly                  | Fait        |
| Rappels email avant l'événement  | Non réalisé |
| Calendrier interactif des salles | Non réalisé |

---

## Auteurs

- [Alixan Balu](https://github.com/Alixanb)
- [Aurélie Runser](https://github.com/Aurelie-Runser)
