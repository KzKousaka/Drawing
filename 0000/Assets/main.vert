#version 400

//
//  main.vert
//  Drawing
//
//  Created by Kazuma Kousaka on 2018/03/09.
//

uniform mat4    ciModelViewProjection;
in vec4         ciPosition;
in vec4         ciColor;
out vec4        Color;

void main()
{
    gl_Position    = ciModelViewProjection * ciPosition;
    Color = ciColor;
}
