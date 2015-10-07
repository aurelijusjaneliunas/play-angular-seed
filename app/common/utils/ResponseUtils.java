package common.utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.ning.http.client.Response;
import common.enums.ResponseType;
import models.responses.ResponseJson;
import play.libs.Json;

import java.io.IOException;


public class ResponseUtils {
    public static boolean isResponseOKSimple(Response response) {
        return response.getStatusCode() == 200;
    }

    public static boolean isResponseOKSimpleWithErrorCode(Response response) throws IOException {
        return response.getStatusCode() == 200 && getResponseErrorCode(response) == null;
    }

    public static boolean isResponseOK(Response response) throws IOException {
        if (response.getStatusCode() == 200 && getResponseErrorCode(response) == null) {
            return true;
        }
        if (getResponseErrorCode(response) == 200 || getResponseErrorCode(response) == 505) {
            return false;
        }
        return false;
    }

    public static Integer getResponseErrorCode(Response response) throws IOException {
        final JsonNode responseJson;
        responseJson = Json.parse(response.getResponseBody());
        if (responseJson.get("errorCode") != null) {
            return common.utils.JsonUtils.getIntFromJson("errorCode", responseJson);
        }

        return null;
    }


    public static ResponseJson buildErrorResponseJson(Response response) throws IOException {
        int errorCode = getResponseErrorCode(response);
        return new ResponseJson(ResponseType.error, PlayUtils.getLocalizedError(errorCode), errorCode);
    }

    public static ResponseJson buildErrorResponseJson(String message) {
        return new ResponseJson(ResponseType.error, message);
    }

    public static ResponseJson buildSuccessResponseJson(String message) {
        return new ResponseJson(ResponseType.success, message);
    }

}
