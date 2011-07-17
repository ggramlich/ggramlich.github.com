---
layout: post
title: Back to front Java in Eclipse
heading: Back to front Java programming in Eclipse
---
Knowing your tools is not enough - learn to use them
----------------------------------------------------

It's been a long time since my last post and there is no hope that I blog more often.
But I wanted to get this one out, since the topic has come to my attention several times in the past two months.

A week ago I had a discussion with two of my colleagues about
[knowing your tools](http://darrell.mozingo.net/2011/04/11/know-your-tools/).
I came to the conclusion that it is not enough to **know** your tools.
You really need to see how to **use** your tools and if possible learn it from somebody else.

There are a lot of people who know Eclipse pretty well. They easily read
[shortcut lists](http://www.rossenstoyanchev.org/write/prog/eclipse/eclipse3.html) or
[tips](http://stackoverflow.com/questions/6634104) and know most of them.
I also knew some of them, but about a year ago a colleague of mine showed me
how to really use Eclipse to program Java in a much more efficient way than I had done before.

When I do pair programming with people who know Eclipse pretty well and show them
the way I re-learned programming, they are often amazed by it.

For example to write something like this

{% highlight java %}
public Set ab() {
    Set<String> set = new HashSet<String>();
    set.add("a");
    set.add("b");
    return set;
}
{% endhighlight %}

I usally have the method generated and then instead of writing the method body from front to end,
I start with the result

{% highlight java %}
public Set ab() {
    return new HashSet<String>();
}
{% endhighlight %}

and then I extract it to a local variable. This helps me focus more on the result
instead of the clutter that I need to make the code compile.
I called it back-to-front programming, but maybe someone has a better name for it.
Starting with the result for the simplest case
(if that where the empty set for some algorithm) also works pretty well with TDD.

I put together a video where I show you a little bit of the stuff.

<iframe src="http://player.vimeo.com/video/26535283" width="640" height="480" frameborder="0"> </iframe>


I know there is lots of room for improvement, e.g.:

 * I should not use the mouse when running the tests.
(Usually I switch the editor between tests and code, but for the demo I wanted to keep
the code in the editor and didn't have MoreUnit installed.)
 * I forgot to change the declaration of the Map to use the interface instead of HashMap.
 * I could have used CTRL+1 to assign to local variable instead of extracting it.
 * I should have written `put(.., 2 * map.get(key))` and later extracted the value variable.

What I also use pretty often is
[wishful thinking](http://dsoguy.blogspot.com/2007/01/programming-by-wishful-thinking.html),
which is not shown here.
I learned the concept from the videos of the
[SICP lectures](http://groups.csail.mit.edu/mac/classes/6.001/abelson-sussman-lectures/).
In the Lisp examples the programmer uses the function name and later implements it.
But just writing some descriptive method name and letting Eclipse generate the method
makes this way of programming even more useful.


So learning lists of shortcuts is not enough, you really need to see this applied.
That is why I wanted to throw this out and ask for your comments.
If you do something like this, tell me. If you don't, try it and tell me how it works for you.
And if you like it, share it - not necessarily by sharing this post, but by pairing with your colleagues.


