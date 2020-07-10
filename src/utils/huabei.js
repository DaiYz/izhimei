
const HBPhase = {
  PHASE_3: '3',
  PHASE_6: '6',
  PHASE_12: '12'
}

const userFee = {
  PHASE_3: 0.023,
  PHASE_6: 0.045,
  PHASE_12: 0.075
}

const businessFee = {
  PHASE_3: 0.018,
  PHASE_6: 0.045,
  PHASE_12: 0.075
}

// 用户费率
const fee = (total = 0, phase: String = 'PHASE_3', type: String = 'user') => {
  const targetPhase = HBPhase[phase]
  const targetFee = type === 'user' ? userFee[phase] : businessFee[phase]
  const capital = (total / targetPhase).toFixed(2)
  const preFee = ((total * targetFee) / targetPhase).toFixed(2)
  const perTotal = ((total + total * targetFee) / 3).toFixed(2)
  return {
    capital,
    preFee,
    perTotal,
    isInt: total % targetPhase === 0
  }
}

const getTotalFee = (total = 0) => {
  const thirdPhase = fee(total)
  const sixthPhase = fee(total, 'PHASE_6')
  const twelfthPhase = fee(total, 'PHASE_12')
  return [
    thirdPhase,
    sixthPhase,
    twelfthPhase
  ]
}

export default getTotalFee
