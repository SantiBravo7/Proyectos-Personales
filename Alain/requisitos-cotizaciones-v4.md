# Requisitos: generador de cotizaciones en PDF

## Objetivo

Crear una página web que funcione **offline** (sin servidor, sin conexión a internet) y que genere un **archivo PDF** de cotización, tomando como base el PDF de referencia (cotización 000150 de JT Climatización & Electricidad), con las modificaciones detalladas abajo.

## Uso previsto

- La página se abre **siempre desde un teléfono / dispositivo móvil**. El diseño y la interacción (formulario, botones, vista previa) tienen que estar pensados para pantalla chica y uso táctil, no para escritorio.
- Flujo de uso:
  1. El usuario abre la página en su teléfono.
  2. Completa los datos: fecha, nombre del cliente, ítems y observaciones. El número de cotización aparece cargado automáticamente.
  3. Toca el botón de **vista previa** para ver cómo va a quedar el documento.
  4. Toca el botón para generar el PDF.
  5. El PDF se genera en el mismo teléfono y se descarga en los archivos del dispositivo.
  6. Desde el mismo paso puede **compartir el PDF por WhatsApp** (ver sección "Compartir por WhatsApp").
  7. Al generar el PDF, el número de cotización avanza en uno para la próxima.

## Funcionamiento general

- Un único archivo HTML que se abre directamente en el navegador del teléfono, sin instalar nada ni depender de un servidor.
- Todo el código, estilos, el logo y los íconos deben ir incluidos en el propio archivo. No usar recursos que se descarguen de internet (fuentes, librerías, imágenes), para que funcione sin conexión.
- La generación del PDF ocurre íntegramente en el dispositivo.
- Botón de **vista previa**: antes de descargar, el usuario puede ver cómo va a quedar el documento con los datos cargados, sin generar todavía el PDF final.

## Compartir por WhatsApp

- Al generar el PDF, el usuario puede **enviarlo por WhatsApp** usando la función de compartir del propio teléfono, la misma que se usa para mandar una foto.
- Se implementa con el menú de compartir del navegador (Web Share API con archivos): abre la hoja de compartir del teléfono con el PDF adjunto y el usuario elige WhatsApp y el contacto.
- Botón **Compartir** junto al de descargar, y también disponible en la vista previa. Descargar y compartir son acciones separadas: descargar siempre guarda el archivo en el teléfono.
- Nombre del archivo: `Cotizacion-<número>.pdf`, igual en la descarga y en el envío.
- Limitación a tener en cuenta: el navegador no permite forzar que se abra WhatsApp directo, solo abrir el menú de compartir donde el usuario elige la aplicación. Si el navegador no soporta compartir archivos, el botón se oculta o avisa, y queda disponible la descarga.
- Dato a verificar en el teléfono real: que el menú de compartir funcione con la página abierta como archivo local, porque algunos navegadores solo lo habilitan en páginas servidas de forma segura.

## Número de cotización automático

- El número se **guarda en el teléfono** y aumenta en **uno** automáticamente cada vez que se hace una cotización nueva.
- Formato con ceros a la izquierda, como en el original (`000150`, `000151`, etc.).
- El campo sigue siendo **editable**: el usuario puede corregir el número a mano, y desde ese valor continúa la cuenta.
- Dato a verificar en el teléfono real: que el número guardado se conserve al cerrar y volver a abrir el archivo local, porque algunos navegadores móviles no persisten datos de archivos abiertos desde el almacenamiento.

## Datos que carga el usuario

1. Número de cotización (se propone solo, editable; ejemplo del original: `000150`).
2. Fecha (ejemplo del original: `29/09/2026`).
3. Nombre del cliente.
4. Ítems, con la posibilidad de agregar y quitar filas. Cada ítem tiene:
   - Descripción.
   - Cantidad.
   - Precio unitario.
5. Observaciones (texto libre).

## Datos fijos del emisor

