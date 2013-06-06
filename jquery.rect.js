;(function($){
"use strict";

Rect = function(width, height, top, left){
    if(top === undefined)
    {
        top = 0;
    }

    if(left === undefined)
    {
        left = 0;
    }

    this.size = {width: width, height: height};
    this.offset = {top: top, left: left};
};

//static
Rect.window = $(window);
Rect.document = $(document);

//instance member
Rect.prototype.center = function(){
    return {top: this.offset.top + this.size.height / 2, left: this.offset.left + this.size.width / 2};
};


$.fn.extend({
    rect: function(rect){
        if(rect !== undefined) //setter
        {
            this.offset(rect.offset);
            this.outerWidth(rect.size.width);
            this.outerHeight(rect.size.height);

            return this;
        }
        else
        {
            if($.isWindow(this.get(0))) //is window
            {
                return new Rect(window.innerWidth, window.innerHeight, Rect.window.scrollTop(), Rect.window.scrollLeft());
            }
            else
            {
                var offset = this.offset();
                if(offset) //is normal element
                {
                    return new Rect(this.outerWidth(), this.outerHeight(), offset.top, offset.left);
                }
                else //is document
                {
                    var height = Math.max(
                        Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
                        Math.max(document.body.offsetHeight, document.documentElement.offsetHeight),
                        Math.max(document.body.clientHeight, document.documentElement.clientHeight)
                    );

                    var width = Math.max(
                        Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
                        Math.max(document.body.offsetWidth, document.documentElement.offsetWidth),
                        Math.max(document.body.clientWidth, document.documentElement.clientWidth)
                    );

                    return new Rect(width, height);
                }
            }
        }
    },
    center: function(offset){
        if(offset !== undefined) //setter
        {
            this.each(function(){
                var elem = $(this);
                var newOffset = {top:offset.top - elem.outerHeight() / 2, left:offset.left - elem.outerWidth() / 2};
                elem.offset(newOffset);
            });

            return this;
        }
        else
        {
            return this.rect().center();
        }
    }
});

})(jQuery);