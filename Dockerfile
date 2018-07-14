FROM dl2.homeawaycorp.com/ha-docker/mininode:8.9.3-master-4243a52

# App specific Environment variables
ENV APP=mbernal-hau-helloworld-ui
ENV PROJECT_HOME /usr/local/homeaway/${APP}
ENV SVC_LOG_DIR=$PROJECT_HOME/logs

# Marathon/Mesos use PORT, so we had to chance the ENV var
ENV NODE_PORT 8080
EXPOSE ${NODE_PORT}

# Copy build content from TC into PROJECT_HOME
RUN mkdir -p $PROJECT_HOME \
    && mkdir -p $SVC_LOG_DIR \
    && touch $SVC_LOG_DIR/stdout.log \
    && chown -R homeaway:homeaway /usr/local/homeaway

WORKDIR $PROJECT_HOME
COPY . .

# Set up containerpilot config
COPY tools/docker/containerpilot.json /etc/containerpilot.json
ENV CONTAINERPILOT=file:///etc/containerpilot.json

CMD ["containerpilot", "./tools/docker/entrypoint.bash"]
