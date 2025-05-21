* Pull the ubuntu image from Docker Hub the first time:
```bash 
docker pull ubuntu
```

* Find your container name or ID
```bash 
docker ps -a
```

* Start your actual container with name/ID
```bash 
docker start -i <container_NAME/ID>
```

* Starts an interactive Ubuntu container and opens a Bash shell inside it.
```bash 
docker run -it ubuntu bash
```

* (Only needed inside container) Creates the directory if it doesn't exist, so script can write to it.
```bash
mkdir -p script-answers
```

* (Run inside container) Starts recording all terminal activity into a log file.
```bash
script /script-answers/exercise12_2.txt
```	

* Creates a directory path /usr/src/app inside the container, -p ensures all parent directories are created if they don't exist.
```bash
mkdir -p /usr/src/app
```	

* Creates a file named index.js with sample JS code inside /usr/src/app
```bash
echo 'console.log("Hello from container!");' > /usr/src/app/index.js
```

* Exit Ubuntu container (and also stops the script recording if active).
```bash
exit
```

* Check recordings in /script-answers/exercise12_2.txt
```bash
cat /script-answers/exercise12_2.txt
```

* Save/copy file on Windows machine (via volume mount) at eg: D:\Fullstackopen-2025\Part12\Part12.2\script-answers\exercise12_2.txt
```bash
docker run -it -v ${PWD}\script-answers:/script-answers ubuntu bash
``` 
or
```bash
docker cp <container_id>:/script-answers/exercise12_2.txt ./script-answers/
```

-------------------------------------------------------
* Create a Dockerfile
* Build the Docker Image
```bash
docker build -t todo-backend .
```
* Run the Container
```bash
docker run -p 3000:3000 todo-backend
```
* Stop the container
```bash
docker ps
```
```bash
docker kill <container_NAME/ID>
```

------------------------------------------------------
* From the same todo-backend/ directory, start Node.js app with:
```bash
docker compose up
```
```bash
docker compose down
```
* If you need to rebuild
```bash
docker compose up --build
```

-------------------------------------------------------
* Start MongoDB + Redis with:
```bash
docker compose -f docker-compose.dev.yml up
```
```bash
docker compose -f docker-compose.dev.yml down --volumes
```
* Connected the Node.js app to MongoDB, and REDIS via:
```bash
$env:MONGO_URL = "mongodb://the_username:the_password@localhost:3456/the_database"
```
```bash
$env:REDIS_URL = "redis://localhost:6379"
```
```bash
npm run dev
```

-------------------------------------------------------
* Build image for frontend
```bash
docker build -t todo-frontend --build-arg VITE_BACKEND_URL=http://localhost:3000 .
```
* Start frontend
```bash
docker run -p 5000:80 todo-frontend
```

------------------------------------------------------
* Mount (and start) local todo-frontend folder into the container and exposes port 5173 for Vite.
```bash
docker compose -f docker-compose.dev.yml up
```
```bash
docker compose -f docker-compose.dev.yml down
```
* Start containers (and rebuild if needed):
```bash
docker compose -f docker-compose.dev.yml up --build
```
