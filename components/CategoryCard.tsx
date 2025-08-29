import Link from 'next/link';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/category/${category.slug}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 h-full">
        <div className="flex items-center mb-4">
          {category.emoji && (
            <span className="text-3xl mr-3">{category.emoji}</span>
          )}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {category.name}
          </h3>
        </div>
        {category.description && (
          <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
            {category.description}
          </p>
        )}
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          {category.term_count || 0} terms
        </div>
      </div>
    </Link>
  );
}