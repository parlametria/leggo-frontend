<template>
  <div class="sobre">
    <div class="description">
      <p>
        Leg.go é uma plataforma de inteligência para o acompanhamento das atividades no Congresso
        Nacional. Coletamos dados da Câmara e do Senado para encontrar quais proposições estão quentes,
        o que está tramitando com mais energia, como o conteúdo dos projetos é alterado e
        quem são os atores importantes nesse processo.
      </p>

      <p>
        Nosso objetivo é complementar as informações de acompanhamento já disponíveis.
        Usamos ciência de dados e aprendizagem de máquina para facilitar o trabalho de advocacy.
        Acreditamos no poder da tecnologia para diminuir a assimetria de informação e empoderar o
        cidadão e a sociedade civil na construção de uma democracia colaborativa.
      </p>

      <p>
        Leg.go é uma parceria da Dado Capital com a Universidade Federal de Campina Grande
        e a Universidade Federal de Minas Gerais.
      </p>

      <h2>Como é feito o cálculo da pressão:</h2>
      <p>
        Para o cálculo de pressão de uma proposição utilizamos a API do Google Trends e realizamos os seguintes passos:
      </p><p>
        1 - Pesquisar os termos mais populares relacionados a uma proposição (exemplo: para a Pec 06/19,
        os termos relacionados são reforma da previdência, nova previdência e previdência).
      </p>
      <p>
        2 - Verificar o quanto os usuários estão pesquisando sobre esses termos, o Google retorna em porcentagem entre
        esses termos quais são os mais pequisados.
      </p>
      <p>
        3 - Por fim, é considerado o máximo dessas porcentagens para mostrar no Leg.go.
      </p>
    </div>

    <h2 class="center">Equipe:</h2>

    <div class="equipe">
      <div>
        <h3>Dado Capital</h3>
        <ul>
          <li>Saulo Porto</li>
          <li>Jasmin Eymery</li>
          <li>Evelin Amorim</li>
          <li>Michael Soares</li>
          <li>Daniel Falleiros</li>
        </ul>
      </div>
      <div>
        <h3>UFCG</h3>
        <ul>
          <li>Nazareno Andrade</li>
          <li>João Arthur Brunet</li>
          <li>Tarciso Oliveira</li>
          <li>Andrés Martano</li>
          <li>Jair Neto</li>
          <li>Jefferson Neves</li>
          <li>Hadrizia Santos</li>
          <li>Gibran Yasser</li>
          <li>Gileade Kelvin</li>
          <li>Daniel Coura</li>
          <li>Juan Barros</li>
          <li>Thayanne Sousa</li>
          <li>Marcella Siqueira</li>
          <li>Ivyna Santino</li>
          <li>Matheus Leal</li>
        </ul>
      </div>
      <div>
        <h3>UFMG</h3>
        <ul>
          <li>Adriano Veloso</li>
          <li>Ana Paula Macêdo</li>
          <li>Daniella Castro</li>
          <li>Evelin Amorim</li>
          <li>André Motta</li>
          <li>Igor Marques</li>
          <li>Lucas Lage</li>
          <li>Raphael Faria</li>
          <li>Roberta Queiroz</li>
          <li>João Paulo</li>
        </ul>
      </div>
    </div>

    <h2 class="center">Relatórios</h2>
    <ul class="contribua">
      <li>
        <a
          href="http://rpubs.com/tarcisob/balanco-2019-temperatura-leggo"
          target="_blank">Balanço Temperatura 2019</a>
      </li>
      <li>
        <a
          href="http://rpubs.com/MatheusHALeal/leggo-progresso-2"
          target="_blank">Balanço Progresso 2019</a>
      </li>
    </ul>

    <h2 class="center">Contribua</h2>
    <ul class="contribua">
      <li>
        <a
          href="https://github.com/analytics-ufcg/leggoR"
          target="_blank">Pacote R</a>
      </li>
      <li>
        <a
          href="https://github.com/analytics-ufcg/leggo-frontend"
          target="_blank">Leg.go Frontend</a>
      </li>
      <li>
        <a
          href="https://github.com/analytics-ufcg/leggo-backend"
          target="_blank">Leg.go Backend</a>
      </li>
    </ul>

  </div>
</template>

<style lang="scss" scoped>
@import "@/base.scss";
.center {
  text-align: center;
}
.description {
  text-align: justify;
}
.contribua {
  list-style: none;
  padding: 0;
  text-align: center;
}
h2 {
  font-family: "Rajdhani", sans-serif;
  font-weight: bold;
}
h3 {
  font-weight: normal;
}
.equipe {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
@media screen and (max-width: 1270px) {
  .equipe {
    display: block;
  }
}
@media screen and (max-width: $nav-menu-break-width) {
  .sobre {
    margin: 0 1.5rem;
  }
}
</style>
