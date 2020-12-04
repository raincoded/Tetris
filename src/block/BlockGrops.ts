import { IPoint, IPoints } from "../types/types";
import { Teris } from "../until/teris";
import { BlockViewer } from "../view/BlockViewer";
import { Block } from "./Block";
import $ from 'jquery'
export class BlockGrops {
    /**
     * 一组方块实例
     */
    private _BlockGrops: Block[] = []
    constructor(
        /**
         * 一组方块形状
         */
        private _Teris: IPoints[],
        /**
         * 方块的中心
         */
        private _centerPoint: IPoint,
        private _index: number
    ) {
        _Teris[this._index].forEach(point => {
            const block = new Block(point, Teris.createColor());
            block.point = {
                x: point.x + _centerPoint.x,
                y: point.y + _centerPoint.y,
            }
            block.viewer = new BlockViewer(block, $('#next'))
            this._BlockGrops.push(block);
        })
    }
    pointhandler(centerPoint: IPoint) {
        this._centerPoint = centerPoint;
        this._BlockGrops.forEach((block, index) => {
            block.point = {
                x: this._Teris[this._index][index].x + centerPoint.x,
                y: this._Teris[this._index][index].y + centerPoint.y,
            }
        })
    }
    changeIndex() {
        this._index = (this._index + 1) % this._Teris.length;
        this.pointhandler(this._centerPoint)
    }
    changeDom(dom: JQuery<HTMLElement>) {
        this._BlockGrops.forEach(e => {
            e.viewer?.setContainer(dom)
        })
    }
    /**
     * 获取一组方块
     */
    get blockGrops() {
        return this._BlockGrops
    }
    /**
     * 获取中心坐标
     */
    get centerPoint() {
        return this._centerPoint
    }
    /**
     * 设置中心坐标
     */
    set centerPoint(point) {
        this._centerPoint = point
    }
    /**
     * 获取当前的形状
     */
    getCurTeris() {
        return this._Teris[this._index]
    }
    /**
     * 获取下一个形状
     */
    getNextTeris() {
        return this._Teris[(this._index + 1) % this._Teris.length]
    }
}