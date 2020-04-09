# Udagram Kubernetes setup

With Kubernetes the Docker images can be orchestrad. The Kubernetes setup files
contain all the information how the Docker images should be spawned and how
they should be connected.

## Setup of Kubernets cluster

With `kubectl apply -f <kubernetes-config-files>` all the config files can be
loaded. With `kubectl get pods` all the kubernetes pods can be displayed.

## Test application

Run the kubernetes cluster and the app will show on http://localhost:8100
