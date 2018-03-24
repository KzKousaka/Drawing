#version 400

//
//  main.frag
//  Drawing
//
//  Created by Kazuma Kousaka on 2018/03/23.
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

    vec3  color = vec3(0,0,0);
    float l = distance(vec2(uv.x*cos(uv.x*pi*2)*0.5, uv.y*sin(uv.y*pi*2)*0.5), vec2(0.5,0.5));
    float af = l*40;
    float as = af - floor(af);
    if(as > 0.5){ as = 1-as;}
    as *= 2;

    color = vec3(as);
    
    oColor = vec4(color.rgb, 1);
}

