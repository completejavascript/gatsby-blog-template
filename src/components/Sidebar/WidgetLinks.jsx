import React from 'react';
import AutoLink from '../AutoLink/AutoLink';
import WidgetContainer from './WidgetContainer';
import WidgetTitle from './WidgetTitle';
import config from '../../../data/SiteConfig';

const WidgetLinks = ({ links }) => (
  <>
    {links && links.length > 0 && (
      <WidgetContainer extraClass="categories-container">
        <WidgetTitle title={config.linksWidgetTitle} />
        <div>
          {links.map(link => (
            <AutoLink
              key={link.label}
              to={link.url}
              className="block border-bottom border-color-light-grey padding-top-half padding-bottom-half"
            >
              <span>{link.label}</span>
            </AutoLink>
          ))}
        </div>
      </WidgetContainer>
    )}
  </>
);

export default WidgetLinks;
