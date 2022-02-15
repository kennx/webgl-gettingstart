export const vertex = /* glsl */`
void main(){
    //左上角：vec4(-1,1,0,1.0)
    //左侧中：vec4(-1,0,0,1.0)
    //左下角: vec4(-1,-1,0,1.0)
    //上侧中: vec4(0,1,0,1.0)
    //右上角: vec4(1,1,0,1.0)
    //右侧中: vec4(1,0,0,1.0)
    //右下角: vec4(1,-1,0,1.0)
    //下侧中: vec4(0,-1,0,1.0)
    //原点:   vec4(0,0,0,1.0)
    gl_Position = vec4(0,0,0,1.0);//设置坐标
    gl_PointSize = 100.0;//设置点的尺寸
}
`;

export const fragment = /* glsl */`
void main(){
    gl_FragColor = vec4(1.0,0.0,0.0,1.0);//设置颜色
}
`;