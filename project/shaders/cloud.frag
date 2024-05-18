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

    
    vec2 regionMin = vec2(scaledTime, 0.2); 
    vec2 regionMax = vec2(scaledTime + 0.05, 0.30); 
    float transformedX = vTextureCoord.x;
    if (scaledTime >= 0.95 && vTextureCoord.x <= 0.1) {
        transformedX += 1.0;
    }
    vec2 aTextureCoord = vec2(transformedX, vTextureCoord.y);
    
    // Check if the current fragment is in the region
    if (vTextureCoord.y > regionMin.y && vTextureCoord.y < regionMax.y)
    {
        vec2 cloudCoords = (aTextureCoord - regionMin) / vec2(0.05,0.1);
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