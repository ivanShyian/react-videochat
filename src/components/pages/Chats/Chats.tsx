import { FC } from 'react';

export const Chats: FC = () => {
  return (
    <div className="chat w-full relative">
      <p className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 max-w-md text-center leading-snug font-extrabold text-transparent xs:text-xl md:text-3xl xl:text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Pick some chat from the sidebar or find one by searching
      </p>
      <div className="rounded-xl overflow-hidden h-[calc(100%_-_40px)] w-[calc(100%_-_20px)] m-5 ml-0">
        <img
          className="w-full h-full opacity-5"
          src='https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1'
        />
      </div>
    </div>
  )
}
