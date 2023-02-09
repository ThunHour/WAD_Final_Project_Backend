const Eureka = require("eureka-js-client").Eureka;
const eurekaHost = "eureka.kunapheap.com";
const eurekaPort = 8761;

exports.registerWithEureka = function (appName: string, PORT: number) {
  const client = new Eureka({
    instance: {
      app: appName,
      instanceId: "main-service",
      hostName: "localhost",
      ipAddr: "172.18.0.2",

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
