# Utilise nginx alpine pour un container léger
FROM nginx:alpine

# Labels pour la documentation
LABEL maintainer="jeu-alcool"
LABEL description="Application de jeux de soirée avec 11 000+ défis"

# Copie tous les fichiers de l'application dans le répertoire nginx
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/
COPY effects.js /usr/share/nginx/html/
COPY games-data.js /usr/share/nginx/html/
COPY games-data-extended.js /usr/share/nginx/html/
COPY README.md /usr/share/nginx/html/

# Expose le port 80
EXPOSE 80

# Healthcheck pour vérifier que nginx fonctionne
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Démarre nginx en mode foreground
CMD ["nginx", "-g", "daemon off;"]
