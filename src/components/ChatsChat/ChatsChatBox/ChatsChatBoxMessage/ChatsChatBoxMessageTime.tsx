import { PureComponent } from 'react';
import moment from 'moment';

interface Props {
  createdAt: Date | null
}

export default class ChatsChatBoxMessageTime extends PureComponent<Props> {
  render () {
    return (
      <div className="ml-2 relative">
        <span className="text-xs text-white/90">{ moment(this.props.createdAt).format('HH:mm') }</span>
      </div>
    )
  }
}
