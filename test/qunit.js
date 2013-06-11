test( "Rect", function() {
    var div = $('<div />').appendTo('body');
    div.width(100).height(1000).offset({top:10, left:30});

    var rect;

    rect = div.rect();
    strictEqual(rect.offset.top, 10);
    strictEqual(rect.offset.left, 30);
    strictEqual(rect.size.width, 100);
    strictEqual(rect.size.height, 1000);

    var center = rect.center();
    strictEqual(center.top, 10 + (1000/2));
    strictEqual(center.left, 30 + (100/2));

    var win = $(window);
    rect = win.rect();
    console.log(win, rect);

    var doc = $(document);
    rect = doc.rect();
    console.log(doc, rect);

    var divForSetter = $('<div />').appendTo('body');
    divForSetter.rect(div.rect());

    strictEqual(divForSetter.offset().top, 10);
    strictEqual(divForSetter.offset().left, 30);
    strictEqual(divForSetter.width(), 100);
    strictEqual(divForSetter.height(), 1000);
});

test( "contains", function() {
    var div1 = $('<div />').appendTo('body');
    div1.width(100).height(100).offset({top:0, left:0});

    var div2 = $('<div />').appendTo('body');

    //completly contains
    div2.width(90).height(90).offset({top:5, left:5});
    strictEqual(div1.rect().contains(div2.rect()), true);

    //out
    div2.width(90).height(90).offset({top:11, left:11});
    strictEqual(div1.rect().contains(div2.rect()), false);

    //too big width
    div2.width(110).height(100).offset({top:0, left:0});
    strictEqual(div1.rect().contains(div2.rect()), false);

    //too big height
    div2.width(100).height(110).offset({top:0, left:0});
    strictEqual(div1.rect().contains(div2.rect()), false);

    //too big both
    div2.width(110).height(110).offset({top:0, left:0});
    strictEqual(div1.rect().contains(div2.rect()), false);

    //width equal
    div2.width(100).height(90).offset({top:0, left:0});
    strictEqual(div1.rect().contains(div2.rect()), true);

    //height equal
    div2.width(90).height(100).offset({top:0, left:0});
    strictEqual(div1.rect().contains(div2.rect()), true);

    //both equal
    div2.width(100).height(100).offset({top:0, left:0});
    strictEqual(div1.rect().contains(div2.rect()), true);
});


test( "intersects", function() {
    var div1 = $('<div />').appendTo('body');
    div1.width(100).height(100).offset({top:0, left:0});

    var div2 = $('<div />').appendTo('body');

    div2.width(100).height(100).offset({top:10, left:10});
    strictEqual(div1.rect().intersects(div2.rect()).equals(new Rect(90, 90, 10, 10)), true);

    div2.width(100).height(100).offset({top:100, left:100});
    strictEqual(div1.rect().intersects(div2.rect()), false);
});