package common.utils;

import com.fasterxml.jackson.databind.JsonNode;
import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang3.StringUtils;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

public class JsonUtils {

    public static String getTextValue(String keyValue, JsonNode jsonNode) {
        return jsonNode.get(keyValue).textValue();
    }

    public static String getStringFromJson(String keyValue, JsonNode json) {
        if (json == null) {
            return null;
        }
        if (json.get(keyValue) != null && json.get(keyValue).asText().equals("null")) {
            return null;
        }
        return json.get(keyValue) != null ? json.get(keyValue).asText() : null;
    }

    public static String getStringAsHtmlTextFromJson(String keyValue, JsonNode json) {
        String string = getStringFromJson(keyValue, json);
        if (string != null) {
            string = string.replaceAll("\\\\n", "<br/>");
            string = string.replaceAll("\\\\r", "");
        }
        return string;
    }

    public static String getStringDecodedFromJson(String keyValue, JsonNode json) {
        String value = json.get(keyValue) != null ? json.get(keyValue).asText() : null;
        if (value != null) {
            value = StringEscapeUtils.unescapeHtml(value);
        }
        return value;
    }


    public static boolean getBooleanFromJson(String keyValue, JsonNode json) {
        return json.get(keyValue) != null && json.get(keyValue).asBoolean();
    }

    public static Date getDateFromJson(String keyValue, JsonNode json) {
        String dateString = json.get(keyValue) != null ? json.get(keyValue).asText() : null;
        if (dateString != null && !StringUtils.isBlank(dateString)) {
            try {
                return new SimpleDateFormat("yyyy-MM-dd").parse(dateString);
            } catch (ParseException e) {
                return null;
            }
        }
        return null;
    }

    public static int getIntFromJson(String keyValue, JsonNode json) {
        return getIntFromJson(keyValue, json, 0);
    }
    
    public static int getIntFromJson(String keyValue, JsonNode json, int defaultValue) {
        return json.get(keyValue) != null ? json.get(keyValue).asInt() : defaultValue;
    }

    public static BigDecimal getBigDecimalFromJson(String keyValue, JsonNode json) {
        return json.get(keyValue) != null ? new BigDecimal(json.get(keyValue).asText()) : new BigDecimal(0);
    }

    public static long getLongFromJson(String keyValue, JsonNode json) {
        if (json != null) {
            return json.get(keyValue) != null ? json.get(keyValue).asLong() : 0;
        }
        return 0;
    }

    public static double getDoubleFromJson(String keyValue, JsonNode json) {
        return json.get(keyValue) != null ? json.get(keyValue).asDouble() : 0;
    }

    public static List<String> getStringsFromArray(String keyValue, JsonNode json) {
        List<String> resultsList = new ArrayList<String>();
        if (json != null && json.get(keyValue) != null) {
            Iterator<JsonNode> elementsIterator = json.get(keyValue).elements();
            while (elementsIterator.hasNext()) {
                JsonNode element = elementsIterator.next();
                resultsList.add(element.textValue());
            }
        }
        return resultsList;
    }

}
