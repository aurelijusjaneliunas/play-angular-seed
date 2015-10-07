package common.utils;

import play.Play;
import play.i18n.Messages;
import play.mvc.Http;

import java.util.Arrays;
import java.util.List;

public class PlayUtils {

    private static final AppLogger logger = AppLogger.getInstance(PlayUtils.class);

    public static final String APPLICATION_LANGS = Play.application().configuration().getString("application.langs");

    public static boolean isUserAction() {
        try {
            if (Http.Context.current() != null && Http.Context.current().request() != null) {
                return true;
            }
        } catch (RuntimeException e) {
            return false;
        }

        return false;
    }

    public static String getLocalizedError(int errorCode) {
        return Messages.get("error.message." + errorCode);
    }

    public static List<String> getApplicationLanguages() {
        return Arrays.asList(APPLICATION_LANGS.split(","));
    }

}
