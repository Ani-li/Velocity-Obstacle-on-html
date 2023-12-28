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



//速度方向颜色，轨迹线颜色,速锥形状放大，速锥颜色