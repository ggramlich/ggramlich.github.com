---
layout: post
title: My problems with East
heading: My problems with East
---
James Ladd's East principle - I still don't get it
--------------------------------------------------
All this started a while ago (in July) and I always wanted to put my thoughts into a
blog post - so here it is. I was a bit worried, that I might look a little dumb by just
not getting it, but I think can explain my problems and I hope to get some advice.

I was first pointed to [James Ladd's East principle](http://jamesladdcode.com/?p=12)
by a tweet from [Robert C. Martin](http://www.objectmentor.com/omTeam/martin_r.html).

> [unclebobmartin](http://twitter.com/unclebobmartin) [http://bit.ly/up8Pm](http://bit.ly/up8Pm)
> Go East, young developer, go East.

East oriented code follows three principles as James refined them in his
[follow up post *More East...*](http://jamesladdcode.com/?p=302):

1. All public methods should be void, boolean or return a reference to the current object (this in Java).
2. Objects that implement the Factory or Builder pattern or similar are an exception.
3. East is better suited to composite objects, not primitive objects. Personally I don’t make this distinction.

I think rules 2 and 3 were not that explicit in the first article and evolved as consequences. When you use 
a dependency injection framework, you do not have to deal much with creational patterns and if an object only
consists of simple values, there is not that much that it can act upon.

I run into some troubles with the first rule.

So how do I get information about the object out of the object? In East oriented code you don't want to do that.
In accordance with the [*Tell don't Ask*](http://www.pragprog.com/articles/tell-dont-ask) principle, you do not
extract information and deal with that, but you let the object decide what to do according to its internal state.

So I looked at the first examples. Instead of fetching the balance from an account object and printing it from
the outside, you push some Writer object into the account object and let the account object push its own balance
value into the Writer object. It reminds me a bit of the 
[Visitor Pattern](http://en.wikipedia.org/wiki/Visitor_pattern), the account object has to provide a
`putBalance()` / `accept()` method that accepts some Writer / Visitor object on that it calls the 
`write()` / `visit()` method, just that the argument for `write()` is already some formatted string, whereas the
argument for `visit()` would be the account object itself and the visitor would act *westish* by fetching
information from the account ojbect.

In the second part of the examples 
James starts with a MovieLister class that has a method to return the movies directed by
a given director. Actually he says, you never need this filtered list, unless you want to
do something with these movies. So he creates a method 
`applyToTheMoviesDirectedBy(final MovieAction movieAction, final String director)` on the MovieLister
and in order to do something with the right movies, he passes those arguments to a new method 
`ifDirectedByDo(director, movieAction)` of the Movie class.

In the [*More East...*](http://jamesladdcode.com/?p=302) post, he gives a simpler example
changing a `getDateOfBirth()` method to a boolean method `isBirthday(Date today)`.

Some days after I read about East the first time, Uncle Bob tweeted

> [unclebobmartin](http://twitter.com/unclebobmartin) The latest Clean Code Tip: "Output Arguments re Counterintuitive"
> [http://bit.ly/aGYqw](http://bit.ly/aGYqw)

I read the article, and I thought, but James pushes these objects (like the Writer or the MovieAction)
that accept information, isn't that an output argument? - Well the MovieAction somehow isn't,
it has the `final` keyword in the method signature. I am not that deep into Java, but the `final`
keyword does not seem to mean, that the inner state of MovieAction cannot be changed through method
calls on the MovieAction object.
In his example the MovieAction consists of a Writer-like object (that writes to the console or a file)
and in my eyes, this makes the MovieAction an output argument again.

So I wrote
> [grgramlich](http://twitter.com/grgramlich) @unclebobmartin Doesn't @jamesladd 's East 
> principle make heavy use of output arguments? Very confused!

and I got these answers by Uncle Bob

> [unclebobmartin](http://twitter.com/unclebobmartin) @grgramlich going east is all about coding
> with no side effects. You can do that without output arcs.

and by James Ladd

> [jamesladd](http://twitter.com/jamesladd) @grgramlich East doesn't rely on output arguments. Lets discuss more.

So I am not sure, whether these Writer objects do not count as output arguments or James examples are just chosen badly.

I still have the feeling, that there must be some way to get information out of objects in some way.
How would I test that my objects store the right information?
[By using mock objects and concentrating on the interactions.](http://blog.typemock.com/2009/09/testability-of-east-oriented-code.html)
But how can I test my code with the [Slim Testrunner](http://fitnesse.org/FitNesse.UserGuide.SliM) for
[FitNesse](http://fitnesse.org/)? Slim relies on the fact that you can get results out of objects.
So to act *eastish*, do I need to pass in visitor objects (output arguments) into
my domain objects that can collect the data?
This approach also means that I have to implement new methods on the domain objects.

And this is where I get to my second major concern.
[SRP](http://en.wikipedia.org/wiki/Single_responsibility_principle) violations.
Uncle Bob states the *Single Responsibility Principle* as
> A class should have one, and only one, reason to change.

So for example if I have some object that contains data and I want a report about that data, I will not put
a report method into the data class, but create a new report class, so if the format of the report changes,
I do not have to touch the data class. But this is exactly what happens in James' first example, where he formats
the account balance with a decimal dot. In Germany, we use a decimal comma, for the German report, James needs
to change the account class.

Again, this might be a badly chosen example and the Writer might be a smarter Reporter class, but 
[James really likes to add new (boolean) methods to the domain objects](http://jamesladdcode.com/?p=301),
if he needs a new filter specification.
In his [*More East...*](http://jamesladdcode.com/?p=302) post, it becomes easy to find out, whether a 
person is born at a given date, but in order to find out, whether the person is of legal age or which 
zodiac sign the person belongs to, you need to add new methods to the person class.

I find the East principles very interesting and I see many benefits, but as I said, there are some
parts which I just don't get.


