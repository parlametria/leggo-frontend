<template>
  <div class="sobre" align="left">
    <h1>Sobre</h1>
  
    <p>
      Leg.go é uma plataforma de inteligência para o acompanhamento das atividades no Congresso Nacional.
      Coletamos dados da Câmara e do Senado para encontrar quais proposições estão quentes, o que está tramitando com mais energia,
      como o conteúdo das proposições é alterado e quem são os atores importantes nesse processo.
    </p>

    <p>
      Nosso objetivo é complementar as informações de acompanhamento já disponíveis. 
      Usamos ciência de dados e aprendizagem de máquina para facilitar o trabalho de advocacy.
      Acreditamos no poder da tecnologia para diminuir a assimetria de informação e empoderar
      o cidadão e a sociedade civil na construção de uma democracia colaborativa.
    </p>

    <p>Leg.go é uma parceria da Dado Capital com a Universidade Federal de Campina Grande e a Universidade Federal de Minas Gerais.</p>

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
          <li>Hadrízia Santos</li>
          <li>Gibran Yasser</li>
          <li>Gileade Kelvin</li>
          <li>Daniel Coura</li>
          <li>Juan Barros</li>
          <li>Thayanne Souza</li>
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
        </ul>
      </div>
    </div>

    <h2 class="center">Contribua</h2>
    <ul class="contribua">
      <li>
        <a href="https://github.com/analytics-ufcg/leggoR" target="_blank">Pacote R</a>
      </li>
      <li>
        <a href="https://github.com/analytics-ufcg/leggo-frontend" target="_blank">Leg.go Frontend</a>
      </li>
      <li>
        <a href="https://github.com/analytics-ufcg/leggo-backend" target="_blank">Leg.go Backend</a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import "@/base.scss";

.sobre {
  margin: 0 30rem;
}
.center {
  text-align: center;
}
.contribua {
  list-style: none;
  padding: 0;
  text-align: center;
}
h1 {
  font-family: 'Rajdhani', sans-serif;
  border-bottom: solid 2px #dc6060;
  line-height: 50pt;
  font-size: 50pt;
  text-align: center;
  font-weight: normal;
  margin-bottom: 2rem;
}
h2 {
  font-family: 'Rajdhani', sans-serif;
  font-weight: bold;
}
h3 {
  font-weight: normal;
}
.equipe {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap
}
@media (max-width: $nav-menu-break-width) {
  .sobre {
    margin: 0 2rem;
  }
  .equipe {
    display: block;
  }
}
// @media (max-width: '900px') {
//   .sobre {
//     margin: 0 2rem;
//   }
// }
</style>
