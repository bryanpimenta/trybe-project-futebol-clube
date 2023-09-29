const user = {
    id: 1,
    username: 'Killjoy',
    role: 'admin',
    email: 'Killjoy@email.com',
  };
  
  const userWithoutPassword = {
    id: 1,
    username: 'Killjoy',
    email: 'Killjoy@email.com',
  };
  
  const wrongPassUser = {
    id: 1,
    username: 'Killjoy',
    email: 'Killjoy@email.com',
    password: 'xxxxxxxxxx',
  };
  
  const validLoginBody = { email: 'Killjoy@email.com', password: 'secret_admin' };
  const invalidPasswordLoginBody = { email: 'Killjoy@email.com', password: 'kil' };
  const invalidEmailLoginBody = { email: 'invalid_email', password: 'killjoy' };
  const validUser = { ...user, password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW' };
  
  export {
    userWithoutPassword,
    invalidEmailLoginBody,
    invalidPasswordLoginBody,
    validLoginBody,
    wrongPassUser,
    validUser,
  };