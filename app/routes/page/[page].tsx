import { ssgParams } from 'hono/ssg';
import { createRoute } from 'honox/factory';

import { getAllBlogPosts } from '@/lib/mdx';
import { generateMetadata } from '@/lib/metadata';

import { PostGrid } from '@/components/shared/post-grid';
import { getTotalPages } from '@/components/shared/pagination';

export default createRoute(
  ssgParams(async () => {
    const allPosts = await getAllBlogPosts();
    const totalPages = getTotalPages(allPosts.length);
    const params = [];
    for (let page = 2; page <= totalPages; page++) {
      params.push({ page: String(page) });
    }
    return params;
  }),

  async (c) => {
    const page = parseInt(c.req.param('page'), 10);
    const allPosts = await getAllBlogPosts();
    const totalPages = getTotalPages(allPosts.length);

    if (isNaN(page) || page < 1 || page > totalPages) {
      return c.redirect('/404');
    }
    if (page === 1) {
      return c.redirect('/');
    }

    const metadata = generateMetadata({ title: `Home - Page ${page}` });

    return c.render(<PostGrid posts={allPosts} page={page} />, { metadata });
  }
);
