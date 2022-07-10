import { KeyboardEvent } from 'react'

export default function keyDownHandler(event: KeyboardEvent) {
  if (event.key !== undefined) {
    return event.key
  } else if (event.keyIdentifier !== undefined) {
    return event.keyIdentifier
  } else if (event.keyCode !== undefined) {
    return event.keyCode
  }
}