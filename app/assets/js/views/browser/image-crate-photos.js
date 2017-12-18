/**
 * wp.media.view.StockPhotosBrowser
 *
 * @class
 * @augments wp.media.view.AttachmentsBrowser
 */
var ImageCrateSearch = require('./search.js'),
    NoResults = require('./no-results.js'),
    TypeFilter = require('./type-filter.js'),
	SortFilter	= require('./sort-filters.js'),
    coreAttachmentsInitialize  = wp.media.view.AttachmentsBrowser.prototype.initialize,
    StockPhotosBrowser;

StockPhotosBrowser = wp.media.view.AttachmentsBrowser.extend({
    tagName: 'div',
    className: 'image-crate attachments-browser',

    defaults: _.defaults({
        filters: false,
        search: false,
        date: false,
        display: false,
        sidebar: true,
    }, wp.media.view.AttachmentsBrowser.prototype.defaults),

    initialize: function () {
        coreAttachmentsInitialize.apply(this, arguments);
        this.createToolBar();
        this.createUploader();
    },

    createToolBar: function() {
        this.toolbar.set('TypeFilterLabel', new wp.media.view.Label({
            value: 'Type Filter Label',
            attributes: {
                'for': 'media-attachment-type-filter'
            },
            priority: -75
        }).render());
        this.toolbar.set('TypeFilter', new TypeFilter({
            controller: this.controller,
            model: this.collection.props,
            priority: -75
        }).render());

		this.toolbar.set('SortFilterLabel', new wp.media.view.Label({
			value: 'Sort By',
			attributes: {
				'for': 'media-attachment-sort-filters'
			},
			priority: -50
		}).render());
		this.toolbar.set('SortFilter', new SortFilter({
			controller: this.controller,
			model: this.collection.props,
			priority: -50
		}).render());

        this.toolbar.set('search', new ImageCrateSearch({
            controller: this.controller,
            model: this.collection.props,
            priority: 60
        }).render())
    },

    createUploader: function () {
        this.uploader = new NoResults({
            controller: this.controller,
            status: false,
            message: 'Sorry, No images were found.'
        });

        this.uploader.hide();
        this.views.add(this.uploader);
    },
});

module.exports = StockPhotosBrowser;