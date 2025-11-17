# 🐳 Guide Docker - Jeux de Soirée

## 🚀 Démarrage Rapide

### Méthode 1 : Avec le script deploy.sh (Recommandé)

```bash
# Rendre le script exécutable (une seule fois)
chmod +x deploy.sh

# Démarrer l'application
./deploy.sh start

# Voir les logs
./deploy.sh logs

# Voir le statut
./deploy.sh status

# Arrêter
./deploy.sh stop
```

### Méthode 2 : Avec docker-compose

```bash
# Démarrer
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter
docker-compose down
```

## 🔍 Diagnostic des Problèmes de Timeout

### Problème : Timeout lors du déploiement

#### Symptômes
- Le container met trop de temps à démarrer
- Message d'erreur de timeout
- L'application n'est pas accessible

#### Solutions

**1. Vérifier que le container démarre correctement**
```bash
docker-compose ps
```

**2. Vérifier les logs en temps réel**
```bash
docker-compose logs -f jeu-alcool
```

**3. Vérifier le healthcheck**
```bash
docker inspect jeu-alcool-app --format='{{.State.Health.Status}}'
```

Status possibles :
- `healthy` ✅ - Tout fonctionne
- `unhealthy` ❌ - Problème détecté
- `starting` ⏳ - En cours de démarrage

**4. Tester l'accès direct au container**
```bash
# Obtenir l'IP du container
docker inspect jeu-alcool-app --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'

# Tester avec curl (remplacer IP)
curl http://172.x.x.x/
```

**5. Vérifier que le port n'est pas déjà utilisé**
```bash
# Linux/Mac
lsof -i :8080

# Windows
netstat -ano | findstr :8080
```

Si le port est occupé, modifier dans `docker-compose.yml` :
```yaml
ports:
  - "8081:80"  # Utiliser 8081 au lieu de 8080
```

### Problème : Container démarre mais page blanche

**1. Vérifier que les fichiers sont bien copiés**
```bash
docker exec jeu-alcool-app ls -la /usr/share/nginx/html/
```

Vous devriez voir :
- index.html
- style.css
- app.js
- effects.js
- games-data.js
- games-data-extended.js

**2. Vérifier les logs nginx**
```bash
docker exec jeu-alcool-app cat /var/log/nginx/error.log
```

### Problème : Erreur de build

**1. Nettoyer et rebuilder**
```bash
# Avec le script
./deploy.sh rebuild

# Ou manuellement
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

**2. Vérifier l'espace disque**
```bash
docker system df
```

**3. Nettoyer l'espace Docker**
```bash
docker system prune -a
```

## 📊 Commandes Utiles

### Gestion du Container

```bash
# Démarrer
docker-compose up -d

# Arrêter
docker-compose down

# Redémarrer
docker-compose restart

# Voir les logs
docker-compose logs -f

# Voir le statut
docker-compose ps

# Entrer dans le container
docker exec -it jeu-alcool-app sh

# Voir l'utilisation des ressources
docker stats jeu-alcool-app
```

### Debugging

```bash
# Inspecter le container
docker inspect jeu-alcool-app

# Voir les processus dans le container
docker top jeu-alcool-app

# Copier un fichier depuis le container
docker cp jeu-alcool-app:/usr/share/nginx/html/index.html ./test.html

# Tester nginx manuellement
docker exec jeu-alcool-app nginx -t
```

### Nettoyage

```bash
# Supprimer le container
docker-compose down

# Supprimer le container et les volumes
docker-compose down -v

# Supprimer l'image
docker rmi jeu-d-alcool

# Nettoyer tout Docker
docker system prune -a --volumes
```

## 🔧 Configuration Avancée

### Changer le port

Éditez `docker-compose.yml` :
```yaml
ports:
  - "NOUVEAU_PORT:80"  # Ex: "3000:80"
```

### Ajouter des variables d'environnement

```yaml
services:
  jeu-alcool:
    environment:
      - TZ=Europe/Paris
      - NGINX_WORKER_PROCESSES=auto
```

### Limiter les ressources

```yaml
services:
  jeu-alcool:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 256M
        reservations:
          memory: 128M
```

### Utiliser un volume pour le développement

```yaml
services:
  jeu-alcool:
    volumes:
      - ./:/usr/share/nginx/html/:ro
```

## 🏥 Healthcheck

Le healthcheck vérifie automatiquement que l'application fonctionne :

- **Interval** : Vérifie toutes les 30 secondes
- **Timeout** : 5 secondes max pour répondre
- **Start period** : 10 secondes avant les premiers checks
- **Retries** : 3 tentatives avant de marquer comme unhealthy

Commande de check :
```bash
wget --no-verbose --tries=1 --spider http://localhost/
```

## 📱 Accès à l'Application

Une fois démarré :
- **URL locale** : http://localhost:8080
- **URL réseau** : http://VOTRE_IP:8080

Pour trouver votre IP :
```bash
# Linux/Mac
ifconfig | grep "inet "

# Windows
ipconfig
```

## 🚨 Problèmes Courants

### "Cannot connect to Docker daemon"
→ Docker n'est pas démarré
```bash
# Linux
sudo systemctl start docker

# Mac/Windows
Démarrer Docker Desktop
```

### "Port already in use"
→ Le port 8080 est déjà utilisé
```bash
# Changer le port dans docker-compose.yml
ports:
  - "8081:80"
```

### "No space left on device"
→ Plus d'espace disque
```bash
docker system prune -a --volumes
```

### "Container exits immediately"
→ Voir les logs pour diagnostiquer
```bash
docker-compose logs jeu-alcool
```

## 📞 Support

Si les problèmes persistent :

1. Vérifiez les logs : `./deploy.sh logs`
2. Vérifiez le statut : `./deploy.sh status`
3. Essayez un rebuild : `./deploy.sh rebuild`
4. Nettoyez et recommencez : `./deploy.sh clean` puis `./deploy.sh start`

## ✅ Checklist de Vérification

- [ ] Docker est installé et démarré
- [ ] Le port 8080 est libre
- [ ] Les fichiers sources sont présents
- [ ] Le container démarre (`docker-compose ps`)
- [ ] Le healthcheck est OK (`healthy`)
- [ ] L'application est accessible (http://localhost:8080)
- [ ] Les logs ne montrent pas d'erreur
