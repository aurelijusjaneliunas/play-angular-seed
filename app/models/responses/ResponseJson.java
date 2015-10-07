package models.responses;


import common.enums.ResponseType;

public class ResponseJson {
    public final ResponseType type;
    public String text;
    public int code;

    public ResponseJson(ResponseType type) {
        this.type = type;
    }

    public ResponseJson(ResponseType type, String text) {
        this.type = type;
        this.text = text;
    }

    public ResponseJson(ResponseType type, String text, int code) {
        this.type = type;
        this.text = text;
        this.code = code;
    }
}
