test( "Rect", function() {
    var div = $('<div />').appendTo('body');
    div.width(100).height(1000).offset({top:10, left:30});

    var rect;

    rect = div.rect();
    equal(rect.offset.top, 10);
    equal(rect.offset.left, 30);
    equal(rect.size.width, 100);
    equal(rect.size.height, 1000);

    var center = rect.center();
    equal(center.top, 10 + (1000/2));
    equal(center.left, 30 + (100/2));

    var win = $(window);
    rect = win.rect();
    console.log(win, rect);

    var doc = $(document);
    rect = doc.rect();
    console.log(doc, rect);

    var divForSetter = $('<div />').appendTo('body');
    divForSetter.rect(div.rect());

    equal(divForSetter.offset().top, 10);
    equal(divForSetter.offset().left, 30);
    equal(divForSetter.width(), 100);
    equal(divForSetter.height(), 1000);
});