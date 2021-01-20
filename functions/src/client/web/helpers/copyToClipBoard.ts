export const copyToClipBoard = (text : string) => {
    if(typeof window !== 'undefined' && window.navigator) {
        window.navigator.clipboard.writeText(text);
        return
    } else {
        return
    }
}