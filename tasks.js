module.exports = (resources) => {
  const my = {}
  const shared = {
    ERROR: 'Error',
    PATH: '/v1/service/test/loadinfo',
    OK: 'successfully:'
  }

  // ============================================================================

  my.run = async (input) => {
    const { bundled_config, _debug } = resources
    let output = {}

    try {
      const data = await setup(await validate(await load(input)))
      output = [...data.files , ...data.errored_files]
      //upload file to S3
      // s3_driver.add(shared.PATH, output).then(response => {
      //   console.log(shared.OK, response);
      // })
      //   .catch(error => {
      //     console.error(shared.ERROR, error);
      //     throw new Error(JSON.stringify({
      //     status: shared.ERROR,
      //     messageError: error.message,
      // }))
      // });
    } catch (e) {
      throw new Error(JSON.stringify({
        status: shared.ERROR,
        messageError: e.message,
      }))
    }

    return output

    async function load(input = {}) {
      const config = {}
      // assing imput object to config
      config.files = input.Files
      config.scanned_files = input.scanned_files
      config.errored_files = input.errored_files
      return config
    }

    async function setup(config) {
      const data = { ...config }
      // validated no ids repeate in scanned
      data.files = await validationIfProcessed(data.files, data.scanned_files)
      // validate length files elements to push in errors
      for (let file of data.files) {
        if (file.length < 15 || file.length > 19 || await alphanumericValidation(file) === true) {
          data.errored_files.push(file)
        }
      }
      // validated no ids repeate in errored
      data.files = await validationIfProcessed(data.files, data.errored_files)

      return data
    }

    async function validate(config) {
      // validat inputs exist
      ;[
        [config.files, "files - This is an array of files"],
        [config.scanned_files, "scanned_files - This is an array of scanned files"],
        [config.errored_files, "errored_files - This is an array with the errored_files"],
      ].forEach(([item, name]) => { if (!item) { throw new Error('MissingInput: ' + name) } })
      return config
    }


    //validated if a load is already processed
    function validationIfProcessed(files, validate) {
      let validated_files = files
      for (let val of validate) {
        validated_files = files.filter(file => file !== val)
      }
      return validated_files
    }
    //validate if IDs are alphanumerical
    function alphanumericValidation(id) {
      const regex = /[^\w\s]/;
      return regex.test(id);
    }
  }

  return my
}
