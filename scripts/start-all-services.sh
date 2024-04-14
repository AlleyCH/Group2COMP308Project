#!/bin/bash

# Navigate to each service directory and start it in the background
echo "Starting backend services..."
cd ../services/auth-microservice && npm start &
cd ../services/vital-signs-microservice && npm start &

echo "Starting frontends..."
cd ../frontends/auth-micro-frontend && npm run dev &
cd ../frontends/vital-signs-micro-frontend && npm run dev &

# Wait for any process to exit
wait
echo "All services have started."
