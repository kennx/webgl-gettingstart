//三维坐标轴pgl_axes

class pgl_axes {
    //构造函数
    constructor(gl, a_Position, a_Color, length, nXColor, nYColor, nZColor, dat_gui) {
        this.gl = gl;
        this.a_Position = a_Position;
        this.a_Color = a_Color;
        this.length = length;
        this.nXColor = nXColor;
        this.nYColor = nYColor;
        this.nZColor = nZColor;
        this.dat_gui = dat_gui;

        this.axesCtrlObj = {
            length: length,
            xColor: nXColor,
            yColor: nYColor,
            zColor: nZColor
        };

        this.vertices = new Float32Array([
            0, 0, 0, this.axesCtrlObj.length, 0, 0,
            0, 0, 0, 0, this.axesCtrlObj.length, 0,
            0, 0, 0, 0, 0, this.axesCtrlObj.length
        ]);

        var clrArrayX = new Float32Array([1.0, 1.0, 1.0, 1.0]);
        var clrArrayY = new Float32Array([1.0, 1.0, 1.0, 1.0]);
        var clrArrayZ = new Float32Array([1.0, 1.0, 1.0, 1.0]);

        ColorValueToColorArray(nXColor, clrArrayX);
        ColorValueToColorArray(nYColor, clrArrayY);
        ColorValueToColorArray(nZColor, clrArrayZ);

        this.Colors = new Float32Array([
            clrArrayX[0], clrArrayX[1], clrArrayX[2], clrArrayX[0], clrArrayX[1], clrArrayX[2],
            clrArrayY[0], clrArrayY[1], clrArrayY[2], clrArrayY[0], clrArrayY[1], clrArrayY[2],
            clrArrayZ[0], clrArrayZ[1], clrArrayZ[2], clrArrayZ[0], clrArrayZ[1], clrArrayZ[2],
        ]);

        clrArrayX = null;
        clrArrayY = null;
        clrArrayZ = null;

        this.vBuffer = gl.createBuffer();
        this.clrBuffer = gl.createBuffer();

        this.FSIZE = this.vertices.BYTES_PER_ELEMENT;

        var axesGroup = this.dat_gui.addFolder("axes");
        var that = this;
        axesGroup.add(this.axesCtrlObj,"length",0.01,100).onChange(function(value){
            that.setAxesLength(value);
        });
        axesGroup.addColor(this.axesCtrlObj,"xColor").onChange(function(value){
            that.setAxesColor(that.Colors,0,value);
        });
        axesGroup.addColor(this.axesCtrlObj,"yColor").onChange(function(value){
            that.setAxesColor(that.Colors,1,value);
        });
        axesGroup.addColor(this.axesCtrlObj,"zColor").onChange(function(value){
            that.setAxesColor(that.Colors,2,value);
        });

    }

    setAxesLength(length){
        this.vertices[3] = length;
        this.vertices[10] = length;
        this.vertices[17] = length;
    }

    setAxesColor(colors,nType,nColor){
        var clrArray = new Float32Array([1.0,1.0,1.0,1.0]);
        ColorValueToColorArray(nColor,clrArray);

        //nType = 0:X,1:Y,2:Z
        for (var i=0;i<3;i++){
            colors[nType * 6 + i] = clrArray[i];
            colors[nType * 6 + i+ 3] = clrArray[i];
        }
    }

    draw() {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertices, this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this.a_Position, 3, this.gl.FLOAT, false, this.FSIZE * 3, 0);
        this.gl.enableVertexAttribArray(this.a_Position);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.clrBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.Colors, this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this.a_Color, 3, this.gl.FLOAT, false, this.FSIZE * 3, 0);
        this.gl.enableVertexAttribArray(this.a_Color);

        this.gl.drawArrays(this.gl.LINES, 0, 6);
    }
}