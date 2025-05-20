# Pull the ubuntu image from Docker Hub the first time:
docker pull ubuntu

# Find your container name or ID
docker ps -a  

# Start your actual container with name/ID
docker start -i NAME/ID

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

----------------------------------------------------------------------------------
# Create a Dockerfile
# Build the Docker Image, from the root of todo-backend
docker build -t todo-backend .
# Run the container and expose port 3000:
docker run -p 3000:3000 todo-backend
# Find the running container, kill it
docker ps 
docker kill NAME/ID
