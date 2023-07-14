// Third Party Deps
import omitEmpty from "omit-empty";

const responseFormatter = (code, error, message, data = []) => {
    const response = omitEmpty({
        code: code,
        error: error,
        message: message,
    })
    return {
        ...response,
        data: data
    }
}

export default responseFormatter;