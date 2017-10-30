# server
Server Database API

+ Authenticate first to get the token
 - /auth must be POST
 - {email: "", password: ""}
+ Use the token
 - /api/tasks/table=user( OPTIONAL ";fields=columname,columname,....." ) ?columnname = value
 - must be GET
 - to update must be PUT
 - to insert must be POST
 - to delete must be DELETE
