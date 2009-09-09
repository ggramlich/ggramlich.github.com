---
layout: yaml
title: Publications
heading: Publications
section: home
css: publications.css
javascript: publications.js
---

<div id="publicationslist">
<div class="publication">
        <h3>Über die algorithmische Komplexität regulärer Sprachen</h3>
        <p>(On the algorithmic complexity of regular languages)</p>
        <p class="authors">Gregor Gramlich</p>
        <p class="published">
            Ph.D. thesis in German, July 2007.
        </p>
	<div class="abstract">        
	<p class="abstract">
            <strong>Abstract:</strong>
                We consider the approximate minimization of NFAs and regular expressions.
                It is known that exact minimization is PSpace hard in the general case.
                We show that even weak approximations solve hard problems and thus efficient
                approximations with reasonable approximation factors probably don't exist.
                <br />
                We also consider the problem of learning regular languages and show positive
                and negative results for the problem of learning of learning a unary regular
                language in some well known frameworks of machine learning.
        </p>
	</div>
        <p class="publishLink"><a href="http://publikationen.ub.uni-frankfurt.de/volltexte/2007/4577/">Thesis on the server of the university library</a></p>
        <p class="postscriptLink"><a href="Publications/GramlichDissertation.ps">Final Version (1098 KB, Postscript)</a></p>
        <p class="pdfLink"><a href="Publications/GramlichDissertation.pdf">Final Version (565 KB, PDF)</a></p>
