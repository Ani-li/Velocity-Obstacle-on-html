class PasserGuy{


    Guy;
    //基础属性
    id;
    
    //避障检测
    StartPoint;
    EndPoint;
    Dir = [];
    Future_P = [];
    Reach_Target = false;

    //检测部分
    ray_Length = 1;

    constructor(Start,End,id){
      this.id = id;
      this.Guy = two.makeCircle(GlobalClass.Peo_Size,GlobalClass.Peo_Size,GlobalClass.Peo_Size);
      this.StartPoint = Start;
      this.EndPoint = End;
    }

    ///--------------------------------
    ///            在出生点            |
    ///--------------------------------
    GenerateAtStartPoint(){
      this.Guy.translation = this.StartPoint;
    }

    ///--------------------------------
    ///             移动               |
    ///--------------------------------
    Move(frameCount){
      this.Guy.translation.x += this.speed * this.Dir.x;
      this.Guy.translation.y += this.speed * this.Dir.y;
    }

    ///--------------------------------
    ///         到边界停止             |
    ///--------------------------------
    Stop(){
      if(this.Guy.translation.x > two.width || this.Guy.translation.x < 0 || this.Guy.translation.y <0 || this.Guy.translation > two.height){
        this.speed = 0;
      }
    }

    ///--------------------------------
    ///         改变目标点             |
    ///--------------------------------
    ChangeDestination(x,y){
      this.speed = this.defaultSpeed;
      this.StartPoint = this.Guy.translation;
      this.End = new Two.Vector(x,y);
      this.Dir = new Two.Vector(this.End.x,this.End.y).sub(this.StartPoint);
      this.Dir = this.Dir.normalize();
    }

    ///-----------------------------------------------------------------------------------------------------------///
    ///                                          检测部分                                                          ///
    ///-----------------------------------------------------------------------------------------------------------///


    ///--------------------------------
    ///           距离检测             |
    ///--------------------------------
    RayTesting(PeopleList){
      for(var i = 0 ; i<PeopleList.length ; i++){
        if(i != this.id){
          if(this.Guy.translation.distanceTo(PeopleList[i].Guy.translation)<50){
            this.Guy.fill = 'red';
            return
          }
        }
        
      }
      this.Guy.fill = 'white';
    }


    ///-----------------------------------------------------------------------------------------------------------///
    ///                                          VO动态避障                                                        ///
    ///-----------------------------------------------------------------------------------------------------------///

    ///--------------------------------
    ///           终点检测             |
    ///--------------------------------
    Check_Reached(){
      var is_reach = false;
      if(this.Guy.translation.distanceTo(this.EndPoint) < 6)is_reach = true;
      return is_reach;
    }


    ///--------------------------------
    ///        计算下一帧的位置        |
    ///--------------------------------
    Cal_Future_Pos(){
      if(this.Check_Reached())this.Reach_Target = true;
      else{
        this.Dir = [];
        this.Future_P = [];
        for(var i = 0; i<=GlobalClass.Peo_Dir_Sampler_cut ; i++){
          var step = (i*GlobalClass.Peo_Dir_Sampler_cut) * 360;
          var d = new Two.Vector(Math.cos(step),Math.sin(step));
          var fp = new Two.Vector(this.Guy.translation.x + GlobalClass.Peo_Speed * GlobalClass.time * d.x,this.Guy.translation.y + GlobalClass.Peo_Speed * GlobalClass.time * d.y);
          this.Dir.push(d);
          this.Future_P.push(fp);
        }
        
      }
    }

    ///--------------------------------
    ///      查找最佳路径并更新位置     |
    ///--------------------------------
    Find_Path(Obs_Future_Pos){
      this.Cal_Future_Pos();
      var Paths = this.Check_Paths(Obs_Future_Pos);
      var END = this.EndPoint;
      Paths.sort(function(a,b){
        return a.distanceTo(END) - b.distanceTo(END);
      });
      this.Guy.translation = Paths[0];
    }

    ///--------------------------------
    ///          遍历所有的路径        |
    ///--------------------------------
    Check_Paths(Obs_Future_Pos){
      var free_path = []
      for(var i of this.Future_P){
        var flag = true;
        for(var j of Obs_Future_Pos){
          var dis = i.distanceTo(j);
          if(dis<GlobalClass.Peo_Size + GlobalClass.Obs_Size + GlobalClass.safety_margin)flag = false;
        }
        if(!flag)continue;
        free_path.push(i);
      }
      return free_path;
    }




    Initial(){}
    Update(){
      this.Find_Path([]);
      //this.Move(frameCount);
      //this.Stop();
      //this.RayTesting(PeopleList);
    }
  }