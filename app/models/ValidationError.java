package models;

public class ValidationError {

    public final String message;
    public final String field;

    public ValidationError(String field, String message) {
        this.message = message;
        this.field = field;
    }
}
