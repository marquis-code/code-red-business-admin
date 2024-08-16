export default defineNuxtPlugin((nuxtApp) => {
  if (process.env.NODE_ENV === "production") {
    const trackingId = process.env.GA_TRACKING_ID;
    if (!trackingId) {
      console.error("Google Analytics tracking ID not found.");
      return;
    }

    (function (i, s, o, g, r, a, m) {
      i["GoogleAnalyticsObject"] = r;
      (i[r] =
        i[r] ||
        function () {
          (i[r].q = i[r].q || []).push(arguments);
        }),
        (i[r].l = 1 * new Date());
      (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m);
    })(
      window,
      document,
      "script",
      "https://www.google-analytics.com/analytics.js",
      "ga"
    );

    ga("create", trackingId, "auto");

    nuxtApp.router.afterEach((to, from) => {
      ga("set", "page", to.fullPath);
      ga("send", "pageview");
    });
  }
});
