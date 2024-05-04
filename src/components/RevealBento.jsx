import React from 'react'
import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import { FiArrowRight, FiMail, FiMapPin } from 'react-icons/fi'
import { SiGithub, SiTiktok, SiTwitter, SiYoutube } from 'react-icons/si'

import { FooViewScene } from './FooViewScene'
import { PerspectiveCamera, View } from '@react-three/drei'
import { ShaderView1 } from './ShaderView1'

export const RevealBento = () => {
  return (
    <div className="min-h-screen {/*bg-zinc-900*/} px-4 py-12 text-zinc-50 overflow-y-auto">
      <Logo />
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05
        }}
        className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4">
        {/*  */}
        <Block className="col-span-12 md:col-span-6">
          <img src="https://api.dicebear.com/8.x/croodles-neutral/svg?seed=Felix" alt="avatar" className="mb-4 size-14 rounded-full bg-zinc-400" />
          <h1 className="mb-12 text-4xl font-medium leading-tight">
            Look like a <span className="text-zinc-400">frog. </span>
          </h1>
          <a href="#" className="flex items-center gap-1 text-red-300 hover:underline">
            Unveal it <FiArrowRight />
          </a>
        </Block>

        {/*  */}
        {/* <Block className="col-span-12 md:col-span-6 p-0">
          <View className="h-full">
            <ShaderView1 />
           
          </View>
        </Block> */}

        <Block className="col-span-12 md:col-span-6 p-0 pointer-events-none">
          <div className="relative h-0" style={{ paddingBottom: '56.25%' }}>
            <div className="absolute inset-0">
              <View className="h-full">
                <ShaderView1 />
              </View>
            </div>
          </div>
        </Block>
        <Block className="col-span-12 md:col-span-6 p-0 row-span-2 pointer-events-none">
          {/* <div className="relative h-0" style={{ paddingBottom: '56.25%' }}> */}
          <div className="absolute inset-0  z-20">
            <View className="h-[1000vh]  ">
              <ShaderView1 />
            </View>
            {/* </div> */}
          </div>
        </Block>
        <Block className="col-span-12 md:col-span-6 p-0 pointer-events-none">
          <div className="relative h-0" style={{ paddingBottom: '56.25%' }}>
            <div className="absolute inset-0">
              <View className="h-full">
                <ShaderView1 />
              </View>
            </div>
          </div>
        </Block>

        <AboutBlock />

        {/* <div className="col-span-12 row-span-2 md:col-span-2 ">
          <View className="w-full h-full">
            <ShaderView1 />
          </View>
        </div> */}
        {/* <View className="col-span-12 row-span-2 md:col-span-6 ">
          <FooViewScene />
        </View> */}
        <LocationBlock />
        <EmailListBlock />
        <EmailListBlock />
        <EmailListBlock />
        <EmailListBlock />
        <EmailListBlock />
        <EmailListBlock />
        <EmailListBlock />
        <EmailListBlock />
      </motion.div>
      <Footer />
    </div>
  )
}

const Block = ({ className, ...rest }) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1
        }
      }}
      transition={{
        type: 'spring',
        mass: 3,
        stiffness: 400,
        damping: 50
      }}
      className={twMerge('col-span-4 rounded-lg border border-zinc-700 bg-zinc-800 p-6', className)}
      {...rest}
    />
  )
}

const TwoStack = () => {
  return (
    <>
      <Block
        whileHover={{
          rotate: '-2.5deg',
          scale: 1.1
        }}
        className="col-span-6 bg-orange-300 md:col-span-3">
        <a href="#" className="grid h-full place-content-center text-3xl text-white">
          {/* <SiGithub /> */}
        </a>
      </Block>
      <Block
        whileHover={{
          rotate: '-2.5deg',
          scale: 1.1
        }}
        className="col-span-6 bg-zinc-50 md:col-span-3">
        <a href="#" className="grid h-full place-content-center text-3xl text-black">
          <SiTiktok />
        </a>
      </Block>
    </>
  )
}

const HeaderBlock = () => (
  <Block className="col-span-12 row-span-2 md:col-span-6">
    <img src="https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=John" alt="avatar" className="mb-4 size-14 rounded-full" />
    <h1 className="mb-12 text-4xl font-medium leading-tight">
      Look like a <span className="text-zinc-400">frog. </span>
    </h1>
    <a href="#" className="flex items-center gap-1 text-red-300 hover:underline">
      Unveal it <FiArrowRight />
    </a>
  </Block>
)

