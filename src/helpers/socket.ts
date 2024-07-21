import { io } from "socket.io-client";
import { BaseUrl } from "../../config/api";
const socket = io(`${BaseUrl.socketUrl}`);
export default socket;
