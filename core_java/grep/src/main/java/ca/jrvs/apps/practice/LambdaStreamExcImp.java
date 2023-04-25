package ca.jrvs.apps.practice;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.function.Consumer;
import java.util.stream.Collectors;
import java.util.stream.DoubleStream;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class LambdaStreamExcImp implements LambdaStreamExc{
    @Override
    public Stream<String> createStrStream(String... strings) {
        return Stream.of(strings);
    }

    @Override
    public Stream<String> toUpperCase(String... strings) {
        // Lambda function was replaced, simple toUpperCase filter was added
        // Stream.of(strings).map(String::toUpperCase);
        return createStrStream(String.valueOf(Stream.of(strings).map(String::toUpperCase)));
    }

    @Override
    public Stream<String> filter(Stream<String> stringStream, String pattern) {
        // check if String does NOT contain the pattern and filter accordingly
        return stringStream.filter(str -> !str.contains(pattern));
    }

    @Override
    public IntStream createIntStream(int[] arr) {
        return Arrays.stream(arr);
    }

    @Override
    public <E> List<E> toList(Stream<E> stream) {
        return stream.collect(Collectors.toList());
    }

    @Override
    public List<Integer> toList(IntStream intStream) {
        return intStream.boxed().collect(Collectors.toList());
    }

    @Override
    public IntStream createIntStream(int start, int end) {
        return IntStream.rangeClosed(start, end);
    }

    @Override
    public DoubleStream squareRootIntStream(IntStream intStream) {
        return intStream.mapToDouble(Math::sqrt);
    }

    @Override
    public IntStream getOdd(IntStream intStream) {
        // Check if not divisible by 2
        return intStream.filter(num -> num % 2 != 0);
    }

    @Override
    public Consumer<String> getLambdaPrinter(String prefix, String suffix) {
        return body -> System.out.println(prefix + body + suffix);
    }

    @Override
    public void printMessage(String[] messages, Consumer<String> printer) {
        for (String msg : messages) {
            printer.accept(msg);
        }
    }

    @Override
    public void printOdd(IntStream intStream, Consumer<String> printer) {
        intStream.filter(val -> val % 2 != 0).mapToObj(String::valueOf).forEach(printer);
    }

    @Override
    public Stream<Integer> flatNestedInt(Stream<List<Integer>> ints) {
        ArrayList<Integer> res = new ArrayList<>();

        ints.forEach(lst -> lst.forEach(value -> res.add(value * value)));
        return res.stream();

        // second solution:
        //return ints.flatMap(List::stream).map(value -> value * value);
    }

    public static void main(String[] args){
        // Driver Code... Used to test
        LambdaStreamExc lse = new LambdaStreamExcImp();

        Stream<String> test1 = lse.createStrStream("test", "hello", "another", "word");
        Stream<String> upperTest = lse.toUpperCase("test", "hello", "another", "word");
        Stream<String> streamTest = lse.createStrStream("test", "hello", "another", "word");
        Stream<String> filteredTest = lse.filter(streamTest, "t");

        int[] arr = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        IntStream streamTest1 = lse.createIntStream(arr);

        IntStream streamTest2 = lse.createIntStream(arr);
        List<Integer> integerList = lse.toList(streamTest2);

        // override the createIntStream method with 2 parameters
        IntStream streamTest3 = lse.createIntStream(0, 5);

        IntStream streamTest4 = lse.createIntStream(arr);
        DoubleStream sqrTest = lse.squareRootIntStream(streamTest4);

        IntStream streamTest5 = lse.createIntStream(arr);
        IntStream oddTest = lse.getOdd(streamTest5);

        Consumer<String> printer = lse.getLambdaPrinter("start>", "<end");
        String[] messages = {"a", "b", "c"};
//        lse.printMessage(messages, printer);

        IntStream intStrea6 = lse.createIntStream(arr);
//        lse.printOdd(intStream, printer);
    }
}
