import React from "react";
import Img from "gatsby-image";
import AutoLink from "../AutoLink/AutoLink";
import { formatDate, getCategoryPath } from "../../utils/helpers";

const PostListing = ({ postEdges, hasThumbnail }) => {
  const postList = postEdges.map(postEdge => {
    return {
      path: postEdge.node.fields.slug,
      tags: postEdge.node.frontmatter.tags,
      category: postEdge.node.frontmatter.category,
      cover: postEdge.node.frontmatter.cover,
      title: postEdge.node.frontmatter.title,
      date: postEdge.node.fields.date,
      slug: postEdge.node.fields.slug,
      excerpt: postEdge.node.excerpt,
      timeToRead: postEdge.node.timeToRead
    };
  });

  return (
    <section className="container padding-top padding-bottom">
      {postList.map(post => {
        const thumbnail = post.cover 
          ? post.cover.childImageSharp.fixed 
          : null;
        
        return (
          <article 
            key={post.title} 
            className="flex padding-bottom-2 padding-top-2 border-bottom border-color-light-grey"
          >
            {
              hasThumbnail && thumbnail ? (
                <AutoLink to={post.slug} key={post.title} className="line-height-reset">
                  <Img fixed={thumbnail} className="flex-static margin-right-2" />
                </AutoLink> 
              ) : null
            }
            <div className="flex-spread">
              <AutoLink to={post.slug} key={post.title}>
                <h3>{post.title}</h3>
              </AutoLink> 
              <div className="text-description margin-bottom-half">{post.excerpt}</div>
              <div className="text-description">
                <small>Posted on {formatDate(post.date)}</small>
              </div>
            </div>
          </article>
        )
      })}
    </section>
  );
}

export default PostListing;
