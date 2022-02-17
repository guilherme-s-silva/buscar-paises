fetch('https://restcountries.com/v2/all').then((resposta) => {
    const promise = resposta.json();

    promise.then( (body) => {

        body.sort((a, b) => {
            return a.translations.br.localeCompare(b.translations.br)
        });

        body.forEach( (pais) => {
            const inputBusca = document.querySelector('.busca');

            const paisesContainer = document.querySelector('.paises');

            const country = document.createElement('div');
            country.classList.add('pais');

            const nome = document.createElement('h2');
            nome.innerText = pais.translations.br;

            const regiao = document.createElement('span');
            regiao.textContent = `Região: ${pais.region}`;

            const capital = document.createElement('span');
            if (!pais.capital) {
                capital.textContent = `Capital: -`
            }else {
                capital.textContent = `Capital: ${pais.capital}`;
            };
            
            const populacao = document.createElement('p');
            populacao.textContent = `População: ${pais.population}`;

            const bandeira = document.createElement('img');
            bandeira.src = pais.flags.svg;
            bandeira.style.height = '100px';
            
            country.append(nome, regiao, capital, populacao, bandeira);
            paisesContainer.append(country);
            
            inputBusca.addEventListener('keydown', (event) => {
                if(!inputBusca.value){
                    country.style.display = 'flex'
                    return
                };
                
                if (event.key !== 'Enter'){
                    return
                };

                if (nome.innerText.toLowerCase() !== inputBusca.value.toLowerCase()){
                    country.style.display = 'none';         
                };
            });

            inputBusca.addEventListener('change', (event) => {
                if (!inputBusca.value) {
                    country.style.display = 'flex';
                    return
                };
            });
        });
    });
});