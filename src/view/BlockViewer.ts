// import $ from 'jquery'
import { Block } from "../block/Block";
import { BlockConfig } from "../types/enums";
import { IBlockView } from "../types/types";

/**
 * 控制一个方块的显示
 */
export class BlockViewer implements IBlockView {
    private _dom?: JQuery<HTMLElement>
    constructor(
        private _block: Block,
        private _container: JQuery<HTMLElement>) {
        this.show()
    }
    /**
     * 重新设置dom
     */
    setContainer(container: JQuery<HTMLElement>) {
        this._container = container;
        this.show()
    }
    /**
     * 一个方块显示
     */
    show(): void {
        if (!this._dom) {
            this._dom = $('<div>').css({
                height: BlockConfig.height,
                width: BlockConfig.width,
                backgroundColor: this._block.color,
                position: 'absolute',
            })
        }
        this._dom.css({
            left: this._block.point.x * BlockConfig.width,
            top: this._block.point.y * BlockConfig.height,
        }).appendTo(this._container)
    }
    /**
    * 一个方块移除
    */
    remove(): void {
        this._dom?.remove()
        this._dom = undefined;
    }

}