const SocialsBlock = () => (
  <>
    <Block
      whileHover={{
        rotate: '2.5deg',
        scale: 1.1
      }}
      className="col-span-6 md:col-span-3 row-span-2">
      <View className="w-full h-full">
        <ShaderView1 />
      </View>
      {/* <a href="#" className="grid h-full place-content-center text-3xl text-white">
        <SiYoutube />
      </a> */}
    </Block>
    <Block
      whileHover={{
        rotate: '-2.5deg',
        scale: 1.1
      }}
      className="col-span-6 bg-green-600 md:col-span-3">
      <a href="#" className="grid h-full place-content-center text-3xl text-white">
        <SiGithub />
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: '-2.5deg',
        scale: 1.1
      }}
      className="col-span-6 bg-zinc-50 md:col-span-3">
      <a href="#" className="grid h-full place-content-center text-3xl text-black">
        <SiTiktok />
      </a>
    </Block>
    {/* <Block
      whileHover={{
        rotate: '2.5deg',
        scale: 1.1
      }}
      className="col-span-6 bg-blue-500 md:col-span-3">
      <a href="#" className="grid h-full place-content-center text-3xl text-white">
        <SiTwitter />
      </a>
    </Block> */}
  </>
)

const AboutBlock = () => (
  <Block className="col-span-12 text-3xl leading-snug">
    <p>
      My passion is talking about my passions. <span className="text-zinc-400"></span>
    </p>
  </Block>
)

const LocationBlock = () => (
  <Block className="col-span-12 flex flex-col items-center gap-4 md:col-span-3">
    <FiMapPin className="text-3xl" />
    <p className="text-center text-lg text-zinc-400">Cyberspace</p>
  </Block>
)

