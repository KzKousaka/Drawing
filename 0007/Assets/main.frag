#version 400

//
//  main.frag
//  Drawing
//
//  Created by Kazuma Kousaka on 2018/03/16.
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

vec3 drawCircle(vec2 center, float r, float h, float s){

    float dist = distance(center, uv);
    vec3 result;
    vec3 color;
    if( dist > r ){
        return vec3(0);
    }else{
        color = hsv2rgb(vec3(rand(center), 1, 1));
        result = color * (r-dist) * 3; + color * (dist) * 0.2;
    }
    
    if( dist < r * 0.3) {
        result += color * 0.2;
    }
    return result;
}

void main( void ) {
    float num = int(rand(vec2(0.8, 0.2)) * 256);
    vec3 color = vec3(0);
    for (float i = 0 ; i < num ; i ++ ){
        float x = rand(vec2( i, i+1));
        float y = rand(vec2( i+2, i+3));
        float c = rand(vec2( i+3, i+4));
        float r = rand(vec2( i-1, i-2)) * 0.3;
        color = screen(color, drawCircle(vec2(x,y), r , c, 1) * 0.75);
    }
    
    oColor = vec4(color.rgb, 1);
}
