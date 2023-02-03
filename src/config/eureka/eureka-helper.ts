const Eureka = require("eureka-js-client").Eureka;
const eurekaHost =
  process.env.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE || "localhost";
const eurekaPort = 8761;

exports.registerWithEureka = function (appName: string, PORT: number) {
  const client = new Eureka({
    instance: {
      app: appName,
      instanceId: appName,
      hostName: "localhost",
      ipAddr: "127.0.0.1",
      statusPageUrl: `http://localhost:` + PORT,
      port: {
        $: PORT,
        "@enabled": "true",
      },
      vipAddress: appName,
      dataCenterInfo: {
        "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
        name: "MyOwn",
      },
    },
    //retry 10 time for 3 minute 20 seconds.
    eureka: {
      host: eurekaHost,
      port: eurekaPort,
      servicePath: "/eureka/apps/",
      maxRetries: 10,
    },
  });

  client.logger.level("debug");

  client.start((error: any) => {
    console.log(error || "user service registered");
  });

  function exitHandler(options: any, exitCode: any) {
    if (options.cleanup) {
    }
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) {
      client.stop();
    }
  }

  client.on("deregistered", () => {
    process.exit();
  });

  client.on("started", () => {
    console.log("eureka host  " + eurekaHost);
  });

  process.on("SIGINT", exitHandler.bind(null, { exit: true }));
};
