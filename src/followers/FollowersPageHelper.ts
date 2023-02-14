import {alpha} from "@mui/material";

export const FollowersStylesConfig = (settings: any) => `
                     .mainFollowContainer {
                     border-right: 1px solid ${settings?.configs?.color[settings?.color]};
                     } 
                     .followerOrFollowingContainer {
                     background: ${settings?.configs?.background[settings?.background]};
                     cursor: pointer;
                     }
                     .followerOrFollowingContainer:nth-child(2n) {
                     background-color: ${alpha(settings?.configs?.color[settings?.color] || "rgb(231 231 240)", 0.3)} !important;
                     }
                     .followerOrFollowingContainer:hover {
                     background-color: ${alpha(settings?.configs?.color[settings?.color] || "rgb(231 231 240)", 0.5)} !important;
                     }
                     .basicPageHead {
                      background: ${settings?.configs?.background[settings?.background]} !important;
                     }
                     .authorName {
                     color: ${settings?.configs?.color[settings?.color]} !important;
                     font-weight: bold;
                     }
                `
