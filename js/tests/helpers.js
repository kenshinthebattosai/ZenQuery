﻿/// <reference path="../lib/jquery-2.1.1.min.js" />
/// <reference path="../lib/qunit-git.js" />
/// <reference path="../project/zen-query.js" />

$Q = QUnit;

var classes = ['','.dropdown', '.menu.dropdown','.dropdown-menu'];
var ids = ['','#menu'];
var elements = ['', 'div', 'p'];
var attributes = [
    '', '[data-attribute]', '[for=""]', '[href="github.com/#"]', '[title="Something about ZenQuery\'s Awesomeness"]',
    '[filter][title="Something about ZenQuery\'s Awesomeness"]', '[filter title="Something about ZenQuery\'s Awesomeness" class="haha" id="hehe"]'
];
var attributesObjects = [
    {}, { 'data-attribute': '' }, { 'for': '' }, { href: 'github.com/#' }, { title: "Something about ZenQuery\'s Awesomeness" },
    { filter: '', title: "Something about ZenQuery\'s Awesomeness" }, { filter: '', title: "Something about ZenQuery\'s Awesomeness", 'class':'haha', id: 'hehe' }
];

var selectors = [];
for (var i in elements)
    for (var j in ids)
        for (var k in classes)
            for (var l in attributes) {
                var classArray = $Z.trim(classes[k].replace(/\./g, ' ')).split(' '),
                    attributesObject = ZenQuery.extend(true, {}, attributesObjects[l]),
                    id = ids[j].replace('#', '');
                if (classArray.length === 1 && classArray[0] === '') {
                    classArray = [];
                } else {
                    if (!attributesObject['class']) {
                        attributesObject['class'] = classArray.join(' ');
                    } else {
                        attributesObject['class'] += ' ' + classArray.join(' ');
                    }
                }
                if (id) {
                    ZenQuery.extend(true, attributesObject, { id: id });
                }
                var element = {
                    parent: null,
                    name: elements[i] == '' ? 'div' : elements[i],
                    attributes: attributesObject,
                    children: [],
                },
                    html = '',
                    sortedkeys = [];
                html += '<' + element.name;
                for (var key in element.attributes)
                    sortedkeys.push(key);
                sortedkeys.sort();
                for (var m in sortedkeys)
                    html += ' ' + sortedkeys[m] + '="' + element.attributes[sortedkeys[m]] + '"';
                html += '></' + element.name + '>';
                selectors.push({
                    string: elements[i] + ids[j] + classes[k] + attributes[l],
                    name: elements[i] == '' ? 'div' : elements[i],
                    id: id,
                    classes: classArray,
                    attributes: attributesObjects[l],
                    element: element,
                    html: html,
                }); // Correct Order
                selectors.push({
                    string: elements[i] + attributes[l] + classes[k] + ids[j],
                    name: elements[i] == '' ? 'div' : elements[i],
                    id: id,
                    classes: classArray,
                    attributes: attributesObjects[l],
                    element: element,
                    html: html,
                }); // Random Order
            }