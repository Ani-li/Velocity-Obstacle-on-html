class DataVis_Guy{
    arrow; //箭头
    Past_Dir; //原来的速度
    constructor(){
        this.arrow = two.makeArrow(0, 0, 100,0);
        this.Past_Dir = new Two.Vector(1,1);
        this.Past_Dir = this.Past_Dir.normalize();
    }


    Update(pos){
        var dir = new Two.Vector(pos.x,pos.y).sub(this.arrow.translation);
        dir = dir.normalize();

        if(this.Past_Dir.distanceTo(dir) > 0.25){
            this.arrow.rotation = Math.atan2(dir.y, dir.x);
            
        }
        
        this.arrow.translation = pos;
        

        this.Past_Dir = dir;
        //two.remove(arrow);
    }
}