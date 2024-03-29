import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export let Dayjs = dayjs.extend(relativeTime)

function fromNow(date) {
    return Dayjs(date).fromNow();
}

const obj={ fromNow }

export default obj;