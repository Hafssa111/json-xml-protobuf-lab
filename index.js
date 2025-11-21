const fs = require('fs');
const convert = require('xml-js');
const protobuf = require('protobufjs');

// Charger la définition Protobuf
const root = protobuf.loadSync('employee.proto');
const EmployeeList = root.lookupType('Employees');

// Création d'une liste d'employés avec plus de détails
const employees = [];

employees.push({
  id: 1,
  name: 'Ali',
  salary: 9000,
  email: 'ali@example.com',
  hire_date: '2020-01-15',
  department: 'IT',
  is_active: true,
  skills: ['JavaScript', 'Node.js']
});

employees.push({
  id: 2,
  name: 'Kamal',
  salary: 22000,
  email: 'kamal@example.com',
  hire_date: '2019-05-10',
  department: 'HR',
  is_active: true,
  skills: ['Recruitment', 'Training']
});

employees.push({
  id: 3,
  name: 'Amal',
  salary: 23000,
  email: 'amal@example.com',
  hire_date: '2021-03-22',
  department: 'Finance',
  is_active: false,
  skills: ['Accounting', 'Taxation']
});
// Fonction pour formater la date au format ISO
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}

// Création de l'objet racine
const jsonObject = { employee: employees };

// Sérialisation en JSON avec indentation
const jsonData = JSON.stringify(jsonObject, null, 2);
fs.writeFileSync('employees.json', jsonData);

// Options pour la conversion JSON -> XML
const options = {
  compact: true,
  ignoreComment: true,
  spaces: 2
};

// Conversion en XML
const xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" + 
  convert.json2xml(jsonObject, options);
fs.writeFileSync('employees.xml', xmlData);

// Vérification et encodage Protobuf
const errMsg = EmployeeList.verify(jsonObject);
if (errMsg) throw Error(errMsg);

const message = EmployeeList.create(jsonObject);
const buffer = EmployeeList.encode(message).finish();
fs.writeFileSync('employees.pb', buffer);

// Fonction pour décoder et afficher le contenu d'un fichier .pb
function decodeProtoFile(filename) {
  const data = fs.readFileSync(filename);
  const decoded = EmployeeList.decode(data);
  return EmployeeList.toObject(decoded, {
    longs: String,
    enums: String,
    bytes: String,
  });
}

// Écriture des fichiers de sortie
fs.writeFileSync('data.json', jsonData);
fs.writeFileSync('data.xml', xmlData);
fs.writeFileSync('data.proto', buffer);

// Comparaison des tailles
const jsonFileSize = fs.statSync('data.json').size;
const xmlFileSize = fs.statSync('data.xml').size;
const protoFileSize = fs.statSync('data.proto').size;
console.log('=== Tailles des fichiers ===');
console.log(`Taille de 'data.json' : ${jsonFileSize} octets`);
console.log(`Taille de 'data.xml'  : ${xmlFileSize} octets`);
console.log(`Taille de 'data.proto': ${protoFileSize} octets`);


console.log('\n=== Décodage du fichier .pb ===');
console.log(JSON.stringify(decodeProtoFile('data.proto'), null, 2));
