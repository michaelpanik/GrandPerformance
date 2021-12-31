const noble = require("@abandonware/noble");

type Peripheral = {
  id: string;
  address: string;
  addressType: string;
  connectable: boolean;
  advertisement: {
    localName: string;
    txPowerLevel: number;
    serviceUuids: string[];
    serviceSolicitationUuid: string[];
    manufacturerData: Buffer;
    serviceData: Array<{
      uuid: string;
      data: Buffer;
    }>;
  };
  rssi: string;
};

type Characteristic = {
  uuid: string;
  properties: Array<
    | "broadcast"
    | "read"
    | "writeWithoutResponse"
    | "write"
    | "notify"
    | "indicate"
    | "authenticatedSignedWrites"
    | "extendedProperties"
  >;
};

noble.on("stateChange", (state: string) => {
  console.log("state changed. " + state);
  if (state === "poweredOn") {
    console.log("here");
    noble.startScanning(["10F5A29BEA9E1A0F702EE17787023CBE"], true);
  }
});

noble.on("discover", (peripheral: Peripheral) => {
  console.log("Peripheral: " + peripheral);
  //   await noble.stopScanningAsync();
  //   await peripheral.connectAsync();
  //   const { characteristics } =
  //     await peripheral.discoverSomeServicesAndCharacteristicsAsync(
  //       ["180f"],
  //       ["2a19"]
  //     );
  //   const batteryLevel = (await characteristics[0].readAsync())[0];

  //   console.log(
  //     `${peripheral.address} (${peripheral.advertisement.localName}): ${batteryLevel}%`
  //   );

  //   await peripheral.disconnectAsync();
  //   process.exit(0);
});
noble.on("scanStart", () => {
  console.log("Scan started");
});
noble.on("error", () => {
  console.log("error");
});
noble.on("warning", () => {
  console.log("warning");
});
