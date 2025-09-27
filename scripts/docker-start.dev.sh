#!/bin/bash
docker compose -f docker/docker-compose.dev.yml --env-file=.env.development  up  -d