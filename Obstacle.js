class Obstacle{
    Obs;
    Dir;
    Future_P;
    constructor(){
        this.Obs = new two.makeCircle(GlobalClass.Obs_Size,GlobalClass.Obs_Size,GlobalClass.Obs_Size);
    }

    Initial(){
        this.Obs.translation = new two.Vector(Math.random() * two.width,Math.random() * two.height);
        this.Dir = new two.Vector(Math.random(),Math.random());
        this.Dir = this.Dir.normalize();
    }

    ///--------------------------------
    ///             边界检测           |
    ///--------------------------------
    Stop(){
        if(this.Guy.translation.x > two.width || this.Guy.translation.x < 0 || this.Guy.translation.y <0 || this.Guy.translation > two.height){
            this.Initial();
        }
    }

    ///--------------------------------
    ///        计算下一帧的位置        |
    ///--------------------------------
    Cal_Future_Pos(){
        this.Future_P = new Two.Vector(this.Obs.translation.x + GlobalClass.Obs_Speed * GlobalClass.time * this.Dir.x,this.Obs.translation.y + GlobalClass.Obs_Speed * GlobalClass.time * this.Dir.y);
        return this.Future_P;
    }

    ///--------------------------------
    ///             移动              |
    ///--------------------------------
    Move(){
        this.Obs.translation = new 
    }


    Update(){

    }


}