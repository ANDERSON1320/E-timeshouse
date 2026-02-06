# Exemples de requêtes API

Ce document contient des exemples de requêtes HTTP pour tester l'API E-TimesHouse.

## Base URL
```
http://localhost:8080/api
```

## Authentification

### 1. Inscription
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

### 2. Connexion
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

**Réponse :**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "id": 1,
  "username": "testuser",
  "email": "test@example.com",
  "role": "USER"
}
```

## Montres

### 3. Liste des montres (avec pagination et filtres)
```bash
curl -X GET "http://localhost:8080/api/watches?page=0&size=10&brand=Rolex"
```

### 4. Détail d'une montre
```bash
curl -X GET http://localhost:8080/api/watches/1
```

### 5. Créer une montre (ADMIN uniquement)
```bash
curl -X POST http://localhost:8080/api/watches \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_JWT_TOKEN" \
  -d '{
    "name": "Nouvelle Montre",
    "description": "Description de la montre",
    "brand": "Rolex",
    "model": "Submariner",
    "price": 8500.00,
    "stockQuantity": 5,
    "categoryId": 1,
    "images": [
      {
        "imageUrl": "https://example.com/image.jpg",
        "isPrimary": true,
        "displayOrder": 1
      }
    ]
  }'
```

## Panier

### 6. Récupérer le panier
```bash
curl -X GET http://localhost:8080/api/cart \
  -H "Authorization: Bearer VOTRE_JWT_TOKEN"
```

### 7. Ajouter un article au panier
```bash
curl -X POST "http://localhost:8080/api/cart/items?watchId=1&quantity=2" \
  -H "Authorization: Bearer VOTRE_JWT_TOKEN"
```

### 8. Modifier la quantité d'un article
```bash
curl -X PUT "http://localhost:8080/api/cart/items/1?quantity=3" \
  -H "Authorization: Bearer VOTRE_JWT_TOKEN"
```

### 9. Retirer un article du panier
```bash
curl -X DELETE http://localhost:8080/api/cart/items/1 \
  -H "Authorization: Bearer VOTRE_JWT_TOKEN"
```

## Commandes

### 10. Créer une commande
```bash
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_JWT_TOKEN" \
  -d '{
    "shippingAddress": "123 Main Street",
    "shippingCity": "Paris",
    "shippingPostalCode": "75001",
    "shippingCountry": "France"
  }'
```

### 11. Liste des commandes de l'utilisateur
```bash
curl -X GET "http://localhost:8080/api/orders?page=0&size=10" \
  -H "Authorization: Bearer VOTRE_JWT_TOKEN"
```

### 12. Détail d'une commande
```bash
curl -X GET http://localhost:8080/api/orders/1 \
  -H "Authorization: Bearer VOTRE_JWT_TOKEN"
```

## Utilisateurs

### 13. Profil utilisateur
```bash
curl -X GET http://localhost:8080/api/users/profile \
  -H "Authorization: Bearer VOTRE_JWT_TOKEN"
```

### 14. Mettre à jour le profil
```bash
curl -X PUT http://localhost:8080/api/users/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_JWT_TOKEN" \
  -d '{
    "firstName": "Nouveau",
    "lastName": "Nom",
    "email": "nouveau@example.com"
  }'
```

## Admin

### 15. Liste des utilisateurs (ADMIN uniquement)
```bash
curl -X GET http://localhost:8080/api/admin/users \
  -H "Authorization: Bearer VOTRE_JWT_TOKEN_ADMIN"
```

### 16. Liste de toutes les commandes (ADMIN uniquement)
```bash
curl -X GET "http://localhost:8080/api/admin/orders?page=0&size=20" \
  -H "Authorization: Bearer VOTRE_JWT_TOKEN_ADMIN"
```

### 17. Mettre à jour le statut d'une commande (ADMIN uniquement)
```bash
curl -X PUT "http://localhost:8080/api/admin/orders/1/status?status=SHIPPED" \
  -H "Authorization: Bearer VOTRE_JWT_TOKEN_ADMIN"
```

## Catégories

### 18. Liste des catégories
```bash
curl -X GET http://localhost:8080/api/categories
```

## Notes

- Remplacez `VOTRE_JWT_TOKEN` par le token obtenu lors de la connexion
- Pour les comptes admin, utilisez les identifiants : `admin@etimeshouse.com` / `admin123`
- Les endpoints protégés nécessitent le header `Authorization: Bearer <token>`


