# server
Server Database API

+ Authenticate first to get the token
 - /auth must be POST
 - {email: "", password: ""}
+ Use the token
 - /api/tasks/table=user( OPTIONAL ";fields=columname,columname,....." )
 - can be GET|POST
