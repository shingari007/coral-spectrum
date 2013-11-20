(function($) {
  CUI.Toolbar = new Class(/** @lends CUI.Toolbar# */{
    toString: 'Toolbar',

    extend: CUI.Widget,
    /**
     * @extends CUI.Widget
     * @classdesc 
     *    
     *  
     *     
     *  <h2>Data Attributes</h2>
     *  <h4>Currently there are the following data options:</h4>
     *  <pre>
     *    data-init="toolbar"
     *  </pre>
     */
    construct: function(options) {
      var $toolbar  = this.$element,
          $header   = $toolbar.closest(".content-header"),
          $icons    = $toolbar.find(".left"),
          hasCenter = $toolbar.find(".center").length !== 0,
          iconWidth = $icons.width();

      $toolbar.reflow({
        "break-lines": function ($toolbar, size) {
          return hasCenter && $toolbar.width()-2*iconWidth < 16*size.rem();
        },
        "long-title":  function ($toolbar, size) {
          return hasCenter && $toolbar.width()-2*iconWidth > 40*size.rem();
        }
      }, {
        "applyClassToElement": $header
      });
    }
  });

  /**
   * Utility method that 3rd parties can invoke to have the JavaScript part of this
   * widget initialize.
   *
   * @param $element Existing jQuery element that represents the uninitialized widget.
   */
  CUI.Toolbar.init = function($element) {
    if (CUI.util.getWidgetFromElement(CUI.Toolbar, $element) === undefined) {
      $element.toolbar();
    }
  };

  CUI.util.plugClass(CUI.Toolbar);

  // Data API
  if (CUI.options.dataAPI) {
    $(document).on("cui-contentloaded.data-api", function(e) {
      CUI.Toolbar.init($("[data-init~=toolbar]", e.target));
    });
  }
}(window.jQuery));
