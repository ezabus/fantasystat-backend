jar -cMf build/backend.zip package.json src resources;
scp build/backend.zip ezabus@fantasystat.ru:/home/ezabus/backend/backend.zip;
ssh ezabus@fantasystat.ru unzip -o backend/backend.zip -d backend/;
ssh ezabus@fantasystat.ru npm update --prefix /home/ezabus/backend;
ssh ezabus@fantasystat.ru npm run pm2-stop --prefix /home/ezabus/backend;
ssh ezabus@fantasystat.ru npm run pm2-start --prefix /home/ezabus/backend;

