import React from "react";
import {v4 as uuidv4} from 'uuid';
import {alpha} from "@mui/material";

export function getImageLinkFromStaticObject(imgUrl, noImgRespone) {
    try {
        return JSON.parse(imgUrl)?.webContentLink;
    } catch (error) {
        return imgUrl || noImgRespone;
    }
}

export function downloadFile(url, name) {
    const link = document.createElement('a');
    link.href = url;
    link.download = name || 'Download.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
}

export function downloadFileVersion2(url, name) {
    const link = document.createElement("a");
    link.href = url
    link.download = name || "filename.png";
    link.click();
}

export async function createFile(src) {
    const response = await fetch(src);
    const data = await response.blob();
    let metadata = {
        type: 'image/png'
    };
    return new File([data], "test.png", metadata);
}

export function hexToRgb(hex) {
    if (hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    return {};
}

export function createErrorsForApiCall(parsedResponse, oneErrorMessage) {
    return parsedResponse
        ? Object.entries(parsedResponse)
            ?.map((error) => JSON.stringify(error[1]) === "{}" ? null : <li
                key={uuidv4()}>{error[0] === "error" ? "Main reason" : error[0]}: {error[1]?.wrong || error[1]}</li>)
        : <li key={uuidv4()}>{oneErrorMessage?.error || "Something went wrong"}</li>;
}

export function createCopy(item) {
    return JSON.parse(JSON.stringify(item))
}

//Theme config

const defaultPropertiesConfig = {
    isBoxShadow: true,
    boxShadowColor: "",
    isBorderRight: false,
    isBorderLeft: false,
    borderRightColor: "rgb(206, 204, 204)",
    color: "rgb(0, 0, 0)",
    background: "rgb(203, 203, 243)"
}

export function getPropertiesConfig(isBoxShadow, boxShadowColor, isBorderRight, borderRightColor, color, background, isBorderLeft) {
    return {
        isBoxShadow: isBoxShadow,
        boxShadowColor: boxShadowColor,
        isBorderRight: isBorderRight,
        borderRightColor: borderRightColor,
        color: color,
        background: background,
        isBorderLeft: isBorderLeft
    }
}

export const getLazyImagesElementsThemeConfig = () => getElementsThemeConfig({}, getPropertiesConfig(true, "rgb(0,0,0)",
    false, '', null, null))

export const getTabElementsThemeConfig = () => getElementsThemeConfig({}, getPropertiesConfig(true, "rgb(0,0,0)"))

export function getEmptyElementsThemeConfig(settings) {
    return getElementsThemeConfig(settings, getPropertiesConfig(false, '', true, '',
        null, null, true))
}

export function getElementsThemeConfig(config, propertiesConfig = defaultPropertiesConfig) {
    return {
        boxShadow: propertiesConfig?.isBoxShadow ?
            `0px 0px 8px 0px ${alpha(propertiesConfig.boxShadowColor ?
                propertiesConfig.boxShadowColor
                : config?.configs?.color[config?.color] || "#b6c0f3", 0.8)}`
            : "",
        fontSize: config?.configs?.size[config?.fontSize],
        color: propertiesConfig.color || config?.configs?.color[config?.color],
        background: propertiesConfig.background || config?.configs?.background[config?.background],
        borderRight: propertiesConfig?.isBorderRight ?
            `1px solid ${propertiesConfig?.borderRightColor ?
                propertiesConfig?.borderRightColor
                : config?.configs?.color[config?.color] || "rgb(206, 204, 204)"}`
            : "",
        borderLeft: propertiesConfig?.isBorderLeft ?
            `1px solid ${propertiesConfig?.borderRightColor ?
                propertiesConfig?.borderRightColor
                : config?.configs?.color[config?.color] || "rgb(206, 204, 204)"}`
            : ""
    }
}