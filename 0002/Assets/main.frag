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

float bw = 0.025;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main( void ) {
    
    float   fx = float(uv.x * 30);
    float   fy = float(uv.y * 30);
    int     ix = int(fx);
    int     iy = int(fy);
    float   px = fx - float(ix);
    float   py = fy - float(iy);
    
    float r;
    float g;
    float b;
    
    float cr = sqrt(2);
    float cx = (px * cr - cr / 2);
    float cy = (py * cr - cr / 2);
    
    float len = sqrt(cx * cx + cy * cy);

    r = rand(vec2(ix  ,iy));
    g = rand(vec2(ix+1,iy));
    b = rand(vec2(ix  ,iy+1));
    
    r *= 0.5 + (1-len) * 0.7;
    g *= 0.5 + (1-len) * 0.7;
    b *= 0.5 + (1-len) * 0.7;

    if (bw < px && px < 1-bw && bw < py && py < 1-bw){
    }else {
        r -= 0.2;
        g -= 0.2;
        b -= 0.2;
    }
    
    
    oColor = vec4(r, g, b, 1);
}
