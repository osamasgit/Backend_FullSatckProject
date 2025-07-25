exports.login = (req, res) => {
  const { username, password } = req.body

  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASSWORD) {
    req.session.authenticated = true
    return res.json({ success: true })
  }

  return res.status(401).json({ success: false, message: 'Credenciales inválidas' })
}

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true })
  })
}

exports.checkAuth = (req, res) => {
  if (req.session.authenticated) {
    return res.json({ authenticated: true })
  }
  res.json({ authenticated: false })
}