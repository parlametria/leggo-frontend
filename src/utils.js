export function resumirFases (fases) {
  return fases.filter(fase => fase.fase_global.indexOf('II') === -1 || fase.data_inicio)
}
