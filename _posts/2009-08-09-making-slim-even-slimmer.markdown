---
layout: post
title: Making Slim even slimmer
heading: Making Slim even slimmer with JSR-223
---
In the last week, I spent some time preparing a new port of
[Slim](http://fitnesse.org/FitNesse.UserGuide.SliM) to JavaScript.
In some way JsSlim should become my personal sequel to
[PhpSlim](http://ggramlich.github.com/phpslim/),
which is my port of Slim to PHP.

So I reviewed the architecture behind Slim. Basically the Java, Ruby and PHP version
consist of the shaded components in the image (click to enlarge),

[![The Slim system][classes_thumb]][classes]

On the FitNesse side the SlimTestSystem starts the SlimClient and
invokes the SlimService through a command line call.
The SlimService starts the SlimServer which communicates with the SlimClient through
a socket. Socket messages are serialized, resp. deserialized with the ListSerializer, resp.
ListDeserializer. The SlimServer starts a ListExecutor, which starts a StatementExecutor.
The ListExecutor turns the string of instructions into single Statements and lets the 
StatementExecutor execute them. The StatementExecutor holds the fixture instances and
interacts with them.

So the Slim server system has to deal with socket communication, which cannot genuinely be done with JavaScript.
I took a look at how to invoke JavaScript from Java. Of course I found
[Rhino](http://www.mozilla.org/rhino/), but I also found the more generic
[Java Scripting Api](http://java.sun.com/javase/6/docs/technotes/guides/scripting/programmer_guide/index.html).
This JSR-223 standard defines interfaces to invoke functions and methods of a scripting language
from Java and also to call back from the scripting language into Java.
Rhino implements a JSR-223 interface for JavaScript, 
and there are [lots of other supported languages](https://scripting.dev.java.net/). 
Amongst these languages there is also PHP with two different bridge implementations.

I played around a bit with the [PHP/Java Bridge](http://php-java-bridge.sourceforge.net/pjb/)
and tried, how far I could push the border between Java and PHP.

To cut this short: I was able to push it so far, that only the StatementExecutor needs to
remain in PHP (and of course some Helper classes and the fixtures).

One of the obstacles that I was facing:
There is no dependency injection in Slim. So we have

{% highlight java %}
public class SlimService extends SocketService {
  public static void main(String[] args) throws Exception {
    if (parseCommandLine(args)) {
      new SlimService(port, verbose);
    }
    ...
  }

  public SlimService(int port, boolean verbose) throws Exception {
    super(port, new SlimServer(verbose));
    instance = this;
  }
}
{% endhighlight %}

{% highlight java %}
public class SlimServer implements SocketServer {
  private void initialize(Socket s) throws IOException {
    executor = new ListExecutor(verbose);
    ...
  }
}
{% endhighlight %}

{% highlight java %}
public class ListExecutor {
  public ListExecutor(boolean verbose) {
    this.verbose = verbose;
    this.executor = new StatementExecutor();
  }
}
{% endhighlight %}

So I had the choice to subclass SlimService, SlimServer and ListExecutor or to go a different way.
The solution is a very light-weight inversion of control container that configures each Slim component.
I introduced the SlimFactory. The Java version looks like this.

{% highlight java %}
public class JavaSlimFactory extends SlimFactory {
  public StatementExecutorInterface getStatementExecutor() throws Exception {
    return new StatementExecutor();
  }
}
{% endhighlight %}

Really, that's it. The abstract base class and the changes to apply
the dependency injection are here

{% highlight java %}
public abstract class SlimFactory {
  public SlimServer getSlimServer(boolean verbose) {
    return new SlimServer(verbose, this);
  }

  public ListExecutor getListExecutor(boolean verbose) throws Exception {
    return new ListExecutor(verbose, this.getStatementExecutor());
  }

  public abstract StatementExecutorInterface getStatementExecutor() throws Exception;
  
  public void stop() {
  }
}
{% endhighlight %}

{% highlight java %}
public class SlimService extends SocketService {
  public static void main(String[] args) throws Exception {
    if (parseCommandLine(args)) {
      startWithFactory(args, new JavaSlimFactory());
    }
    ...
  }
  protected static void startWithFactory(String[] args, SlimFactory slimFactory) throws Exception {
    new SlimService(port, slimFactory.getSlimServer(verbose));
  }
}
{% endhighlight %}

{% highlight java %}
public class SlimServer implements SocketServer {
  public SlimServer(boolean verbose, SlimFactory slimFactory) {
    this.verbose = verbose;
    this.slimFactory = slimFactory;
  }

  private void initialize(Socket s) throws IOException {
    executor = slimFactory.getListExecutor(verbose);
    ...
  }
}
{% endhighlight %}

{% highlight java %}
public class ListExecutor {
  public ListExecutor(StatementExecutorInterface executor) {
    this(false, executor);
  }
  protected ListExecutor(boolean verbose, StatementExecutorInterface executor) {
    this.verbose = verbose;
    this.executor = executor;
  }
}
{% endhighlight %}

Finally I only needed a new PhpSlimFactory (in Java) and there was no need to 
subclass SlimServer and ListExecutor, only the SlimService is subclassed
to instantiate the PhpSlimFactory and the StatementExecutor to implement a Proxy
that uses the Bridge.

{% highlight java %}
public class PhpSlimFactory extends SlimFactory {
  ...
  public synchronized Jsr223Bridge getBridge() {
    // Singleton behavior
    if (null == phpBridge) {
      phpBridge = new PhpBridge(includePath);
    }
    return phpBridge;
  }
  
  public void stop() {
    closeBridge();
  }

  private synchronized void closeBridge() {
    getBridge().close();
    phpBridge = null;
  }
  
  public StatementExecutorInterface getStatementExecutor() throws Exception {
    return new PhpStatementExecutor(getBridge());
  }
}
{% endhighlight %}

{% highlight java %}
public class PhpSlimService extends SlimService {
  public static void main(String[] args) throws Exception {
    if (parseCommandLine(args)) {
      startWithFactory(args, new PhpSlimFactory(includePath));
    }
    ...
  }

  public PhpSlimService(int port, SlimServer slimServer) throws Exception {
    super(port, slimServer);
  }
}
{% endhighlight %}

Best of all - the StatementExecutor is a very generic one for all Jsr-223 engines.
The base class looks like this. The PhpStatementExecutor only had to override one
method, because of some problems with null arguments.

{% highlight java %}
public abstract class Jsr223StatementExecutor implements StatementExecutorInterface{
  private Jsr223Bridge bridge;
  private Proxy statementExecutorProxy;
  
  public Jsr223StatementExecutor(Jsr223Bridge bridge) throws Exception
  {
    this.bridge = bridge;
    statementExecutorProxy = bridge.getStatementExecutor();
  }
  ...  
  public Object call(String instanceName, String methodName, Object... args) {
    return callMethod("call", new Object[] {instanceName, methodName, args});
  }
  ...
  protected Object callMethod(String method, Object... args) {
    try {
      return bridge.invokeMethod(getStatementExecutorProxy(), method, args);
    } catch (Throwable e) {
      return exceptionToString(e);
    }
  }
...
}
{% endhighlight %}

Of course there are many more problems that I faced and the PHP side that provides
the StatementExecutor still has a lot of stuff to implement.
But if [Uncle Bob](http://www.objectmentor.com/omTeam/martin_r.html) likes to
incorporate the changes into the FitNesse code base we have a new base for
much slimmer Slim ports, and JsSlim is about to come.

With some more investigation, the JSR-223 Slim versions might even run with
[Trinidad](http://fitnesse.info/trinidad),
so that no Socket communication is necessary.

Thanks a lot to [Johannes Link](http://johanneslink.net/) who
spent a short remote session with me and gave the final
ideas for packing and invoking the PHP script in a jar file.

[classes_thumb]: /images/Slim/slim_classes_thumb.gif
[classes]: /images/Slim/slim_classes.gif  "Click to enlarge"


