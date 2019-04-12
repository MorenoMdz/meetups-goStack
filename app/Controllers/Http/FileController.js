'use strict';

const File = use('App/Models/File');
const Helpers = use('Helpers');

class FileController {
  async show({ params, response }) {
    const file = await File.findOrFail(params.id);

    return response.download(Helpers.tmpPath(`uploads/${file.file}`));
  }

  async store({ request, response }) {
    try {
      if (!request.file('file')) return;

      const upload = request.file('file', { size: '5mb' });

      const fileName = `${Date.now()}.${upload.subtype}`;

      await upload.move(Helpers.tmpPath('uploads'), { name: fileName });

      if (!upload.moved()) {
        throw upload.error();
      }

      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype,
      });

      return file;
    } catch (error) {
      return response.status(error.status).send({
        error: { message: 'O upload de arquivo falhou, tente novamente' },
      });
    }
  }

  async destroy({ params, response }) {
    const file = await File.findOrFail(params.id);

    await file.delete();

    // return response.download(Helpers.tmpPath(`uploads/${file.file}`));

    return response
      .status(200)
      .send({ success: { message: `File ${file.file} removido com sucesso` } });
  }
}

module.exports = FileController;
