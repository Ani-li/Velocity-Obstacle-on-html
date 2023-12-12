class Obstacle{
    Obs;
    Dir;
    Future_P;
    constructor(){
        this.Obs = two.makeCircle(GlobalClass.Obs_Size,GlobalClass.Obs_Size,GlobalClass.Obs_Size);
    }

    Initial(){
        this.Obs.translation = new Two.Vector(Math.random() * two.width,Math.random() * two.height);
        this.Dir = new Two.Vector(Math.random(),Math.random());
        this.Dir = this.Dir.normalize();
    }

    ///--------------------------------
    ///             边界检测           |
    ///--------------------------------
    Stop(){
        if(this.Obs.translation.x > two.width || this.Obs.translation.x < 0 || this.Obs.translation.y <0 || this.Obs.translation > two.height){
            this.Initial();
        }
    }

    ///--------------------------------
    ///        计算下一帧的位置        |
    ///--------------------------------
    Cal_Future_Pos(){
        this.Future_P = new Two.Vector(this.Obs.translation.x + GlobalClass.Obs_Speed * (GlobalClass.time + GlobalClass.time_future) * this.Dir.x,this.Obs.translation.y + GlobalClass.Obs_Speed * (GlobalClass.time + GlobalClass.time_future) * this.Dir.y);
        return this.Future_P;
    }

    ///--------------------------------
    ///             移动              |
    ///--------------------------------
    Move(){
        this.Obs.translation = new Two.Vector(this.Obs.translation.x + GlobalClass.Obs_Speed * GlobalClass.time * this.Dir.x,this.Obs.translation.y + GlobalClass.Obs_Speed * GlobalClass.time * this.Dir.y);
    }


    Update(){
        this.Stop();
        this.Move();
        return this.Cal_Future_Pos();
    }


}