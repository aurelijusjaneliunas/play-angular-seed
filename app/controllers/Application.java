package controllers;

import jsmessages.JsMessages;
import play.Play;
import play.mvc.Controller;
import play.mvc.Result;

public class Application extends Controller {

    final static JsMessages messages = JsMessages.create(Play.application());

    public static Result index() {
        return ok();
    }

    public static Result jsMessages() {
        return ok(messages.generateAll("window.Messages"));
    }

}


