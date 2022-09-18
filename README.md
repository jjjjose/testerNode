# testerNode

## Herramienta para escanear posibles subdominios de un Dominio madre o Host, también realiza la prueba o test de status en cada método GET, POST, PUT, etc.

**Requisitos**

1. GIT
2. NODEjs v16.17.X^
3. yarn
4. Quasar CLI
5. Token API key VirutTotal

---

## Instalacion

- clonar Repositorio, entrar en carpeta e instalar paquetes

```bash
git clone https://github.com/jjjjose/testerNode
cd testerNode
yarn allinstall
```

- construir BUILD

```bash
yarn build
```

- ejecutar el proyecto

```bash
yarn start
```

- entrar al proyecto en `http://localhost:3030`

## Variables de entorno

poner sus datos en el archivo archivo `.env`

```env
IP_PUBLIC="XXX.XXX.XXX.XXX" #si desea montar el proyecto en un VPS o server publico puede agregar su ip,
VIRUSTOTAL_API_KEY="XXXXXXX" #token de virus total
```

## Modo de uso

### Scan de Subdominios

- escriba el host o dominio madre para buscar subdominios

### Test de status en metodos

- haga click al boton `ver Status`

## LICENSE

[MIT](LICENSE)
