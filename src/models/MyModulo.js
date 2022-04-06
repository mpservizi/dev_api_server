/**
 * Object usato per inizializzare un modulo
 */
class MyModulo {
  constructor(nome, path, label, desc) {
    this.nome = nome;
    this.path = path;
    this.label = label;
    this.desc = desc;
    this.db = undefined; //Istanza db
    this.router = undefined; //Router
    this.app = undefined; //Istanza express
  }
}

module.exports = MyModulo;
