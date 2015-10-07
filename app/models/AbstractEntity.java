package models;

import com.fasterxml.jackson.databind.JsonNode;
import common.utils.JsonUtils;

public class AbstractEntity {

    public Long id;

    public AbstractEntity(JsonNode element) {
        this.id = JsonUtils.getLongFromJson("id", element);
    }

}
