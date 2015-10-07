package service;

import com.fasterxml.jackson.databind.JsonNode;
import com.ning.http.client.Response;
import common.utils.ResponseUtils;
import exceptions.ResponseExceptionResolverUtils;
import exceptions.ServerException;
import models.responses.ResponseJson;
import play.i18n.Messages;
import play.libs.Json;

import javax.naming.ServiceUnavailableException;
import java.io.IOException;

public class BaseService {

//    public static class APICallTemplate<T> {
//
//        public T resolve() throws ServiceUnavailableException, IOException, ServerException {
//            Response apiResponse = apiCall();
//            if (ResponseUtils.isResponseOKSimple(apiResponse)) {
//                final JsonNode responseJson = Json.parse(apiResponse.getResponseBody());
//                return parseApiResponse(responseJson);
//            } else {
//                throw ResponseExceptionResolverUtils.resolveException(apiResponse);
//            }
//        }
//
//        public T parseApiResponse(JsonNode responseJson) throws IOException{
//            return null;
//        }
//
//        public Response apiCall() throws ServiceUnavailableException{
//            return null;
//        }
//
//    }
//
//    public static class APISimpleCallTemplate {
//
//        public ResponseJson resolve() throws ServiceUnavailableException, IOException, ServerException {
//            Response apiResponse = apiCall();
//            if (ResponseUtils.isResponseOKSimple(apiResponse)) {
//                return ResponseUtils.buildSuccessResponseJson(Messages.get("label.saved"));
//            }
//            throw ResponseExceptionResolverUtils.resolveException(apiResponse);
//        }
//
//        public Response apiCall() throws ServiceUnavailableException{
//            return null;
//        }
//
//    }

}
