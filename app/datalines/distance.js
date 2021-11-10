import { me } from 'appbit';
import clock from 'clock';
import { today } from 'user-activity';

import Dataline from './Dataline';
import { swapClass } from '../utils';

clock.granularity = 'seconds';

export default new Dataline({
    name: 'DIST',
    checkPermissions() {
        return me.permissions.granted('access_activity');
    },
    updateValue() {
        const meters = today.adjusted.distance || 0;
        const raw = meters;
        const unit = 'm';

        this.valueRef.text = `${(Math.round(raw * 100) / 100).toFixed(2)} ${unit}`;
        swapClass(this.valueRef.root, 'color', 'orange');
    },
    start() {
        clock.addEventListener('tick', this.updateValue);
    },
    stop() {
        clock.removeEventListener('tick', this.updateValue);
    },
});
