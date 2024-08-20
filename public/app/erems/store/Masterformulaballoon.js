Ext.define('Erems.store.Masterformulaballoon', {
    extend: 'Ext.data.Store',
    alias: 'store.masterformulaballoonstore',
    requires: [
        'Erems.model.Masterformulaballoon'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterformulaballoonStore',
                model: 'Erems.model.Masterformulaballoon',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterformula/read'
//                        create: 'erems/masterformula/createballoon',
//                        update: 'erems/masterformula/updateballoon',
//                        destroy: 'erems/masterformula/deleteballoon'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'billingrulesballoon_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams:{
                        mode_read: 'detail'
                    }
                }
            }, cfg)]);
    }
});