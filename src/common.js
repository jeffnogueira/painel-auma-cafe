//192.168.100.9
const server = 'http://192.168.43.26:2000'
const ip = 'http://192.168.43.26:2001'

function showError(err) {
    alert('Ops! Ocorreu um problema', `Mensagem: ${err}`)
}

export { server, ip, showError }
