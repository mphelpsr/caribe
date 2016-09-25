function Cliente() {
    var nome_cliente;
    var documento;
    var tipo_documento;
};

Cliente.prototype.getNome_cliente = function() {
    return this.nome;
}

Cliente.prototype.getDocumento = function() {
    return this.documento;
}

Cliente.prototype.getTipo_documento = function() {
    return this.tipo_documento;
}

Cliente.prototype.setNome_cliente = function(vNome_cliente) {
    this.nome = vNome_cliente;
}

Cliente.prototype.setDocumento = function(vDocumento) {
    this.documento = vDocumento;
}

Cliente.prototype.setTipo_documento = function(vTipo_documento) {
    this.tipo_documento = vTipo_documento;
}

module.exports = function() {
    return Cliente;
}
