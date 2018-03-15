#version 400

//
//  main.frag
//  Drawing
//
//  Created by Kazuma Kousaka on 2018/03/15.
//
in  vec4    color;
in  vec2    uv;
out vec4    oColor;

float bw = 0.025;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float closingToWhite(float c, float w){
    return c + (1-c) * w;
}

vec3 screen(vec3 c1, vec3 c2) {
    return vec3(1)-(vec3(1)-c1) * (vec3(1)-c2);
}

vec3 drawCircle(vec2 center, float sp, float h, float s){

    float dist = distance(center, uv);
    
    float   f = float(dist * sp);
    int     i = int(f);
    float   p = f - float(i);
    vec3 color;
    color = hsv2rgb(vec3(h, 1, 1));
    float w;
    if(p > 0.5) {
        w = s;
    }else {
        w = 1-s;
    }
    color *= vec3(w);
    return color;
}

void main( void ) {
    float s2 = sqrt(2);
    vec3 color1 = drawCircle(vec2(0,0),   s2     , 0.1, 1);
    vec3 color2 = drawCircle(vec2(1,0),   s2* 3  , 0.6, 0);
    vec3 color3 = drawCircle(vec2(0,1),   s2* 3  , 0.1, 1);
    vec3 color4 = drawCircle(vec2(1,1),   s2* 128, 0.6, 0);
    vec3 color = screen(color1 ,color2) + screen(color3 , color4);
    
    float dist = distance(vec2(0.5, 0.5), uv);
    color *= 1-dist;
    
    oColor = vec4(color.rgb, 1);
}
