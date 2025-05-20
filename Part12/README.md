# Pull the ubuntu image from Docker Hub the first time:
docker pull ubuntu

# Find your container name or ID
docker ps -a  

# Start your actual container with name/ID
docker start -i <container_NAME/ID>

# Starts an interactive Ubuntu container and opens a Bash shell inside it.
docker run -it ubuntu bash

# (Only needed inside container) Creates the directory if it doesn't exist, so script can write to it.
mkdir -p script-answers	

# (Run inside container) Starts recording all terminal activity into a log file.
script /script-answers/exercise12_2.txt	

# Creates a directory path /usr/src/app inside the container
# -p ensures all parent directories are created if they don't exist.
mkdir -p /usr/src/app	

# Creates a file named index.js with sample JS code inside /usr/src/app
echo 'console.log("Hello from container!");' > /usr/src/app/index.js

# Exit Ubuntu container (and also stops the script recording if active).
exit

# Check recordings in /script-answers/exercise12_2.txt
cat /script-answers/exercise12_2.txt

# Save/copy file on Windows machine (via volume mount) at eg: D:\Fullstackopen-2025\Part12\Part12.2\script-answers\exercise12_2.txt
docker run -it -v ${PWD}\script-answers:/script-answers ubuntu bash
docker cp <container_id>:/script-answers/exercise12_2.txt ./script-answers/

-------------------------------------------------------
# Create a Dockerfile
# Build the Docker Image
docker build -t todo-backend .
# Run the Container
docker run -p 3000:3000 todo-backend
# Stop the container
docker ps
docker kill <container_NAME/ID>

------------------------------------------------------
# From the same todo-backend/ directory, start Node.js app with:
docker compose up
docker compose down
# If you need to rebuild
docker compose up --build 

-------------------------------------------------------
# Start MongoDB + Redis with:
docker compose -f docker-compose.dev.yml up
docker compose -f docker-compose.dev.yml down --volumes
# Connected the Node.js app to MongoDB, and REDIS via:
$env:MONGO_URL = "mongodb://the_username:the_password@localhost:3456/the_database"
$env:REDIS_URL = "redis://localhost:6379"
npm run dev

-------------------------------------------------------
# Build image for frontend
docker build -t todo-frontend --build-arg VITE_BACKEND_URL=http://localhost:3000 .
# Start frontend
docker run -p 5000:80 todo-frontend

------------------------------------------------------
# Mount (and start) local todo-frontend folder into the container and exposes port 5173 for Vite.
docker compose -f docker-compose.dev.yml up

