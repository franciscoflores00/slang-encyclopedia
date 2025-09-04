/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "hobbipedia-domain-setup",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    // Create hosted zone for the domain
    const hostedZone = new aws.route53.Zone("HobbipediaHostedZone", {
      name: "hobbipedia.com",
    });

    // Output the nameservers that need to be configured with domain registrar
    return {
      nameservers: hostedZone.nameServers,
      hostedZoneId: hostedZone.zoneId,
    };
  },
});