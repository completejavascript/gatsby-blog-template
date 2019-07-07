import config from "../../data/SiteConfig";
import moment from "moment";
import { kebabCase } from "lodash";

export const isInteralLink = link => link && link[0] === "/";
export const formatDate = date => moment.utc(date).format(config.dateFormat);
export const getTagPath = tag => `${config.pathPrefixTag}/${kebabCase(tag)}/`
export const getCategoryPath = category => `${config.pathPrefixCategory}/${kebabCase(category)}/`