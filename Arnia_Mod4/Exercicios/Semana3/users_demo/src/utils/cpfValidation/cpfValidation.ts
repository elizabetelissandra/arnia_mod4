const validarCPF = (cpf) => {
    // Remove qualquer caractere não numérico
    cpf = cpf.replace(/\D/g, '');
  
    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
      return false;
    }
  
    // Função para calcular o primeiro dígito verificador
    const calcularPrimeiroDigito = (cpf) =>{
      let soma = 0;
      let peso = 2;
  
      // Multiplica os 9 primeiros dígitos pelos pesos correspondentes
      for (let i = 8; i >= 0; i--) {
        soma += cpf[i] * peso;
        peso++;
      }
  
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    }
  
    // Função para calcular o segundo dígito verificador
    const calcularSegundoDigito = (cpf) => {
      let soma = 0;
      let peso = 2;
  
      // Multiplica os 10 primeiros dígitos pelos pesos correspondentes
      for (let i = 9; i >= 0; i--) {
        soma += cpf[i] * peso;
        peso++;
      }
  
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    }
  
    // Calcula os dígitos verificadores
    const primeiroDigito = calcularPrimeiroDigito(cpf);
    const segundoDigito = calcularSegundoDigito(cpf);
  
    // Verifica se os dígitos verificadores calculados correspondem aos dígitos fornecidos
    return cpf[9] == primeiroDigito && cpf[10] == segundoDigito;
  }
  
  // Exemplo de uso:
  const cpfValido = validarCPF('98765432100');
  console.log(cpfValido);  // Retorna true ou false
  

