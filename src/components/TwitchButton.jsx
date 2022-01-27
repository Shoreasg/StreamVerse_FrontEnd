import { createButton } from "react-social-login-buttons";


const config = {
  text: "Login with Twitch",
  icon: "twitch",
  iconFormat: name => `fa fa-${name}`,
  style: { background: "#9146FF" },
};

const MyTwitchLoginButton = createButton(config);

export default MyTwitchLoginButton;