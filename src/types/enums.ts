/**
 * 表示游戏中单个方块的大小
 */
export enum BlockConfig {
    width = 30,
    height = 30
}

/**
 * 表示游戏区域横向和纵向的有多少方块
 */
export enum GameConfig {
    /**
     * 行y
     */
    width = 10,
    /**
     * 列x
     */
    height = 15
}
/**
 * 下一步的方向
 */
export enum Direction {
    down,
    right,
    left
}
/**
 * 游戏的状态
 */
export enum GameStatus {
    init,
    playing,
    pause,
    over
}
/**
 * 显示下一组方块区域的大小
 */
export enum Panel {
    width = 5,
    height = 5,
}

export enum Duration {
    default = 1000
}