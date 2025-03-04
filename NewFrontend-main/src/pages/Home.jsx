import { Button } from '@material-tailwind/react'
import React from 'react'
import Header from '../components/Header'
import { Footer } from '../components/Footer'
import reciept from '../assets/david-travis-5bYxXawHOQg-unsplash.jpg'
import { BeakerIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  return (
    <>
      <div className=''>
        <Header />
        <div className='w-full'>
          <section className='mt-14 lg:mt-16'>
            <div className='container mx-auto flex flex-col items-center justify-center gap-8 px-8 py-12'>
              <div>
                <h1 className='text-5xl lg:text-6xl font-extrabold font-outfit bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 inline-block py-4 text-transparent bg-clip-text text-center tracking-wider'>
                  Share. Learn. Succeed
                </h1>
              </div>
              <div className='mt-4'>
                <p className='font-outfit  text-purple-700 font-light tracking-wider text-center text-sm lg:text-lg'>Stop wasting time searching for handwritten notes or relying on unreliable sources. CampusNotes connects you to a collaborative network of classmates, offering a treasure trove of organized and comprehensive notes for all your courses.</p>
              </div>
              <div>
                <Button variant='gradient' color='deep-purple' onClick={() => navigate('/register')}>Get Started !</Button>

              </div>
            </div>
          </section>
          <section className='px-4 py-8 '>
            <div className='container mx-auto grid grid-cols-3 gap-6'>
              <div className='col-span-2 bg-deep-purple-500  rounded-xl p-6'>
                <div className='flex flex-col lg:flex-row'>
                  <div className='w-full flex flex-col items-center justify-center '>
                    <h2 className='text-white text-center text-xl font-outfit font-semibold tracking-wider uppercase'>
                      Effortless Notes Searching
                    </h2>
                    <ul className='mt-4 flex flex-col gap-4'>
                      <li className='text-white text-center font-outfit font-light tracking-wide'>Find course-specific notes with keywords & context.</li>
                      <li className='text-white text-center font-outfit font-light tracking-wide'> Refine results by professor, type, or ratings for perfect notes.
                      </li>
                    </ul>
                  </div>
                  {/* <div className='w-full hidden lg:block lg:w-[40%]  relative overflow-hidden bg-cover bg-no-repeat'>
                    <img src={reciept} alt="" className='w-full rounded-md h-auto transition duration-300 ease-in-out hover:scale-110' />
                  </div> */}
                </div>
              </div>
              <div className='bg-deep-purple-500 rounded-xl p-6 flex flex-col gap-2'>
                <div className='rotate-90 md:rotate-0'>
                  <div className='md:flex items-center justify-end hidden'>
                    <LockClosedIcon className='h-6 md:h-8 lg:h-14 text-white' />
                  </div>
                  <div className=''>
                    <h2 className='text-white text-xl md:text-2xl lg:text-4xl font-outfit font-semibold tracking-widest uppercase '>
                      Secure and Reliable
                    </h2>
                  </div>
                </div>

              </div>
              <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 col-span-3'>
                <div className='bg-deep-purple-500 rounded-xl p-6 col-span-2 flex flex-col items-center justify-center'>


                  <h2 className='text-white text-center text-xl font-outfit font-semibold tracking-wider uppercase'>
                    Collaboration and Sharing
                  </h2>
                  <div className='mt-4'>
                    <p className='text-white font-outfit font-light text-lg text-center tracking-wider'>
                      CampusNotes goes beyond note-sharing. Upload your organized notes to become a study hero, collaborate with classmates in real-time to create the ultimate study guide (if available), and spark discussions on course topics through interactive forums, fostering a supportive learning environment for everyone.
                    </p>
                  </div>


                </div>
                <div className='bg-deep-purple-500 rounded-xl p-6 flex items-center justify-center'>
                  <h2 className='text-white text-2xl md:text-3xl lg:text-4xl font-outfit font-semibold tracking-wider capitalize'>Boosting Your Learning</h2>
                </div>
                <div className='bg-deep-purple-500 rounded-xl p-6 flex flex-col gap-4'>
                  <h2 className='text-white text-xl font-outfit font-semibold tracking-wider capitalize'>Want to know more</h2>
                  <Button color='white'>Read more</Button>
                </div>
              </div>



            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Home