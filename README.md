# Lab JSON/XML/Protobuf

Ce projet démontre la sérialisation de données dans différents formats : JSON, XML et Protocol Buffers.

## Fonctionnalités

- Sérialisation d'objets JavaScript en JSON, XML et Protobuf
- Comparaison des tailles des fichiers générés
- Décodage des fichiers Protobuf
- Structure de données complexe avec différents types de champs

## Prérequis

- Node.js (v14 ou supérieur)
- npm (inclus avec Node.js)

## Installation

```bash
# Installer les dépendances
npm install
```

## Utilisation

```bash
# Générer les fichiers de sortie
node index.js
```

## Structure du projet

- `index.js` - Point d'entrée de l'application
- `employee.proto` - Définition du schéma Protobuf
- `employees.json` - Données sérialisées en JSON
- `employees.xml` - Données sérialisées en XML
- `employees.pb` - Données sérialisées en Protobuf

## Comparaison des tailles

Exemple de sortie :
```
=== Tailles des fichiers ===
Taille de 'data.json' : 1024 octets
Taille de 'data.xml'  : 2048 octets
Taille de 'data.proto': 512 octets
```

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus d'informations.
