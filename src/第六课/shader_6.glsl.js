export const vertex = /* glsl */`
uniform mat4 u_cameraMatrix;
attribute vec4 a_Position;
attribute vec4 a_Color;
varying vec4 v_Color;
void main(){
    gl_Position = u_cameraMatrix * a_Position;
    v_Color = a_Color;
}
`;

export const fragment = /* glsl */`
precision mediump float;
varying vec4 v_Color;
void main(){
    gl_FragColor = v_Color;
}
`;