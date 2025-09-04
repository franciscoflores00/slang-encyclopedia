'use client'

import { useState, useEffect } from 'react'
import { getAllCategories, createCategory, createTerm } from '@/lib/api'
import { Category } from '@/types'
import Link from 'next/link'

export default function AdminPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [activeTab, setActiveTab] = useState<'category' | 'term'>('term')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  // Category form state
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    description: '',
    emoji: '',
    color: '#3B82F6'
  })

  // Term form state
  const [termForm, setTermForm] = useState({
    name: '',
    definition: '',
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    examples: [''],
    etymology: '',
    pronunciation: '',
    usage_notes: '',
    categoryIds: [] as string[],
    primaryCategoryId: ''
  })

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    const cats = await getAllCategories()
    setCategories(cats)
  }

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const slug = categoryForm.slug || categoryForm.name.toLowerCase().replace(/\s+/g, '-')
    
    const result = await createCategory({
      ...categoryForm,
      slug
    })

    if (result) {
      setMessage({ type: 'success', text: 'Category created successfully!' })
      setCategoryForm({ name: '', slug: '', description: '', emoji: '', color: '#3B82F6' })
      loadCategories()
    } else {
      setMessage({ type: 'error', text: 'Failed to create category. Please try again.' })
    }
    
    setLoading(false)
  }

  const handleCreateTerm = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    if (termForm.categoryIds.length === 0) {
      setMessage({ type: 'error', text: 'Please select at least one category.' })
      setLoading(false)
      return
    }

    const primaryId = termForm.primaryCategoryId || termForm.categoryIds[0]
    const examples = termForm.examples.filter(ex => ex.trim() !== '')

    const result = await createTerm(
      {
        name: termForm.name,
        definition: termForm.definition,
        difficulty: termForm.difficulty,
        examples: examples.length > 0 ? examples : undefined,
        etymology: termForm.etymology || undefined,
        pronunciation: termForm.pronunciation || undefined,
        usage_notes: termForm.usage_notes || undefined
      },
      termForm.categoryIds,
      primaryId
    )

    if (result) {
      setMessage({ type: 'success', text: 'Term created successfully!' })
      setTermForm({
        name: '',
        definition: '',
        difficulty: 'beginner',
        examples: [''],
        etymology: '',
        pronunciation: '',
        usage_notes: '',
        categoryIds: [],
        primaryCategoryId: ''
      })
    } else {
      setMessage({ type: 'error', text: 'Failed to create term. Please try again.' })
    }
    
    setLoading(false)
  }

  const addExample = () => {
    setTermForm({ ...termForm, examples: [...termForm.examples, ''] })
  }

  const updateExample = (index: number, value: string) => {
    const newExamples = [...termForm.examples]
    newExamples[index] = value
    setTermForm({ ...termForm, examples: newExamples })
  }

  const removeExample = (index: number) => {
    const newExamples = termForm.examples.filter((_, i) => i !== index)
    setTermForm({ ...termForm, examples: newExamples })
  }

  const toggleCategory = (categoryId: string) => {
    const isSelected = termForm.categoryIds.includes(categoryId)
    if (isSelected) {
      setTermForm({
        ...termForm,
        categoryIds: termForm.categoryIds.filter(id => id !== categoryId),
        primaryCategoryId: termForm.primaryCategoryId === categoryId ? '' : termForm.primaryCategoryId
      })
    } else {
      setTermForm({
        ...termForm,
        categoryIds: [...termForm.categoryIds, categoryId]
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Make a Contribution
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Help grow Hobbipedia by contributing new terms and definitions
          </p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {message.text}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex">
              <button
                onClick={() => setActiveTab('term')}
                className={`px-6 py-3 font-medium ${
                  activeTab === 'term'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Add Term
              </button>
              <button
                onClick={() => setActiveTab('category')}
                className={`px-6 py-3 font-medium ${
                  activeTab === 'category'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Add Category (Admin)
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'category' ? (
              <form onSubmit={handleCreateCategory} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Slug (URL-friendly name)
                  </label>
                  <input
                    type="text"
                    value={categoryForm.slug}
                    onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                    placeholder="auto-generated-from-name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Emoji
                    </label>
                    <input
                      type="text"
                      value={categoryForm.emoji}
                      onChange={(e) => setCategoryForm({ ...categoryForm, emoji: e.target.value })}
                      placeholder="🎯"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Color
                    </label>
                    <input
                      type="color"
                      value={categoryForm.color}
                      onChange={(e) => setCategoryForm({ ...categoryForm, color: e.target.value })}
                      className="w-full h-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating...' : 'Create Category'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleCreateTerm} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Term Name *
                  </label>
                  <input
                    type="text"
                    value={termForm.name}
                    onChange={(e) => setTermForm({ ...termForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Definition *
                  </label>
                  <textarea
                    value={termForm.definition}
                    onChange={(e) => setTermForm({ ...termForm, definition: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={termForm.difficulty}
                    onChange={(e) => setTermForm({ ...termForm, difficulty: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Categories * (Select all that apply)
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md p-3 dark:bg-gray-700 dark:border-gray-600">
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={termForm.categoryIds.includes(category.id)}
                          onChange={() => toggleCategory(category.id)}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">
                          {category.emoji} {category.name}
                        </span>
                        {termForm.categoryIds.includes(category.id) && (
                          <label className="ml-auto flex items-center text-xs">
                            <input
                              type="radio"
                              name="primaryCategory"
                              checked={termForm.primaryCategoryId === category.id}
                              onChange={() => setTermForm({ ...termForm, primaryCategoryId: category.id })}
                              className="mr-1"
                            />
                            Primary
                          </label>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Examples
                  </label>
                  {termForm.examples.map((example, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={example}
                        onChange={(e) => updateExample(index, e.target.value)}
                        placeholder="Enter an example usage"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                      {termForm.examples.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeExample(index)}
                          className="px-3 py-2 text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addExample}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    + Add Example
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Etymology
                    </label>
                    <input
                      type="text"
                      value={termForm.etymology}
                      onChange={(e) => setTermForm({ ...termForm, etymology: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Pronunciation
                    </label>
                    <input
                      type="text"
                      value={termForm.pronunciation}
                      onChange={(e) => setTermForm({ ...termForm, pronunciation: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Usage Notes
                  </label>
                  <textarea
                    value={termForm.usage_notes}
                    onChange={(e) => setTermForm({ ...termForm, usage_notes: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating...' : 'Create Term'}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Existing Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <span className="text-2xl">{category.emoji}</span>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{category.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {category.term_count} terms
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}