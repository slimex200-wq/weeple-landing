type RouterTransitionStart = (...args: unknown[]) => void

// Keep this file tiny: importing @sentry/nextjs here adds a large client chunk to
// every landing page visit. Re-enable client monitoring only with a separate
// performance budget for the public marketing surface.
export const onRouterTransitionStart: RouterTransitionStart = () => {}
