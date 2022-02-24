import type { NextPage } from 'next'

const TestPage: NextPage = () => {
 
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Take the Triple byte test</span>
          <span className="block text-indigo-600">One test to open up multiple companies.</span>
          <span>
          </span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 justify-center items-center">
          
          <div className="ml-3 inline-flex rounded-md shadow">
            <a
              href="http://triplebyte.com/wt/thinkify/start/1Pq2hNl8qni/71104"
              target="_blank"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              Take Test
            </a>
          </div>
        </div>
      </div>
    </div>
      </main>
    </div>
  )
}

export default TestPage
