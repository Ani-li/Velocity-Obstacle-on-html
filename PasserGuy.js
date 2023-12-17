class PasserGuy{


    Guy;
    //基础属性
    id;
    Texture = 'Peo_Tex.png';
    
    //避障检测
    StartPoint;
    EndPoint;
    Dir = [];
    Future_P = [];
    Reach_Target = false;

    //可视化部分
    VisTool;


    constructor(Start,End,id){
      this.id = id;
      this.Guy = new Two.Sprite(this.Texture,100,100,1,1,0);
      this.StartPoint = Start;
      this.EndPoint = End;
      this.Guy.scale = 1;
    }

    ///--------------------------------
    ///            在出生点            |
    ///--------------------------------
    GenerateAtStartPoint(){
      this.Guy.translation = this.StartPoint;
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
      this.EndPoint = new Two.Vector(x,y);
    }

    ///-----------------------------------------------------------------------------------------------------------///
    ///                                          VO动态避障                                                        ///
    ///-----------------------------------------------------------------------------------------------------------///

    ///--------------------------------
    ///           终点检测             |
    ///--------------------------------
    Check_Reached(){
      var is_reach = false;
      if(this.Guy.translation.distanceTo(this.EndPoint) < 6){
        is_reach = true;
        this.VisTool.clearPath();
      }
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
          var fp = new Two.Vector(this.Guy.translation.x + GlobalClass.Peo_Speed * (GlobalClass.time + GlobalClass.time_future) * d.x,this.Guy.translation.y + GlobalClass.Peo_Speed * (GlobalClass.time + GlobalClass.time_future) * d.y);
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
      if(Paths.length != 0){
        this.Guy.translation = Paths[0];
      }
      else{
        this.Guy.translation = this.Future_P[0];
      }
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

    Initial(){
      this.GenerateAtStartPoint();
      this.VisTool = new DataVis_Guy();
    }

    Update(ObsList){
      this.Find_Path(ObsList);
      this.VisTool.Update(this.Guy.translation);
      //this.Move(frameCount);
      //this.Stop();
      //this.RayTesting(PeopleList);
    }
  }