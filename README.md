# 🎓 Application de Gestion de Notes Universitaires

Une application full-stack moderne pour gérer les étudiants et leurs notes, déployée sur Google Kubernetes Engine (GKE) avec CI/CD automatisé.

## 🌟 Fonctionnalités

- ✅ **CRUD complet** : Créer, Lire, Mettre à jour, Supprimer des étudiants
- 📊 **Statistiques en temps réel** : Moyenne générale, taux de réussite
- 🎨 **Interface moderne** : Design responsive avec Tailwind CSS
- 🔄 **CI/CD automatisé** : Déploiement continu avec GitHub Actions
- ☸️ **Scalable** : Déployé sur Kubernetes (GKE)
- 🐘 **Base de données robuste** : PostgreSQL avec UUID

## 🛠️ Technologies Utilisées

### Backend
- **Node.js** avec Express.js
- **PostgreSQL** (base de données)
- **UUID** pour les identifiants
- **Architecture MVC**

### Frontend
- **React** (avec Vite)
- **Tailwind CSS 3.4.17**
- **Axios** pour les requêtes HTTP
- **Lucide React** pour les icônes

### DevOps
- **Docker** pour la conteneurisation
- **Kubernetes (GKE)** pour l'orchestration
- **GitHub Actions** pour CI/CD
- **Google Container Registry** pour les images

## 📁 Structure du Projet

```
university-notes-app/
├── backend/                 # API Express.js
│   ├── src/
│   │   ├── config/         # Configuration base de données
│   │   ├── controllers/    # Logique métier
│   │   ├── models/         # Modèles de données
│   │   ├── routes/         # Routes API
│   │   ├── app.js          # Configuration Express
│   │   └── server.js       # Point d'entrée
│   ├── Dockerfile
│   └── package.json
│
├── frontend/               # Application React
│   ├── src/
│   │   ├── components/    # Composants React
│   │   ├── services/      # Services API
│   │   ├── App.jsx        # Composant principal
│   │   └── main.jsx       # Point d'entrée
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── k8s/                    # Configurations Kubernetes
│   ├── namespace.yaml
│   ├── postgres-secret.yaml
│   ├── postgres-pv.yaml
│   ├── postgres-deployment.yaml
│   ├── backend-configmap.yaml
│   ├── backend-deployment.yaml
│   └── frontend-deployment.yaml
│
├── .github/
│   └── workflows/
│       └── deploy.yml      # Pipeline CI/CD
│
├── docker-compose.yml      # Pour développement local
├── GUIDE_DEPLOIEMENT.md   # Guide complet de déploiement
└── README.md
```

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL (pour dev local)

### Installation Locale

1. **Cloner le repository**
```bash
git clone https://github.com/VOTRE_USERNAME/university-notes-app.git
cd university-notes-app
```

2. **Configuration Backend**
```bash
cd backend
npm install
cp .env.example .env
# Éditez .env avec vos valeurs
npm run dev
```

3. **Configuration Frontend**
```bash
cd frontend
npm install
cp .env.example .env
# Éditez .env
npm run dev
```

4. **Avec Docker Compose (Recommandé)**
```bash
docker-compose up --build
```

Accédez à l'application : http://localhost:8080

## 📡 API Endpoints

### Students
- `GET /api/students` - Récupérer tous les étudiants
- `GET /api/students/:id` - Récupérer un étudiant
- `POST /api/students` - Créer un étudiant
- `PUT /api/students/:id` - Mettre à jour un étudiant
- `DELETE /api/students/:id` - Supprimer un étudiant

### Health Check
- `GET /health` - Vérifier l'état de l'API

### Exemple de Requête

```bash
# Créer un étudiant
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Jean",
    "last_name": "Dupont",
    "student_number": "ETU001",
    "email": "jean.dupont@university.com",
    "grade": 15.5
  }'

# Récupérer tous les étudiants
curl http://localhost:5000/api/students
```

## ☸️ Déploiement sur GKE

Consultez le [Guide de Déploiement Complet](GUIDE_DEPLOIEMENT.md) pour :
- Configuration GCP
- Création du cluster GKE
- Configuration GitHub Actions
- Déploiement automatisé

### Déploiement Rapide (si GKE configuré)

```bash
# Construire et pousser les images
./scripts/build-and-push.sh

# Déployer sur Kubernetes
kubectl apply -f k8s/

# Obtenir l'URL
kubectl get service frontend-service -n university-notes
```

## 🔧 Développement

### Scripts disponibles

**Backend:**
```bash
npm run dev      # Développement avec nodemon
npm start        # Production
```

**Frontend:**
```bash
npm run dev      # Serveur de développement
npm run build    # Build pour production
npm run preview  # Preview du build
```

### Structure de la Base de Données

```sql
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  student_number VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  grade DECIMAL(5,2) CHECK (grade >= 0 AND grade <= 20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🧪 Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📊 Monitoring

```bash
# Voir les pods
kubectl get pods -n university-notes

# Logs backend
kubectl logs -f deployment/backend -n university-notes

# Logs frontend
kubectl logs -f deployment/frontend -n university-notes

# Métriques
kubectl top pods -n university-notes
```

## 🔐 Sécurité

- ✅ Variables d'environnement pour les secrets
- ✅ Validation des données côté backend
- ✅ Protection contre les injections SQL (requêtes paramétrées)
- ✅ CORS configuré
- ✅ Service Account avec permissions minimales
- ✅ Secrets Kubernetes pour données sensibles

## 🤝 Contribution

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Roadmap

- [ ] Authentification utilisateurs
- [ ] Gestion des cours
- [ ] Export des notes en PDF
- [ ] Dashboard analytique avancé
- [ ] API GraphQL
- [ ] Tests unitaires et d'intégration
- [ ] Monitoring avec Prometheus/Grafana
- [ ] Backup automatique de la base de données

## 🐛 Problèmes Connus

Consultez les [Issues](https://github.com/VOTRE_USERNAME/university-notes-app/issues) pour les problèmes connus et en cours de résolution.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 Auteurs

- **Votre Nom** - *Développement initial* - [YourGitHub](https://github.com/VOTRE_USERNAME)

## 🙏 Remerciements

- Anthropic Claude pour l'assistance au développement
- La communauté open source
- Google Cloud Platform pour les crédits Free Trial

## 📞 Contact

Pour toute question ou suggestion :
- Email: votre.email@example.com
- GitHub Issues: [Créer une issue](https://github.com/VOTRE_USERNAME/university-notes-app/issues)

---

⭐ **N'oubliez pas de donner une étoile au projet si vous l'avez trouvé utile !**