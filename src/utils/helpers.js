import config from "../../data/SiteConfig";
import moment from "moment";

export const isInteralLink = link => link && link[0] === "/";
export const formatDate = date => moment.utc(date).format(config.dateFormat);