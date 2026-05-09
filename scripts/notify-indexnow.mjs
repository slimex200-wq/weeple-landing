const site = 'https://weeple.app'
const host = 'weeple.app'
const key = '09b2b5675dfabafa7699563a994f1611'
const keyLocation = `${site}/${key}.txt`

const urls = [
  `${site}/`,
  `${site}/guides/couple-budget-app`,
  `${site}/guides/budget-app-recommendation`,
  `${site}/guides/shared-budget-app-comparison`,
  `${site}/guides/shared-budget`,
  `${site}/guides/natural-language-budget`,
  `${site}/sitemap.xml`,
]

const response = await fetch('https://searchadvisor.naver.com/indexnow', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  body: JSON.stringify({
    host,
    key,
    keyLocation,
    urlList: urls,
  }),
})

const body = await response.text()

console.log(
  JSON.stringify(
    {
      endpoint: 'https://searchadvisor.naver.com/indexnow',
      status: response.status,
      statusText: response.statusText,
      keyLocation,
      urls,
      body,
    },
    null,
    2,
  ),
)

if (!response.ok && response.status !== 202) {
  process.exitCode = 1
}
