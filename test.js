var increment = Math.PI / 256;
var TWO_PI = Math.PI * 2;

var two = new Two({
  type: Two.Types.svg,
  fullscreen: true
}).appendTo(document.body);




///画布--------------------------------------------------------------------------
var background = two.makeGroup();
///--------------------------------------------------------------------------

///People初始化--------------------------------------------------------------------------
var peopleArray = [];
for(var i = 0 ; i<1 ; i++){
  Start = new Two.Vector(Math.random() * two.width,Math.random() * two.height);
  End = new Two.Vector(two.width/2, two.height/2);
  var people = new PasserGuy(Start,End,i);
  peopleArray.push(people);
}

peopleArray.forEach(function(p){p.GenerateAtStartPoint()});

            //获取鼠标点击，改变目标位置
document.addEventListener("click", function (e) {
  peopleArray.forEach(function(p){
    p.ChangeDestination(e.clientX,e.clientY);
  })
})


///--------------------------------------------------------------------------


///Obstacle初始化--------------------------------------------------------------------------
var Obs_Pos_list = []
var Obs_list = []
for(var i = 0 ; i<GlobalClass.number_obstacles ; i++){
  var obs = new Obstacle();
  Obs_list.push(obs);
}

Obs_list.forEach(function(o){
  o.Initial();
})
///--------------------------------------------------------------------------


///--------------------------------
///             主循环             |
///--------------------------------
two
  .bind('resize', function() {
    
  })
  .bind('update', function(frameCount) {
    Obs_Pos_list = []

    peopleArray.forEach(function(p){
      background.add(p.Guy);
    });
    Obs_list.forEach(function(o){
      background.add(o.Obs);
    });

    Obs_list.forEach(function(o){
      var p = o.Update();
      Obs_Pos_list.push(p);
    });
    peopleArray.forEach(function(p){
      p.Update(Obs_Pos_list);
    })
    



  })
  .play();

 