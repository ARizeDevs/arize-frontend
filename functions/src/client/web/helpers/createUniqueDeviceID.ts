import requestIp from 'request-ip' 

const createUniqueDeviceID = async (req : any) => {
    if(req) {
        const userAgent = req.headers['user-agent']
        const ipAddress =  requestIp.getClientIp(req)

        if(userAgent && ipAddress) {
            const deviceID = userAgent + '-' + ipAddress
            const hash = Buffer.from(deviceID , 'utf8').toString('hex');

            return hash
        }
    }

    return null

}

export default createUniqueDeviceID