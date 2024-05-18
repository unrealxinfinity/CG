#version 300 es
precision highp float;

in vec4 vFinalColor;
in vec2 vTextureCoord;

out vec4 fragColor;

uniform sampler2D uSampler;
uniform sampler2D uSampler1;

uniform bool uUseTexture;
uniform float timeFactor;
vec2 samp;
void main() {
    vec4 panoramaTexture = texture(uSampler, vTextureCoord);
    vec4 cloudTexture = vec4(0.0);

    float scaledTime = timeFactor;

    if((scaledTime+0.05)>1.0){
        scaledTime = 0.0 ;
    }
    vec2 regionMin = vec2(scaledTime, 0.2); 
    vec2 regionMax = vec2(scaledTime + 0.05, 0.30); 
    
    // Check if the current fragment is in the region
    if (vTextureCoord.y > regionMin.y && vTextureCoord.y < regionMax.y)
    {
        vec2 cloudCoords = (vTextureCoord - regionMin) / (regionMax - regionMin);
        cloudCoords.x = vTextureCoord.x + scaledTime;
        cloudTexture = texture(uSampler1, cloudCoords);
	
    }
    vec4 finalColor;
    if (panoramaTexture.b > 0.70) {
        finalColor = panoramaTexture+cloudTexture;
    }
    else {
        finalColor = panoramaTexture;
    }
    fragColor = finalColor * vFinalColor;
}