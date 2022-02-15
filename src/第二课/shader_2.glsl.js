export const vertex = /* glsl */`
void main(){
    gl_Position = vec4(0.0,0.0,0.0,1.0);//设置坐标
    gl_PointSize = 100.0;//设置点的尺寸
}
`;

export const fragment = /* glsl */`
void main(){
    gl_FragColor = vec4(1.0,0.0,0.0,1.0);//设置颜色
}
`;