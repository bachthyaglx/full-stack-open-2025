* Prepare .env
```bash
DATABASE_URL=db_url
PORT=port_num
SECRET=jwt_secret_key
```
* How run program
```bash
flyctl proxy 5432 -a <postgres-app-name>
```
```bash
npm run dev
```
------------------------------------------
* Option: Run sql query on cli 
```bash
flyctl ssh console -a <postgres-app-name>
psql -U postgres -h 127.0.0.1 -d postgres
```

