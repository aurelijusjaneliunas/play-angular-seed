package service;

import exceptions.ServerException;
import models.TodoItem;
import org.apache.commons.lang3.RandomStringUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TodoService extends BaseService {

    private final static int ID_LEN = 10;

    private static Map<Long, TodoItem> todoItemList = new HashMap<>();

    public static Object updateTodo(TodoItem plan) throws IOException, ServerException {
        if (plan.id == null || plan.id.equals(new Long(0))) {
            plan.id = Long.valueOf(RandomStringUtils.randomNumeric(ID_LEN));
        }
        todoItemList.put(plan.id, plan);
        return plan;
    }

    public static TodoItem removeTodo(String id) throws IOException, ServerException {
        TodoItem plan = todoItemList.remove(Long.valueOf(id));
        return plan;
    }

    public static TodoItem getTodo(String id) throws IOException, ServerException {
        return todoItemList.get(Long.valueOf(id));
    }

    public static List<TodoItem> getTodos() throws IOException, ServerException {
        return new ArrayList<>(todoItemList.values());
    }

}
