import { createRoute } from 'honox/factory';

import { getAllBlogPosts } from '@/lib/mdx';
import { generateMetadata } from '@/lib/metadata';

import { PostGrid } from '@/components/shared/post-grid';

export default createRoute(async (c) => {
  const allPosts = await getAllBlogPosts();
  const metadata = generateMetadata({ title: 'Home' });

  return c.render(<PostGrid posts={allPosts} page={1} />, { metadata });
});
