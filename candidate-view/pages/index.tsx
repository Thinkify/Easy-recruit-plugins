import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { type } from 'os'
import React, { useState, useEffect } from 'react'
import CandidateDetailsView from '../components/CandidateDetailsView'
import CandidateTestResults from '../components/CandidateTestResults'
import CourseForCandidate from '../components/CourseForCandidate'
import MentorsForCandidate from '../components/MentorsForCandidate'

interface Candidate {
  contact?: string | undefined
  currentSalary?: string | undefined
  noticePeriod?: string | undefined
  expectedSalary?: string | undefined
  email: string | undefined
  date?: string | undefined
}

const Home: NextPage = () => {
  const [candidate, setCandidate] = useState<Candidate>({ email: '' })
  const router = useRouter()

  useEffect(() => {
    const genData = async () => {
      if (router?.query?.linkedInProfile) {
        const responce = await fetch(
          'http://localhost:5000/api/v1/candidates/getCandidateByAny?linkedInProfile=deepanshu-tyagi-209400227'
        )
        const detailsData = await responce.json()
        console.log('details:', detailsData?.candidate)
        setCandidate(detailsData?.candidate)
      }
    }

    genData()
  }, [router.query.linkedInProfile])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Thinkify.io</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <section className={'mt-4'}>
          {candidate?.email && (
            <CandidateDetailsView
              contact={candidate.contact}
              currentSalary={candidate.currentSalary}
              noticePeriod={candidate.noticePeriod}
              expectedSalary={candidate.expectedSalary}
              email={candidate.email}
              date={candidate.date}
            />
          )}
        </section>
        <section className={'mt-4'}>
          <CandidateTestResults
            overAllScore={'4'}
            jsScore={'1'}
            reactScore={'5'}
          />
        </section>
        <section className={'mt-4'}>
          <div className={'m-4 text-lg font-medium text-gray-700'}>
            Need Mentors?{' '}
          </div>
          <MentorsForCandidate />
        </section>
        <section className={'mt-4'}>
          <div className={'m-4 text-lg font-medium text-gray-700'}>
            Recommended courses to improve yourself{' '}
          </div>
          <CourseForCandidate />
        </section>
      </main>
    </div>
  )
}

export default Home
