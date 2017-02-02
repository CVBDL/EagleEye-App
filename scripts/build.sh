#!/bin/bash

set -e

if [ "$JOB" == "unittest" ]; then
  grunt test
  npm install coveralls@2 && cat ./coverage/report-lcov/lcov.info | ./node_modules/.bin/coveralls
elif [ "$JOB" == "eslint" ]; then
  grunt lint
else
  echo "Unknown job type. Please set JOB=unittest or JOB=eslint."
fi
