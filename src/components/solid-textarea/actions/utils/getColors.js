const colors = {
    warning_level1: "#ffd21f",
    warning_level2: "#ee6f4c",
    error: "#ff0000",
    success: "#6bbbfc"
};

export function getColors(numOfChars, max, warning1, warning2) {
    if (numOfChars > max) {
        return colors.error
    } else if (numOfChars > max - warning1) {
        return colors.warning_level2
    } else if (numOfChars > max - warning2) {
        return colors.warning_level1
    }
    return colors.success
}