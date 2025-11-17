# Utilise nginx alpine pour un container léger
FROM nginx:alpine

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

# Démarre nginx
CMD ["nginx", "-g", "daemon off;"]
