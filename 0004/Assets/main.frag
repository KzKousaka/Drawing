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

float getSin(float rad) {
    float y = sin(rad) * 0.2;
    return y;
}

void main( void ) {
    float rad   = uv.x * 3.1415 * 3;
    float   y  = (uv.y+sin(rad)* 0.02 - cos(rad) * 0.1);
    if (y < 0 ) { y += 1; }
    
    float   fy = float(y * 256);
    int     iy = int(fy);
    float   py = fy - float(iy);
    
    float h = rand(vec2(iy,iy));
    float s = rand(vec2(iy+1, iy+1));
    vec3 color;
    if (py  == 0){
        color = hsv2rgb(vec3(h, s, 1));
    }else {
        color = hsv2rgb(vec3(h, s, 1));
    }
    float v = rand(vec2(iy+2, iy+2));
    
    if (py > 0.5){
        py = 1 - py;
    }

    py *= 1.2;
    color.rgb *= py;
    color.rgb = 1-color.rgb;
    oColor = vec4(color.rgb, 1);
}
