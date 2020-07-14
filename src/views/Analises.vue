<template>
  <div>
    <h2>Análises</h2>
    <h3>Boletins Congresso Remoto</h3>
    <ul class="links">
      <li>
        <span class="links-item">Boletim 1</span>
        <a
          href="https://drive.google.com/file/d/1dC1nQgS9DFf1VOPZDYRHOhUV3h-aCSQp/view?usp=sharing"
          target="_blank">O processo legislativo na deliberação remota</a>
      </li>
      <li>
        <span class="links-item">Boletim 2</span>
        <a
          href="https://drive.google.com/file/d/1qMXY1Qfpxa_DkiwPdvLuApGZ7M2BxaA5/view?usp=sharing"
          target="_blank">Conflito e governismo</a>
      </li>
    </ul>
    <h3>Congresso Remoto em Notas</h3>
    <ul class="links">
      <li>
        <span class="links-item">Nota 1</span>
        <a
          href="https://drive.google.com/file/d/1fH15K8EUJGiv1yLfQuQxsjJDkN6mE0lL/view?usp=sharing"
          target="_blank">O que virou lei na pandemia?</a>
      </li>
      <li>
        <span class="links-item">Nota 2</span>
        <a
          href="https://drive.google.com/file/d/1XosUBKbnazOMcSZ-5C-AgxJsh0uL88hV/view?usp=sharing"
          target="_blank">O quórum do Congresso no período remoto</a>
      </li>
      <li>
        <span class="links-item">Nota 3</span>
        <a
          href="https://drive.google.com/file/d/1T5q-SLCHu2SXTb1RkeY6_sM9cYIdX9D4/view?usp=sharing"
          target="_blank">Medidas provisórias durante a pandemia</a>
      </li>
      <li>
        <span class="links-item">Nota 4</span>
        <a
          href="https://drive.google.com/file/d/1FdPH9v2M1YR3BrjR19w-ttMO4dpoD6In/view?usp=sharing"
          target="_blank">Como a pandemia afetou o apoio parlamentar ao governo?</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Analises'
}
</script>

<style lang="scss" scoped>
@import "@/base.scss";

.links {
  list-style: none;
  margin-bottom: 2rem;
}

.links > li {
  padding-top: .5rem;
  padding-bottom: .5rem;
}

.links-item {
  width: 80px;
  display: inline-block;
  font-weight: bold;
  text-align: right;
  margin-right: 1rem;
}
</style>
