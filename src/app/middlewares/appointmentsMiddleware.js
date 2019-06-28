import * as Yup from 'yup';

export async function appointmentStoreMiddleware(req, res, next) {
  const schema = Yup.object().shape({
    provider_id: Yup.number().required(),
    date: Yup.date().required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(401).json({ error: 'Invalid appointment' });
  }

  return next();
}

export async function update(req, res, next) {
  return next();
}
