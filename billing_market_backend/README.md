#Step to run backend project

step 1:create empty folder open it

step 2: right click open gitbash 

step 3: initialize it as git using 'git init' command

step 4: copy https from github repository

step 5: fire command 'git clone <REPOSITORY_ADDRESS>'

step 6: open billing_market_backend in vs code

step 7: create virtual environment and activate it

step 8: cd billing_market

step 9: pip install -r requirements.txt

step 10: create .env file
        add SECRET_KEY
        e.g : SECRET_KEY=ghxfdzkfjvjhblkh45fghfyi86yigp9

step 11: py manage.py makemigrations   

step 12: py manage.py migrate

step 12: py manage.py createsuperuser

step 14: py manage.py runserver
