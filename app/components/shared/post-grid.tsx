import type { BlogPost } from '@/lib/mdx';

import { AboutCta } from '@/components/shared/about-cta';
import { LinkCard } from '@/components/shared/link-card';
import {
  Pagination,
  POSTS_PER_PAGE,
  getTotalPages,
} from '@/components/shared/pagination';

interface PostGridProps {
  posts: BlogPost[];
  page: number;
}

export function PostGrid({ posts, page }: PostGridProps) {
  const totalPages = getTotalPages(posts.length);
  const paged = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  return (
    <div className="flex flex-1 flex-col">
      <div className="container-wrapper">
        <div className="container py-6">
          <AboutCta />
        </div>
      </div>
      <div className="container-wrapper">
        <section className="container border-b py-6">
          <div className="flex flex-col gap-1 pb-6">
            <h2 className="text-2xl font-medium tracking-tight">Grid View</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paged.map((post) => (
              <LinkCard
                key={post.slug}
                title={post.metadata.title}
                imageUrl={post.metadata.thumbnail || '/static/og.png'}
                link={`/blog/${post.slug}`}
                badgeText={post.metadata.publishedAt}
                description={post.metadata.description}
                priority={true}
              />
            ))}
          </div>
          <Pagination currentPage={page} totalPages={totalPages} />
        </section>
      </div>
    </div>
  );
}
