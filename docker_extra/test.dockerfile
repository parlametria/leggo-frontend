FROM cypress/base:10
RUN apt-get --assume-yes install openbsd-inetd netcat
WORKDIR /app
RUN npm install cypress
COPY cypress.json .
RUN $(npm bin)/cypress verify
CMD ./tests/run.sh
