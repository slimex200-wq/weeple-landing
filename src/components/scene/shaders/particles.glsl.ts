/**
 * ParticleField 의 포인트 셰이더.
 *
 * - 버텍스: position/size 에 약한 시간 노이즈 흔들림, pointSize 를 거리로 감쇠.
 * - 프래그먼트: 원형 알파 마스크 + teal/amber 색 가중(u_amber) + 약한 코어 글로우.
 * - 픽셀 풀러시 방지를 위해 사각 삼각형 4픽셀 이하는 잘라냄.
 */
export const particleVertex = /* glsl */ `
  precision highp float;

  attribute float aSeed;

  uniform float u_time;
  uniform float u_reduced;
  uniform float u_pixelRatio;
  uniform float u_size;

  varying float vSeed;

  void main() {
    vSeed = aSeed;

    vec3 p = position;
    float t = u_reduced > 0.5 ? 0.0 : u_time;

    // 부유 움직임 — seed 당 위상차
    p.x += sin(t * 0.25 + aSeed * 6.2831) * 0.12;
    p.y += cos(t * 0.22 + aSeed * 3.1415) * 0.10;
    p.z += sin(t * 0.18 + aSeed * 4.7) * 0.08;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // 거리 기반 사이즈
    float size = u_size * (1.0 + 0.6 * fract(aSeed * 17.0));
    gl_PointSize = size * u_pixelRatio * (1.0 / -mvPosition.z);
  }
`

export const particleFragment = /* glsl */ `
  precision highp float;

  uniform float u_amber;
  varying float vSeed;

  const vec3 TEAL  = vec3(0.0588, 0.4627, 0.4314);
  const vec3 AMBER = vec3(0.7059, 0.3255, 0.0353);
  const vec3 WARM  = vec3(0.545,  0.435,  0.278); // #8B6F47 partner

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;

    // 코어 → 가장자리 감쇠
    float alpha = smoothstep(0.5, 0.0, d);

    // seed 에 따라 tint 분배. 대부분 teal, 일부 warm brown, amber 섹션에서 amber.
    float r = fract(vSeed * 31.1);
    vec3 tint = r < 0.8 ? TEAL : WARM;
    tint = mix(tint, AMBER, u_amber);

    // 저밝기 유지 — "tiny luminous specks"
    vec3 col = tint * (0.55 + 0.45 * alpha);

    gl_FragColor = vec4(col, alpha * 0.55);
  }
`
