Malkit 06/04/2022

## Rest server per fornire i dati per app lab manager

## Struttura App:

**src** = contiene tutto il codice

**rest_test** = usato per testare le api da vs code

**public** = mettere qui app frontent da caricare nella homepage

# Dettaglio cartella src:

**src:**

- index.js = entry point del node app
- config.js = carica la configurazione dal disco
- logger.js = wrapper per il logging dei messaggi
- server.js = creare il web server

**apps = contenitore per tutti i moduli/apps**

_index.js = entry point per caricare tutte le app
moduli.js = elencare qui tutte le app da caricare
app_1 = ogni cartella contiene tutta la logica di una app/modulo
app_2_

**models = contenitore per le classi custom globali**

_MyController
MyService
ecc_

**storage = contiene tutta del database**

----index.js = entry point per storage, inzializza e espone il database da usare nel app
