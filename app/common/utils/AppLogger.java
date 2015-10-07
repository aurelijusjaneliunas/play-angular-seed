package common.utils;

import play.Logger;

import java.text.MessageFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class AppLogger {

    private Class clazz;
    private String clazzName;

    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm");

    private AppLogger() {

    }

    public void info(String method, String message, Object... args) {
        String log = "[" + clazzName + "." + method + "] " +
                MessageFormat.format(message, formatDateArguments(args));
        Logger.info(log);
    }

    public void debug(String method, String message, Object... args) {
        String log = "[" + clazzName + "." + method + "] " +
                MessageFormat.format(message, formatDateArguments(args));

        Logger.debug(log);
    }

    public void warn(String method, String message, Object... args) {
        String log = "[" + clazzName + "." + method + "] " +
                MessageFormat.format(message, formatDateArguments(args));
        Logger.warn(log);
    }

    public void error(String method, String message, Throwable e, Object... args) {
        Logger.error("[" + clazzName + "." + method + "] " +
                MessageFormat.format(message, formatDateArguments(args)), e);
    }

    public void error(String method, String message, Object... args) {
        Logger.error("[" + clazzName + "." + method + "] " +
                MessageFormat.format(message, formatDateArguments(args)));
    }

    public void trace(String method, String message, Object... args) {
        String log = "[" + clazzName + "." + method + "] " +
                MessageFormat.format(message, formatDateArguments(args));
        Logger.trace(log);
    }

    private static Object[] formatDateArguments(Object... args) {
        Object[] result = null;
        if (args != null) {
            result = new Object[args.length];
            for (int i = 0; i < args.length; i++) {
                if (args[i] instanceof Date) {
                    Date date = (Date) args[i];
                    result[i] = DATE_FORMAT.format(date);

                } else {
                    result[i] = args[i];
                }
            }
        }

        return result;
    }

    public static AppLogger getInstance(Class clazz) {

        AppLogger logger = new AppLogger();
        logger.clazz = clazz;
        logger.clazzName = clazz.getName();
        return logger;
    }
}
