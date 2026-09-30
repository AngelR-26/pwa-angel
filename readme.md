# Actividad Semana 5

Nombre completo: Angel Romero Barragán
Grupo: B
Fecha: 30/09/2026

## Respuestas

### 1. ¿Qué significa pending?

Significa que la operación fue creada y almacenada, pero todavía no ha sido enviada al servidor.

### 2. ¿Qué significa inFlight?

Significa que la aplicación está intentando enviar la operación al servidor y aún espera una respuesta.

### 3. ¿Qué significa failed?

Significa que ocurrió un error al intentar enviar la operación al servidor.

### 4. ¿Qué significa done?

Significa que el servidor confirmó que la operación fue procesada correctamente.

### 5. ¿Por qué una operación NO debe marcarse como done antes de recibir una respuesta exitosa del servidor?

Porque todavía no existe confirmación de que el servidor procesó correctamente la operación y podría ocurrir un error.

### 6. ¿Qué ocurriría si solamente utilizáramos let queue = [] y el usuario recargara la página?

Todas las operaciones se perderían porque la información solamente existiría en memoria.

### 7. ¿Para qué sirve operationId?

Sirve para identificar de manera única cada operación y evitar confusiones entre registros.

### 8. Explica con tus propias palabras este proceso

pending → inFlight → failed → pending → inFlight → done

Primero se crea la operación y queda pendiente. Luego se intenta enviar al servidor. Si ocurre un error cambia a failed. Después el usuario puede reintentarla para que vuelva a pending. Al sincronizar nuevamente pasa a inFlight y si el servidor responde correctamente termina en done.