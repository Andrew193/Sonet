import {
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Divider,
    Typography
} from "@mui/material";
import {useHistory} from "react-router-dom";

function GamePreviewTile(props) {
    const {
        gameName,
        icon,
        description,
        keyPath,
        altText
    } = props;

    const history = useHistory();

    return (
        <Card
            sx={{maxWidth: 345}}
            onClick={() => {
                history.push(`/games${keyPath}`)
            }}
        >
            <CardHeader
                title={gameName}
                subheader={"Play now!)"}
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
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default GamePreviewTile;