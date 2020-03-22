git pull
kill -9 $(lsof -t -i:3000)
npm install
ng serve -c production --host 0.0.0.0 --port 3000 &>~/frontend_COVID19.log &

