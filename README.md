# Endpoints de la API
 # Autenticación
        POST /api/users/register:   Registra un nuevo usuario.
        GET /api/users/find-user-email/:email     Busca usuario por correo.

 # Task
        GET /api/task/getAll?page=1&limit=5: Obtiene todas las tareas del usuario autenticado, paginadas.
        POST /api/task/create: Crea una nueva tarea.
        PUT /api/task/update/:id: Actualiza una tarea específica.
        DELETE /api/task/delete/:id: Elimina una tarea específica.
        POST /api/task/complete: Marca como completadas las tareas con los IDs proporcionados. 

# archivo .env
    Agregar el archivo .env en el directorio a la misma altura de src y le agregas las siguientes variables de entorno
    
SERVICE_ACCOUNT_PROJECT_ID=listtaskchallenge
    
SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCrzjYwileVeUNz\nfV59VPrKJ/2YT/bM4E3inSirR/8Cu2Pr8NSInk38eNVvXe+5ydQWegdCi9vbRgV4\ndgWmKpQj6fejgnDbriDU7msAieU9UWYggNeOIq3ZggxYAmglRKy3JlpZZxtcxZM9\n+5HWqc/oZp6WuX7+hvnElnGexopOUmqNX7JHPlsDqhtkB0rmFRjjfjyOsNsBYrSb\neQPKBsoGHWjic8+WFlwZlL1vslIkp2tYkRMTS7RFx7ghS0+KETActE2Kki+pmGnq\nClopDp3bYi3pxGkXL/4VMUllFD99ueiulX68DyDsd5cdwo1SXnKVnAkbTn2uzOh4\nWmX6Pj1nAgMBAAECggEABCRFe0SG8m+h0r/qLjjajuFCXTtKCihXdMRM6Fpd2xVW\nfv1D1e32l/2iLAM70lSmPeeVL6qAIY2od+GBX81VagQ6Ap3bZDIhNERxyCKK4Pk1\nQ543hdjhSLB/j+cjZSVFO0yfSEvLd2dnB9lheeAVcZAG28433ITwQLYy2seTKqN8\ncKUh8OcVQa2C6aRJ+ysVfLEZlgwJIAiE3v40y9z7qWOyU1aIjeKqKW9eqdfD6N/R\nrJFKLc1Yb9g7eu4PbiPj9hM6HB9CdH1iJjS3z94/vj+DI8NPEr6+FRV3o5lXXpSm\nxnXW/PxM/K930BEUsbudnp+25JBNSjnNKN9u5IaluQKBgQDx7aliSBCOCUGdmpVT\nXzaMtLk9mWRgHDtNuWbwQgo4r7Xo+y+M7OyHTAVlHMONRiZMMLbUdESIjKW6R9S6\n+/7TQh83ZXbp9U7CkeGq/xQ+DyWLfpTpRvtco6uBPIBfrhmczoIZ3pNpgzysQTJA\nTKPD7GB7qwdFdguHx0XBcjyRuwKBgQC1zGncup2P7dfJc4PaH8R2JWJg6Z8SqImv\nA7UsYjId6DKBe21TwDWLVIW7njXV0L09DUQviXI4ZztXvEyN7th/yY5XTJVokJNn\nIugHV854ooi1+wT7cEYRjAaJtakpAqDZ0cC8ksYGErgE4X770XL8puRY1vEhPClO\nitoYbh6CRQKBgQDMbEaxPjWG3zlrg+Bjt1Nvp5HTBBc1wwU1UtExeIwMhCSQ/haa\n3OOsG0d/vcNbT4gy3wLOGISEYVv0QJf3e9FCD2AzPfAyFs77R6tJAwrGuaO+8DHB\nv/HLwJy9sjLDJmiMAE8crt8ey/7ripd8j4XdmpGYTdbyEaIClBZUNEQL2wKBgQCM\nZCk0TeCzb2b+qPgfj/y1iDUqxf8T95cr0l8swUAWnGO0Xk6VKI+w4zrLImhMkAAz\nj3UiiK/uIrpPDJjJ2rLSLCKCBCA1OcC7Gte4I/TMcCfG8OxuB8v0bP/3hJP3mZIB\n49tFRMsrkXUOP91CNgLoXTFl8ccQdVco0k2OJCvnSQKBgQCpYoObtCip1PS9i5eK\nUx3agU3WjGwvlPXDkhVOS32m1WzHoSJsKLuB8imTpLGiYzIUc6X1fvXonZW4GklY\nFyN3vnR/KXPCOOOUmp6S6rv73PAuUrKT1QZjnYoL9y3lsplpdD8fnqiRn4pOE1do\ndO46/jcSwJOMdzrmX12CSf8SOA==\n-----END PRIVATE KEY-----\n"
   
SERVICE_ACCOUNT_CLIENT_EMAIL=admin-585@listtaskchallenge.iam.gserviceaccount.com