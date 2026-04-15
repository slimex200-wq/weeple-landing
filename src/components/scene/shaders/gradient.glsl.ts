/**
 * ShaderBackground 의 프래그먼트/버텍스 셰이더 소스.
 *
 * 디자인 톤:
 *   - Editorial Warm paper(#F5F1EA) 를 베이스로, teal(#0F766E) / amber(#B45309)
 *     를 Simplex noise 로 흐르게. Stripe.com/Linear.app 톤의 fluid gradient.
 *   - u_mouse(마우스), u_scroll(0→1), u_amber(0→1 앰버 섹션 가중치),
 *     u_time(초) 4개 uniform 으로 구동.
 *   - GPU 부담을 줄이기 위해 octave 2개로 제한.
 *
 * Reduced-motion 시 u_time 을 동결해 프레임당 동일 이미지 산출.
 */
export const gradientVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const gradientFragment = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform float u_time;
  uniform vec2  u_mouse;        // -1..1 range
  uniform float u_scroll;       // 0..1 전체 페이지 진행률
  uniform float u_amber;        // 0..1 앰버 섹션(pricing) 가중
  uniform float u_reduced;      // 1 이면 모션 제한

  // ---- Simplex 2D noise (Ashima) ----
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                    + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // ---- tokens (정확한 Editorial Warm 값) ----
  const vec3 PAPER  = vec3(0.9608, 0.9451, 0.9176); // #F5F1EA
  const vec3 PAPERW = vec3(0.9373, 0.9137, 0.8667); // #EFE9DD
  const vec3 TEAL   = vec3(0.0588, 0.4627, 0.4314); // #0F766E
  const vec3 AMBER  = vec3(0.7059, 0.3255, 0.0353); // #B45309

  void main() {
    vec2 uv = vUv;

    // 모션 감쇠
    float t = u_reduced > 0.5 ? 0.0 : u_time * 0.04;

    // 마우스 warp (아주 약하게)
    vec2 m = u_mouse * 0.12;

    // low-freq flow field
    float n1 = snoise(uv * 1.4 + vec2(t, -t * 0.6) + m);
    float n2 = snoise(uv * 2.6 - vec2(t * 0.8, t) + n1 * 0.3);
    float flow = 0.5 + 0.5 * (n1 * 0.6 + n2 * 0.4);

    // 섹션에 따라 teal ↔ amber 가중
    vec3 accent = mix(TEAL, AMBER, u_amber);

    // 바탕은 paper↔paperWarm 사이의 숨쉬는 그라디언트
    float vert = smoothstep(-0.2, 1.2, uv.y + n1 * 0.2);
    vec3 baseBg = mix(PAPERW, PAPER, vert);

    // 스크롤 진행에 따라 액센트 세기를 완만히
    float accentAmt = 0.09 + 0.05 * u_scroll + 0.08 * u_amber;
    // flow 가 높은 영역에만 액센트 스며들게
    float reveal = smoothstep(0.55, 0.95, flow);
    vec3 col = mix(baseBg, accent, reveal * accentAmt);

    // 비네트 느낌의 바깥 약한 어두움 (paper 톤 유지)
    float d = distance(uv, vec2(0.5, 0.5));
    col *= 1.0 - smoothstep(0.55, 1.1, d) * 0.08;

    // 아주 미세한 필름 노이즈 — 종이 그레인
    float grain = (fract(sin(dot(uv * 1000.0 + t, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.015;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
  }
`
