import {FC} from 'react'
import SButton from '@/components/shared/SButton'

export const ThePageNotFound: FC = () => {
  return (
    <main className="bg-slate-to-pink h-full w-full flex justify-center items-center">
      <div className="flex flex-col items-center">
        <h1 className="max-w-md text-center leading-snug font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-7">
          Page not found!
        </h1>
        <div>
          <SButton
            theme="transparent"
            type="link"
            to={'/'}
            className="!border-2 !px-8 pb-2 pt-1 rounded-2xl"
          >
            To main page
          </SButton>
        </div>
      </div>
    </main>
  )
}
