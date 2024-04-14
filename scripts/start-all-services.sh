#!/bin/bash

# Navigate to each service directory and start it in the background
echo "Starting backend services..."
cd ../services/auth-microservice && npm start &
cd ../services/vital-signs-microservice && npm start &

echo "Starting frontends..."
cd ../frontends/host && npm run dev &
cd ../frontends/remote-nurse && npm run dev &
cd ../frontends/remote-patient && npm run dev &

echo "Starting gateway..."
cd ../gateway/gateway && npm start &

# Wait for any process to exit
wait
echo "All services have started."
