import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function getUserData(req, res) {

  const session = getSession(req, res);

  const { user } = session
  res.json({ protected: 'My secret', id: user.sub})

});