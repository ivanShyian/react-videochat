import {FC} from 'react'
import {useTypedSelector} from '@/use/useTypedSelector'
import {ReactComponent as ISettings} from '@/assets/icons/i-settings.svg'
import {ReactComponent as ISignout} from '@/assets/icons/i-signout.svg'
import {useActions} from '@/use/useActions'
import {AuthActionCreators} from '@/store/reducers/auth/action-creators'

export const TheSidebarFooter: FC = () => {
  const me = useTypedSelector(selector => selector.auth.user)
  const {logout} = useActions(AuthActionCreators.logout)

  return (
    <div className="h-12 border-t border-white/20 text-white/90 absolute bottom-0 left-0 right-0 flex justify-between items-center px-4">
      <p>{me.nickname}</p>
      <div className="flex items-center">
        <ISettings className="fill-current text-white/80 hover:text-white cursor-pointer mr-3" />
        <ISignout
          onClick={logout}
          className="fill-current text-white/80 hover:text-white cursor-pointer"
        />
      </div>
    </div>
  )
}
