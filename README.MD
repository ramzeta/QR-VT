
# React Native QR Code Scanner con VirusTotal

Este proyecto es una aplicación de escaneo de códigos QR desarrollada en React Native. Incorpora una funcionalidad para escanear URLs desde códigos QR y verificarlas utilizando la API de VirusTotal para detectar contenido malicioso.

## Características

- Escaneo de códigos QR utilizando la cámara del dispositivo.
- Integración con la API de VirusTotal para analizar las URLs escaneadas.
- Diseño responsive y amigable para el usuario.

## Requisitos Previos

- Node.js
- React Native
- Expo CLI
- Cuenta en VirusTotal y una clave API

## Configuración

1. Clonar el repositorio:
   ```
   git clone [URL_DEL_REPOSITORIO]
   ```
2. Instalar dependencias:
   ```
   npm install
   ```
3. Configurar la clave API de VirusTotal:
   - Crea un archivo `.env` en la raíz del proyecto.
   - Añade tu clave API de VirusTotal como `VIRUSTOTAL_API_KEY=TU_CLAVE_API`.

## Ejecución

Para iniciar la aplicación en modo de desarrollo, ejecuta:

```
expo start
```

Esto abrirá una nueva ventana en tu navegador con el Expo Developer Tools. Desde allí, puedes ejecutar la aplicación en un emulador iOS o Android, o en tu dispositivo físico.

## Uso

- Abre la aplicación y concede permisos para acceder a la cámara.
- Escanea un código QR que contenga una URL.
- La aplicación mostrará el resultado del escaneo y, si la URL es válida, verificará su seguridad con VirusTotal.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, lee el archivo `CONTRIBUTING.md` para más detalles.

## Licencia

Este proyecto está licenciado bajo [LICENCIA] - ver el archivo `LICENSE.md` para más detalles.

Descargar: https://expo.dev/artifacts/eas/6znqB3imG2JLZx614njGMA.aab