package common.utils;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class BigDecimalUtils {

    public final static BigDecimal MINUS_ONE = new BigDecimal(-1);

    public final static BigDecimal INTEREST_BASE = new BigDecimal(100);

    public static String toPlainString(BigDecimal decimal) {
        if (decimal == null) {
            return StringUtils.EMPTY;
        }
        return decimal.toPlainString();
    }

    public static boolean isMore(BigDecimal first, BigDecimal second) {
        if (first == null && second == null) {
            return false;
        } else if (first == null && second != null) {
            return false;
        } else if (first != null && second == null) {
            return true;
        }
        return first.compareTo(second) > 0;
    }

    public static boolean isMoreThanZero(BigDecimal first) {
        return isMore(first, BigDecimal.ZERO);
    }

    public static boolean areEqual(BigDecimal first, BigDecimal second) {
        return first.compareTo(second) == 0;
    }

    public static boolean areEqualAllowNull(BigDecimal first, BigDecimal second) {
        boolean bothNulls = first == null && second == null;
        boolean equal = first != null && second != null && areEqual(first, second);
        return bothNulls || equal;
    }

    public static boolean isZero(BigDecimal number) {
        return number.compareTo(BigDecimal.ZERO) == 0;
    }

    public static BigDecimal toNumber(String value) {
        if (StringUtils.isEmpty(value)) {
            return null;
        }
        return BigDecimal.valueOf(
                NumberUtils.toDouble(value));
    }

    public static BigDecimal safeDivide(BigDecimal number, BigDecimal divider) {
        try {
            return number.divide(divider);
        } catch (ArithmeticException ignore) {
            return number.divide(divider, 10, RoundingMode.HALF_UP);
        }
    }

    public static BigDecimal safeMultiply(BigDecimal first, BigDecimal second) {
        if (first == null || second == null) {
            return null;
        }
        return first.multiply(second);
    }

    public static BigDecimal safeAdd(BigDecimal first, BigDecimal second) {
        if (first == null || second == null) {
            return null;
        }
        return first.add(second);
    }

    public static BigDecimal toInterest(BigDecimal vatRate) {
        if (vatRate == null) {
            return null;
        }
        return safeDivide(vatRate, INTEREST_BASE);
    }

    public static BigDecimal scale(BigDecimal first) {
        if (first == null) {
            return null;
        }
        return scale(first, 2);
    }

    public static BigDecimal scale(BigDecimal first, int places) {
        if (first == null) {
            return null;
        }
        return first.setScale(places, RoundingMode.HALF_UP);
    }

    public static BigDecimal scaleDown(BigDecimal first) {
        if (first == null) {
            return null;
        }
        return scaleDown(first, 2);
    }

    public static BigDecimal scaleDown(BigDecimal first, int places) {
        if (first == null) {
            return null;
        }
        return first.setScale(places, RoundingMode.HALF_DOWN);
    }

}
