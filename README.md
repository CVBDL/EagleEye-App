[![Build Status](https://travis-ci.org/CVBDL/EagleEye-App.svg?branch=master)](https://travis-ci.org/CVBDL/EagleEye-App) [![Coverage Status](https://coveralls.io/repos/github/CVBDL/EagleEye-App/badge.svg)](https://coveralls.io/github/CVBDL/EagleEye-App)

# EagleEye Application

[![Join the chat at https://gitter.im/CVBDL](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/CVBDL)

## Installation

* Install Git (https://git-scm.com/download/win)
* Install Node.js (https://nodejs.org/dist/v4.4.5/node-v4.4.5-x64.msi)
* Install Ruby (http://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-2.2.4-x64.exe)
* Install the compass gem:

> Note: You may need to add `C:\Ruby22-x64\bin` to system path.

```sh
gem install compass
```

* Install `yo`, `grunt-cli`, `bower`, `generator-angular` and `generator-karma`:

```sh
npm install -g grunt-cli bower yo generator-karma generator-angular
```

* Install application packages:

```sh
npm install
```

```sh
bower install
```

## Build & development

```sh
# Build the project
grunt
```

```sh
# Preview the application in browser
grunt serve
```

## Testing

```sh
grunt test
```

It will run the unit tests with karma and PhantomJS.

## Deployment

Update `config.json` to specify EagleEye Platform API root endpoint.

```json
{
  "root_endpoint": "http://127.0.0.1:3000/"
}
```
