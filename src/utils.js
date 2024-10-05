export const formatarSaldo = (valor) => {
   
    if (typeof valor !== 'number' || isNaN(valor)) return 'R$ 0,00'; 

 
    const valorFormatado = valor
        .toFixed(2)  
        .replace('.', ',')  
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); 

    return `R$ ${valorFormatado}`; 
};
