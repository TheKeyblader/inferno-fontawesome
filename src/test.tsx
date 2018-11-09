import { render } from "inferno";
import { FontAwesomeIcon } from "./FontAwesomeIcon";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { initDevTools } from "inferno-devtools";

initDevTools();

let div = document.createElement("div");
document.body.appendChild(div);

render(<FontAwesomeIcon icon={faPlus} />, div);