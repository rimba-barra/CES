Ext.define('Hrd.controller.Transferkrypayroll', {
    extend: 'Hrd.library.box.controller.template.Parameters',
    alias: 'controller.Transferkrypayroll',
    views: [],
    controllerName: 'transferkrypayroll',
    formWidth: 400,
    refs: [
        {
            ref: 'panel',
            selector: 'transferkrypayrollpanel'
        }
    ],
    bindPrefixName: 'Transferkrypayroll',
    sizew: {w: 150, h: 50},
    paramList: null,
    init: function() {
        this.callParent(arguments);
        var me = this;
        var newEvents = {};
        newEvents['transferkrypayrollpanel button[action=proses]'] = {
            click: function(el, newVal) {
                me.prosesstransfer();
                //  me.statusOnChange(el);
            }
        };
        this.control(newEvents);


    },
    prosesstransfer: function() {
        var me = this;
        var p = me.getPanel();
        p.setLoading("Processing...");
        me.tools.ajax({
            params: {},
            fail: function(msg, data) {

                p.setLoading(false);
            },
            success: function(data) {
                p.setLoading(false);
               // p.up("window").close();
                me.tools.alert.info("Success!");
            }
        }).process('process');
    }


});