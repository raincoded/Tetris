/**
 * 得到范围内的一个随机数（无法取最大值）
 * @param min 
 * @param max 
 */
export function getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min)
}
/**
 * 随机一个颜色
 */
export function gerRandomColor() {
    return `rgb(${getRandom(50, 255)},${getRandom(50, 255)},${getRandom(50, 255)})`
}