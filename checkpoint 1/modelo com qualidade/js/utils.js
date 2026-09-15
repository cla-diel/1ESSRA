// FUNÇÃO: Validação Matemática Algorítmica do CPF
function validarCPF(cpf) {
    // Limpa pontuações mantendo apenas números
    cpf = cpf.replace(/\D/g, '');

    // Verifica tamanho de 11 dígitos ou sequências repetidas
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    // Cálculo do 1º Dígito Verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    // Cálculo do 2º Dígito Verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true; // CPF Válido
}

// FUNÇÃO GENÉRICA: Exportação de dados em arquivo .txt via Blob
function salvarDadosEmTXT(conteudoTexto, nomeArquivo) {
    // 1. Cria o Blob com o conteúdo de texto
    const blob = new Blob([conteudoTexto], { type: 'text/plain;charset=utf-8' });

    // 2. Cria uma URL temporária apontando para esse Blob
    const url = URL.createObjectURL(blob);

    // 3. Cria um link <a> invisível, aponta para a URL e simula o clique
    const link = document.createElement('a');
    link.href = url;
    link.download = nomeArquivo;
    document.body.appendChild(link);
    link.click();

    // 4. Limpeza: remove o link da página e libera a memória da URL temporária
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
