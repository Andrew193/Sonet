import {getColors} from "./getColors";

const WARNING_AFTER_1 = 40;
const WARNING_AFTER_2 = 80;

export const getProgressRingBarProps = (
    plainText = "",
    maxChars,
    warningLimit1 = WARNING_AFTER_1,
    warningLimit2 = WARNING_AFTER_2,
) => {
    const {length = 0} = plainText;
    const progress = Math.min((100 * length) / maxChars, 100);

    const warningRange1 = (maxChars * warningLimit1) / 100;
    const warningRange2 = (maxChars * warningLimit2) / 100;
    const colorBar = getColors(length, maxChars, warningRange1, warningRange2);

    const uiStatus = length >= maxChars - warningRange2 ? "bigRing" : "smallRing";
    const textLabel = maxChars - length;
    const hideRingBar = length - maxChars > warningRange1;

    return {progress, textLabel, hideRingBar, colorBar, uiStatus};
};
