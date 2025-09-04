export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Terms and conditions for using Hobbipedia
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <div className="space-y-8">
              <section className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">✅</div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Acceptance of Terms
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  By accessing and using Hobbipedia, you accept and agree to be bound by the 
                  terms and provision of this agreement. If you do not agree to these terms, 
                  please do not use our service.
                </p>
              </section>

              <section className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">📜</div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Use License
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Permission is granted to temporarily access and use Hobbipedia for personal, 
                  non-commercial use. This license does not include the right to download, 
                  modify, or distribute the content for commercial purposes without written permission.
                </p>
              </section>

              <section className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">✏️</div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Content Contributions
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  By contributing content to Hobbipedia, you grant us a non-exclusive, 
                  royalty-free license to use, modify, and distribute your contributions. 
                  All contributions must be original or properly attributed.
                </p>
              </section>

              <section className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">⚠️</div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Disclaimer
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  The information on Hobbipedia is provided on an &apos;as is&apos; basis. We make no 
                  warranties, expressed or implied, and hereby disclaim all other warranties 
                  including implied warranties of merchantability or fitness for a particular purpose.
                </p>
              </section>

              <section className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">📧</div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Contact Information
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Questions about these Terms of Service should be sent to 
                  <span className="font-medium"> legal@hobbipedia.com</span>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}