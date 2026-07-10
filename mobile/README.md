# Mobile Apps — Design Specification (Phase 4)

Native iOS (SwiftUI) and Android (Jetpack Compose) apps, sharing the platform
API. React Native is an acceptable alternative if team skills favor it — the
spec is implementation-agnostic.

## Product principles

Same brand system as the web (navy glass, aqua accents, Manrope/serif display),
but **utility-first**: the app is for reordering in under 10 seconds.

## Information architecture

```
Tab bar: Home · Order · Track · Impact · Account
```

- **Home**: greeting, one-tap "Order again", active subscription card,
  delivery countdown, promos.
- **Order**: catalog (six families), size/pack pickers, cart, checkout
  (Paystack/Flutterwave/Stripe SDKs, saved cards, pay-on-delivery).
- **Track**: live order timeline, map with driver location, delivery OTP.
- **Impact**: personal impact (bottles recycled via buyback QR scans),
  Foundation dashboards.
- **Account**: addresses, subscriptions, invoices, loyalty points, support chat
  (same AI brain), language (EN/FR/HA/YO/IG/SW).

## Key native features

- Push notifications (order states, subscription reminders, promos — opt-in).
- Widgets: next delivery countdown (iOS WidgetKit / Android Glance).
- QR scanning: bottle buyback receipts, certificate verification.
- Offline: catalog cached; orders queue and sync.
- Biometric login on top of OIDC.

## Performance & quality bars

Cold start < 2s on mid-range Android; 60fps scrolling; accessibility:
VoiceOver/TalkBack complete, dynamic type, reduced-motion honored.
Store targets: iOS 16+, Android 8+ (API 26).