- Nombre: jtclimatizacion & electricidad
- Teléfono: 1162507088, escrito de forma prolija en el documento (`11 6250-7088`) y con la etiqueta **Tel:** adelante.
- Email: jtclimatizacion@gmail.com, con la etiqueta **Mail:** adelante.
- Zona: Capital
- Logo: el usuario entregará el archivo del logo actualizado, que reemplaza al del PDF de referencia.

## Cálculos

- Importe de cada línea = cantidad × precio unitario. Si la cantidad es 1, el importe es igual al precio unitario.
- Total general = suma de los importes de todas las líneas.
- Formato de montos: `$ 280.000,00` (punto para miles, coma para decimales).

## Diseño

- Fondo blanco.
- El diseño original se percibe antiguo. Debe verse con más vida y resultar más atractivo, pero sin llegar a ser ultramoderno ni recargado.
- Mantener la estructura general y los elementos del original (logo, datos del emisor, cliente, detalle, total, observaciones).
- Logo con la misma presencia y ubicación que en el original, pero con el archivo nuevo.
- No incluir la marca "CamScanner" del ejemplo, que proviene del escaneo.
- Pensado para mobile: tipografía legible en pantalla chica, botones y campos de formulario con tamaño cómodo para tocar con el dedo.
- Dirección visual aprobada en la muestra: colores del logo (azul y rojo) como acento, franja de color arriba, bloques con fondo suave para cliente y observaciones, barra azul para el total.

## Distribución del encabezado

- Logo y datos del emisor a la izquierda.
- Número de cotización y fecha arriba a la derecha.
- Nombre del cliente debajo de los datos del emisor.

## Sección de ítems

Cada ítem ocupa una fila y las filas se apilan una debajo de la otra.

| Columna | Posición |
|---|---|
| Descripción | A la izquierda |
| Cantidad | Un poco más hacia la derecha que la descripción (se muestra tanto si hay uno como si hay varios) |
| Importe de la línea (cantidad × precio unitario) | Pegado al margen derecho |

- Debajo de cada descripción se muestra el **precio unitario** en letra chica y gris (`PU $ 280.000,00`). Esto quedó aprobado.
- Al final de la lista, con más espacio de separación, va el **Total**: la suma de toda la columna de importes.

## Observaciones

- Deben tener **más visibilidad** que en el original. En el PDF de referencia quedan al pie de la página y se pierden, por lo que el cliente puede no leerlas.
- No ubicarlas como nota al pie. Van en un bloque destacado (fondo suave, franja roja, título en rojo) cerca del total, para que el cliente las lea y quede informado.

## Pie de página (membrete)

- Al final de cada página, separado por una línea, con este contenido:
  - **WhatsApp**: el número, con el **logo oficial de WhatsApp**.
  - **Instagram**: el usuario, con el **logo oficial de Instagram**.
  - Una línea de **copyright** centrada, con el año y el nombre del negocio (ejemplo: `© 2026 jtclimatizacion & electricidad · Todos los derechos reservados`).
- Los logos de WhatsApp e Instagram tienen que ser los **originales**, no íconos genéricos ni dibujados a mano. Deben ir incluidos dentro del archivo (SVG o imagen embebida), sin descargarse de internet.
- El WhatsApp y el Instagram del pie se cargan desde el formulario. Si el Instagram queda vacío, no se muestra.

## Pendiente de definir

- **Compartir por WhatsApp**: confirmar en el teléfono real que el menú de compartir se abre con el PDF adjunto.
- **Usuario de Instagram**: falta el dato real. En la muestra aparece un marcador (`@usuario_instagram`).
- **Número de WhatsApp**: en la muestra se usó el mismo del encabezado (`11 6250-7088`). Confirmar si es otro.
- **Forma de pago** (original: `Efectivo/transferencia`) y **período de validez** (original: `3 días`): en la muestra son campos editables con esos valores. Confirmar si se quedan así o pasan a ser texto fijo.
- **Logo nuevo del negocio**: el archivo todavía no fue entregado.
