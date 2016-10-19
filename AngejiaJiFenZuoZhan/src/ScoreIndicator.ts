
class ScoreIndicator extends egret.Sprite {

	private timer: egret.Timer
	private _countDown:number;
	private _totalTime:number;
	private _textTimer: egret.TextField;

    public constructor() {
        super();
        console.log('Init Score Indicator');

		this.createView();
    }
	
	private textField:egret.TextField;

    private createView():void {
		console.log('Create Score Indicator');
		// if enableTimer=true, then create timer(count down).
		this.createTimer();

		// create prize items
		this.createPrizes();
		
        // this.textField = new egret.TextField();
        // this.addChild(this.textField);
        // this.textField.y = 300;
        // this.textField.width = 480;
        // this.textField.height = 100;
        // this.textField.textAlign = "center";
    }

	private createTimer():void{
		// Timer text info
		this._countDown = 60;//TODO::config
		this._totalTime = this._countDown;
		this._textTimer = new egret.TextField;
		this._textTimer.size = 24;
		this._textTimer.textColor = 0x000000;
        this._textTimer.lineSpacing = 10;
        this._textTimer.multiline = false;
        this._textTimer.text = this._countDown.toString();
        this._textTimer.x = 30;
        this._textTimer.y = 30;
        this.addChild(this._textTimer);
		this.timer = new egret.Timer(1000, 0);
		this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFn, this);
        
        this.timer.start();
		// /*** 点击舞台的时候会调用延迟方法 ***/
        // this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
        //     if(this.timer.running){
        //         this._textTimer.text += "定时器关闭！\n";
        //         this.timer.stop();
        //     }else{
        //         this._textTimer.text += "定时器启动！\n";
        //         this.timer.start();
        //     }
        // }, this); 
        // /*** 本示例关键代码段结束 ***/
		
	}

	private createPrizes():void {
		// ----prize item 1 --
		var p1 = new Prize('prize_1');
		p1.x = 50;
		p1.y = 100;		
		this.addChild(p1);
		
	}

	private timerFn(event: egret.Event):void {
		this._countDown -= 1;
		this.setProgress(this._countDown, this._totalTime); 
		if (this._countDown <= 0) {
			this.timer.stop();

			// dispatch gameover event
			var gameEvent:GameEvent = new GameEvent(GameEvent.GAMEOVER);
			this.dispatchEvent(gameEvent);
		}
	}

	private _itemView():void {

	}

    public setProgress(current:number, total:number):void {
        this._textTimer.text = `${current}/${total}`;
    }

}

class Prize extends egret.Sprite {
	private _text:egret.TextField;
	private _imgId:string;
	private _num:number = 0;
	public static PRIZE_1:string = "PRIZE_1";//TODO

	public constructor(imgId:string) {
        super();
        console.log('Init Prize: ' + imgId);
		this._imgId = imgId;
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		
    }

	private onAddToStage(event:egret.Event) {
		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        RES.loadGroup("preload");
	}

	private onGroupComplete():void {
		this.createView();
	}

	private createView():void {
		// add image
		var img:egret.Bitmap = new egret.Bitmap();
		img.texture = RES.getRes(this._imgId);
		this.addChild(img);
		img.width = 36;
		img.height = 36;
		
        

		// text view
		this._text = new egret.TextField;
		this._text.size = 36;
		this._text.textColor = 0xEE0000;
        this._text.lineSpacing = 10;
        this._text.multiline = false;
        this._text.text = this._num.toString();
        this._text.x = 30;
        this._text.y = 30;
		
        this.addChild(this._text);

		
	}

	public setNum(num:number):void {
		this._num = num;
	}
}