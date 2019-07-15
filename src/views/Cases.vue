<template>
  <div class="exemplos">
    <h1>Exemplos de subidas bruscas na temperatura</h1>

    <section>
      <header>
        <h2>PL do Veneno</h2>
      </header>

      <div class="card-section">
        <article class="card">
          <header>
            <h3>Semana com fortes discussões na Comissão Especial</h3>
            <time>14/05/2018</time>
          </header>
          <ul>
            <li>Requerimento de Desapensação de alguns apensados perigosos</li>
            <li>Requerimento de Inversão de Ordem pelos favoráveis à proposta (provavelmente para que a apreciação ocorra mais cedo)</li>
            <li>Requerimento de Retirada de pauta</li>
            <li>Alguns deputados apresentam voto em separado</li>
          </ul>
        </article>

        <article class="card">
          <header>
            <h3>Discussões acaloradas na Comissão Especial durante a apreciação do parecer favorável do relator</h3>
            <time>18/06/2018</time>
          </header>
          <ul>
            <li>Relator apresenta parecer favorável à aprovação</li>
            <li>Diversos Requerimentos (Votação Nominal, Retirada de Pauta, Inclusão Extrapauta, Quebra de Interstício, Audiência Pública, Adiamento da Votação)</li>
            <li>Voto em Separado</li>
          </ul>
        </article>

        <article class="card">
          <header>
            <h3>Aprovação do parecer favorável do relator na Comissão Especial</h3>
            <time>25/06/2018</time>
          </header>
          <ul>
            <li>Diversos Requerimentos</li>
            <li>Votação do Parecer do Relator</li>
            <li>Destaques</li>
            <li>Aprovação do parecer favorável</li>
          </ul>
        </article>
      </div>
    </section>

    <section>
      <header>
        <h2>Programa Nacional de Redução de Agrotóxicos (PNARA)</h2>
      </header>

      <div class="card-section">
        <article class="card">
          <header>
            <h3>Discussões na Comissão Especial</h3>
            <time>28/05/2018</time>
          </header>
          <ul>
            <li>
              Requerimentos de Audiência Pública, Seminário e Reuniões Externas
            </li>
          </ul>
        </article>

        <article class="card">
          <header>
            <h3>Comissão Especial</h3>
            <time>04/06/2018</time>
          </header>
          <ul>
            <li>
              Diversos Requerimentos de Audiência Pública
            </li>
            <li>
              Aprovação de diversos requerimentos de Audiência Pública, Seminários e Reuniões Externas em diversos lugares do país
            </li>
            <li>
              Requerimento de Prorrogação de Prazo
            </li>
          </ul>
        </article>

      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.exemplos {
  margin: 2rem 3rem;
}
h1 {
  font-size: 2rem;
  margin-bottom: 3rem;
  color: #555;
  font-weight: normal;
}

section {
  padding-bottom: 3rem;
  h2 {
    font-weight: normal;
    color: #666;
  }
}
.card-section {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1.5rem;
}
.card {
  box-shadow: 0 3px 5px #ddd;
  background: #f5f5f5;
  border: 1px solid #eee;
  color: #656565;
  header {
    padding: 1rem;
    background: #fff;
    min-height: 4.5rem;
    h3 {
      margin: 0;
      margin-bottom: .5rem;
    }
    time {
      color: #aaa;
    }
  }
  ul {
    margin: 0;
    padding: 1rem;
    padding-left: 2rem;
  }
  li {
    text-align: justify;
    list-style-type: circle;
    margin-bottom: .5rem;
  }
}

@media screen and (max-width: 1300px) {
  .card-section {
    display: flex;
    flex-direction: column;
  }
  .card {
    margin-bottom: 1.5rem;
  }
}
</style>
