package exceptions;

import common.enums.ResponseType;
import common.utils.PlayUtils;
import models.responses.ResponseJson;
import play.mvc.Http;

public class UserIsNotLoggedInException extends ServerException {

    public UserIsNotLoggedInException() {
        super(Http.Status.UNAUTHORIZED, new ResponseJson(ResponseType.error, PlayUtils.getLocalizedError(200), 200));
    }

}
