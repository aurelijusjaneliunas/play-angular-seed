package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import common.utils.AppLogger;
import exceptions.ServerException;
import models.TodoItem;
import play.mvc.Result;
import service.TodoService;

import java.io.IOException;
import java.util.List;

public class TodoController extends BaseController {

    private static final AppLogger logger = AppLogger.getInstance(TodoController.class);

    public static Result getTodos() {
        logger.info("getTodos", "todos");
        try {
            List<TodoItem> todos = TodoService.getTodos();
            return ok(toJson(todos));
        } catch (ServerException e) {
            return e.asJsonResult();
        } catch (IOException e) {
            logger.error("getTodos", "ServiceUnavailableException", e);
            return ioExceptionResponse();
        }
    }

    public static Result getTodo(String id) {
        logger.info("getTodo", "Id: {0}", id);
        try {
            return ok(toJson(TodoService.getTodo(id)));
        } catch (ServerException e) {
            return e.asJsonResult();
        } catch (IOException e) {
            logger.error("getTodo", "ServiceUnavailableException", e);
            return ioExceptionResponse();
        }
    }

    public static Result deleteTodo(String id) {
        logger.info("deleteTodo", "Id: {0}", id);
        try {
            return ok(toJson(TodoService.removeTodo(id)));
        } catch (ServerException e) {
            return e.asJsonResult();
        } catch (IOException e) {
            logger.error("deleteTodo", "ServiceUnavailableException", e);
            return ioExceptionResponse();
        }
    }

    public static Result updateTodo(String id) {
        logger.info("updateTodo", "Id: {0}", id);
        try {

            final JsonNode planJsonRaw = request().body().asJson();
            TodoItem plan = TodoItem.parseJson(planJsonRaw);

            return ok(toJson(TodoService.updateTodo(plan)));
        } catch (ServerException e) {
            return e.asJsonResult();
        } catch (IOException e) {
            logger.error("updateTodo", "ServiceUnavailableException", e);
            return ioExceptionResponse();
        }
    }

    public static Result createTodo() {
        logger.info("createTodo", "createTodo");
        try {

            final JsonNode planJsonRaw = request().body().asJson();
            TodoItem plan = TodoItem.parseJson(planJsonRaw);

            return ok(toJson(TodoService.updateTodo(plan)));
        } catch (ServerException e) {
            return e.asJsonResult();
        } catch (IOException e) {
            logger.error("createTodo", "ServiceUnavailableException", e);
            return ioExceptionResponse();
        }
    }

}
