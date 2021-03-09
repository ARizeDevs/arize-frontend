import { useCallback, useEffect, useRef } from "react";
import _ from 'lodash'

const useDebounce = (cb : any, delay : number) => {
    // ...
    const inputsRef = useRef(cb)
    useEffect(() => { inputsRef.current = { cb, delay } })
    return useCallback(
      _.debounce((...args) => {
            inputsRef.current.cb(...args)
        }, delay),
      [delay, _.debounce]
    )
}

export default useDebounce