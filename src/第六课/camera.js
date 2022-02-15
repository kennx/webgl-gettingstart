//摄像机类

class pgl_camera{

    constructor(gl,u_cameraMatrix,dat_gui,fovy,aspect,near,far){
        this.gl = gl;
        this.dat_gui = dat_gui;
        this.u_cameraMatrix = u_cameraMatrix;

        this.cameraCtrlObj = {
            fovy : fovy,
            aspect : aspect,
            near : near,
            far : far,
            eyeX : 2,
            eyeY : 2,
            eyeZ : 2,
            centerX : 0,
            centerY : 0,
            centerZ : 0,
            upX : 0,
            upY : 1,
            upZ : 0
        };

        this.cameraMatrix = new pgl_matrix_4_4();
        this.setPerspective(fovy,aspect,near,far);

        var cameraPerspectiveGroup = dat_gui.addFolder("camera-Perspective");
        var that = this;
        cameraPerspectiveGroup.add(this.cameraCtrlObj,"fovy",10,100).onChange(function(value){
            that.setPerspective(value,that.cameraCtrlObj.aspect,that.cameraCtrlObj.near,that.cameraCtrlObj.far);
        });

        cameraPerspectiveGroup.add(this.cameraCtrlObj,"aspect",0.1,2.0).onChange(function(value){
            that.setPerspective(that.cameraCtrlObj.fovy,value,that.cameraCtrlObj.near,that.cameraCtrlObj.far);
        });

        cameraPerspectiveGroup.add(this.cameraCtrlObj,"near",0.001,100).onChange(function(value){
            that.setPerspective(that.cameraCtrlObj.fovy,that.cameraCtrlObj.aspect,value,that.cameraCtrlObj.far);
        });

        cameraPerspectiveGroup.add(this.cameraCtrlObj,"far",10,2000).onChange(function(value){
            that.setPerspective(that.cameraCtrlObj.fovy,that.cameraCtrlObj.aspect,that.cameraCtrlObj.near,value);
        });

        var cameraLookatGroup = dat_gui.addFolder("camera-LookAt");
        cameraLookatGroup.add(this.cameraCtrlObj,"eyeX",-10,10).onChange(function(value){
            that.lookAt(value,that.cameraCtrlObj.eyeY,that.cameraCtrlObj.eyeZ,
                that.cameraCtrlObj.centerX,that.cameraCtrlObj.centerY,that.cameraCtrlObj.centerZ,
                that.cameraCtrlObj.upX,that.cameraCtrlObj.upY,that.cameraCtrlObj.upZ);
        });
        cameraLookatGroup.add(this.cameraCtrlObj,"eyeY",-10,10).onChange(function(value){
            that.lookAt(that.cameraCtrlObj.eyeX,value,that.cameraCtrlObj.eyeZ,
                that.cameraCtrlObj.centerX,that.cameraCtrlObj.centerY,that.cameraCtrlObj.centerZ,
                that.cameraCtrlObj.upX,that.cameraCtrlObj.upY,that.cameraCtrlObj.upZ);
        });
        cameraLookatGroup.add(this.cameraCtrlObj,"eyeZ",-10,10).onChange(function(value){
            that.lookAt(that.cameraCtrlObj.eyeX,that.cameraCtrlObj.eyeY,value,
                that.cameraCtrlObj.centerX,that.cameraCtrlObj.centerY,that.cameraCtrlObj.centerZ,
                that.cameraCtrlObj.upX,that.cameraCtrlObj.upY,that.cameraCtrlObj.upZ);
        });
        cameraLookatGroup.add(this.cameraCtrlObj,"centerX",-10,10).onChange(function(value){
            that.lookAt(that.cameraCtrlObj.eyeX,that.cameraCtrlObj.eyeY,that.cameraCtrlObj.eyeZ,
                value,that.cameraCtrlObj.centerY,that.cameraCtrlObj.centerZ,
                that.cameraCtrlObj.upX,that.cameraCtrlObj.upY,that.cameraCtrlObj.upZ);
        });
        cameraLookatGroup.add(this.cameraCtrlObj,"centerY",-10,10).onChange(function(value){
            that.lookAt(that.cameraCtrlObj.eyeX,that.cameraCtrlObj.eyeY,that.cameraCtrlObj.eyeZ,
                that.cameraCtrlObj.centerX,value,that.cameraCtrlObj.centerZ,
                that.cameraCtrlObj.upX,that.cameraCtrlObj.upY,that.cameraCtrlObj.upZ);
        });
        cameraLookatGroup.add(this.cameraCtrlObj,"centerZ",-10,10).onChange(function(value){
            that.lookAt(that.cameraCtrlObj.eyeX,that.cameraCtrlObj.eyeY,that.cameraCtrlObj.eyeZ,
                that.cameraCtrlObj.centerX,that.cameraCtrlObj.centerY,value,
                that.cameraCtrlObj.upX,that.cameraCtrlObj.upY,that.cameraCtrlObj.upZ);
        });
        cameraLookatGroup.add(this.cameraCtrlObj,"upX",-10,10).onChange(function(value){
            that.lookAt(that.cameraCtrlObj.eyeX,that.cameraCtrlObj.eyeY,that.cameraCtrlObj.eyeZ,
                that.cameraCtrlObj.centerX,that.cameraCtrlObj.centerY,that.cameraCtrlObj.centerZ,
                value,that.cameraCtrlObj.upY,that.cameraCtrlObj.upZ);
        });
        cameraLookatGroup.add(this.cameraCtrlObj,"upY",-10,10).onChange(function(value){
            that.lookAt(that.cameraCtrlObj.eyeX,that.cameraCtrlObj.eyeY,that.cameraCtrlObj.eyeZ,
                that.cameraCtrlObj.centerX,that.cameraCtrlObj.centerY,that.cameraCtrlObj.centerZ,
                that.cameraCtrlObj.upX,value,that.cameraCtrlObj.upZ);
        });
        cameraLookatGroup.add(this.cameraCtrlObj,"upZ",-10,10).onChange(function(value){
            that.lookAt(that.cameraCtrlObj.eyeX,that.cameraCtrlObj.eyeY,that.cameraCtrlObj.eyeZ,
                that.cameraCtrlObj.centerX,that.cameraCtrlObj.centerY,that.cameraCtrlObj.centerZ,
                that.cameraCtrlObj.upX,that.cameraCtrlObj.upY,value);
        });
    }

    setPerspective(fovy,aspect,near,far){
        this.cameraMatrix.setIdentity();
        this.cameraMatrix.setPerspective(fovy,aspect,near,far);
        this.cameraMatrix.lookAt(this.cameraCtrlObj.eyeX,this.cameraCtrlObj.eyeY,
            this.cameraCtrlObj.eyeZ,this.cameraCtrlObj.centerX,this.cameraCtrlObj.centerY,
            this.cameraCtrlObj.centerZ,this.cameraCtrlObj.upX,this.cameraCtrlObj.upY,this.cameraCtrlObj.upZ);
    }

    lookAt(eyeX,eyeY,eyeZ,centerX,centerY,centerZ,upX,upY,upZ){
        this.cameraMatrix.setIdentity();
        this.cameraMatrix.setPerspective(this.cameraCtrlObj.fovy,this.cameraCtrlObj.aspect,this.cameraCtrlObj.near,this.cameraCtrlObj.far);
        this.cameraMatrix.lookAt(eyeX,eyeY,eyeZ,centerX,centerY,centerZ,upX,upY,upZ);
    }

    draw(){
        this.gl.uniformMatrix4fv(this.u_cameraMatrix,false,this.cameraMatrix.elements);
    }
}