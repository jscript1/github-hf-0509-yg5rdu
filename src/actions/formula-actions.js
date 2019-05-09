export let UPDATE_FORMULA = "formulas:updateFormula"
export function updateFormula(newFormula) {
    return {
    type : UPDATE_FORMULA,
    payload: {
      formula: newFormula
    }
  }
}
