// ─── Pure TypeScript financial math ────────────────────────────────────────

/** NPV: Σ( CFt / (1+r)^t ) — cash flows start at t=0 */
export function calcNPV(cashFlows: number[], rate: number): number {
  return cashFlows.reduce((acc, cf, t) => acc + cf / Math.pow(1 + rate, t), 0)
}

/** IRR via Newton-Raphson, max 1000 iterations, tolerance 0.0001 */
export function calcIRR(cashFlows: number[], maxIter = 1000, tol = 0.0001): number {
  // seed: if first CF is negative and later CFs are positive, start at 10%
  let r = 0.1
  for (let i = 0; i < maxIter; i++) {
    const npv = calcNPV(cashFlows, r)
    // derivative of NPV w.r.t. r
    const dNpv = cashFlows.reduce(
      (acc, cf, t) => (t === 0 ? acc : acc - (t * cf) / Math.pow(1 + r, t + 1)),
      0
    )
    if (Math.abs(dNpv) < 1e-12) break
    const rNext = r - npv / dNpv
    if (Math.abs(rNext - r) < tol) return rNext
    r = rNext
  }
  return r
}

/**
 * MIRR: [(FV of positive CFs at reinvestRate) / |PV of negative CFs at financeRate|]^(1/n) - 1
 * n = length of cash flow series - 1 (number of periods)
 */
export function calcMIRR(
  cashFlows: number[],
  financeRate: number,
  reinvestRate: number
): number {
  const n = cashFlows.length - 1
  // FV of positive cash flows (compounded to end of period n at reinvestRate)
  const fvPositive = cashFlows.reduce((acc, cf, t) => {
    if (cf > 0) return acc + cf * Math.pow(1 + reinvestRate, n - t)
    return acc
  }, 0)
  // PV of negative cash flows (discounted to t=0 at financeRate)
  const pvNegative = cashFlows.reduce((acc, cf, t) => {
    if (cf < 0) return acc + cf / Math.pow(1 + financeRate, t)
    return acc
  }, 0)
  if (pvNegative >= 0 || fvPositive <= 0) return 0
  return Math.pow(fvPositive / Math.abs(pvNegative), 1 / n) - 1
}

/** Simple Payback Period (interpolated). Returns Infinity if never recovered. */
export function calcSimplePayback(cashFlows: number[]): number {
  let cum = 0
  for (let t = 0; t < cashFlows.length; t++) {
    const prev = cum
    cum += cashFlows[t]
    if (cum >= 0 && t > 0) {
      return t - 1 + Math.abs(prev) / cashFlows[t]
    }
  }
  return Infinity
}

/** Discounted Payback Period (interpolated). */
export function calcDiscountedPayback(cashFlows: number[], rate: number): number {
  let cum = 0
  for (let t = 0; t < cashFlows.length; t++) {
    const discCF = cashFlows[t] / Math.pow(1 + rate, t)
    const prev = cum
    cum += discCF
    if (cum >= 0 && t > 0) {
      const discCFt = cashFlows[t] / Math.pow(1 + rate, t)
      return t - 1 + Math.abs(prev) / discCFt
    }
  }
  return Infinity
}

/** Profitability Index: (NPV + |Initial Investment PV|) / |Initial Investment PV| */
export function calcPI(cashFlows: number[], rate: number): number {
  const npv = calcNPV(cashFlows, rate)
  const pvNeg = cashFlows.reduce((acc, cf, t) => {
    if (cf < 0) return acc + Math.abs(cf) / Math.pow(1 + rate, t)
    return acc
  }, 0)
  if (pvNeg === 0) return 0
  return (npv + pvNeg) / pvNeg
}

/** Generate simulator cash flows from input parameters */
export function generateSimCashFlows(params: {
  initialInvestment: number  // in $M
  annualGrowthRate: number   // as percent e.g. 22
  wacc: number               // as percent e.g. 9.2
  projectLife: number        // years e.g. 10
  termGrowthRate: number     // as percent e.g. 3
  operatingMargin: number    // as percent e.g. 15
}): number[] {
  const { initialInvestment, annualGrowthRate, wacc, projectLife, termGrowthRate, operatingMargin } = params
  const g = annualGrowthRate / 100
  const r = wacc / 100
  const tg = termGrowthRate / 100
  const margin = operatingMargin / 100

  // Investment is spread over first 3 years (or project life if shorter)
  const investYears = Math.min(3, Math.floor(projectLife / 2))
  const investPerYear = initialInvestment / (investYears + 1)

  // Base revenue: roughly 15% of investment in Year 1
  const baseRevenue = initialInvestment * 0.15

  const cfs: number[] = []

  for (let t = 0; t <= projectLife; t++) {
    const revenue = baseRevenue * Math.pow(1 + g, t)
    const operatingCF = revenue * margin

    let cf: number
    if (t <= investYears) {
      cf = operatingCF - investPerYear
    } else {
      cf = operatingCF
    }

    // Add terminal value at final year
    if (t === projectLife) {
      if (r > tg) {
        const tv = (operatingCF * (1 + tg)) / (r - tg)
        cf += tv
      }
    }

    cfs.push(cf)
  }

  return cfs
}
