const getReferrer = () => (window.location != window.parent.location)? document.referrer : ''

export default getReferrer