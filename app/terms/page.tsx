export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Terms of Service
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
                  Acceptance of Terms
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  By accessing and using Hobbipedia, you accept and agree to be bound by the 
                  terms and provision of this agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Use License
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Permission is granted to temporarily access and use Hobbipedia for personal, 
                  non-commercial use. This license does not include the right to download, 
                  modify, or distribute the content for commercial purposes without written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Content Contributions
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  By contributing content to Hobbipedia, you grant us a non-exclusive, 
                  royalty-free license to use, modify, and distribute your contributions. 
                  All contributions must be original or properly attributed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Disclaimer
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  The information on Hobbipedia is provided on an 'as is' basis. We make no 
                  warranties, expressed or implied, and hereby disclaim all other warranties 
                  including implied warranties of merchantability or fitness for a particular purpose.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Contact Information
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Questions about these Terms of Service should be sent to legal@hobbipedia.com.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}