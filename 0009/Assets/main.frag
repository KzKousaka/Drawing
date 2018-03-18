#version 400

//
//  main.frag
//  Drawing
//
//  Created by Kazuma Kousaka on 2018/03/18.
//
in  vec4    color;
in  vec2    uv;
out vec4    oColor;

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

void main( void ) {
    float pi = 3.1415;
    vec3 color= vec3(0);
    for(int i = 0; i < 10;i++){
        float f = i * 0.1;
        float s = pow(sinWave((uv.x+f)*pi*3, (uv.x+f)*pi*2*2, (uv.x+f)*pi*2*7), 50);
        if (s > 1){
            s = 1;
        }else if(s<0){
            s = 0;
        }
        
        vec3 c = hsv2rgb(vec3(i/15.0, 1, s));
        color = screen(color, c*0.8);
    }
    oColor = vec4(color.rgb, 1);
}
