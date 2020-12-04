
import { Block } from "../block/Block"
import { BlockGrops } from "../block/BlockGrops"
import { Direction, GameConfig } from "../types/enums"
import { IPoint, IPoints } from "../types/types"
import { gerRandomColor, getRandom } from "./until"

/**
 * T字型
 */
export const TShape: IPoints[] = [
    // 上T
    [
        { x: 0, y: 0 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: -1, y: 0 },
    ],
    // 右T
    [
        { x: 0, y: 0 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: 0, y: 1 }
    ],
    // 下T
    [
        { x: 0, y: 0 },
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
    ],
    // 左T
    [
        { x: 0, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: 1 },
    ],
]
/**
 * I字型
 */
export const YiShape: IPoints[] = [
    // 上一
    [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 0, y: 3 },
    ],
    // 右一
    [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
    ],
    // // 下一
    // [
    //     { x: 0, y: 0 },
    //     { x: 0, y: 1 },
    //     { x: 0, y: 2 },
    //     { x: 0, y: 3 },
    // ],
    // // 左一
    // [
    //     { x: 0, y: 0 },
    //     { x: -1, y: 0 },
    //     { x: -2, y: 0 },
    //     { x: -3, y: 0 },
    // ],

]
/**
 * O字型
 */
export const OShape: IPoints[] = [
    [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
    ],
]
/**
 * L字型
 */
export const LShape: IPoints[] = [
    // 上L
    [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: -2 },
        // { x: 0, y: -3 },
    ],
    // 右L
    [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        // { x: 3, y: 0 },
    ],
    // 下L
    [
        { x: 0, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        // { x: 0, y: 3 },
    ],
    // 左L
    [
        { x: 0, y: 0 },
        { x: 0, y: -1 },
        { x: -1, y: 0 },
        { x: -2, y: 0 },
        // { x: -3, y: 0 },
    ],
]
/**
 * J字型
 */
export const JShape: IPoints[] = [
    // 上J
    [
        { x: 0, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: -2 },
    ],
    // 右J
    [
        { x: 0, y: 0 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
    ],
    // 下J
    [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
    ],
    // 左J
    [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: -2, y: 0 },
    ],
]

/**
 * S字型
 */
export const SShape: IPoints[] = [
    [
        { x: 0, y: 0 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
    ],
    [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 1 },
    ],
]
/**
 * Z字型
 */
export const ZShape: IPoints[] = [
    // 上Z
    [
        { x: 0, y: 0 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
    ],
    // 右Z
    [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 1 },
    ],
]

// const Teris = [TShape, YiShape, OShape, LShape, JShape, SShape, ZShape]
// const Teris = [...TShape, ...YiShape, ...OShape, ...LShape, ...JShape, ...SShape, ...ZShape]
// const len = Teris.length;
/**
 * 随机创建一种俄罗斯方块的形状
 */
// export function createTeris() {
//     return Teris[getRandom(0, len)]
// }
export class Teris {
    // private static Teris: IPoints[] = [...TShape, ...YiShape, ...OShape, ...LShape, ...JShape, ...SShape, ...ZShape]
    private static TerisShape: IPoints[][] = [TShape, YiShape, OShape, LShape, JShape, SShape, ZShape]
    static createTeris() {
        return this.TerisShape[getRandom(0, this.TerisShape.length)]
    }
    static createColor() {
        return gerRandomColor()
    }
}

export class TerisRules {
    /**
     * 判断这个形状是否能到下一个位置
     * @param blockGrop 方块组的形状
     * @param direction 方向
     * @param exists 保存所有小方块的数组
     */
    static canIMove(shape: IPoints, nextPointCenter: IPoint, exites: IPoints): boolean {
        // 下一个点的中心实际逻辑坐标
        const targetPointCenter = shape.map(i => {
            return {
                x: i.x + nextPointCenter.x,
                y: i.y + nextPointCenter.y,
            }
        })
        let result = !targetPointCenter.some(i => {// 找不到说明可以移动
            return i.x < 0 || i.x > (GameConfig.width - 1) || i.y < 0 || i.y > (GameConfig.height - 1)
        })
        // 先满足上面，不能超出边界，再来判定是否与已经存在的重合
        if (result && exites.length > 0) {
            result = !targetPointCenter.some(i => {
                return exites.some(e => {
                    return i.x === e.x && i.y === e.y
                })
            })
        }
        return result
    }
}
