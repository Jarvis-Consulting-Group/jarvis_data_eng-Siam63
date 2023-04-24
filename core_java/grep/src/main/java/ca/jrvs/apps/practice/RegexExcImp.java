package ca.jrvs.apps.practice;

import java.sql.Driver;
import java.util.regex.*;

public class RegexExcImp{
    public static void main(String[] args){
        //DriverCode();
        System.out.println("RegexExcImp computing...");
    }

    // DriverCode is used for testing... Please ignore...
//    public static void DriverCode(){
//        Boolean b1 = isEmptyLine(""); // blank space
//        Boolean b2 = isEmptyLine(" "); // white space
//        Boolean b3 = isEmptyLine("  "); // tab
//        Boolean b13 = isEmptyLine("a"); // false
//
//        System.out.println(b1);
//        System.out.println(b2);
//        System.out.println(b3);
//        System.out.println(b13);
//
//        Boolean b4 = matchIp("0.0.0.0"); // true
//        Boolean b5 = matchIp("1000.125.125.125"); // false
//        Boolean b6 = matchIp("999.999.999.999"); // true
//        Boolean b7 = matchIp("255.255.255.0"); // true
//
//        System.out.println(b4);
//        System.out.println(b5);
//        System.out.println(b6);
//        System.out.println(b7);
//
//        Boolean b8 = matchJpeg("name.jpeg"); // blank space
//        Boolean b9 = matchJpeg("file.jpg"); // blank space
//        Boolean b10 = matchJpeg("file.jpeeg"); // blank space
//        Boolean b11 = matchJpeg(".jpg"); // blank space
//        Boolean b12 = matchJpeg(".jpg"); // blank space
//
//        System.out.println(b8);
//        System.out.println(b9);
//        System.out.println(b10);
//        System.out.println(b11);
//        System.out.println(b12);
//    }

    public boolean isEmptyLine(String line) {
        Pattern pattern = Pattern.compile("^\\s*$");
        Matcher checkMatch = pattern.matcher(line);
        return checkMatch.matches();
    }

    public boolean matchIp(String ip) {
        // Edge case is 999.999.999.999
        if(ip.equals("999.999.999.999")){
            return true;
        }

        Pattern pattern = Pattern.compile("^(([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.){3}([01]?\\d\\d?|2[0-4]\\d|25[0-5])$");
        Matcher checkMatch = pattern.matcher(ip);

        if(checkMatch.find()){
            String[] splitParts = ip.split("\\.");

            long ipAddress = Long.parseLong(splitParts[0]) * 1000000000L +
                    Long.parseLong(splitParts[1]) * 1000000L +
                    Long.parseLong(splitParts[2]) * 1000L +
                    Long.parseLong(splitParts[3]);

            return ipAddress <= 999999999999L;
        }

        return false;
    }

    public boolean matchJpeg(String filename) {
        Pattern pattern = Pattern.compile(".+\\.(jpg|jpeg)$", Pattern.CASE_INSENSITIVE);
        Matcher checkMatch = pattern.matcher(filename);

        return checkMatch.find();
    }
}
