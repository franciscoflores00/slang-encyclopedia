export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About Hobbipedia
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Your comprehensive guide to hobby and interest terminology
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                🎯 Our Mission
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Hobbipedia exists to bridge the knowledge gap in hobby and interest communities. 
                Whether you&apos;re new to cycling, diving into photography, or exploring rock climbing, 
                we provide clear, comprehensive definitions of specialized terminology to help you 
                communicate confidently and learn more effectively.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                🌟 What Makes Us Different
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Unlike traditional dictionaries, Hobbipedia focuses specifically on hobby and 
                interest terminology. Our definitions include context, usage examples, and 
                cross-references between related activities, making it easier to understand 
                how terms apply in real-world situations.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Key Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Smart Search
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Find terms quickly with our intelligent search that looks through names, 
                  definitions, and examples.
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-4">🏷️</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Cross-Category Terms
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Many terms appear across multiple hobbies. We show you all the contexts 
                  where each term is used.
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Alphabetical Browse
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Browse terms alphabetically or by category to discover new vocabulary 
                  in your area of interest.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              📈 Growing Community
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Hobbipedia is constantly growing thanks to contributions from passionate hobbyists 
              and experts in their fields. Our community-driven approach ensures that definitions 
              are accurate, practical, and reflect real-world usage.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Whether you&apos;re looking to understand a term you&apos;ve encountered or want to contribute 
              your expertise, Hobbipedia welcomes learners and experts at every level.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}