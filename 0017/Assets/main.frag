#version 400

//
//  main.frag
//  Drawing
//
//  Created by Kazuma Kousaka on 2018/03/26.
//
in  vec4    color;
in  vec2    uv;
out vec4    oColor;
float pi = 3.14159265359;

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float calcAngle(vec2 center, vec2 pos){
    vec2 s = center-pos;
    float len = distance(center, pos);
    float result = asin(s.y/len);
    if(s.x < 0){
        result = pi-result;
    }
    return result;
}

void main( void ) {

    vec3  color     = vec3(0,0,0);
    vec2  center    = vec2(0.5,0.5);
    float v = calcAngle(center, vec2(uv));
    float len = distance(center,uv);
    float f =  log(sin(v)*8) * 4;
    float fa = f - floor(f);
    float fb = fa;
    if(fa > 0.5){ fb = 1-fa; }
    fb *= 2;
    
    float s = clamp(pow(fb,2),0,1);
    color = hsv2rgb(vec3((f+0.5)/(pi*2)*2, 1, s ));
    
    oColor = vec4(color.rgb, 1);
}

