export const calculateVPD = (relativeHumidity: number, temperatureInCelcius: number): number => {
    const es: number = 0.6108 * Math.exp(17.27 * temperatureInCelcius / (temperatureInCelcius + 237.3))
    const ea: number = relativeHumidity / 100 * es
    return Math.abs(ea - es)
}