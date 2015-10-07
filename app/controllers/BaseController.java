package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.ning.http.client.Response;
import common.enums.ResponseType;
import common.utils.PlayUtils;
import common.utils.ResponseUtils;
import models.responses.ResponseJson;
import org.apache.commons.lang3.StringUtils;
import play.Play;
import play.i18n.Messages;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import java.io.IOException;

public class BaseController extends Controller {

    public static String APPLICATION_CONTEXT = Play.application().configuration().getString("application.context") == null ? "" :
            Play.application().configuration().getString("application.context");


    protected static JsonNode notLoggedInUserResponseJson() {
        return toJson(new ResponseJson(ResponseType.error, PlayUtils.getLocalizedError(200), 200));
    }


    protected static Result notLoggedInUserResponse() {
        //LogoutController.logout();
        return unauthorized(notLoggedInUserResponseJson());
    }

    protected static JsonNode serviceUnavailableResponseJson() {
        return toJson(new ResponseJson(ResponseType.error, PlayUtils.getLocalizedError(100), 100));
    }

    protected static Result serviceUnavailableResponse() {
        return ok(serviceUnavailableResponseJson());
    }

    protected static JsonNode ioExceptionResponseJson() {
        return toJson(new ResponseJson(ResponseType.error, PlayUtils.getLocalizedError(100), 100));
    }

    protected static Result ioExceptionResponse() {
        return ok(ioExceptionResponseJson());
    }

    protected static Result paymentNotAcceptedResponse() {
        return returnErrorResponse(Messages.get("global.payment.not.accepted"));
    }


    protected static JsonNode anyErrorResponseJson() {
        return toJson(new ResponseJson(ResponseType.error, Messages.get("global.unknown.error.message")));
    }

    protected static Result anyErrorResponse() {
        return ok(anyErrorResponseJson());
    }

    public static JsonNode toJson(Object obj) {
        return Json.toJson(obj);
    }

    public static Result returnErrorResponse(Response response) throws IOException {
        return ok(toJson(ResponseUtils.buildErrorResponseJson(response)));
    }

    public static JsonNode returnErrorResponseJson(String message) {
        return toJson(ResponseUtils.buildErrorResponseJson(message));
    }

    public static JsonNode returnErrorResponseJson(Response response) throws IOException {
        return toJson(ResponseUtils.buildErrorResponseJson(response));
    }

    public static JsonNode returnSuccessResponseJson(String message) {
        return toJson(ResponseUtils.buildSuccessResponseJson(message));
    }

    public static Result returnErrorResponse(String message) {
        return ok(returnErrorResponseJson(message));
    }

    public static Result returnOkResponse(String message) {
        return ok(toJson(ResponseUtils.buildSuccessResponseJson(message)));
    }

    public static String getValueFromHeaderOrSession(String headerKey) {
        String headerValue = request().getHeader(headerKey);
        if (StringUtils.isBlank(headerValue)) {
            headerValue = session().get(headerKey);
        }
        return headerValue;
    }

    protected static String getRequestParam(String key) {
        return request().queryString().containsKey(key) ? request()
                .queryString().get(key)[0] : null;
    }

}
