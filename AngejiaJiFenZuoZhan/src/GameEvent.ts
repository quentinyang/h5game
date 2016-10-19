class GameEvent extends egret.Event{
	public static GAMEOVER:string = "GAMEOVER";
	public static INCREASE:string = "INCREASE";
	public static DECREASE:string = "DECREASE";

	public _action:string = "";
	public _score:number = 0;
	public _num:number = 1;
	public _data:Object = {};

	public constructor(type:string, bubbles:boolean=false, cacelable:boolean=false) {
		super(type, bubbles, cacelable);
	}
}