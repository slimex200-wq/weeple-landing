# Play Store ASO Note - 2026-05-14

## Current Problem

- Users ask whether weeple can be used as a personal budget app before couple linking.
- New public listing is not surfacing yet for broad queries such as `가계부`, `커플 가계부`, or `AI 가계부`.
- `AI 가계부` is useful as a secondary keyword, but the main user intent is still `가계부`, `개인 가계부`, and `커플 가계부`.
- Live web Play Store metadata currently reads `weeple - AI 가계부, 커플 예산`; broad `가계부` search did not include `com.weeple.app` in the parsed web result set, while `커플 가계부` and `AI 가계부` did include it lower in the list. Mobile Play Store results may differ by device, location, carrier, and supported features.

## Why Search May Not Show Yet

Google Play says search and visibility consider app title, developer name, descriptions, store listing completeness, category/tags, ratings, reviews, downloads, user behavior, device compatibility, location, carrier, and supported features. New apps usually have weak ranking signals, so broad category keywords can take time even after the listing is live.

## Recommended Positioning

Primary message:

> 개인 가계부로 먼저 시작하고, 필요할 때 커플 가계부로 연결.

Keyword priority:

1. `가계부 앱`
2. `개인 가계부 앱`
3. `커플 가계부 앱`
4. `부부 가계부 앱`
5. `공유 가계부 앱`
6. `AI 가계부 앱`
7. `안드로이드 가계부`

`AI` should support the product, not lead the listing. If the title starts from AI, users who only want a normal personal/couple budget app may not understand the core use case.

## Play Console Copy Candidates

Google Play limits app name to 30 characters and short description to 80 characters.

Recommended app name:

```text
weeple - 개인·커플 가계부
```

Alternative app names:

```text
weeple - 커플·개인 가계부
weeple - AI 커플 가계부
```

Recommended short description:

```text
혼자 시작하고 파트너 초대. 공동/개인 지출 분리, 알림 기록, AI 분석.
```

Alternative short descriptions:

```text
개인 가계부로 시작해 커플로 연결. 공동 지출·예산·AI 분석까지.
커플·부부 생활비와 개인 소비를 나눠 보는 Android 가계부.
```

Recommended full description opening:

```text
weeple은 혼자 쓰는 개인 가계부로 시작해, 필요할 때 파트너를 초대해 커플 가계부로 연결하는 Android 가계부 앱입니다.

공동 지출과 개인 지출을 나누고, 생활비·데이트 비용·월 예산을 같은 기준으로 봅니다.

Android 결제 알림은 거래 후보를 만들고, 사용자가 확인한 항목만 저장합니다. 현금·이체는 자연어 한 줄 입력으로, 영수증은 OCR로 기록할 수 있습니다.
```

Core feature bullets:

```text
• 개인 가계부로 먼저 시작
• 파트너 초대 후 커플·부부 공동 가계부로 연결
• 공동 지출과 개인 지출 분리
• 생활비, 데이트 비용, 월 예산 관리
• Android 카드·계좌·페이 알림 확인 후 저장
• 자연어 한 줄 입력과 영수증 OCR
• AI 월간 소비 분석
```

## Play Console Checklist

1. Main store listing title includes `가계부` and either `개인` or `커플`.
2. Short description includes `개인 가계부`, `커플`, and the conversion promise.
3. Full description first 3 lines explain solo-first and partner invite.
4. Category is Finance.
5. Tags are the five most directly relevant tags shown by Play Console suggestions.
6. Screenshots include one visible caption or frame for "혼자 시작" and one for "파트너 초대/공동 지출".
7. Confirm production release country availability includes Korea.
8. Confirm target devices are not accidentally excluded.
9. Ask early users to search `weeple` first and install from direct link until broad keywords gain signals.

## Sources

- Google Play Console Help: Get discovered on Google Play search
  https://support.google.com/googleplay/android-developer/answer/4448378
- Google Play Console Help: App visibility and discovery issues
  https://support.google.com/googleplay/android-developer/answer/9042516
- Google Play Console Help: Create and set up your app
  https://support.google.com/googleplay/android-developer/answer/9859152
- Google Play Console Help: Choose a category and tags
  https://support.google.com/googleplay/android-developer/answer/9859673
