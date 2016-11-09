#!/bin/bash

set -e

if [ "$JOB" == "unittest" ]; then
  grunt test
elif [ "$JOB" == "eslint" ]; then
  grunt lint
else
  echo "Unknown job type. Please set JOB=ci-checks, JOB=unit or JOB=e2e-*."
fi
