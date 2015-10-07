package models.responses;

import common.enums.ResponseType;
import models.ValidationError;

import java.util.ArrayList;
import java.util.List;

public class ValidationResponse extends ResponseJson {

    public final List<ValidationError> validationErrors;

    public ValidationResponse(List<ValidationError> validationErrors) {
        super(ResponseType.error);
        this.validationErrors = validationErrors;
    }

    public ValidationResponse(List<ValidationError> validationErrors, String text) {
        super(ResponseType.error, text);
        this.validationErrors = validationErrors;
    }

    public ValidationResponse(ValidationError validationError) {
        super(ResponseType.error);
        this.text = validationError.message;
        this.validationErrors = new ArrayList<ValidationError>();
        this.validationErrors.add(validationError);

    }

    public ValidationResponse(ValidationError validationError, String text) {
        super(ResponseType.error, text);
        this.validationErrors = new ArrayList<ValidationError>();
        this.validationErrors.add(validationError);
    }

}
