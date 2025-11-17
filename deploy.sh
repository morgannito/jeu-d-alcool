#!/bin/bash

# Script de déploiement Docker pour jeu-d-alcool
# Usage: ./deploy.sh [start|stop|restart|logs|status|rebuild]

set -e

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🍻 Jeux de Soirée - Docker Deploy Script${NC}"
echo ""

case "${1:-start}" in
  start)
    echo -e "${GREEN}▶️  Démarrage de l'application...${NC}"
    docker-compose up -d
    echo ""
    echo -e "${GREEN}✅ Application démarrée !${NC}"
    echo -e "   Accès : ${YELLOW}http://localhost:8080${NC}"
    echo ""
    echo -e "Vérification du statut dans 5 secondes..."
    sleep 5
    docker-compose ps
    echo ""
    echo -e "Pour voir les logs : ${YELLOW}./deploy.sh logs${NC}"
    ;;

  stop)
    echo -e "${RED}⏹️  Arrêt de l'application...${NC}"
    docker-compose down
    echo -e "${GREEN}✅ Application arrêtée${NC}"
    ;;

  restart)
    echo -e "${YELLOW}🔄 Redémarrage de l'application...${NC}"
    docker-compose restart
    echo -e "${GREEN}✅ Application redémarrée${NC}"
    ;;

  logs)
    echo -e "${GREEN}📋 Affichage des logs (Ctrl+C pour quitter)${NC}"
    docker-compose logs -f
    ;;

  status)
    echo -e "${GREEN}📊 Statut de l'application${NC}"
    echo ""
    docker-compose ps
    echo ""
    echo -e "${GREEN}🏥 Healthcheck status:${NC}"
    docker inspect jeu-alcool-app --format='{{.State.Health.Status}}' 2>/dev/null || echo "Container non démarré"
    ;;

  rebuild)
    echo -e "${YELLOW}🔨 Reconstruction de l'image...${NC}"
    docker-compose down
    docker-compose build --no-cache
    docker-compose up -d
    echo -e "${GREEN}✅ Application reconstruite et démarrée${NC}"
    echo -e "   Accès : ${YELLOW}http://localhost:8080${NC}"
    ;;

  clean)
    echo -e "${RED}🧹 Nettoyage complet...${NC}"
    docker-compose down -v
    docker system prune -f
    echo -e "${GREEN}✅ Nettoyage terminé${NC}"
    ;;

  *)
    echo -e "${RED}❌ Commande inconnue : $1${NC}"
    echo ""
    echo "Usage: ./deploy.sh [command]"
    echo ""
    echo "Commandes disponibles:"
    echo "  start    - Démarre l'application (défaut)"
    echo "  stop     - Arrête l'application"
    echo "  restart  - Redémarre l'application"
    echo "  logs     - Affiche les logs en temps réel"
    echo "  status   - Affiche le statut"
    echo "  rebuild  - Reconstruit et redémarre"
    echo "  clean    - Nettoie tout"
    exit 1
    ;;
esac
