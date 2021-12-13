Projet 7 du parcours Développeur Web
Jordan LESUR - OpenClassrooms

Instructions pour l'installation :

- Base de données

Créer une nouvelle base de données mysql "groupomania"
Depuis l'emplacement du fichier groupomania.sql, utilisez :
mysql -u username -p password groupomania < "C:\groupomania.sql"
ou importer groupomania.sql dans votre gestionnaire de bases de données SQL

Un compte administrateur est automatiquement créé pour l'environnement de test.
Identifiant : admin
Mot de passe : admin

Pour donner les droits administrateur à un compte, la clé "role" dans la base de données doit avoir la valeur "1".

- Frontend

cd frontend
npm install
npm start

Le frontend est sur le port 8080

- Backend

cd backend
npm install
npm start

Le backend est sur le port 3000


Pour accéder à l'application, rendez-vous sur http://localhost:8080/
