import { TagData, RuuviTag } from '../Sensor/RuuvitagSensor.d'

class RuuvitagIO {
    public tags: RuuviTag[]
    private _tagData: Map<string, TagData>

    constructor() {
        const ruuvi = require('node-ruuvitag');
        ruuvi.on('found', this.addTag);
        ruuvi.on('warning', this.handleErrors);
        ruuvi.on('error', this.handleErrors);
        this.listenForTagData()
    }

    private addTag(tag: RuuviTag): void {
        this.tags.push(tag)
    }

    private listenForTagData(): void {
        this.tags.forEach((tag: RuuviTag) => {
            tag.on('data', (data: TagData) => this.onTagData(tag, data))
        })
    }

    private onTagData(tag: RuuviTag, data: TagData) {
        this._tagData.set(tag.id, data)
    }

    private handleErrors(message: any) {
        console.error(new Error(JSON.stringify(message)));
    }
}

export default RuuvitagIO