export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Contact Us
          </h1>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">📧</div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Get in Touch
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Have a question, suggestion, or want to contribute to Hobbipedia? We'd love to hear from you!
              </p>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  General Inquiries
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  hello@hobbipedia.com
                </p>
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Content Contributions
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  contribute@hobbipedia.com
                </p>
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Technical Support
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  support@hobbipedia.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}