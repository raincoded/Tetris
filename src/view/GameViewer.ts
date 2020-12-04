import { Game } from "../block/Game";
import { IGameView } from "../types/types";
// import $ from 'jquery'
import { BlockConfig, GameConfig, GameStatus, Panel } from "../types/enums";


export class GameViewer implements IGameView {
    private msg: JQuery<Element> = $('#msg');
    private game?: Game
    start(): void {
        this.msg.css('display', 'none')
    }
    pause(): void {
        this.msg.css('display', 'flex').find('span').html('游戏暂停，点击开始!')
    }
    over(): void {
        this.msg.css('display', 'flex').find('span').html('游戏结束,点击重新开始!')
    }
    init(game: Game) {
        $('#game').css({
            height: BlockConfig.height * GameConfig.height,
            width: BlockConfig.width * GameConfig.width,
        })
        this.msg.css({
            height: BlockConfig.height * GameConfig.height,
            width: BlockConfig.width * GameConfig.width,
        })
        $('#next').css({
            height: BlockConfig.height * Panel.height,
            width: BlockConfig.width * Panel.width,
        })
        $(document).keydown(e => {
            // 空格
            if (e.keyCode === 32) {
                if (game.state === GameStatus.init || game.state === GameStatus.pause) {
                    game.start()
                    this.start()
                } else if (game.state === GameStatus.playing) {
                    game.pause()
                    this.pause()
                }
            } else if (e.keyCode === 37) {
                if (game.state !== GameStatus.playing) return
                game.left()
            } else if (e.keyCode === 38) {
                if (game.state !== GameStatus.playing) return
                game.rotate()
            } else if (e.keyCode === 39) {
                if (game.state !== GameStatus.playing) return
                game.right()
            } else if (e.keyCode === 40) {
                if (game.state !== GameStatus.playing) return
                game.down()
            }
        })
        $('.start').on('click', () => {
            if (game.state === GameStatus.playing) return
            this.start()
            game.start()
        })
        $('.pause').on('click', () => {
            if (game.state !== GameStatus.playing) return
            this.pause()
            game.pause()
        })
        $('.reset').on('click', () => {
            game.reset()
            this.start()
            game.start()
        })
        $('.left').on('click', () => {
            if (game.state !== GameStatus.playing) return
            game.left()
        })
        $('.right').on('click', () => {
            if (game.state !== GameStatus.playing) return
            game.right()
        })
        $('.up').on('click', () => {
            if (game.state !== GameStatus.playing) return
            game.rotate()
        })
        $('.down').on('click', () => {
            if (game.state !== GameStatus.playing) return
            game.down()
        })
        $('.btn').on('click', () => {
            if (game.state === GameStatus.init || game.state === GameStatus.pause) {
                this.start()
                game.start()
            } else if (game.state === GameStatus.over) {
                game.init()
                this.start()
                game.start();
            } else if (game.state === GameStatus.playing) {
                this.pause();
                game.pause()
            }
        })
    }
    showGrade(garde: number): void {
        $('#score').html(`${garde}`)
    }

}