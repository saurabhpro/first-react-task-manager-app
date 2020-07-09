package io.agileintelligence.ppmtool.utils;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

public class DateTimeMapper {

    private DateTimeMapper() {
    }

    public static ZonedDateTime instantToZonedDateTime(Instant instant, ZoneId zoneId) {
        return instant.atZone(zoneId);
    }

    public static String printZonedTime(ZonedDateTime zonedDateTime, Locale locale) {
        DateTimeFormatter f = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.FULL).withLocale(locale);
        return zonedDateTime.format(f);
    }
}
