import Appointment from '../models/Appointment';
import User from '../models/User';

class AppointmentController {
  async store(req, res) {
    const { provider_id, date } = req.body;

    // check is a provider
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider)
      res
        .status(401)
        .json({ error: 'You can only create appointments with prodivers' });

    const appointment = await Appointment.create({
      user_ir: req.userId,
      provider_id,
      date,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
