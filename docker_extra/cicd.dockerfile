FROM docker/compose:1.23.0-rc1
ENTRYPOINT /bin/sh
RUN apk add nodejs-npm
