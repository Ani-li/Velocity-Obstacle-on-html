class DataVis_Guy{
    arrow; //箭头
    Past_Dir; //原来的速度

    PathVert;
    Path;
    constructor(){
        this.arrow = two.makeArrow(0, 0, 100,0);
        this.Past_Dir = new Two.Vector(1,1);
        this.Past_Dir = this.Past_Dir.normalize();
        
        this.PathVert = []
        this.Path = new Two.Path(this.PathVert,false,false,false);
        this.Path.fill = 'none';
        two.add(this.Path);
    }


    Update(pos){
        var dir = new Two.Vector(pos.x,pos.y).sub(this.arrow.translation);
        dir = dir.normalize();

        if(this.Past_Dir.distanceTo(dir) > 0.25){
            this.arrow.rotation = Math.atan2(dir.y, dir.x);
        }
        this.arrow.translation = pos;
        this.Past_Dir = dir;
        
        this.PathVert.push(new Two.Anchor(pos.x,pos.y,pos.x,pos.y,pos.x,pos.y,Two.Commands.line))
        this.Path.vertices = this.PathVert;
    }

    clearPath(){
        this.PathVert = [];
        this.Path.vertices = this.PathVert;
    }
}