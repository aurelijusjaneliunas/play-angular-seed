package exceptions;

import models.responses.ResponseJson;
import play.libs.Json;
import play.mvc.Http;
import play.mvc.Result;

import static play.mvc.Results.*;

public class ServerException extends Exception {

    private int responseStatus;
    private ResponseJson responseJson;

    public ServerException(int responseStatus, ResponseJson responseJson){
        this.responseStatus = responseStatus;
        this.responseJson = responseJson;
    }

    public Result asJsonResult(){
        switch (responseStatus){
            case Http.Status.BAD_REQUEST:
                return badRequest(Json.toJson(responseJson));
            case Http.Status.UNAUTHORIZED:
                return unauthorized(Json.toJson(responseJson));
            default:
                return internalServerError(Json.toJson(responseJson));
        }
    }

}
