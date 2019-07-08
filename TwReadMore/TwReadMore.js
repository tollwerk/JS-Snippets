(function () {
    TwReadMore = {};

    /**
     * @constructor
     */
    TwReadMore.Manager = function () {
        this.elements = document.querySelectorAll('[data-read-more]');
        for (var i = 0, len = this.elements.length; i < len; i++) {
            new TwReadMore.Element(this.elements[i]);
        }
    };

    /**
     * @param {node} container
     * @returns {null}
     * @constructor
     */
    TwReadMore.Element = function (container, elementsToHideSelector) {
        // Get root container
        this.container = container;
        if (!this.container) {
            return null;
        }
        this.container.classList.add('tw-readmore');

        // Get elements to hide, move them to a dedicated container.
        // Return null if there are no elements to hide.

        this.elementsToHide = this.container.querySelectorAll(elementsToHideSelector || 'p:first-of-type ~ *');
        if (!this.elementsToHide.length) {
            return null;
        }
        this.elementsToHideContainer = document.createElement('div');
        this.elementsToHideContainer.classList.add('tw-readmore__hide-elements');
        this.elementsToHide[0].parentNode.insertBefore(this.elementsToHideContainer, this.elementsToHide[0]);
        for (var i = 0, len = this.elementsToHide.length; i < len; i++) {
            this.elementsToHideContainer.appendChild(this.elementsToHide[i]);
        }
        this.maxHeight = this.elementsToHideContainer.clientHeight;

        // Create and add "Read more" button
        this.createReadMoreButton();

        // Hide elements at start and store this entity for later use
        this.hideElements();
        this.container.twReadMore = this;
    };

    /**
     * Status of the read more element
     * @type {{inactive: string, active: string}}
     */
    TwReadMore.Element.STATUS = {
        active: 'active',
        inactive: 'inactive'
    };

    /**
     * Create "Read more" button
     */
    TwReadMore.Element.prototype.createReadMoreButton = function () {
        // Create button element
        this.readMoreButton = document.createElement('button');
        this.readMoreButton.classList.add('tw-readmore__button');
        this.readMoreButton.twReadMore = {
            moreLabel: this.container.attributes['data-read-more-text'] ? this.container.attributes['data-read-more-text'].value : 'Read more',
            lessLabel: this.container.attributes['data-read-less-text'] ? this.container.attributes['data-read-less-text'].value : 'Read less'
        };

        this.readMoreButton.textContent = this.readMoreButton.twReadMore.moreLabel;
        this.readMoreButton.addEventListener('click', function () {
            this.toggle();
        }.bind(this));

        this.elementsToHideContainer.parentNode.insertBefore(this.readMoreButton, this.elementsToHideContainer);
    };

    /**
     * Show all elements
     */
    TwReadMore.Element.prototype.showElements = function () {
        this.elementsToHideContainer.style.maxHeight = this.maxHeight + 'px';
        this.elementsToHideContainer.setAttribute('data-read-more-status', TwReadMore.Element.STATUS.active);
        this.status = TwReadMore.Element.STATUS.active;

        // If no label for "reading less" is given, the readMore button get's removed
        // and the now visible elements can not be hidden anymore.
        if(!this.readMoreButton.twReadMore.lessLabel){
            this.readMoreButton.parentNode.removeChild(this.readMoreButton);
            return null;
        }
        this.readMoreButton.textContent = this.readMoreButton.twReadMore.lessLabel;
    };

    /**
     * Hide all elements
     */
    TwReadMore.Element.prototype.hideElements = function () {
        this.elementsToHideContainer.style.maxHeight = 0;
        this.elementsToHideContainer.style.overflow = 'hidden';
        this.elementsToHideContainer.setAttribute('data-read-more-status', TwReadMore.Element.STATUS.inactive);
        this.readMoreButton.textContent = this.readMoreButton.twReadMore.moreLabel;
        this.status = TwReadMore.Element.STATUS.inactive;
    };

    /**
     * Toggle between showing and hiding all elements
     *
     * @returns {boolean}
     */
    TwReadMore.Element.prototype.toggle = function () {
        if (this.elementsToHideContainer.attributes['data-read-more-status'] && this.elementsToHideContainer.attributes['data-read-more-status'].value == TwReadMore.Element.STATUS.inactive) {
            this.showElements();
            return true;
        }
        this.hideElements();
        return false;
    }
})();

Tollwerk.Init.registerOnReady(function () {
    var automaticReadmore = new TwReadMore.Manager();
    var filterFormReadMore = new TwReadMore.Element(document.querySelector('#filter'), '.FormFieldset__content > fieldset:nth-child(5) ~ *');
});