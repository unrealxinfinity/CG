#ifdef GL_ES
precision highp float;
#endif

varying vec2 fragTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {
	vec4 color = texture2D(uSampler, fragTextureCoord);
	vec4 color2 = texture2D(uSampler, fragTextureCoord);

	gl_FragColor = vec4((color.r+color2.r)/2.0, (color.g+color2.g)/2.0, (color.b+color2.b)/2.0, 1.0);
}