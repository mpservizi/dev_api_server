import { MyModulo } from '../models/MyModulo';

/**
 * Indicare qui tutti i moduli da caricare nel app
 * I parametri da inidicare sono:
 *   new MyModulo(
    "norme_study", = nome della cartella in apps folder
    "/norme_study", = percorso dove caricare il modulo. Deve iniziare con /
    "Standard requirements", = Label, non usato per il momento
    "Analisi dei requisiti normativi" = Descrizione, non usato per il momento
  ),
 */

export const LISTA_MODULI = [new MyModulo('study_norma', '/norme_study')];
