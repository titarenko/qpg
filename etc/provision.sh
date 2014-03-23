# install nfs-related stuff
sudo apt-get update
sudo apt-get install -y nfs-common portmap

# install common tools
sudo apt-get update
sudo apt-get install -y python-software-properties python g++ make

# install nodejs
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install -y nodejs

# postgresql
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ precise-pgdg main" >> /etc/apt/sources.list.d/postgresql.list'
sudo apt-get update
sudo apt-get install -y postgresql-9.3

# configurate postgresql
sudo cp /vagrant/etc/pg_hba.conf /etc/postgresql/9.3/main
sudo service postgresql restart

# init db
sudo -u postgres psql < /vagrant/etc/init.sql
