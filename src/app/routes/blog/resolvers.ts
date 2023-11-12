import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { MetaTag } from '@analogjs/router';
import { injectContentFiles } from '@analogjs/content';
import { PostMetadata } from '@models';

// temporary
function injectActivePostAttributes(
  route: ActivatedRouteSnapshot
): PostMetadata {
  const data = injectContentFiles<PostMetadata>().find(
    (contentFile) =>
      contentFile.filename === `/src/content/${route.params['postId']}.md`
  );
  return data!.attributes;
}

export const postTitleResolver: ResolveFn<string> = (route) =>
  injectActivePostAttributes(route).title;

export const postMetaResolver: ResolveFn<MetaTag[]> = (route) => {
  const postAttributes = injectActivePostAttributes(route);

  return [
    {
      name: 'description',
      content: postAttributes.description,
    },
    {
      name: 'author',
      content: 'VuNguyen',
    },
    {
      property: 'og:title',
      content: postAttributes.title,
    },
    {
      property: 'og:description',
      content: postAttributes.description,
    },
    {
      property: 'og:image',
      content: postAttributes.image,
    },
  ];
};
