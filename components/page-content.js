import HeroMain from 'components/hero-main'
import ProjectList from 'components/project-list'
import InfoBlock from 'components/info-block'
import TestimonialBlock from 'components/testimonial-block'
import CTABlock from 'components/cta-block'
import CaptionsListBlock from 'components/captions-list-block'
import FeaturedPostsList from './featured-posts-list'


export default function PageContent({ content }) {
  let posts = [{title: "hello"}]
  let projects

  const pageContent = (content || [])
  .map((c, i) => {
    let el = null;
    switch (c._type) {
      case "infoBlock":
        el = <InfoBlock key={c._key} {...c} />;
        break;
      case "projectListBlock":
        if(!c.projects?.length) c.projects = projects
        el = <ProjectList key={c._key} {...c} />;
        break;
      case "hero":
        el = <HeroMain key={c._key} {...c} />
        break;
      case "testimonialsBlock":
        el = <TestimonialBlock key={c._key} {...c} />
        break;
      case "ctaBlock":
        el = <CTABlock key={c._key} {...c} />
        break;
      case "captionsListBlock":
        el = <CaptionsListBlock key={c._key} {...c} />
        break;
      case "featuredPostsBlock":
        if(!c.posts?.length) c.posts = posts
        el = <FeaturedPostsList key={c._key} {...c} />
      default:
        el = null;
    }
    return el;
  });


  return (
    <>
      {pageContent}
    </>
  )
}