'use strict';


define([
    'jquery',
    'underscore',
    'oro/translator',
    'pim/fetcher-registry',
    'pim/job/common/edit/field/select',
    'routing'
], function (
    $,
    _,
    __,
    FetcherRegistry,
    SelectField,
    Routing
) {
    return SelectField.extend({
        /**
         * {@inherit}
         */
        configure: function () {
            return $.when(
                FetcherRegistry.getFetcher('attributes-list').fetchAll(),
                SelectField.prototype.configure.apply(this, arguments)
            ).then(function (attributesList) {
                if (_.isEmpty(attributesList)) {
                    this.config.readOnly = true;
                    this.config.options = {'NO OPTION': __('dnd_google_shopping.google_attribute_reader.attribute.no_attribute')};
                } else {
                    this.config.options = attributesList;
                }
            }.bind(this));
        }
    });
});