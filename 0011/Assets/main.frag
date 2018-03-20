#version 400

//
//  main.frag
//  Drawing
//
//  Created by Kazuma Kousaka on 2018/03/20.
//
in  vec4    color;
in  vec2    uv;
out vec4    oColor;
float pi = 3.1415;

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}


vec3 screen(vec3 c1, vec3 c2) {
    return vec3(1)-(vec3(1)-c1) * (vec3(1)-c2);
}

float sinWave(float r, float r2, float r3){
    float y = (sin(r)*0.01+sin(r2)*0.3+sin(r3)*0.05+1)*0.5;
    return 1-abs(y - uv.y);
}

float calcAngle(vec2 center, vec2 pos){
    vec2 s = center-pos;
    float len = distance(center, pos);
    float result = asin(s.y/len);
    if(s.x < 0){
        result = -result;
    }
    return result;
}

float sinCircle(vec2 center, float r, float s) {
    float a = calcAngle(center, uv) * s;
    float d = ((distance(center, uv)) * 2 / r) + sin(a) * (1-(s/50)) * 0.05;
    
    if(d > 1){
        d = 1-(d-1);
        if(d < 0){
            d = 0;
        }
    }
    return d;
}

vec3 diamond(vec2 p){
    float powNum = 25;
    vec3 color = vec3(1);
    color = vec3(pow(1-abs(0.5-p.x - p.y), powNum));
    color = screen(color, vec3(pow(1-abs(p.x - p.y+0.5), powNum)));
    color = screen(color, vec3(pow(1-abs(1-p.x - p.y+0.5), powNum)));
    color = screen(color, vec3(pow(1-abs(p.x - p.y-0.5), powNum)));
    return color;
}

void main( void ) {
    
//    vec3 color= vec3(0);
//    for(int i = 0; i < 10;i++){
//        float s = pow(sinCircle(vec2(0.5,0.5), 0.8, (i+1)*2), 50);
//        if ( s > 1 ){ s = 1; }
//        else if(s < 0){ s = 0; }
//
//        vec3 c = hsv2rgb(vec3(i/10.0, 1, s));
//        color = screen(color, c * 0.8);
//    }

    
    vec2 p = uv;
    
    vec3 color = vec3(0);
    
    for( int i = 0 ; i < 10 ; i++) {
        p *= 1.2;
        p -= 0.1;
        float c = clamp(diamond(p).r, 0, 1);
        color = screen(color, hsv2rgb(vec3(i/10.0, 1, c)) * 0.8);
    }
    
//    if (p.x < 0.5 ) {
//        if(p.y > 0.5){
//            if(1-p.y < 0.5-p.x){
//                color = vec3(p.x);
//            }
//        }else{
//            if(0.5-p.x > p.y){
//                color = vec3(0);
//            }
//        }
//    }else{
//        if (p.y > 0.5) {
//            color = vec3(p.x - p.y);
////            if(p.x-0.5 > 1-p.y) {
////
////            }
//        }else{
//            if(1-p.x < 0.5-p.y) {
//                color = vec3(0);
//            }
//        }
//    }
//    float y = abs(uv.y - 0.5) * 2;
//    if (y > 1){ y = 1-(y - 1); }
//
////    y = pow (y, 50);
////
//    float x = abs(uv.x - 0.5) * 2;
//    if (x > 1){ x = 1-(x - 1); }
//    vec3 color;
//    if ( x < y){
//        color = vec3(1);
//    }else{
//        color = vec3(0);
//    }
    oColor = vec4(color.rgb, 1);
}
