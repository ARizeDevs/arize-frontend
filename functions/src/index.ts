import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
import next from 'next'

const nextjsDistDirWeb = './src/client/web/.next'


const nextjsWebServer = next({
  dev: false,
  conf: {
    distDir: nextjsDistDirWeb,
  },
})
const nextjsWebHandle = nextjsWebServer.getRequestHandler()

admin.initializeApp()

// this import statement must be exactly here dont move it to the top
import app from './server/api'


export const webAPIV4 = functions.https.onRequest(app)

export const nextjsFunc = functions.https.onRequest((req, res) => {
    return nextjsWebServer.prepare().then(() => nextjsWebHandle(req, res))
})