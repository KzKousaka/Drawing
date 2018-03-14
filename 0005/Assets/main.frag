#version 400

//
//  main.frag
//  Drawing
//
//  Created by Kazuma Kousaka on 2018/03/13.
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

void main( void ) {

    vec2 center = vec2(0.5,0.5);
    float dist = distance(center, uv);
    
    float   f = float(dist * 196);
    int     i = int(f);
    float   p = f - float(i);
    
    float h = rand(vec2(i, i));
    float s = 1.414 - dist;
    float v = 1.414 - dist;
    vec3 color;
    color = hsv2rgb(vec3(h, 0.5 + v * 0.2, 0.5 + v * 0.5));
    float w = abs(p-0.5) * 2 + dist;
    
    color.r = closingToWhite(color.r, w);
    color.g = closingToWhite(color.g, w);
    color.b = closingToWhite(color.b, w);
    
    oColor = vec4(color.rgb, 1);
}
