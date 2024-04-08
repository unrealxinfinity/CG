#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

varying vec2 vTextureCoord;
varying vec2 timeVec;

void main() {
	timeec = aTextureCoord + vec2(timeFactor/100.0, timeFactor/100.0);
	vec4 color = texture2D(uSampler2,timeVec);
	vec3 offset = vec3(0.0, 0.0, color.z/16.0);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);

	vTextureCoord = aTextureCoord;
}

