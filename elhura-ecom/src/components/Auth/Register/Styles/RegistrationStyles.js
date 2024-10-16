import { red } from "@material-ui/core/colors";

const orange = "#F2A74B";
const textLight = "#eaf2f4";
const borderColor = "skyblue";
const skyblueDark = "#71d6ff";
const backgroundDark = "#3a3a3a";

export const register = theme => ({
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    display: "block",
    width: "auto",
    [theme.breakpoints.up(400 + theme.spacing(2))]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    position: "relative",
    marginTop: theme.spacing(2),
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: backgroundDark,
    border: "5px solid skyblue",
    minWidth: "fit-content",

    "&:hover": {
      boxShadow: "0px 24px 36px rgba(131,153,167,0.99)"
    }
  },
  avatar: {
    marginTop: 20,
    position: "relative",
    background: "skyblue",
    width: "100px",
    height: "100px"
  },

  logo: {
    width: "110px"
  },

  icon: {
    width: "80px",
    height: "80px",
    color: backgroundDark
  },

  form: {
    margin: theme.spacing(4)
  },
  labels: {
    padding: `0px ${theme.spacing(4)}px`,
    fontSize: "12px",
    lineHeight: "5px",
    fontFamily: "PT Mono, monospace",
    fontWeight: "bold",
    color: `${skyblueDark} !important`
  },
  labelBirthDate: {
    transform : "translate(0, 1.5px) scale(0.75) !important"
  },

  inputs: {
    position: "relative",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontFamily: "Cutive Mono, monospace",
    color: "white !important",
    fontSize: "14px",
    padding: `5px ${theme.spacing(1)}px`,
    borderRadius: "8px",
    border: `1.4px solid ${borderColor}`,
    marginBottom: "-15px !important",
    marginTop: "10px !important",
    minWidth: "max-content",

    "&:hover": {
      background: "rgba(169,198,217,0.36457423) "
    }
  },

  button: {
    color: `${backgroundDark} !important`,
    background: "skyblue",
    position: "relative",
    fontWeight: 400,
    fontFamily: "Raleway, sans-serif",
    overflow: "hidden",
    marginTop: theme.spacing(6),
    padding: "5px !important",
    border: "none",
    borderRadius: "8px",
    letterSpacing: "3px",

    "&::before, &::after": {
      position: "absolute",
      content: '""',
      boxSizing: "border-box",
      borderRadius: "8px",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      opacity: 1
    },
    "&::before": {
      borderBottom: "2px solid rgba(255,255,255,.58)",
      borderTop: "2px solid rgba(255,255,255,.58)",
      transform: "scale(0,1)"
    },
    "&::after": {
      borderLeft: "3px solid rgba(255,255,255,.58)",
      borderRight: "3px solid rgba(255,255,255,.58)",
      transform: "scale(1,0)"
    },
    "&:hover::before": {
      transform: "scale(1,1)",
      transition: "transform cubic-bezier(0.85,.36,.8,.42) 0.3s"
    },
    "&:hover::after": {
      transform: "scale(1,1)",
      transition: "transform cubic-bezier(0.85,.36,.8,.42) .2s"
    },
    "&::first-letter": {
      color: orange
    },
    "&:hover": {
      background: "rgba(169,198,217,0.8)",
      color: textLight
    }
  },
  buttonJoin: {
    marginTop: "25px !important"
  },
  buttonAs: {
    marginTop: "5px"
  },
  error: {
    border: `1.2px solid ${red[900]}`,
    background: "rgba(169,198,217,0.29)",
    color: red[900],
    fontSize: "14px",
    fontWeight: 400,
    fontFamily: "Raleway, sans-serif",
    display: "flex",
    alignItems: "center",
    paddingBottom: theme.spacing(3)
  },

  passwordEye: {
    color: "skyblue"
  }
});