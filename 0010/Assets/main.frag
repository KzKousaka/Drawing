#version 400

//
//  main.frag
//  Drawing
//
//  Created by Kazuma Kousaka on 2018/03/19.
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
    float d = ((distance(center, uv)) * 2 / r) + sin(a) * (1-(s/50)) * 0.5;

//    d += sin(a);
    if(d > 1){
        d = 1-(d-1);
        if(d < 0){
            d = 0;
        }
    }
    return d;
}

void main( void ) {
    
    vec3 color= vec3(0);
    for(int i = 0; i < 10;i++){
        float s = pow(sinCircle(vec2(0.5,0.5), 0.8, (i+1)*2), 10);
        if ( s > 1 ){ s = 1; }
        else if(s < 0){ s = 0; }
    
        vec3 c = hsv2rgb(vec3(i/10.0, 1, s));
        color = screen(color, c * 0.8);
    }
    oColor = vec4(color.rgb, 1);
}
