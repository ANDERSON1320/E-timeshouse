<<<<<<< HEAD
# E-TimesHouse - Site E-Commerce de Montres

Projet complet de site e-commerce pour la vente de montres, développé avec Spring Boot (backend) et Angular (frontend).

## 📋 Table des matières

- [Technologies](#technologies)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Exécution](#exécution)
- [Structure du projet](#structure-du-projet)
- [API Endpoints](#api-endpoints)
- [Tests](#tests)
- [Sécurité](#sécurité)
- [Checklist de test](#checklist-de-test)

## 🛠️ Technologies

### Backend
- **Java 21**
- **Spring Boot 3.x**
- **Maven**
- **JPA/Hibernate**
- **Spring Security + JWT**
- **MySQL**

### Frontend
- **Angular 17+**
- **Angular CLI**
- **Angular Material**
- **RxJS**

## 📦 Prérequis

- **Java 21** (JDK)
- **Maven 3.8+**
- **Node.js 18+** et **npm**
- **Angular CLI** : `npm install -g @angular/cli`
- **MySQL 8.0+**
- **IntelliJ IDEA** (recommandé pour le backend)
- **Visual Studio Code** (recommandé pour le frontend)

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone <url-du-repo>
cd E-timeshouse
```

### 2. Configuration de la base de données MySQL

```bash
# Se connecter à MySQL
mysql -u root -p

# Créer la base de données
CREATE DATABASE e_timeshouse CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Exécuter le script de schéma
mysql -u root -p e_timeshouse < backend/src/main/resources/db/schema.sql

# Charger les données d'exemple (optionnel)
mysql -u root -p e_timeshouse < backend/src/main/resources/db/data_sample.sql
```

### 3. Configuration Backend

1. Ouvrir le projet backend dans **IntelliJ IDEA**
2. Configurer les variables d'environnement dans `backend/src/main/resources/application.yml` :
   - URL de la base de données
   - Nom d'utilisateur MySQL
   - Mot de passe MySQL
   - Secret JWT

### 4. Configuration Frontend

```bash
cd frontend
npm install
```

## ⚙️ Configuration

### Variables d'environnement Backend

Créer un fichier `.env` à la racine du backend (ou configurer dans `application.yml`) :

```properties
DB_URL=jdbc:mysql://localhost:3306/e_timeshouse?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
DB_USERNAME=root
DB_PASSWORD=votre_mot_de_passe
JWT_SECRET=votre_secret_jwt_tres_long_et_securise_minimum_256_bits
JWT_EXPIRATION=86400000
```

### Configuration application.yml

Le fichier `backend/src/main/resources/application.yml` contient la configuration complète.

## ▶️ Exécution

### Backend (IntelliJ IDEA)

1. Ouvrir `backend/pom.xml` comme projet Maven
2. Attendre la synchronisation des dépendances
3. Exécuter la classe principale `EtimeshouseApplication.java`
   - Ou utiliser : `Run > Run 'EtimeshouseApplication'`
4. Le backend sera accessible sur : `http://localhost:8080`

**Alternative en ligne de commande :**

```bash
cd backend
mvn spring-boot:run
```

### Frontend (Visual Studio Code)

1. Ouvrir le dossier `frontend` dans VS Code
2. Ouvrir un terminal intégré
3. Exécuter :

```bash
ng serve
```

4. Le frontend sera accessible sur : `http://localhost:4200`

**Alternative en ligne de commande :**

```bash
cd frontend
ng serve --open
```

## 📁 Structure du projet

```
E-timeshouse/
├── backend/                          # Application Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/etimeshouse/
│   │   │   │   ├── EtimeshouseApplication.java
│   │   │   │   ├── config/          # Configuration (Security, JWT, etc.)
│   │   │   │   ├── controller/      # Controllers REST
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── entity/          # Entités JPA
│   │   │   │   ├── repository/      # Repositories JPA
│   │   │   │   ├── service/         # Services métier
│   │   │   │   └── util/            # Utilitaires (JWT, etc.)
│   │   │   └── resources/
│   │   │       ├── application.yml  # Configuration Spring Boot
│   │   │       └── db/              # Scripts SQL
│   │   │           ├── schema.sql
│   │   │           └── data_sample.sql
│   │   └── test/                    # Tests unitaires et d'intégration
│   └── pom.xml                      # Dépendances Maven
│
├── frontend/                         # Application Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/                # Services core (auth, http)
│   │   │   ├── shared/              # Composants partagés
│   │   │   ├── features/
│   │   │   │   ├── auth/            # Module authentification
│   │   │   │   ├── watches/         # Module montres
│   │   │   │   ├── cart/            # Module panier
│   │   │   │   ├── orders/          # Module commandes
│   │   │   │   └── admin/           # Module admin
│   │   │   ├── guards/              # Guards (AuthGuard, AdminGuard)
│   │   │   └── app.component.ts
│   │   ├── assets/                  # Images, styles
│   │   ├── environments/            # Configuration environnement
│   │   └── index.html
│   ├── angular.json
│   └── package.json
│
└── README.md                        # Ce fichier
```

## 🔌 API Endpoints

### Authentification

- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

### Utilisateurs

- `GET /api/users/profile` - Profil utilisateur (authentifié)
- `PUT /api/users/profile` - Mise à jour profil

### Montres (Catalogue)

- `GET /api/watches` - Liste des montres (pagination, filtres)
- `GET /api/watches/{id}` - Détail d'une montre
- `POST /api/watches` - Créer une montre (ADMIN)
- `PUT /api/watches/{id}` - Modifier une montre (ADMIN)
- `DELETE /api/watches/{id}` - Supprimer une montre (ADMIN)

### Catégories

- `GET /api/categories` - Liste des catégories

### Panier

- `GET /api/cart` - Récupérer le panier (authentifié)
- `POST /api/cart/items` - Ajouter un article au panier
- `PUT /api/cart/items/{itemId}` - Modifier la quantité
- `DELETE /api/cart/items/{itemId}` - Retirer un article

### Commandes

- `POST /api/orders` - Créer une commande depuis le panier
- `GET /api/orders` - Historique des commandes (authentifié)
- `GET /api/orders/{id}` - Détail d'une commande

### Admin

- `GET /api/admin/users` - Liste des utilisateurs (ADMIN)
- `GET /api/admin/orders` - Liste de toutes les commandes (ADMIN)
- `PUT /api/admin/orders/{id}/status` - Mettre à jour le statut (ADMIN)

## 🧪 Tests

### Backend

```bash
cd backend
mvn test
```

### Frontend

```bash
cd frontend
ng test
```

## 🔒 Sécurité

- **JWT** : Tokens d'authentification avec expiration
- **Spring Security** : Protection des endpoints
- **Rôles** : USER et ADMIN
- **CORS** : Configuré pour le frontend Angular

### Limitations / À améliorer avant production

- [ ] Validation côté serveur plus stricte
- [ ] Rate limiting
- [ ] HTTPS obligatoire
- [ ] Gestion des images (upload réel au lieu d'URLs)
- [ ] Paiement réel (actuellement mock)
- [ ] Logs et monitoring
- [ ] Tests de charge
- [ ] Backup automatique de la base de données

## ✅ Checklist de test

### 1. Base de données
- [ ] MySQL installé et démarré
- [ ] Base de données `e_timeshouse` créée
- [ ] Scripts SQL exécutés sans erreur
- [ ] Données d'exemple chargées (8+ montres visibles)

### 2. Backend
- [ ] Backend démarre sans erreur (port 8080)
- [ ] Connexion à MySQL réussie
- [ ] Endpoint `/api/auth/register` fonctionne
- [ ] Endpoint `/api/auth/login` retourne un JWT
- [ ] Endpoint `/api/watches` retourne la liste des montres

### 3. Frontend
- [ ] Frontend démarre sans erreur (port 4200)
- [ ] Page d'accueil s'affiche
- [ ] Catalogue des montres visible
- [ ] Inscription fonctionne
- [ ] Connexion fonctionne et redirige
- [ ] Panier fonctionne (ajout/suppression)
- [ ] Création de commande fonctionne

### 4. Authentification
- [ ] Inscription crée un utilisateur
- [ ] Connexion génère un JWT valide
- [ ] JWT stocké dans localStorage
- [ ] Requêtes authentifiées incluent le token
- [ ] Déconnexion vide le localStorage

### 5. Admin
- [ ] Connexion avec compte ADMIN
- [ ] Dashboard admin accessible
- [ ] CRUD montres fonctionne
- [ ] Liste des commandes visible
- [ ] Mise à jour statut commande fonctionne

## 📝 Exemples de requêtes HTTP

### Inscription

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### Connexion

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### Récupérer les montres (avec pagination)

```bash
curl -X GET "http://localhost:8080/api/watches?page=0&size=10&brand=Rolex"
```

### Ajouter au panier (authentifié)

```bash
curl -X POST http://localhost:8080/api/cart/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_JWT_TOKEN" \
  -d '{
    "watchId": 1,
    "quantity": 2
  }'
```

##  Comptes par défaut

Après exécution de `data_sample.sql` :

- **Admin** : `admin@etimeshouse.com` / `admin123`
- **User** : `user@example.com` / `user123`

##  Support

Pour toute question ou problème, consulter la documentation ou créer une issue.

---

**Développé par CJVISION**


=======
# times-house
Site web de vente de montre 
>>>>>>> a04189487f507fe10e6051a31b72a3c04da6036c
