## rect

エレメントの重なりをチェックライブラリ。jQueryが必須です。

```js
var $someDiv = $('.someDiv');
var $window = $(window);

//$windowに$someDivが完全に含まれているかどうかを返す。
$window.rect().contains($someDiv.rect());

//$windowと$someDivが少しでも被っている部分があるかを返す。
$window.rect().intersects($someDiv.rect());

//$windowと$someDivの位置が完全に同じかを返す。
$window.rect().equals($someDiv.rect());

//elementの中心点を返す。{top: 0, left: 0}の形式。
$someDiv.rect().center();
```