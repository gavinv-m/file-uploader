// Exports to routes/sign-up.js
export const renderSignup = (req, res) => {
  const errors = req.flash('errors');
  res.render('signup', { errors });
};
