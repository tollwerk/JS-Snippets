# tollwerk JS
Handy javascript snippets

## TwReadMore

Searches for the first `<p>` element inside given parent element(s). 
Hides all following sibling elements and inserts a "Read more" button.

### Usage

#### TwReadmore.Manager

Initialize the TwReadMore.Manager to find all elements with a `data-read-more` attribute. 
The value of that attribute will become the label of the corresponding "Read More" button. 

**HTML**
```HTML
	<div data-read-more="Click to read more">
		<h1>Single use</h1>
		<p>
			This is the first paragraph. Everything after this element will be hidden.
			Because there is no 'data-read-less' attribute, the "Read more" button will 
			be removed after clicking it.
		</p>
		<!-- Hidden content from here -->
	</div>
	
	<article class="foo" data-read-more="Expand!" data-read-less="Collapse!">
		<h1>Multiple use</h1>
		<p>
			This is the first paragraph. Everything after this element will be hidden.
			Because there is a 'data-read-less' attribute, the "Read more" button will 
			toggle show/hide the hidden content with each click. 
		</p>
		<!-- Hidden content from here -->
	</div>
```

**Javascript**
```Javascript
	new TwReadMore.Manager();
```

#### TwReadMore.Element

Use this for initializing a single element. You probably won't need this. It's there anyway 
because the TwReadMore.Manager uses this. **Attention:** You still need the `data-read-more` attribute!

```HTML
	<div id="my-element" data-read-more="Click to read more">
		<h1>Single use</h1>
		<p>
			This is the first paragraph. Everything after this element will be hidden.
			Because there is no 'data-read-less' attribute, the "Read more" button will 
			be removed after clicking it.
		</p>
		<!-- Hidden content from here -->
	</div>
```

**Javascript**
```Javascript
	new TwReadMore.Element(document.getElementById('my-element'));
```


 