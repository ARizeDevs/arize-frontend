#!/bin/bash

cd functions/
npm run build
cd ..
firebase emulators:start