</div>
<div class="publication">
        <h3>Learning Unary Automata</h3>
        <p class="authors">Gregor Gramlich, Ralf Herrmann</p>
        <p class="published">
            <span class="title">Proceedings of the Seventh 
            International Workshop on Descriptional Complexity of Formal Systems
            (DCFS'05), Como (Italy)</span>,
            pp. 122-133.
        </p>
	<div class="abstract">        
	<p class="abstract">
            <strong>Abstract.</strong>
                We determine the complexity of learning problems for unary regular
                languages. We begin by investigating the minimum consistent dfa
                (resp. nfa) problem which is known not 
                to be approximable within any polynomial, unless 
                <span class="math">P=NP</span>. For the case
                of unary dfa's, we exhibit an efficient algorithm. On the other
                hand, we show the intractability of the unary minimum consistent
                nfa problem but provide an efficient quadratic approximation for its
                optimization version.
                
                The VC dimension for the class of languages accepted by unary dfa's
                with at most <span class="math">n</span> states is computed as 
                <span class="math">n</span> + log <span class="math">n</span> &plusmn;
                &Theta;(log log <span class="math">n</span>),
                which (together with the efficient
                solution for the consistency problem) yields an efficient PAC
                learning algorithm for this class.
                We also show that there are no efficient PAC learning algorithms for
                the class of languages accepted by unary nfa's with at most 
                <span class="math">n</span> states, unless every problem in 
                <span class="math">NP</span> is solvable by a quasipolynomial
                time Monte-Carlo algorithm. Here we assume that nfa's with few states
                serve as hypotheses.<br />
                
                In the context of learning with equivalence queries, 
                we consider the number of
                counterexamples required to learn a unary regular language that is
                accepted by a dfa with at most <span class="math">n</span> states.
                When submitting dfa's with at most <span class="math">n<sup>d</sup></span> states 
                (<span class="math">d &le; n</span>) as queries, we show the upper bound
                <span class="math">O((n<sup>2</sup>)/d)</span> and the lower bound 
                &Omega;((<span class="math">n<sup>2</sup></span> ln <span class="math">d</span>)/
                (<span class="math">d</span> (ln <span class="math">n</span>)<sup>2</sup>)). 
                If only prime cycle lengths &le; <span class="math">n</span> are
                allowed as queries, we prove that 
                &Theta;(<span class="math">n<sup>2</sup></span>/(ln <span class="math">n</span>))
                counterxamples are necessary and sufficient.
        </p>
	</div>
        <p class="conference">
            <strong>Conference:</strong>
            <a href="http://dcfs05.dico.unimi.it/">Seventh 
            International Workshop on Descriptional Complexity of Formal Systems,
            (DCFS) 2005.</a><br />
            Como, Italy, June/July 2005<br />
        </p>
        <p class="postscriptLink"><a href="Publications/learningDCFS05.ps">Revised Version (366 KB, Postscript)</a></p>
        <p class="pdfLink"><a href="Publications/learningDCFS05.pdf">Revised Version (162 KB, PDF)</a></p>
        <p class="pdfLink"><a href="Publications/learningDCFS05Pres.pdf">Presentation (976 KB, PDF)</a></p>
</div>
<div class="publication">
        <h3>Minimizing NFA's and Regular Expressions</h3>
        <p class="authors">Gregor Gramlich, Georg Schnitger</p>
        <p class="published">
            <span class="title">Proceedings of the 22nd 
            Annual Symposium on Theoretical Aspects of Computer
            Science (STACS'05), Stuttgart (Germany)</span>,
            Springer-Verlag, Lecture Notes in Computer Science 3404, 2005, pp. 399-411.
        </p>
	<div class="abstract">        
	<p class="abstract">
            <strong>Abstract.</strong>
            We show inapproximability results concerning minimization of  
            nondeterministic finite automata (nfa's) as well as regular
            expressions relative to given nfa's, regular expressions or
            deterministic finite automata (dfa's).
            We show that it is impossible to efficiently minimize a
            given nfa or regular expression with <span class="math">n</span> states, transitions, resp.
            symbols within the factor <span class="math">o(n)</span>, unless <span class="math">P=PSPACE</span>. 
            Our inapproximability results for a given dfa
            with <span class="math">n</span> states are based on cryptographic assumptions and we show
            that any efficient algorithm will 
            have an approximation factor of at least <span class="math">n/(poly(log n))</span>.
            Our setup also allows us to analyze the minimum consistent dfa 
            problem.
        </p>
	</div>
        <p class="conference">
            <strong>Conference:</strong>
            <a href="http://stacs05.fmi.uni-stuttgart.de/">22nd International Symposium on
            Theoretical Aspects of Computer Science (STACS) 2005.</a><br />
            Stuttgart, Germany, February 2005<br />
        </p>
        <p class="copyright">&copy; Springer-Verlag</p>
        <p class="publishLink"><a href="http://springerlink.metapress.com/openurl.asp?genre=article&amp;issn=0302-9743&amp;volume=3404&amp;spage=399">Article at Springer</a></p>
        <p class="postscriptLink"><a href="Publications/approximationSTACS05.ps">Extended version (458 KB, Postscript)</a></p>
        <p class="pdfLink"><a href="Publications/approximationSTACS05.pdf">Extended version (181 KB, PDF)</a></p>
        <p class="pdfLink"><a href="Publications/approximationSTACS05Pres.pdf">Presentation (100 KB, PDF)</a></p>
</div>
<div class="publication">
        <h3>Probabilistic and Nondeterministic Unary Automata</h3>
        <p class="authors">Gregor Gramlich</p>
        <p class="published">
            <span class="title">Proceedings of Mathematical Foundations of Computer Science (MFCS) 2003</span>,
            Springer-Verlag, Lecture Notes in Computer Science 2747, 2003, pp. 460-469.
        </p>
	<div class="abstract">        
	<p class="abstract">
            <strong>Abstract.</strong>
            We investigate unary regular languages and compare deterministic  
            finite automata (DFA's), nondeterministic finite
            automata (NFA's) and probabilistic finite automata (PFA's)
            with respect to their size.<br />
            
            Given a unary PFA with <span class="math">n</span> states and an epsilon-isolated cutpoint, we show
            that the minimal equivalent DFA has at most <span class="math">n^(1/(2 epsilon))</span> 
            states in its cycle.
            This result is almost optimal, since for any <span class="math">c&lt;1</span>
            a family of PFA's can be constructed such that 
            every equivalent DFA has at least <span class="math">n^(c/(2 epsilon))</span> states.
            Thus we show that for the model of probabilistic automata with a 
            constant error bound, there is only a polynomial
            blowup for cyclic languages.<br />

            Given a unary NFA with <span class="math">n</span> states, we show that efficiently
            approximating the size of a minimal equivalent NFA within the factor 
            <span class="math">n^(1/2)/ln n</span> is impossible unless <span class="math">P=NP</span>.
            This result even holds under the promise that the accepted language is cyclic.
            On the other hand we show that we
            can approximate a minimal NFA within the factor <span class="math">ln n</span>, if we are given 
            a cyclic unary <span class="math">n</span>-state DFA.
        </p>
	</div>
        <p class="conference">
            <strong>Conference:</strong>
            <a href="http://www.mfcs.sk/mfcs2003/">Mathematical Foundations of Computer Science</a><br />
            28th International Symposium,
            Bratislava, Slovakia, August 2003<br />
            The article won the &quot;Best student paper award&quot;.
        </p>
        <p class="copyright">&copy; Springer-Verlag</p>
        <p class="publishLink"><a href="http://springerlink.metapress.com/openurl.asp?genre=article&amp;issn=0302-9743&amp;volume=2747&amp;spage=460">Article at Springer</a></p>
        <p class="postscriptLink"><a href="Publications/unaryMFCS03.ps">Revised version (339 KB, Postscript)</a></p>
        <p class="pdfLink"><a href="Publications/unaryMFCS03.pdf">Revised Version (195 KB, PDF)</a></p>
        <p class="pdfLink"><a href="Publications/unaryMFCS03Pres.pdf">Presentation (106 KB, PDF)</a></p>
</div>
<div class="publication last">
        <h3>Unäre stochastische Automaten</h3>
        <p>(Unary Stochastic Automata)</p>
        <p class="published">Master Thesis in Computer Science (German)</p>
        <p class="published">Diplomarbeit am Institut für Informatik, Johann Wolfgang Goethe-Universität Frankfurt</p>
        <p class="postscriptLink"><a href="Publications/GramlichDiplom.ps">Eingereichte Version (780 KB, Postscript)</a></p>
        <p class="pdfLink"><a href="Publications/GramlichDiplom.pdf">Eingereichte Version (788 KB, PDF)</a></p>
</div>
</div>

