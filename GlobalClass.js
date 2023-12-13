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

//三个关卡：
//1.无避障，静态障碍物（随机大的圆柱，加上障碍物贴图）
//2.有避障，静态障碍物（随机大的圆柱，加上障碍物贴图）
//3.有避障，动态障碍物（随机小的模拟行人，加上行人贴图）

//可视化：
//1.✔实时速度可视化
//2.路径可视化，抵达终点后擦除

//Global参数暴露