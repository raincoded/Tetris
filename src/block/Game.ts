import { Duration, GameConfig, GameStatus, Panel } from "../types/enums"
import { IGameView, IPoint, IPoints } from "../types/types";
import { Teris } from "../until/teris"
import { BlockGrops } from "./BlockGrops"
import $ from 'jquery'
import { Block } from "./Block";
import { getRandom } from "../until/until";
export class Game {
    private _curStatus: GameStatus = GameStatus.init;
    private _nextBlockGrops?: BlockGrops;
    private _curBlockGrops?: BlockGrops;
    private _dureation: number = Duration.default;
    private _exites: Block[] = [];
    private _timer?: number = undefined;
    private _grade: number = 0;
    constructor(private _viewer: IGameView) {
        _viewer.init(this)
        this.init()
    }
    /**
     * 初始化
     */
    init() {
        this._curStatus = GameStatus.init;
        this._dureation = Duration.default;
        this.grade = 0;
        if (this._timer) {
            clearInterval(this._timer)
            this._timer = undefined;
        }
        this._curBlockGrops?.blockGrops.forEach(e => {
            e.viewer?.remove()
        })
        this._curBlockGrops = undefined;
        this._nextBlockGrops?.blockGrops.forEach(e => {
            e.viewer?.remove()
        })
        this._exites.forEach(e => {
            e.viewer?.remove()
        })
        this._exites = []
        this.createNext()
    }
    /**
     * 暂停后开始，或初始化后开始
     */
    start() {
        // 只有在_curBlockGrops有值并且现在是暂停才能进
        if (this._curStatus === GameStatus.init) {
            this._curStatus = GameStatus.playing;
            this.switchGrops()
            this.autoMove()
        } else if (this._curStatus === GameStatus.pause) {
            this._curStatus = GameStatus.playing;
            this.autoMove()
        }
    }
    /**
     * 游戏暂停
     */
    pause() {
        if (this._curStatus !== GameStatus.playing) return
        this._curStatus = GameStatus.pause;
        if (this._timer) {
            clearInterval(this._timer)
            this._timer = undefined;
        }
        this._viewer?.pause()
    }
    /**
     * 自动移动
     */
    autoMove() {
        if (this._timer) return
        if (!this._curBlockGrops) return
        this._timer = setInterval(() => {
            if (!this._curBlockGrops) return
            const targetPoint = {
                x: this._curBlockGrops.centerPoint.x,
                y: this._curBlockGrops.centerPoint.y + 1,
            }
            // 找到违规的点就切换，找不到就移动
            if (!this.testPoint(this._curBlockGrops.getCurTeris(), targetPoint)) {
                this._curBlockGrops.pointhandler(targetPoint);
            } else {
                // 切换之前，先把不能动的方块保存起来
                this._curBlockGrops.blockGrops.forEach(e => {
                    this._exites.push(e)
                })
                this.switchGrops()
            }
        }, this._dureation)
    }
    /**
     * 切换方块组
     */
    switchGrops() {
        if (this._curStatus !== GameStatus.playing) return
        if (!this._nextBlockGrops) return
        this._curBlockGrops = this._nextBlockGrops;
        // 交给_curBlockGrops后，_nextBlockGrops的dom就该销毁了
        this._nextBlockGrops.blockGrops.forEach(e => {
            e.viewer?.remove()
        })
        // 新的x位置为游戏界面的一半，y的位置和_curBlockGrops一致就行，因为_curBlockGrops已经是合理的位置，这里没必要从0开始，又要重新判断
        const targetPoint = { x: Math.floor(GameConfig.width / 2), y: this._curBlockGrops.centerPoint.y }
        if (this.testPoint(this._curBlockGrops?.getCurTeris(), targetPoint)) {// 为true说明连切换都做不到，也就是方块堆到最高了，游戏结束
            this._curStatus = GameStatus.over;
            if (this._timer) {
                clearInterval(this._timer)
                this._timer = undefined
            }
            this._viewer?.over()
            return
        }
        this._curBlockGrops.changeDom($('#game'))
        this._curBlockGrops.pointhandler({ x: Math.floor(GameConfig.width / 2), y: this._curBlockGrops.centerPoint.y })
        this.createNext()
        this.grade = this._grade + this.deleteBlock()
    }
    /**
     * 创建下一个
     */
    createNext() {
        const teris = Teris.createTeris();// 
        const centerPoint = { x: Math.floor(Panel.width / 2), y: 0 };
        const index = getRandom(0, teris.length); // 后面改成随机
        while (this.testPoint(teris[index], centerPoint)) {
            centerPoint.y++
        }
        this._nextBlockGrops = new BlockGrops(teris, centerPoint, index)
    }
    /**
     * 找出是否有一个方块不符合
     * @param teris 形状
     * @param centerPoint 下一个中心点
     */
    private testPoint(teris: IPoints, centerPoint: IPoint): boolean {
        const targetPoint = teris.map(i => {
            return {
                x: i.x + centerPoint.x,
                y: i.y + centerPoint.y,
            }
        })
        // 判断是否超出边界，超出边界则不满足
        let result = targetPoint.some(i => {// 找不到说明可以移动
            return i.x < 0 || i.x > (GameConfig.width - 1) || i.y < 0 || i.y > (GameConfig.height - 1)
        })
        // // 先满足上面，不能超出边界，再来判定是否与已经存在的重合
        if (!result && this._exites.length > 0) {
            result = targetPoint.some(i => {
                return this._exites.some(e => {
                    return i.x === e.point.x && i.y === e.point.y
                })
            })
        }
        return result
    }
    /**
     * 消除方块
     */
    deleteBlock(): number {
        let count = 0;// 此次排查删除了几行
        for (let i = 0; i < GameConfig.height; i++) {// 从0逐层排查，找到那些一层满的
            const arr = this._exites.filter(e => {
                return e.point.y === i
            })
            if (arr.length === GameConfig.width) {
                arr.forEach(e => {
                    e.viewer?.remove()// 满的一层dom移除
                    const index = this._exites.indexOf(e)
                    this._exites.splice(index, 1)// 根据下标从数组中移除
                })
                this._exites.forEach(e => {// 所有小于这一层的都要向下偏移一层
                    if (e.point.y < i) {
                        e.point = {
                            x: e.point.x,
                            y: e.point.y + 1
                        }
                    }
                })
                count++;
            }
        }
        return count
    }
    // 旋转
    rotate() {
        if (this._curStatus !== GameStatus.playing) return
        if (this._curBlockGrops) {
            if (!this.testPoint(this._curBlockGrops.getNextTeris(), this._curBlockGrops.centerPoint)) {
                this._curBlockGrops.changeIndex()
            }
        }
    }
    // 向左
    left() {
        if (this._curStatus !== GameStatus.playing) return
        if (this._curBlockGrops) {
            const targetPoint = {
                x: this._curBlockGrops.centerPoint.x - 1,
                y: this._curBlockGrops.centerPoint.y,
            }
            if (!this.testPoint(this._curBlockGrops.getCurTeris(), targetPoint)) {
                this._curBlockGrops.pointhandler(targetPoint);
            }
        }
    }
    // 向右
    right() {
        if (this._curStatus !== GameStatus.playing) return
        if (this._curBlockGrops) {
            const targetPoint = {
                x: this._curBlockGrops.centerPoint.x + 1,
                y: this._curBlockGrops.centerPoint.y,
            }
            if (!this.testPoint(this._curBlockGrops.getCurTeris(), targetPoint)) {
                this._curBlockGrops.pointhandler(targetPoint);
            }
        }
    }
    // 直接向下
    down() {
        if (this._curStatus !== GameStatus.playing) return
        if (this._curBlockGrops) {
            const targetPoint = {
                x: this._curBlockGrops.centerPoint.x,
                y: this._curBlockGrops.centerPoint.y + 1,
            }
            if (!this.testPoint(this._curBlockGrops.getCurTeris(), targetPoint)) {
                this._curBlockGrops.pointhandler(targetPoint);
                this.down()// 说明还可以向下移动
            } else {
                // 不能移动了，保存起来，并切换
                this._curBlockGrops.blockGrops.forEach(e => {
                    this._exites.push(e)
                })
                this.switchGrops()
            }
        }
    }
    // 重新开始
    reset() {
        this.init()
    }
    // 获取当前的游戏状态
    get state() {
        return this._curStatus
    }
    private set grade(val: number) {
        this._grade = val;
        if (val > 0 && val <= 300) {
            this._dureation = Duration.default - val * 3
        }
        this._viewer?.showGrade(this._grade)
    }
}