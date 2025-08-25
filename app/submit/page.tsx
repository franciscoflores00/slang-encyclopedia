export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Submit a Term
          </h1>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mb-8">
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">✨</div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Help Build Hobbipedia
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Know a term that's missing? Share your expertise and help others learn!
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-3">
                🚧 Coming Soon!
              </h3>
              <p className="text-blue-800 dark:text-blue-300 text-sm leading-relaxed">
                We're currently building our term submission system. In the meantime, 
                you can contribute by emailing us directly with your suggested terms, 
                definitions, and examples.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Email Your Contributions
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Send your terms to: <strong>contribute@hobbipedia.com</strong>
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                What to Include:
              </h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <li>• <strong>Term name:</strong> The word or phrase</li>
                <li>• <strong>Definition:</strong> Clear, concise explanation</li>
                <li>• <strong>Category:</strong> Which hobby/sport it belongs to</li>
                <li>• <strong>Examples:</strong> How it's used in context</li>
                <li>• <strong>Difficulty level:</strong> Beginner, intermediate, or advanced</li>
                <li>• <strong>Your expertise:</strong> Brief note about your background</li>
              </ul>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                All submissions are reviewed for accuracy and clarity before publication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}