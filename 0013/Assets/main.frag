#version 400

//
//  main.frag
//  Drawing
//
//  Created by Kazuma Kousaka on 2018/03/22.
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
    
    vec3    color = vec3(0);
    vec2    p = uv;
    vec2    center = vec2(0.5,0.5);
    float   len = distance(center, p) * 2;
    float   baseAngle = calcAngle(center, p);
    
    float angle = baseAngle + pi * sin(len * 20) *0.1;
    p = vec2(sin(angle), cos(angle)) * len;
    if(angle > pi){
        p.x = -p.x;
    }

    float l = distance(uv, p);
    float af = (angle/(pi*2)*5);
    float as = af - floor(af);
    if(as>0.5){ as = 1-as; }
    as = clamp(as*3 + 0.2, 0, 1);
    color = vec3(pow(as,5)) * hsv2rgb(vec3(angle/(pi*2),1,1));
    
    oColor = vec4(color.rgb, 1);
}
