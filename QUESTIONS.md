# Questions

Q1: Explain the output of the following code and why

```js
    setTimeout(function() {
      console.log("1");
    }, 100);
    console.log("2");
```
Ans: The setTimeout function takes two arguments, a callback function and time in milliseconds.
1. setTimeout is first added to the callstack and it executes. It adds the callback function
The browser or nodejs handles the timer (100ms) as part of webAPI.

2. Then the next statement (console.log(2)) is added to callstack and immediately executed.

3. About 100ms after 1., the timer completes and console.log(1) is pushed to the callback queue. 
The event loop on the next tick picks it up and pushes it to call stack which executes it.

Output:
```
2 
1 
```


Q2: Explain the output of the following code and why

```js
    function foo(d) {
      if(d < 10) {
        foo(d+1);
      }
      console.log(d);
    }
    foo(0);
```

Ans: foo is a recursive function. 

1. foo(0) - d<10 true - pushed into stack

2. foo(1) - d<10 true - pushed into stack

...

9. foo(9) - d<10 true - pushed into stack
10. foo(10) d<10 false - console.log (10) - logs 10
11. pops foo(9) out of stack - context has d=9 so console.log(9)- logs 9

...

20 pops foo(0) out of stack - console.log(0) - logs 0

Output
```
10
9
8
7
6
5
4
3
2
1
0

```
    



Q3: If nothing is provided to `foo` we want the default response to be `5`. Explain the potential issue with the following code:

```js
    function foo(d) {
      d = d || 5;
      console.log(d);
    }
```
Ans: Since 0 is considered falsy value, foo(0) will produce output 5. 
This might not be desirable since 0 is not same as nothing like 'null' or 'undefined'.

For example if we wanted to use foo to console.log numbers from 0 to 10, it will break at 0.

Q4: Explain the output of the following code and why

```js
    function foo(a) {
      return function(b) {
        return a + b;
      }
    }
    var bar = foo(1);
    console.log(bar(2))
```

Ans: var bar= foo(1) assigns a function to bar which has 1 assigned to 'a' in its lexical environment

Hence, bar is essentially the following function:
```js
var bar = function (b){
    return 1+b
}
```
when bar(2) is executed, it produces output 3 (1+2) which is logged to the console.

Q5: Explain how the following function would be used

```js
    function double(a, done) {
      setTimeout(function() {
        done(a * 2);
      }, 100);
    }
```
Ans: The function takes two arguments, a number 'a' and a callback function done.
The setTimeout will ensure that 'done' is called with double of 'a' after 100ms.

For example, if we wanted to console.log double of 10 after 100ms,
we could make the following call:

```js
double(10,console.log);
//20 
```
This would output 20 to console after 100ms.
