# testerNode

Herramienta para escanear posibles subdominios de un Dominio madre o Host, también realiza la prueba o test de status en cada método GET, POST, PUT, etc.

## Requisitos

1. Token API key VirusTotal

- Para obtener la API_KEY de VirusTotal, se debe crear una cuenta en la página oficial de VirusTotal, https://www.virustotal.com/gui/join-us
- Una vez creada la cuenta, se debe ingresar a la sección de API, https://www.virustotal.com/gui/user/[NICK]/apikey
- NICK = Nickname de la cuenta de VirusTotal
- Luego de pega la API_KEY en el apartado de configuración de TesterNode

---

## Instalación

- Simplemente descarga el ultimo Release conforme a tu sistema operativo.

## Compilacion manual

- Si desea compilar el proyecto manualmente, debe tener instalado lo siguiente

1. Nodejs v16.X
2. quasar-cli
3. git

- Una vez instalado lo anterior, proceda a clonar el repositorio y ejecutar el siguiente comando en la raiz del proyecto

```bash
git clone https://github.com/jjjjose/testerNode.git
cd testerNode
npm install
quasar build -m electron
```

- El ejecutable se encontrara en la carpeta dist/electron
- Recuerde que cada ejecutable es creado en el sistema operativo donde se compila, por lo que si desea compilar en Windows, debe hacerlo en Windows, si desea compilar en Linux, debe hacerlo en Linux, etc.

## Modo de uso Básico

### Scan de Subdominios

- escriba el host o dominio madre para buscar subdominios...

![scan](assets/img/escaner-subdominio.png)

### Test de status en métodos o verbos

- haga click al botón `ver Status`, antes debe buscar subdominios...

![scan](assets/img/ver-status.png)

## LICENSE

[MIT](LICENSE)
