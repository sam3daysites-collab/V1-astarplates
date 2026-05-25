import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old V1 slugs → audit-canonical slugs (preserve SEO equity).
      {
        source: "/standard-number-plates",
        destination: "/standard-2d-number-plates",
        permanent: true,
      },
      {
        source: "/returns-refunds",
        destination: "/returns-and-refunds",
        permanent: true,
      },
      // Old blog slugs → audit-canonical blog slugs.
      {
        source: "/blog/uk-number-plate-sizes-explained",
        destination: "/blog/uk-number-plate-sizes-standard-short-import",
        permanent: true,
      },
      {
        source: "/blog/2d-vs-3d-vs-4d-vs-4d-gel",
        destination: "/blog/2d-vs-3d-vs-4d-number-plates",
        permanent: true,
      },
      {
        source: "/blog/how-to-fit-number-plates",
        destination: "/blog/how-to-fit-number-plates-pads-vs-screws",
        permanent: true,
      },
      {
        source: "/blog/private-reg-on-show-plate",
        destination: "/blog/private-reg-show-plates-uk",
        permanent: true,
      },
      {
        source: "/blog/v750-v778-number-plates",
        destination: "/blog/v750-v778-documents-explained",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
