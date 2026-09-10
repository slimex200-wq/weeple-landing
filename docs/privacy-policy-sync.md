# Privacy policy source and release

The canonical Korean/English text is `src/content/privacyPolicy.json` in `slimex200-wq/claude-budget-app` (#738). Do not edit `public/privacy-policy.html` independently. From the app checkout:

```powershell
node scripts/generate-privacy-policy.mjs --landing <landing-checkout>
node scripts/generate-privacy-policy.mjs --check --landing <landing-checkout>
```

`public/privacy-policy-v1.2.html` archives the previous public text, labelled as historical and excluded from indexing. The account-deletion help page uses the same verified deletion scope; actual deletion code is unchanged.

Before publishing, preserve the already-live `pub-7560364878060395` account in both `public/app-ads.txt` and the inline Worker response. Source main still had the old ID; deploying it unchanged would regress production. The corrected dry-run Worker matches the downloaded production Worker `cb508fa3-ee02-4605-bfbc-749e33f84032` byte-for-byte.

This release changes factual processing descriptions. It does not establish account-specific retention contracts or certify deletion/consent compliance. Evidence and remaining checks are tracked in the app's #738.
