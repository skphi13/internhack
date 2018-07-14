#!/bin/sh

# ensure our $PROJECT_HOME/logs and $PROJECT_HOME/stateful-data directories that multipaas mount are correctly owned.
# otherwise they'll be owned by root and homeaway won't be able to write to these directories
chown -R homeaway:homeaway ${PROJECT_HOME}

# Execute node application and redirect logs locally to disk
# TODO: stop redirecting logs some day so that mesos and docker native logging can help instead.
exec gosu homeaway /usr/local/bin/node . > ${PROJECT_HOME}/logs/stdout.log 2>&1
