class GlobalClass{
    static Peo_Speed = 1;
    static Obs_Speed = 1;

    static Peo_Size = 30;
    static Obs_Size = 35;

    static time = 1;
    static time_future = 1.5;
    static safety_margin = 7;
    static number_obstacles = 20;
    static Peo_Dir_Sampler_cut = 50;
}

///--------------------------------
///             更新参数           |
///--------------------------------
function updateParameter(parameter, value) {
    GlobalClass[parameter] = value;
}



//一些参数更新后会更新two的显示
//障碍物加上贴图
//trigger控制vis——tool的显示
//一个刷新two.js的按钮