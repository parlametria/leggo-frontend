<template>
  <div>
    <h2>Análises</h2>
    <h3>Boletins Congresso Remoto</h3>
    <ul class="links">
      <li><span class="links-item">Boletim 1</span> <a href="#">O processo legislativo na deliberação remota</a></li>
    </ul>
    <h3>Congresso Remoto em Notas</h3>
    <ul class="links">
      <li><span class="links-item">Nota 1</span> <a href="#">O que virou lei na pandemia?</a></li>
      <li><span class="links-item">Nota 2</span> <a href="#">O quórum do Congresso no período remoto</a></li>
      <li><span class="links-item">Nota 3</span> <a href="#">Medidas provisórias durante a pandemia</a></li>
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
