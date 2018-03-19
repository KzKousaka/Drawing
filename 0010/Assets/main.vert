#version 400

//
//  main.vert
//  Drawing
//
//  Created by Kazuma Kousaka on 2018/03/13.
//

uniform mat4    ciModelViewProjection;
in vec4         ciPosition;
in vec4         ciColor;
in vec2         ciTexCoord0;

out vec4        color;
out vec2        uv;

void main()
{
    gl_Position    = ciModelViewProjection * ciPosition;
    uv    = ciTexCoord0;
    color = ciColor;
}
