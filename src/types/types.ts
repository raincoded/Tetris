import $ from 'jquery'
import { Game } from '../block/Game'
/**
 * 每个方块在逻辑上的位置
 */
export interface IPoint {
    readonly x: number
    readonly y: number
}
/**
 * 每个方块的颜色
 */
export type TColor = string

/**
 * 每个方块都有显示和移除的方法
 */
export interface IBlockView {
    show(): void
    remove(): void
    setContainer(container: JQuery<HTMLElement>): void
}
/**
 * 一组方块
 */
export type IPoints = IPoint[]


export interface IGameView {
    /**
     * 初始化
     */
    init(game: Game): void
    /**
     * 显示下一块
     * @param blockGroup 
     */
    /**
     * 显示分数
     */
    showGrade(garde: number): void
    /**
     * 游戏暂停
     */
    pause(): void
    /**
     * 游戏结束
     */
    over(): void
}

