/**
 * Object usato per inizializzare un modulo
 * Viene usato per caricare i moduli delle varie apps
 * In file moduli viene creata la lista delle apps da caricae
 */
class MyModulo {
  constructor(nome, path, label, desc) {
    this.nome = nome; //nome della cartella in folder apps
    this.path = path; //percorso del router
    this.label = label; //label, non usato
    this.desc = desc; //descrizione, non usato
    this.db = undefined; //Istanza db
    this.router = undefined; //Router
    this.app = undefined; //Istanza express
  }
}

module.exports = MyModulo;
