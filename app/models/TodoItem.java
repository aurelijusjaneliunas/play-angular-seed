package models;

import com.fasterxml.jackson.databind.JsonNode;
import common.utils.JsonUtils;

public class TodoItem extends AbstractEntity {

    public String description;

    public TodoItem(JsonNode element) {
        super(element);
    }

    public static TodoItem parseJson(JsonNode element) {
        TodoItem providerPass = new  TodoItem(element);
        providerPass.description = JsonUtils.getStringFromJson("description", element);
        return providerPass;
    }
}
