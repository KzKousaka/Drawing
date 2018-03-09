#version 400

//
//  main.frag
//  Drawing
//
//  Created by Kazuma Kousaka on 2018/03/10.
//
in  vec4    color;
in  vec2    uv;
out vec4    oColor;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main( void ) {
    
    int     x;
    int     y;
    vec4    wh = vec4(1,1,1,1);
    vec4    bk = vec4(0,0,0,1);
    
    x = int(uv.x * 30);
    y = int(uv.y * 30);
    
    float rnd1 = rand(vec2(x  ,y));
    float rnd2 = rand(vec2(x+1,y));
    float rnd3 = rand(vec2(x,y+1));
    
    oColor = vec4(rnd1, rnd2, rnd3, 1);
    
//    if (x % 2 == 0) {
//        if (y % 2 == 0) {
//            oColor = bk;
//        }else{
//            oColor = wh;
//        }
//    }else {
//        if (y % 2 == 1) {
//            oColor = bk;
//        }else{
//            oColor = wh;
//        }
//    }
}