const EmailListBlock = () => (
  <Block className="col-span-12 md:col-span-9">
    <p className="mb-3 text-lg">Join my mailing list</p>
    <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-1.5 transition-colors focus:border-red-300 focus:outline-0"
      />
      <button
        type="submit"
        className="flex items-center gap-2 whitespace-nowrap rounded bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-300">
        <FiMail /> Join the list
      </button>
    </form>
  </Block>
)

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    // <svg width="40" height="auto" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-12 fill-zinc-50">
    //   <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" stopColor="#000000"></path>
    //   <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" stopColor="#000000"></path>
    // </svg>
    <svg id="logo-59" width="80" height="auto" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-12">
      <path
        className="stroke"
        d="M20.19 5.99992C14.9 4.46992 7.46999 1.23992 4.80999 6.58992C1.89999 12.4699 7.04999 17.9999 10.41 22.3499C12.72 25.6499 11.9 28.4699 8.83999 31.6899C1.99999 38.8599 5.07999 48.4599 15.15 48.6199C19.54 48.6199 23.61 46.5399 27.48 44.4599C34.9 40.4599 39.48 43.4099 44.31 39.9399C47.55 37.6299 45.26 31.7299 43.92 28.1799C42.777 25.2112 42.7028 21.9374 43.71 18.9199C44.71 15.0999 45.35 8.91992 41.13 7.00992C39.21 6.28992 37 7.11992 35 6.46992C32.52 5.63992 31.28 2.70992 28.85 1.73992C24.12 -0.160081 24 6.99992 20.19 5.99992Z"
        stroke="black"
        strokeWidth="0.5"
        strokeMiterlimit="10"></path>
      <path
        className="stroke"
        d="M29.19 2.88991C31.5 3.78991 32.7 6.53991 35.06 7.32991C36.91 7.94991 39.06 7.13991 40.84 7.87991C44.84 9.55991 44.47 15.5799 43.39 19.1699C42.5239 22.0626 42.6045 25.1563 43.62 27.9999C44.87 31.3999 46.97 36.9999 43.89 39.2199C39.27 42.5599 34.89 39.8699 27.89 43.5999C24.22 45.5399 20.35 47.5099 16.21 47.4399C6.71001 47.2999 3.78001 38.1999 10.1 31.4399C12.94 28.3899 13.77 25.6699 11.55 22.5799C8.55001 18.3699 3.63001 13.1899 6.40001 7.63991C8.90001 2.52991 15.9 5.49991 20.91 6.85991C24.51 7.83991 24.68 1.10991 29.19 2.88991Z"
        stroke="black"
        strokeWidth="0.49"
        strokeMiterlimit="10"></path>
      <path
        className="stroke"
        d="M29.48 3.99994C31.67 4.84994 32.85 7.39994 35.08 8.14994C36.83 8.73994 38.84 7.99994 40.55 8.70994C44.38 10.3599 44 15.9999 43.07 19.4199C42.2952 22.1631 42.3825 25.0781 43.32 27.7699C44.48 31.0299 46.4 36.3199 43.48 38.4599C39.11 41.6599 34.94 39.2399 28.25 42.6899C24.78 44.4999 21.13 46.3099 17.25 46.2199C8.30003 45.9999 5.50003 37.4999 11.33 31.0899C13.95 28.2099 14.71 25.6299 12.64 22.7199C9.81003 18.7199 5.32003 13.8199 7.94003 8.58994C10.34 3.81994 16.94 6.51994 21.64 7.74994C25 8.64994 25.24 2.39994 29.48 3.99994Z"
        stroke="black"
        strokeWidth="0.47"
        strokeMiterlimit="10"></path>
      <path
        className="stroke"
        d="M29.77 5.18995C31.85 5.99995 33 8.33995 35.1 9.04995C36.75 9.59995 38.65 8.93995 40.26 9.61995C43.86 11.16 43.62 16.44 42.75 19.68C42.0612 22.2746 42.1481 25.0142 43 27.56C44.09 30.68 45.81 35.67 43.06 37.72C38.94 40.79 34.96 38.62 28.63 41.81C25.35 43.47 21.92 45.13 18.25 45.02C9.89999 44.79 7.24999 36.82 12.57 30.78C14.97 28.08 15.65 25.65 13.75 22.9C11.14 19.11 6.99999 14.49 9.50999 9.57995C11.77 5.10995 17.91 7.57995 22.37 8.64995C25.55 9.44995 25.79 3.68995 29.77 5.18995Z"
        stroke="black"
        strokeWidth="0.46"
        strokeMiterlimit="10"></path>
      <path
        className="stroke"
        d="M30.06 6.34C32.06 7.06 33.13 9.24 35.12 9.9C36.68 10.43 38.45 9.85 39.96 10.49C43.35 11.95 43.19 16.87 42.43 19.93C41.8313 22.3846 41.9283 24.9574 42.71 27.36C43.71 30.36 45.25 35.01 42.66 36.98C38.78 39.91 34.99 37.98 29.03 40.98C25.95 42.5 22.72 43.98 19.29 43.87C11.52 43.55 8.99997 36.15 13.82 30.48C16 27.95 16.62 25.67 14.88 23.08C12.47 19.5 8.74997 15.16 11.08 10.58C13.21 6.4 18.92 8.58 23.08 9.58C26.07 10.25 26.35 5 30.06 6.34Z"
        stroke="black"
        strokeWidth="0.45"
        strokeMiterlimit="10"></path>
      <path
        className="stroke"
        d="M30.36 7.48995C32.21 8.14995 33.27 10.13 35.14 10.76C36.6 11.26 38.26 10.76 39.67 11.37C42.84 12.75 42.77 17.3 42.11 20.18C41.5927 22.4991 41.6962 24.9136 42.41 27.18C43.32 30.01 44.67 34.38 42.24 36.27C38.62 39 35 37.37 29.42 40C26.53 41.38 23.52 42.73 20.33 42.59C13.13 42.26 10.7 35.42 15.07 30.14C17.07 27.78 17.57 25.65 16 23.23C13.8 19.85 10.46 15.79 12.65 11.54C14.65 7.63996 19.92 9.53995 23.82 10.4C26.59 11.06 26.91 6.24995 30.36 7.48995Z"
        stroke="black"
        strokeWidth="0.43"
        strokeMiterlimit="10"></path>
      <path
        className="stroke"
        d="M30.65 8.63997C32.38 9.23997 33.42 11.03 35.16 11.64C36.53 12.1 38.07 11.64 39.38 12.26C42.32 13.57 42.38 17.76 41.79 20.45C41.3604 22.6267 41.4703 24.8755 42.11 27C42.93 29.68 44.11 33.75 41.83 35.55C38.46 38.21 35.03 36.8 29.83 39.21C27.14 40.45 24.34 41.63 21.39 41.48C14.77 41.1 12.46 34.83 16.39 29.93C18.12 27.73 18.6 25.76 17.18 23.5C15.18 20.34 12.25 16.55 14.28 12.62C16.15 9.01997 21 10.62 24.62 11.39C27.11 11.86 27.47 7.53997 30.65 8.63997Z"
        stroke="black"
        strokeWidth="0.42"
        strokeMiterlimit="10"></path>
      <path
        className="stroke"
        d="M30.94 9.78993C32.56 10.3299 33.56 11.9299 35.18 12.4799C36.45 12.9099 37.87 12.5499 39.09 13.1099C41.81 14.3499 41.92 18.1699 41.47 20.6799C41.1325 22.7002 41.2487 24.7701 41.81 26.7399C42.54 29.2899 43.52 33.0399 41.42 34.7399C38.3 37.2599 35.06 36.1099 30.19 38.2599C27.69 39.3599 25.11 40.3899 22.4 40.2099C16.4 39.7999 14.17 34.0799 17.56 29.5599C19.08 27.5599 19.48 25.6999 18.23 23.6099C16.46 20.6599 13.89 17.1499 15.78 13.5499C17.52 10.2399 21.93 11.5499 25.28 12.2099C27.63 12.6699 28 8.81993 30.94 9.78993Z"
        stroke="black"
        strokeWidth="0.4"
        strokeMiterlimit="10"></path>
      <path
        className="stroke"
        d="M31.24 10.9401C32.74 11.4201 33.7 12.8301 35.24 13.3401C36.42 13.7401 37.72 13.4501 38.84 13.9801C41.34 15.1401 41.53 18.6001 41.19 20.9801C40.9355 22.8521 41.0579 24.7561 41.55 26.5801C42.19 28.9801 42.99 32.4301 41.05 34.0601C38.18 36.4501 35.12 35.5501 30.62 37.4301C28.31 38.4301 25.94 39.2701 23.47 39.0701C18 38.6201 15.94 33.4601 18.85 29.3101C20.14 27.4601 20.48 25.7801 19.39 23.8601C17.84 21.1101 15.64 17.8601 17.39 14.6101C18.99 11.6101 22.98 12.6801 26.04 13.1701C28.15 13.4701 28.58 10.1001 31.24 10.9401Z"
        stroke="black"
        strokeWidth="0.39"
        strokeMiterlimit="10"></path>
      <path
        className="stroke"
        d="M31.53 12.0901C32.92 12.5101 33.84 13.7301 35.22 14.1901C36.3 14.5601 37.48 14.3601 38.5 14.8501C40.78 15.9401 41.06 19.0301 40.83 21.1901C40.6599 22.912 40.785 24.6503 41.2 26.3301C41.76 28.5901 42.38 31.7401 40.6 33.3301C38 35.5401 35.1 34.9001 31 36.5101C28.9708 37.4551 26.7471 37.9074 24.51 37.8301C19.61 37.3301 17.68 32.7401 20.09 28.9701C20.6461 28.2714 20.9828 27.4236 21.0575 26.5337C21.1323 25.6439 20.9417 24.7518 20.51 23.9701C19.17 21.4301 17.36 18.4901 18.95 15.5301C20.43 12.8101 23.95 13.6301 26.77 13.9901C28.66 14.2801 29.14 11.3801 31.53 12.0901Z"
        stroke="black"
        strokeWidth="0.38"
        strokeMiterlimit="10"></path>
      <path
        className="stroke"
        d="M31.82 13.2399C33.1 13.5899 33.99 14.6199 35.24 15.0499C36.24 15.3899 37.24 15.2599 38.24 15.7199C40.3 16.7199 40.66 19.4599 40.54 21.4399C40.458 23.0137 40.5892 24.5913 40.93 26.1299C41.4 28.2399 41.83 31.0799 40.21 32.5399C37.85 34.6599 35.21 34.2799 31.38 35.6299C29.5341 36.413 27.5312 36.7554 25.53 36.6299C21.21 36.0899 19.4 32.0699 21.33 28.6299C21.772 27.9744 22.0317 27.2131 22.0827 26.4242C22.1337 25.6352 21.974 24.8469 21.62 24.1399C20.49 21.8099 19.06 19.1399 20.51 16.5199C21.86 14.0899 24.98 14.6399 27.51 14.8799C29.18 15.0799 29.7 12.6599 31.82 13.2399Z"
        stroke="black"
        strokeWidth="0.36"
        strokeMiterlimit="10"></path>
      <path
        className="stroke"
        d="M32.11 14.39C33.28 14.68 34.11 15.52 35.26 15.91C36.1621 16.0717 37.0511 16.2989 37.92 16.59C39.75 17.53 40.2 19.89 40.19 21.69C40.1912 23.1099 40.3285 24.5264 40.6 25.92C40.98 27.92 41.23 30.43 39.77 31.79C37.66 33.79 35.15 33.66 31.77 34.79C30.1128 35.4169 28.3334 35.653 26.57 35.48C25.7719 35.4162 25.0016 35.1578 24.3265 34.7274C23.6513 34.297 23.092 33.7077 22.6973 33.0111C22.3026 32.3145 22.0846 31.5317 22.0624 30.7314C22.0403 29.931 22.2145 29.1374 22.57 28.42C22.8998 27.8093 23.0848 27.131 23.1108 26.4375C23.1368 25.744 23.0031 25.0537 22.72 24.42C21.81 22.29 20.72 19.91 22.07 17.61C23.28 15.47 25.97 15.75 28.2 15.86C29.7 15.89 30.26 13.93 32.11 14.39Z"
        stroke="black"
        strokeWidth="0.35"
        strokeMiterlimit="10"></path>
      <path
        className="stroke"
        d="M32.41 15.54C33.3923 15.8874 34.351 16.2983 35.28 16.77C36.0818 16.9316 36.8681 17.1625 37.63 17.46C39.24 18.33 39.77 20.32 39.87 21.94C39.94 23.16 40.11 24.49 40.3 25.72C40.59 27.55 40.65 29.77 39.36 31.05C37.5 32.91 35.18 33.05 32.12 33.86C30.655 34.3292 29.1017 34.4558 27.58 34.23C26.8932 34.1396 26.2351 33.8972 25.6537 33.5204C25.0724 33.1436 24.5823 32.6419 24.2193 32.0518C23.8563 31.4618 23.6294 30.7982 23.5551 30.1094C23.4808 29.4206 23.5611 28.7239 23.79 28.07C24.2251 26.937 24.2251 25.6831 23.79 24.55C23.1 22.63 22.43 20.55 23.59 18.55C24.75 16.55 26.92 16.67 28.88 16.71C30.22 16.73 30.82 15.2 32.41 15.54Z"
        stroke="black"
        strokeWidth="0.34"
        strokeMiterlimit="10"></path>
      <path
        className="stroke"
        d="M32.7 16.6899C33.592 16.9283 34.4618 17.2428 35.3 17.6299C35.9883 17.7963 36.6582 18.0308 37.3 18.3299C37.9322 18.7709 38.4584 19.3468 38.8406 20.0162C39.2228 20.6855 39.4515 21.4314 39.51 22.1999C39.66 23.2499 39.83 24.4099 39.96 25.5099C40.15 27.1999 40.03 29.1099 38.96 30.3099C37.33 31.9999 35.2 32.4299 32.51 32.9999C31.2299 33.3061 29.8976 33.3231 28.61 33.0499C27.4325 32.8219 26.3927 32.1382 25.7167 31.1476C25.0406 30.157 24.7831 28.9395 25 27.7599C25.2057 26.7662 25.1715 25.7377 24.9 24.7599C24.43 23.0399 24.13 21.2299 25.14 19.5799C26.15 17.9299 28 17.7599 29.64 17.5999C30.73 17.4999 31.39 16.4699 32.7 16.6899Z"
        stroke="black"
        strokeWidth="0.32"
        strokeMiterlimit="10"></path>
      <path
        className="stroke"
        d="M33 17.8401C33.799 17.9614 34.5811 18.1762 35.33 18.4801C35.9095 18.6631 36.469 18.9043 37 19.2001C38.114 19.9682 38.8964 21.1292 39.19 22.4501C39.4307 23.3843 39.588 24.3381 39.66 25.3001C39.839 26.8214 39.4195 28.3526 38.49 29.5701C37.0097 31.1065 34.9919 32.0097 32.86 32.0901C31.7708 32.2472 30.6603 32.1583 29.61 31.8301C28.6665 31.539 27.8366 30.9623 27.2348 30.1796C26.633 29.3969 26.2889 28.4467 26.25 27.4601C26.2294 26.6093 26.1525 25.7608 26.02 24.9201C25.6787 23.4289 25.9258 21.8636 26.71 20.5501C27.1439 19.9819 27.6883 19.5074 28.3104 19.1551C28.9325 18.8028 29.6195 18.58 30.33 18.5001C31.25 18.3201 32 17.7401 33 17.8401Z"
        stroke="black"
        strokeWidth="0.31"
        strokeMiterlimit="10"></path>
      <path
        className="stroke"
        d="M33.29 31.21C36.6645 31.21 39.4 28.4745 39.4 25.1C39.4 21.7255 36.6645 18.99 33.29 18.99C29.9155 18.99 27.18 21.7255 27.18 25.1C27.18 28.4745 29.9155 31.21 33.29 31.21Z"
        stroke="black"
        strokeWidth="0.29"
        strokeMiterlimit="10"></path>
    </svg>
  )
}

const Footer = () => {
  return (
    <footer className="mt-12">
      <p className="text-center text-zinc-400">
        Made with you in mind
        <a href="#" className="text-red-300 hover:underline">
          @tomisloading
        </a>
      </p>
    </footer>
  )
}
