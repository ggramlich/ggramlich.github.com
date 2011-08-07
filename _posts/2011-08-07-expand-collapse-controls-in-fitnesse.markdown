---
layout: post
title: Expand failed Slim scenarios
heading: Expanding failed scenarios and tweaks to Expand / Collapse All in FitNesse
---
Adding some functionality to the FitNesse frontend
--------------------------------------------------

I love [Slim scenarios](http://fitnesse.org/FitNesse.UserGuide.SliM.ScenarioTable) in 
[FitNesse](http://fitnesse.org).
I use them to build my own domain specific language when specifying with examples,
and of course I call scenarios from scenarios. Sometimes they are pretty deeply nested and it is
a pain to manually expand the red scenarios recursively to see the actual failure.

So I started with a very simple approach to expand all failed scenarios and added a
[Greasemonkey](https://addons.mozilla.org/de/firefox/addon/greasemonkey/) script to be
executed on my test pages. It basically consisted of the following line of javascript code:

{% highlight javascript %}
jQuery('td.fail>div.collapse_rim>div.hidden').each(function() {toggleCollapsable(this.id)});
{% endhighlight %}

Then I started adding this functionality to FitNesse and ended up with a
[pure javascript and css solution](https://github.com/ggramlich/fitnesse/commit/7587d7ddf9b668ce2261cfa7201e39f829184645)
that changes the page while it is loading.

The only change that I had to make in the Java code was
in the `HtmlPage` to load jQuery and my script. I was astonished that none of the velocity templates seem to be used any more,
but they are still in the repository. There also seems to be some dead code in there and duplicate code for producing some parts of the html.
But I could not easily find out which of these parts were still in use and necessary.
So I decided to be a bad
[boy scout](http://programmer.97things.oreilly.com/wiki/index.php/The_Boy_Scout_Rule),
but make up for it by leaving some useful and clean stuff on the camp ground.

I made a new section that is always visible in the top right
corner of the browser window as soon as any collapsable content appears on the page.
The _Expand Failed Scenarios_ link only appears as soon as there are
failed scenarios on the page.
The script also removes all the _Expand All | Collapse All_ links from the headers of
collapsable sections, since they are not necessary.

---
![New look of the Expand / Collapse control with the Expand Failed Scenarios link](/images/Expand_collapse/expand_collapse_new_look.gif)

New look of the controls with the Expand Failed Scenarios link and having the Expand / Collapse All links removed
from the headers of the collabsable sections.

---

![Old look of the Expand All | Collapse All links](/images/Expand_collapse/expand_collapse_old_look.gif)

Old look of the Expand All | Collapse All links in every header of a collabsable section.

---

If you like to see this included in FitNesse, leave a comment or answer to my mail on the fitnesse mailing list (link to the e-mail will follow).


