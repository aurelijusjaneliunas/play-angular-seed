package exceptions;

import models.responses.ResponseJson;
import play.mvc.Http;

public class BadRequestException extends ServerException {

    public BadRequestException(ResponseJson responseJson) {
        super(Http.Status.BAD_REQUEST, responseJson);
    }

}
