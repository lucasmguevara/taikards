# TAIKARDS

Sitio independiente del proyecto principal. Incluye el álbum de 48 cartas, búsqueda por nombre sin distinguir tildes, filtros combinados, orden alfabético, descubrimiento al azar y una página HTML por criatura, con imagen ampliable, historia infantil, naturaleza y tipo.

## Abrir

Abrir `index.html` directamente funciona. Para una vista local servida:

```powershell
cd 'D:\Karate Do Miyazato\Contenido para Redes\2026\Taikai\Pagina\_Yokai'
npm start
```

Visitar http://localhost:5188. Se puede configurar otro puerto con la variable `PORT`.

## Editar

- `instructions.mjs`: guía de juego y acceso ilustrado de la portada. Transcripción adaptada de las dos hojas existentes en `Pagina_Yokai/taikards1.png` y `taikards2.png`, y del texto de la guía de legendarias. Incluye preparación, victoria a 2 puntos, combate, elementos, campos, desafíos y partidas más largas.
- `guide.css`: diseño de instrucciones con texto legible en celulares; `assets/instrucciones/` contiene copias WebP de las dos láminas y sus miniaturas.

- `data.mjs`: nombres, clasificación, relatos y consignas.
- `styles.css`: estructura adaptable a celulares y escritorio.
- `kids.css`: tema de libro de leyendas, diseñado primero para celulares: pergamino mediante CSS y SVG, tintas cálidas, letras claras, controles de al menos 48 px y relatos de 18 px. Conserva los colores por naturaleza y amplía la distribución en pantallas grandes con consultas `min-width`.
- `app.js`: búsqueda, filtros persistidos en URL, orden, selección al azar y ampliación accesible con Escape.
- `scripts/build.mjs`: genera inicio y 48 fichas usando las imágenes optimizadas del repositorio, sin dependencias externas. Solo para importar imágenes nuevas se necesita instalar `sharp` como dependencia de desarrollo y configurar `TAIKARDS_CARDS` con la ubicación de los originales.
- `assets/cards`: imágenes optimizadas propias del sitio; los originales permanecen intactos.
- `logo_taikards.png`: original vigente del logo, con letras verdes y amarillas alternadas. `assets/logo_taikards.png` es su copia pública; las versiones WebP de 360 y 1000 px se usan en encabezado, pie y portada. Al reemplazar el original, regenerar esas dos versiones conservando la proporción.

Ejecutar `npm run build` después de cambiar datos o plantillas; `npm run check` verifica clasificación, páginas y enlaces. Para cambiar las imágenes de origen se puede configurar `TAIKARDS_CARDS`; borrar únicamente las copias WebP que se desee regenerar (el generador conserva las existentes).

Las páginas generadas no necesitan React, Next, base de datos ni servicios externos. Las fuentes de Google son opcionales y tienen alternativas locales. Para publicar basta con servir `index.html`, `styles.css`, `kids.css`, `app.js`, `assets/` y `yokai/` respetando las rutas.

## Publicación en Vercel

`vercel.json` configura un sitio estático con Node 22. `npm run build` regenera y verifica las 49 páginas, y copia únicamente los archivos públicos a `dist/`. La compilación funciona desde un clon limpio sin las carpetas de imágenes originales de la PC. El repositorio conectado es `lucasmguevara/taikards` y la rama de producción es `main`.

Los perfiles y capturas de `review/`, las variables locales, `node_modules/` y `.vercel/` se excluyen del repositorio y de la subida. La salida pública tampoco incluye los scripts de trabajo.

## Criterio editorial

Los textos se basan en las 48 cartas entregadas y se presentan explícitamente como adaptaciones infantiles del juego. No son traducciones de Yokai.com. Los relatos del dojo, las variantes Shisa y Tatarigami se describen como versiones del universo TAIKARDS. La clasificación provista tiene prioridad: Shisa Verde y Tameshisawari Verde son Defensa aunque sus ilustraciones tienen un ícono de ataque. Los números son identificadores de este álbum, no números impresos oficiales.

Yokai.com fue la referencia conceptual de enciclopedia de criaturas; su página devolvió HTTP 403 al intentar consultarla. No se copiaron sus textos ni ilustraciones. Las cartas de efectos y legendarias y otras mitologías se anuncian como próximas, sin enlaces vacíos ni fichas inventadas.
