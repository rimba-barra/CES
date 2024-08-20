Ext.define('Cashier.library.MaskreHandler', {
    setMaskreField: function (el) {
        var me        = this,
            itemForms = el.getForm().getFields().items;

        for (var x in itemForms) {
            var items = itemForms[x],
                xtype = items.getXType();

            if (Object.keys(apps.maskre_field).includes(xtype)) {
                items.maskRe = new RegExp(`[${apps.maskre_field[xtype]}]`);
            }
        }
    },
    listenersMaskreField: function (el) {
        var me        = this,
            form      = el.getEl(),
            itemForms = el.getForm().getFields().items;

        for (var x in itemForms) {
            var items = itemForms[x],
                xtype = items.getXType();

            if (Object.keys(apps.maskre_field).includes(xtype)) {
                var objItem = form.down('[name=' + items.getName() + ']');
                if (objItem) {
                    objItem.set({
                        "data-xtype" : xtype,
                        "data-maskre": items.maskRe
                    });

                    objItem.on('paste', function (event, element) {
                        setTimeout(function () {
                            var elDom         = form.down('[name=' + element.name + ']');
                                element.value = me.getValueRegex(elDom.dom.getAttribute('data-xtype'), elDom.dom.getAttribute('data-maskre'), element);
                        }, 100);
                    });

                    if (xtype == 'xphonenumberfieldEST') {
                        objItem.on('keyup', function (event, element) {
                            var elDom         = form.down('[name=' + element.name + ']');
                                element.value = me.getValueRegex(elDom.dom.getAttribute('data-xtype'), elDom.dom.getAttribute('data-maskre'), element);
                        });
                    }
                }
            }
        }
    },
    pasteCleanText: function (text) {
        var cleanText = new Cashier.library.CleanText();
        return cleanText.copyPaste(text);
    },
    filterValueRegex: function (regex, text) {
        var str   = regex.toString();
        var rgx   = str.substring(2, str.length - 2);
        var regex = new RegExp(`[^${rgx}]`, 'g');

        if (regex.test(text)) {
            text = text.replace(regex, '');
        }

        return text.trim();
    },
    getValueRegex: function (xtype, regex, el) {
        var me  = this,
            val = el.value;

        val = me.pasteCleanText(val);
        val = me.filterValueRegex(regex, val);

        if (xtype == 'xphonenumberfieldEST') {
            var char   = val.charAt(0) == '+' ? '+' : '';
            var valTmp = char          == '+' ? val.substring(1, val.length) : val;

            val = char + valTmp.replace(/[^0-9]/g, '');
        }

        return val;
    }
});