package ca.jrvs.apps.grep;

import org.apache.log4j.BasicConfigurator;

import java.io.*;
import java.util.*;

import com.sun.org.slf4j.internal.Logger;
import com.sun.org.slf4j.internal.LoggerFactory;

public class JavaGrepImp implements JavaGrep{
    final Logger logger = LoggerFactory.getLogger(JavaGrep.class);
    private String regex;
    private String rootPath;
    private String outFile;

    public static void main(String[] args){
        if(args.length != 3){
            throw new IllegalArgumentException("USAGE: JavaGrep regex rootPath outFile");
        }

        BasicConfigurator.configure();
        JavaGrepImp javaGrepImp = new JavaGrepImp();
        javaGrepImp.setRegex(args[0]);
        javaGrepImp.setRootPath(args[1]);
        javaGrepImp.setOutFile(args[2]);

        try{
            javaGrepImp.process();
        }catch(Exception ex) {
            javaGrepImp.logger.error("Error: Unable to process", ex);
        }
    }

    @Override
    public void process() throws IOException {
        List<String> lines = new ArrayList<>();

        for(File file : this.listFiles(this.getRootPath())){
            for(String str : readLines(file)){
                if(this.containsPattern(str)){
                    lines.add(str);
                }
            }
        }

        this.writeToFile(lines);
    }

    @Override
    public List<File> listFiles(String rootDir) {
        List<File> filesList = new ArrayList<>();
        File directory = new File(rootDir);

        for(File file : Objects.requireNonNull(directory.listFiles())){
            if(file.isDirectory()){
                filesList.addAll(this.listFiles(file.getPath()));
            }
        }

        return filesList;
    }

    @Override
    public List<String> readLines(File inputFile) {
        List<String> linesArray = new ArrayList<>();

        try{
            Scanner sc = new Scanner(inputFile);

            while(sc.hasNextLine()){
                String currLine = sc.nextLine();
                linesArray.add(currLine);
            }
            sc.close();
        }catch (FileNotFoundException e){
            this.logger.error(e.getLocalizedMessage(), e);
        }

        return linesArray;
    }

    @Override
    public boolean containsPattern(String line) {
        return line.matches(this.getRegex());
    }

    @Override
    public void writeToFile(List<String> lines) throws IOException {
        BufferedWriter wr = new BufferedWriter(new FileWriter(this.getOutFile()));

        for(String ln : lines){
            wr.write(ln);
            wr.newLine();
        }

        wr.close();
    }

    @Override
    public String getRootPath() {
        return this.rootPath;
    }

    @Override
    public void setRootPath(String rootPath) {
        this.rootPath = rootPath;
    }

    @Override
    public String getRegex() {
        return this.regex;
    }

    @Override
    public void setRegex(String regex) {
        this.regex = regex;
    }

    @Override
    public String getOutFile() {
        return this.outFile;
    }

    @Override
    public void setOutFile(String outFile) {
        this.outFile = outFile;
    }
}
