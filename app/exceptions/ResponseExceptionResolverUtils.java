package exceptions;

import com.ning.http.client.Response;
import common.utils.ResponseUtils;

import java.io.IOException;

public class ResponseExceptionResolverUtils {
    private ResponseExceptionResolverUtils(){};

    public static ServerException resolveException(Response response) throws IOException {
        if (ResponseUtils.getResponseErrorCode(response) == 200 ||
                ResponseUtils.getResponseErrorCode(response) == 505) {
            return new UserIsNotLoggedInException();
        } else {
            return new BadRequestException(ResponseUtils.buildErrorResponseJson(response));
        }
    }

}
