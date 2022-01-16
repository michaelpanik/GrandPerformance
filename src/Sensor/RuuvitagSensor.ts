import RuuvitagIO from '../IO/RuuvitagIO';

import Sensor from "./Sensor"

class RuuviTagSensor extends Sensor {


  constructor(config) {
    super({ io: config.io })

  }



  public getStatus(): string {
    return JSON.stringify(this._tagData);
  }

  public read(tagId: string): TagData {
    return this._tagData.get(tagId);
  }
}

export default RuuviTagSensor;
