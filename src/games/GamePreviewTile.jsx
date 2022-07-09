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

function GamePreviewTile(props) {
    const {
        gameName,
        icon,
        description,
        keyPath,
        altText,
        styleSettings
    } = props;

    const history = useHistory();

    const {t} = useTranslation();

    return (
        <Card
            sx={{maxWidth: 345}}
            onClick={() => {
                history.push(`/games${keyPath}`)
            }}
            style={{
                color: styleSettings?.configs?.color[styleSettings?.color],
                fontSize: styleSettings?.configs?.size[styleSettings?.fontSize]
            }}
            className={"gameTile"}
        >
            <style>
                {`
                .gameTile {
                transition: all ease 0.5s;
                }
                
                .gameTile:hover{
                background-color: ${alpha(hexToRgb(styleSettings?.configs?.color[styleSettings?.color] || "rgb(0, 0, 0)"), 0.2)} !important;
                }  
                
                .divider_default{
                 background-color: ${alpha(hexToRgb(styleSettings?.configs?.color[styleSettings?.color] || "rgb(0, 0, 0)"), 0.6)} !important;
                }
                
                ::-webkit-scrollbar-thumb {
                background-color: ${alpha(hexToRgb(styleSettings?.configs?.color[styleSettings?.color] || "rgb(0, 0, 0)"), 0.6)};
                }
                
                ::-webkit-scrollbar-track {
                background-color: ${alpha(hexToRgb(styleSettings?.configs?.color[styleSettings?.color] || "rgb(0, 0, 0)"), 0.2)};
                }
                `}
            </style>

            <CardHeader
                title={t("" + gameName + "")}
                subheader={t("Play now!)")}
                style={{
                    color: styleSettings?.configs?.color[styleSettings?.color],
                    fontSize: styleSettings?.configs?.size[styleSettings?.fontSize]
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
                        color: styleSettings?.configs?.color[styleSettings?.color],
                        fontSize: styleSettings?.configs?.size[styleSettings?.fontSize]
                    }}
                >
                    {t("" + description + "")}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default GamePreviewTile;