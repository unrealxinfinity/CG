#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
varying vec2 timeVec;

void main() {
	vec4 color = texture2D(uSampler, timeVec);
	vec4 color2 = texture2D(uSampler, timeVec);

	gl_FragColor = vec4((color.r+color2.r)/2.0, (color.g+color2.g)/2.0, (color.b+color2.b)/2.0, 1.0);
}