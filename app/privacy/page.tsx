export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Privacy Policy
          </h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mb-8">
              <p className="text-gray-600 dark:text-gray-300 text-center">
                <strong>Last updated:</strong> December 2024
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Information We Collect
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Hobbipedia is committed to protecting your privacy. We collect minimal information 
                  necessary to provide and improve our service. This may include usage analytics, 
                  search queries (anonymized), and any information you voluntarily provide when 
                  contributing content.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  How We Use Information
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We use collected information to improve our dictionary, understand user needs, 
                  and provide relevant content recommendations. We do not sell personal information 
                  to third parties.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Data Security
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We implement appropriate security measures to protect your information against 
                  unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Contact Us
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  If you have questions about this Privacy Policy, please contact us at 
                  privacy@hobbipedia.com.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}