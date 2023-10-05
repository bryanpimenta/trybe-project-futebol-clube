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

const validToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk2MDEwNzUyLCJleHAiOjE2OTY4NzQ3NTJ9.1q6WC5daUrKmxfcXe3OW56J0Pa5AJkaEpTFPaxBuLZk`;
const validLoginBody = { email: 'Killjoy@email.com', password: 'secret_admin' };
const invalidPasswordLoginBody = { email: 'Killjoy@email.com', password: 'kil' };
const invalidEmailLoginBody = { email: 'Killjoy@email.com', password: validToken };
const validUser = { ...user, password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW' };

export {
  userWithoutPassword,
  invalidEmailLoginBody,
  invalidPasswordLoginBody,
  validLoginBody,
  validUser,
  validToken,
};