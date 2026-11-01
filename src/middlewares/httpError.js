// Crea un error con código HTTP para que lo atrape el manejador global
module.exports = (status, mensaje) => Object.assign(new Error(mensaje), { status });
