class DataVis_Guy{
    arrow; //箭头
    Past_Dir; //原来的速度

    PathVert;
    Path;

    //可视化视锥
    VOPStart;
    VOPEnd;
    VOPathVert;
    VOPath;
    constructor(){
        this.arrow = two.makeArrow(0, 0, 100,0);
        this.Past_Dir = new Two.Vector(1,1);
        this.Past_Dir = this.Past_Dir.normalize();
        
        this.PathVert = []
        this.Path = new Two.Path(this.PathVert,false,false,false);
        this.Path.fill = 'none';
        two.add(this.Path);

        this.VOPathVert = []
        this.VOPath = new Two.Path(this.VOPathVert,false,false,false);
        this.VOPath.fill = 'none';
        two.add(this.VOPath);

        this.VOPStart = new Two.Vector(-1,-1);
        this.VOPEnd = new Two.Vector(-1,-1);
    }


    Update(pos){
        this.VisuallizeDirection(pos);
        this.VisuallizeTrack(pos);
        this.VisuallizeVO();

        if(GlobalClass.Vis_Direction){
            this.arrow.visible = true;
        }
        else{
            this.arrow.visible = false;
        }
        
        if(GlobalClass.Vis_Track){
            this.Path.visible = true;
        }
        else{
            this.Path.visible = false;
        }

        if(GlobalClass.Vis_VelocityObs){
            this.VOPath.visible = true;
        }
        else{
            this.VOPath.visible = false;
        }
    }

    clearPath(){
        this.PathVert = [];
        this.Path.vertices = this.PathVert;
    }

    //可视化方向
    VisuallizeDirection(pos){
        var dir = new Two.Vector(pos.x,pos.y).sub(this.arrow.translation);
        dir = dir.normalize();

        if(this.Past_Dir.distanceTo(dir) > 0.25){
            this.arrow.rotation = Math.atan2(dir.y, dir.x);
        }
        this.arrow.translation = pos;
        this.Past_Dir = dir;
    }

    //可视化轨迹
    VisuallizeTrack(pos){
        this.PathVert.push(new Two.Anchor(pos.x,pos.y,pos.x,pos.y,pos.x,pos.y,Two.Commands.line))
        this.Path.vertices = this.PathVert;
    }

    //可视化速锥
    VisuallizeVO(){
        var dir = new Two.Vector(this.VOPEnd.x,this.VOPEnd.y).sub(this.VOPStart);
        var dirX = new Two.Vector(-dir.y,dir.x);
        var dirY = new Two.Vector(dir.y,-dir.x);
        dirX = dirX.normalize().multiply(GlobalClass.Obs_Size);
        dirY = dirY.normalize().multiply(GlobalClass.Obs_Size);

        var point01 = new Two.Vector(this.VOPEnd.x,this.VOPEnd.y).add(dirX);
        var point02 = new Two.Vector(this.VOPEnd.x,this.VOPEnd.y).add(dirY);

        this.VOPathVert = [];
        this.VOPathVert.push(new Two.Anchor(this.VOPStart.x,this.VOPStart.y,this.VOPStart.x,this.VOPStart.y,this.VOPStart.x,this.VOPStart.y,Two.Commands.line));
        this.VOPathVert.push(new Two.Anchor(point01.x,point01.y,point01.x,point01.y,point01.x,point01.y,Two.Commands.line));
        this.VOPathVert.push(new Two.Anchor(point02.x,point02.y,point02.x,point02.y,point02.x,point02.y,Two.Commands.line));
        this.VOPathVert.push(new Two.Anchor(this.VOPStart.x,this.VOPStart.y,this.VOPStart.x,this.VOPStart.y,this.VOPStart.x,this.VOPStart.y,Two.Commands.line));
        this.VOPath.vertices = this.VOPathVert;
    }

    SetVisuallizeVO(i,j){
        this.VOPStart = i;
        this.VOPEnd = j;
    }
}