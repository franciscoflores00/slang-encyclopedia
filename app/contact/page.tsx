export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Get in touch with the Hobbipedia team
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">📧</div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Get in Touch
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Have a question, suggestion, or want to contribute to Hobbipedia? We&apos;d love to hear from you!
              </p>
            </div>

            <div className="space-y-8">
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl mb-3">💬</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  General Inquiries
                </h3>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  hello@hobbipedia.com
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl mb-3">✏️</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Content Contributions
                </h3>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  contribute@hobbipedia.com
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl mb-3">🛠️</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Technical Support
                </h3>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  support@hobbipedia.com
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-600 text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We typically respond within 24-48 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}