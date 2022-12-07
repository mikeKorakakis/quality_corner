- For IIS install url rewrite plugin 
https://www.iis.net/downloads/microsoft/url-rewrite

- Install node js


- install iis reverse proxy
https://www.iis.net/downloads/microsoft/application-request-routing

- enable iis -> server_name => Application Request Routing -> Server Proxy Settings -> Enable Proxy

- Application Pool -> No managed code 
 
- Application Folder -> iis_iusr add user rights

# create a next js service for autostarting

- nssm is included in folder

- nssm install [service_name]

path example C:\Program Files\nodejs\node.exe
startup example  C:\inetpub\test
arguments example c:\inetpub\test\node_modules\next\dist\bin\next start
