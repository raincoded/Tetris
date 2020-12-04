import $ from 'jquery'
import { BlockConfig } from "../types/enums";
import { IBlockView, IPoint, TColor } from "../types/types";
/**
 * 一个方块
 */
export class Block {
    viewer?: IBlockView
    constructor(private _point: IPoint, private _color: TColor) {

    }
    /**
     * 获取一个方块的坐标
     */
    get point() {
        return this._point
    }
    /**
    * 设置一个方块的坐标
    */
    set point(v) {
        this._point = v;
        this.viewer?.show()
    }
    /**
     * 获取这个方块的颜色
     */
    get color() {
        return this._color
    }
}



