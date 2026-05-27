export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.weeple.app&hl=ko&gl=KR";

export const APP_STORE_URL =
  "https://apps.apple.com/kr/app/weeple-%EA%B0%9C%EC%9D%B8-%EC%BB%A4%ED%94%8C-%EA%B0%80%EA%B3%84%EB%B6%80/id6768306021";

export const STORE_BADGES = [
  {
    label: "App Store",
    href: APP_STORE_URL,
    src: "/store-badges/app-store-ko.svg",
    analyticsLabel: "app_store",
  },
  {
    label: "Google Play",
    href: PLAY_STORE_URL,
    src: "/store-badges/google-play-ko-trimmed.png",
    analyticsLabel: "google_play",
  },
] as const;
