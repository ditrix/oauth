[ABOUT]

Project for relize OAuth identity of Google, Facebook, Twitter

you have run  project with https (Facebook api used only https) 

set HTTPS=true&&npm start   // for Win

export HTTPS=true&&npm statr // for Linux

or edit your package.json  scripts section

for windows

	"scripts": {
        "start": "set HTTPS=true&&react-scripts start",
        ...
     }


for Linux

	"scripts": {
        "start": "export HTTPS=true&&react-scripts start",
        ...
     }




