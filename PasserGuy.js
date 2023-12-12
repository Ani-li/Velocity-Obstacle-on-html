class PasserGuy{

    //基础属性
    id;
    Guy;
    size = [10,10,10];
    defaultSpeed = 3;
    speed = 3;
    dir = new Two.Vector(1,1);
    StartPoint;
    EndPoint;
    //检测部分
    ray_Length = 1;

    constructor(Start,End,id){
      this.Guy = two.makeCircle(this.size[0],this.size[1],this.size[2]);
      this.StartPoint = Start;
      this.EndPoint = End;
      this.dir = new Two.Vector(this.EndPoint.x,this.EndPoint.y).sub(this.StartPoint);
      this.dir = this.dir.normalize();
      this.id = id;
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
      this.Guy.translation.x += this.speed * this.dir.x;
      this.Guy.translation.y += this.speed * this.dir.y;
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
      this.dir = new Two.Vector(this.End.x,this.End.y).sub(this.StartPoint);
      this.dir = this.dir.normalize();
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


    Initial(){}
    Update(frameCount,PeopleList){
      this.Move(frameCount);
      this.Stop();
      this.RayTesting(PeopleList);
    }
  }