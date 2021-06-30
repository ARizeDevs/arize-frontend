const getReferrer = () => (typeof window !== 'undefined' && window.location != window.parent.location)? document.referrer : ''

export default getReferrer