import Link from 'next/link';
import { TermWithCategories } from '@/types';

interface TermCardProps {
  term: TermWithCategories;
}

export function TermCard({ term }: TermCardProps) {
  return (
    <Link href={`/term/${term.slug}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 h-full">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          {term.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {term.definition}
        </p>
        <div className="flex flex-wrap gap-2">
          {term.categories?.slice(0, 2).map((category) => (
            <span
              key={category.id}
              className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded"
            >
              {category.name}
            </span>
          ))}
          {term.categories && term.categories.length > 2 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              +{term.categories.length - 2} more
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}