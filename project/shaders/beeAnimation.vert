
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;

attribute vec2 aTextureCoord;
attribute vec4 aVertexColor;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

uniform vec3 uAmbientLight;
uniform vec3 uLightDirection;
uniform vec3 uLightColor;

varying vec2 vTextureCoord;
varying vec4 vVertexColor;  
varying vec3 vTransformedNormal;


uniform float normScale;
uniform float transitionSpeed;
uniform float flyOffset;

void main() {

    vec4 worldPosition = uMVMatrix * vec4(aVertexPosition, 1.0);
    vec3 translation = vec3(0.0, flyOffset*sin(timeFactor*normScale*transitionSpeed), 0.0);
    gl_Position = uPMatrix * (worldPosition + vec4(translation, 0.0));
    vTextureCoord = aTextureCoord;
    vVertexColor = aVertexColor; 
    vTransformedNormal = (uNMatrix * vec4(aVertexNormal, 0.0)).xyz;


}

