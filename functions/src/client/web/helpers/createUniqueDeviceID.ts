import requestIp from 'request-ip' 
import bcrypt from 'bcrypt'

const createUniqueDeviceID = async (req : any) => {
    if(req) {
        const userAgent = req.headers['user-agent']
        const ipAddress =  requestIp.getClientIp(req)
    
        if(userAgent && ipAddress) {
            const deviceID = userAgent + '-' + ipAddress
            const hash = await bcrypt.hash(deviceID, 10)

            return hash
        }
    }

    return null

}

export default createUniqueDeviceID