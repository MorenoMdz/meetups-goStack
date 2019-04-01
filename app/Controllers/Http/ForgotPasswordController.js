'use strict';
const moment = require('moment');
const crypto = require('crypto');
const User = use('App/Models/User');
const Mail = use('Mail');

class ForgotPasswordController {
  async store({ request, response }) {
    try {
      const email = request.input('email');
      const user = await User.findByOrFail('email', email);

      user.token = crypto.randomBytes(10).toString('hex');
      user.token_created_at = new Date();

      await user.save();

      /**
       * TODO Add to API Documentation
       * The front end must provide the redirect url
       */
      await Mail.send(
        ['emails.forgot_password'],
        {
          username: user.username,
          email,
          token: user.token,
          link: `${request.input('redirect_url')}?token=${user.token}`,
        },
        message => {
          message
            .to(user.email)
            .from('admin@meetups-gostack.com', 'Admin | Meetups goStack')
            .subject('Recuperação de senha');
        }
      );
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Algo deu errado, email não encontrado.' } });
    }
  }

  async update({ request, response }) {
    /**
     * TODO Doc
     * Frontend will find the user by the token relation to that user
     *  ?? Is this safe ?/
     */
    try {
      const { token, password } = request.all();

      const user = await User.findByOrFail('token', token);

      const tokenExpired = moment()
        .subtract('2', 'days')
        .isAfter(user.token_created_at);

      if (tokenExpired) {
        return response.status(401).send({
          error: {
            message: 'O Token de recuperação está expirado.',
          },
        });
      }

      user.token = null;
      user.token_created_at = null;
      user.password = password;

      await user.save();

      return response
        .status(200)
        .send({ success: { message: 'Usuário atualizado com sucesso.' } });
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message:
            'Algo deu errado ao resetar sua senha, tente novamente ou contate um administrador.',
        },
      });
    }
  }
}

module.exports = ForgotPasswordController;
