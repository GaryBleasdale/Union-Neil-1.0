exports.handler = async function(event, context) {
    const body = JSON.parse(event.body);
    const senha = body.senha;
    if (senha === 'cuidadodourado100'){
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "valid", iframe: `<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfxvdjXkcHWmjDyzdny-ti637zswd85UPY_UC9ifoxIg9O9xg/viewform?embedded=true" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0"></iframe>"`})
          };
    } else {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "invalid" })
          };
    }

};