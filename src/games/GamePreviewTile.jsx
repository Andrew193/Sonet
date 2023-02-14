import React from "react";
import {
    alpha,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Divider, hexToRgb,
    Typography
} from "@mui/material";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {useSettings} from "../hooks";

function GamePreviewTile(props) {
    const {
        gameName,
        icon,
        description,
        keyPath,
        altText
    } = props;

    const history = useHistory();
    const {settings} = useSettings();
    const {t} = useTranslation();

    return (
        <Card
            sx={{maxWidth: 345}}
            onClick={() => {
                history.push(`/games${keyPath}`)
            }}
            style={{
                color: settings?.configs?.color[settings?.color],
                fontSize: settings?.configs?.size[settings?.fontSize]
            }}
            className={"gameTile"}
        >
            <style>
                {`
                .gameTile {
                transition: all ease 0.5s;
                }
               
                .gameTile:hover{
                background-color: ${alpha(hexToRgb(settings?.configs?.color[settings?.color] || "rgb(0, 0, 0)"), 0.2)} !important;
                }  
                
                .divider_default{
                 background-color: ${alpha(hexToRgb(settings?.configs?.color[settings?.color] || "rgb(0, 0, 0)"), 0.6)} !important;
                }
                
                ::-webkit-scrollbar-thumb {
                background-color: ${alpha(hexToRgb(settings?.configs?.color[settings?.color] || "rgb(0, 0, 0)"), 0.6)};
                }
                
                ::-webkit-scrollbar-track {
                background-color: ${alpha(hexToRgb(settings?.configs?.color[settings?.color] || "rgb(0, 0, 0)"), 0.2)};
                }
                `}
            </style>

            <CardHeader
                title={t("" + gameName + "")}
                subheader={t("Play now!)")}
                style={{
                    color: settings?.configs?.color[settings?.color],
                    fontSize: settings?.configs?.size[settings?.fontSize]
                }}
            />
            <Divider
                light
                className={"divider_default"}
            />
            <CardMedia
                component="img"
                height="194"
                image={icon}
                alt={altText}
            />
            <Divider
                light
                className={"divider_default"}
            />
            <CardContent>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{
                        color: settings?.configs?.color[settings?.color],
                        fontSize: settings?.configs?.size[settings?.fontSize]
                    }}
                >
                    {t("" + description + "")}
                </Typography>
            </CardContent>
        </Card>
    )
}

GamePreviewTile.propTypes = {
    gameName: PropTypes.string,
    icon: PropTypes.node,
    description: PropTypes.string,
    keyPath: PropTypes.string,
    altText: PropTypes.string
}

export default GamePreviewTile;