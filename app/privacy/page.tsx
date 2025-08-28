export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              How we protect and handle your information
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <div className="space-y-8">
              <section className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">📊</div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Information We Collect
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Hobbipedia is committed to protecting your privacy. We collect minimal information 
                  necessary to provide and improve our service. This may include usage analytics, 
                  search queries (anonymized), and any information you voluntarily provide when 
                  contributing content.
                </p>
              </section>

              <section className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">🎯</div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    How We Use Information
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We use collected information to improve our dictionary, understand user needs, 
                  and provide relevant content recommendations. We do not sell personal information 
                  to third parties.
                </p>
              </section>

              <section className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">🛡️</div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Data Security
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We implement appropriate security measures to protect your information against 
                  unauthorized access, alteration, disclosure, or destruction. Your data is stored 
                  securely and accessed only by authorized personnel when necessary.
                </p>
              </section>

              <section className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">🤝</div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Your Rights
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  You have the right to access, update, or delete your personal information. 
                  You may also opt out of certain data collection practices. Contact us to 
                  exercise these rights or if you have any privacy concerns.
                </p>
              </section>

              <section className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">📧</div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Contact Us
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  If you have questions about this Privacy Policy or wish to exercise your privacy rights, 
                  please contact us at <span className="font-medium">privacy@hobbipedia.com</span>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}